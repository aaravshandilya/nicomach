import Papa from "papaparse";
import {
  EligibilityStatus,
  Invoice,
  ParsedInvoices,
  SettlementPayment,
  ValidationError,
  VerificationStatus,
} from "./types";

const REQUIRED_FIELDS = [
  "invoice_id",
  "payer",
  "recipient",
  "amount",
  "currency",
  "due_date",
  "verification_status",
  "eligibility_status",
] as const;

const VERIFICATION_VALUES: VerificationStatus[] = ["verified", "pending", "disputed"];
const ELIGIBILITY_VALUES: EligibilityStatus[] = ["eligible", "restricted", "excluded"];

function isValidDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(new Date(value).getTime());
}

export function parseInvoiceCSV(csvText: string): ParsedInvoices {
  const result = Papa.parse<Record<string, string>>(csvText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim().toLowerCase(),
  });

  const errors: ValidationError[] = [];
  const invoices: Invoice[] = [];
  const seenIds = new Set<string>();

  const headerFields = result.meta.fields ?? [];
  const missingColumns = REQUIRED_FIELDS.filter((f) => !headerFields.includes(f));
  if (missingColumns.length > 0) {
    errors.push({
      row: 0,
      field: "header",
      message: `Missing required column(s): ${missingColumns.join(", ")}`,
    });
    return { invoices, errors };
  }

  result.data.forEach((row, idx) => {
    const rowNum = idx + 2; // account for header row, 1-indexed
    const invoiceId = (row.invoice_id || "").trim();

    for (const field of REQUIRED_FIELDS) {
      if (!row[field] || String(row[field]).trim() === "") {
        errors.push({ row: rowNum, invoice_id: invoiceId, field, message: `Missing ${field}` });
      }
    }

    if (invoiceId && seenIds.has(invoiceId)) {
      errors.push({
        row: rowNum,
        invoice_id: invoiceId,
        field: "invoice_id",
        message: "Duplicate invoice_id",
      });
    }
    seenIds.add(invoiceId);

    const amount = Number(row.amount);
    if (row.amount && (Number.isNaN(amount) || amount <= 0)) {
      errors.push({
        row: rowNum,
        invoice_id: invoiceId,
        field: "amount",
        message: "Amount must be a positive number",
      });
    }

    if (row.due_date && !isValidDate(row.due_date.trim())) {
      errors.push({
        row: rowNum,
        invoice_id: invoiceId,
        field: "due_date",
        message: "due_date must be formatted YYYY-MM-DD",
      });
    }

    const verification = row.verification_status?.trim().toLowerCase() as VerificationStatus;
    if (row.verification_status && !VERIFICATION_VALUES.includes(verification)) {
      errors.push({
        row: rowNum,
        invoice_id: invoiceId,
        field: "verification_status",
        message: `Must be one of: ${VERIFICATION_VALUES.join(", ")}`,
      });
    }

    const eligibility = row.eligibility_status?.trim().toLowerCase() as EligibilityStatus;
    if (row.eligibility_status && !ELIGIBILITY_VALUES.includes(eligibility)) {
      errors.push({
        row: rowNum,
        invoice_id: invoiceId,
        field: "eligibility_status",
        message: `Must be one of: ${ELIGIBILITY_VALUES.join(", ")}`,
      });
    }

    if (row.payer && row.recipient && row.payer.trim() === row.recipient.trim()) {
      errors.push({
        row: rowNum,
        invoice_id: invoiceId,
        field: "recipient",
        message: "payer and recipient must differ",
      });
    }

    const rowHasBlockingError = errors.some((e) => e.row === rowNum && e.field !== "invoice_id");
    if (!rowHasBlockingError && invoiceId) {
      invoices.push({
        invoice_id: invoiceId,
        payer: row.payer.trim(),
        recipient: row.recipient.trim(),
        amount,
        currency: row.currency.trim().toUpperCase(),
        due_date: row.due_date.trim(),
        verification_status: verification,
        eligibility_status: eligibility,
      });
    }
  });

  return { invoices, errors };
}

export function invoicesToCSV(invoices: Invoice[]): string {
  return Papa.unparse(
    invoices.map((i) => ({
      invoice_id: i.invoice_id,
      payer: i.payer,
      recipient: i.recipient,
      amount: i.amount,
      currency: i.currency,
      due_date: i.due_date,
      verification_status: i.verification_status,
      eligibility_status: i.eligibility_status,
    }))
  );
}

export function paymentsToCSV(payments: SettlementPayment[]): string {
  return Papa.unparse(
    payments.map((p) => ({
      from: p.from,
      to: p.to,
      amount: p.amount,
      currency: p.currency,
      contributing_invoice_ids: p.contributingInvoiceIds.join(";"),
    }))
  );
}

export function downloadTextFile(filename: string, content: string, mime = "text/csv") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
