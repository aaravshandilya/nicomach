import { EligibilityStatus, Invoice, VerificationStatus } from "./types";

export const SAMPLE_COMPANIES = [
  "Atlas Freight Co.",
  "Meridian Supply",
  "Solano Manufacturing",
  "Kestrel Logistics",
  "Harborview Textiles",
  "Ridgeline Components",
  "Bluepeak Materials",
  "Cascade Foods Group",
  "Ironwood Fabrication",
  "Summit Packaging",
  "Vantage Chemicals",
  "Northfield Electronics",
];

// Small deterministic PRNG (mulberry32) so the sample dataset is stable
// across reloads and builds.
function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const VERIFICATION_WEIGHTS: [VerificationStatus, number][] = [
  ["verified", 0.8],
  ["pending", 0.13],
  ["disputed", 0.07],
];

const ELIGIBILITY_WEIGHTS: [EligibilityStatus, number][] = [
  ["eligible", 0.82],
  ["restricted", 0.1],
  ["excluded", 0.08],
];

function weightedPick<T>(rand: () => number, weights: [T, number][]): T {
  const r = rand();
  let acc = 0;
  for (const [value, weight] of weights) {
    acc += weight;
    if (r <= acc) return value;
  }
  return weights[weights.length - 1][0];
}

function pad(n: number, width: number) {
  return n.toString().padStart(width, "0");
}

function addDays(base: Date, days: number) {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function generateSampleInvoices(): Invoice[] {
  const rand = mulberry32(20260115);
  const invoices: Invoice[] = [];
  const base = new Date("2026-08-01");
  let seq = 1;

  // Deliberately construct several closed obligation cycles so the netting
  // effect is visible and explainable, then layer in additional
  // semi-random pairwise invoices for network density.
  const cycles: string[][] = [
    ["Atlas Freight Co.", "Meridian Supply", "Solano Manufacturing", "Kestrel Logistics"],
    ["Harborview Textiles", "Ridgeline Components", "Bluepeak Materials"],
    ["Cascade Foods Group", "Ironwood Fabrication", "Summit Packaging", "Vantage Chemicals", "Northfield Electronics"],
  ];

  for (const cycle of cycles) {
    for (let i = 0; i < cycle.length; i++) {
      const payer = cycle[i];
      const recipient = cycle[(i + 1) % cycle.length];
      const amount = Math.round((4000 + rand() * 26000) * 100) / 100;
      invoices.push({
        invoice_id: `INV-${pad(seq++, 4)}`,
        payer,
        recipient,
        amount,
        currency: "USD",
        due_date: addDays(base, Math.floor(rand() * 30)),
        verification_status: weightedPick(rand, VERIFICATION_WEIGHTS),
        eligibility_status: weightedPick(rand, ELIGIBILITY_WEIGHTS),
      });
    }
  }

  // Additional cross-network invoices for density and realism.
  const extraCount = 34;
  for (let i = 0; i < extraCount; i++) {
    const payer = SAMPLE_COMPANIES[Math.floor(rand() * SAMPLE_COMPANIES.length)];
    let recipient = SAMPLE_COMPANIES[Math.floor(rand() * SAMPLE_COMPANIES.length)];
    let guard = 0;
    while (recipient === payer && guard < 10) {
      recipient = SAMPLE_COMPANIES[Math.floor(rand() * SAMPLE_COMPANIES.length)];
      guard++;
    }
    const amount = Math.round((800 + rand() * 18000) * 100) / 100;
    const currency = rand() < 0.12 ? "EUR" : "USD";

    invoices.push({
      invoice_id: `INV-${pad(seq++, 4)}`,
      payer,
      recipient,
      amount,
      currency,
      due_date: addDays(base, Math.floor(rand() * 45)),
      verification_status: weightedPick(rand, VERIFICATION_WEIGHTS),
      eligibility_status: weightedPick(rand, ELIGIBILITY_WEIGHTS),
    });
  }

  return invoices;
}

export const SAMPLE_INVOICES = generateSampleInvoices();

export const CSV_TEMPLATE_HEADER =
  "invoice_id,payer,recipient,amount,currency,due_date,verification_status,eligibility_status";

export const CSV_TEMPLATE_EXAMPLE = `${CSV_TEMPLATE_HEADER}
INV-0001,Atlas Freight Co.,Meridian Supply,12500.00,USD,2026-09-15,verified,eligible
INV-0002,Meridian Supply,Solano Manufacturing,8200.00,USD,2026-09-18,verified,eligible`;
