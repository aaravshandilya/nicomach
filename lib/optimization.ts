import {
  CompanyPosition,
  Invoice,
  OptimizationGroup,
  OptimizationResult,
  SettlementPayment,
} from "./types";

/**
 * NicoMach's demonstration netting algorithm.
 *
 * This is a deterministic, explainable multilateral-netting calculation —
 * not a machine-learning model. Steps:
 *
 * 1. Keep only invoices that are verified AND eligible.
 * 2. Group eligible invoices by currency (a real deployment would also
 *    group by compatible settlement date and jurisdiction).
 * 3. Within each group, compute each company's net position: what it owes
 *    minus what it is owed.
 * 4. Split companies into net payers (negative position) and net receivers
 *    (positive position).
 * 5. Greedily match the largest payer against the largest receiver,
 *    repeating until every position nets to zero. This preserves every
 *    company's final net position while minimizing the number of payments.
 * 6. Compare the optimized payment count and volume against the original.
 */

const EPSILON = 0.005;

export function isEligible(invoice: Invoice): boolean {
  return (
    invoice.verification_status === "verified" && invoice.eligibility_status === "eligible"
  );
}

function computePositions(invoices: Invoice[]): CompanyPosition[] {
  const map = new Map<string, CompanyPosition>();

  const ensure = (company: string, currency: string) => {
    const key = `${company}::${currency}`;
    if (!map.has(key)) {
      map.set(key, {
        company,
        currency,
        grossPayable: 0,
        grossReceivable: 0,
        netPosition: 0,
      });
    }
    return map.get(key)!;
  };

  for (const inv of invoices) {
    const payer = ensure(inv.payer, inv.currency);
    payer.grossPayable += inv.amount;
    payer.netPosition -= inv.amount;

    const recipient = ensure(inv.recipient, inv.currency);
    recipient.grossReceivable += inv.amount;
    recipient.netPosition += inv.amount;
  }

  return Array.from(map.values());
}

/**
 * Greedy min-cash-flow settlement: repeatedly settles the largest payer
 * against the largest receiver. Produces at most (n - 1) payments for n
 * participants with non-zero net positions, and always preserves each
 * company's final net position.
 */
function buildOptimizedPayments(
  positions: CompanyPosition[],
  currency: string,
  invoicesByCompany: Map<string, Set<string>>
): SettlementPayment[] {
  const payers = positions
    .filter((p) => p.netPosition < -EPSILON)
    .map((p) => ({ company: p.company, amount: -p.netPosition }));
  const receivers = positions
    .filter((p) => p.netPosition > EPSILON)
    .map((p) => ({ company: p.company, amount: p.netPosition }));

  payers.sort((a, b) => b.amount - a.amount);
  receivers.sort((a, b) => b.amount - a.amount);

  const payments: SettlementPayment[] = [];
  let i = 0;
  let j = 0;
  let seq = 0;

  while (i < payers.length && j < receivers.length) {
    const payer = payers[i];
    const receiver = receivers[j];
    const amount = Math.min(payer.amount, receiver.amount);

    if (amount > EPSILON) {
      const contributing = new Set<string>();
      invoicesByCompany.get(payer.company)?.forEach((id) => contributing.add(id));
      invoicesByCompany.get(receiver.company)?.forEach((id) => contributing.add(id));

      payments.push({
        id: `opt-${currency}-${seq++}`,
        from: payer.company,
        to: receiver.company,
        amount: Math.round(amount * 100) / 100,
        currency,
        contributingInvoiceIds: Array.from(contributing),
      });
    }

    payer.amount -= amount;
    receiver.amount -= amount;

    if (payer.amount <= EPSILON) i++;
    if (receiver.amount <= EPSILON) j++;
  }

  return payments;
}

function buildOriginalPayments(invoices: Invoice[]): SettlementPayment[] {
  return invoices.map((inv) => ({
    id: `orig-${inv.invoice_id}`,
    from: inv.payer,
    to: inv.recipient,
    amount: inv.amount,
    currency: inv.currency,
    contributingInvoiceIds: [inv.invoice_id],
  }));
}

export function runOptimization(allInvoices: Invoice[]): OptimizationResult {
  const eligible = allInvoices.filter(isEligible);
  const excludedInvoices = allInvoices.filter((inv) => !isEligible(inv));

  const byCurrency = new Map<string, Invoice[]>();
  for (const inv of eligible) {
    if (!byCurrency.has(inv.currency)) byCurrency.set(inv.currency, []);
    byCurrency.get(inv.currency)!.push(inv);
  }

  const invoicesByCompany = new Map<string, Set<string>>();
  for (const inv of eligible) {
    for (const company of [inv.payer, inv.recipient]) {
      if (!invoicesByCompany.has(company)) invoicesByCompany.set(company, new Set());
      invoicesByCompany.get(company)!.add(inv.invoice_id);
    }
  }

  const groups: OptimizationGroup[] = [];
  const participatingCompanies = new Set<string>();

  for (const [currency, invoices] of byCurrency) {
    const positions = computePositions(invoices);
    const originalPayments = buildOriginalPayments(invoices);
    const optimizedPayments = buildOptimizedPayments(positions, currency, invoicesByCompany);

    positions.forEach((p) => participatingCompanies.add(p.company));

    groups.push({ currency, positions, originalPayments, optimizedPayments });
  }

  const originalGrossVolume = sum(groups.flatMap((g) => g.originalPayments.map((p) => p.amount)));
  const optimizedGrossVolume = sum(
    groups.flatMap((g) => g.optimizedPayments.map((p) => p.amount))
  );
  const originalPaymentCount = sum(groups.map((g) => g.originalPayments.length));
  const optimizedPaymentCount = sum(groups.map((g) => g.optimizedPayments.length));

  const reductionAmount = originalGrossVolume - optimizedGrossVolume;
  const reductionPct = originalGrossVolume > 0 ? (reductionAmount / originalGrossVolume) * 100 : 0;

  return {
    groups,
    totalInvoiceValue: sum(allInvoices.map((i) => i.amount)),
    eligibleInvoiceValue: sum(eligible.map((i) => i.amount)),
    originalGrossVolume,
    optimizedGrossVolume,
    originalPaymentCount,
    optimizedPaymentCount,
    reductionAmount,
    reductionPct,
    paymentsRemoved: originalPaymentCount - optimizedPaymentCount,
    participatingCompanies: Array.from(participatingCompanies).sort(),
    excludedInvoices,
  };
}

function sum(values: number[]): number {
  return values.reduce((acc, v) => acc + v, 0);
}
