import { jsPDF } from "jspdf";
import { OptimizationResult } from "./types";
import { formatCurrency, formatPercent } from "./utils";

const GOLD: [number, number, number] = [196, 160, 82];
const INK: [number, number, number] = [20, 20, 18];
const MUTED: [number, number, number] = [110, 108, 96];

export function exportSummaryPDF(result: OptimizationResult) {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const marginX = 56;
  let y = 64;

  doc.setFont("times", "bold");
  doc.setFontSize(22);
  doc.setTextColor(...INK);
  doc.text("NicoMach", marginX, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...GOLD);
  y += 18;
  doc.text("SETTLEMENT OPTIMIZATION SUMMARY — DEMONSTRATION DATA", marginX, y);

  y += 10;
  doc.setDrawColor(...GOLD);
  doc.line(marginX, y, 558, y);

  y += 28;
  doc.setTextColor(...MUTED);
  doc.setFontSize(9);
  doc.text(
    "Demonstration data. NicoMach does not move funds. Every settlement requires participant approval.",
    marginX,
    y
  );

  y += 30;
  const rows: [string, string][] = [
    ["Total invoice value", formatCurrency(result.totalInvoiceValue)],
    ["Eligible invoice value", formatCurrency(result.eligibleInvoiceValue)],
    ["Participating companies", String(result.participatingCompanies.length)],
    ["Original gross settlement", formatCurrency(result.originalGrossVolume)],
    ["Optimized gross settlement", formatCurrency(result.optimizedGrossVolume)],
    ["Payments removed", `${result.paymentsRemoved} (${result.originalPaymentCount} to ${result.optimizedPaymentCount})`],
    ["Gross movement reduced", formatPercent(result.reductionPct)],
  ];

  doc.setFontSize(11);
  for (const [label, value] of rows) {
    doc.setTextColor(...MUTED);
    doc.setFont("helvetica", "normal");
    doc.text(label, marginX, y);
    doc.setTextColor(...INK);
    doc.setFont("helvetica", "bold");
    doc.text(value, 400, y);
    y += 22;
  }

  y += 14;
  doc.setTextColor(...INK);
  doc.setFont("times", "bold");
  doc.setFontSize(13);
  doc.text("Recommended settlement payments", marginX, y);
  y += 10;
  doc.setDrawColor(...GOLD);
  doc.line(marginX, y, 558, y);
  y += 20;

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...MUTED);
  doc.text("FROM", marginX, y);
  doc.text("TO", 230, y);
  doc.text("AMOUNT", 460, y, { align: "right" });
  y += 14;

  doc.setFont("helvetica", "normal");
  doc.setTextColor(...INK);
  for (const group of result.groups) {
    for (const payment of group.optimizedPayments) {
      if (y > 740) {
        doc.addPage();
        y = 64;
      }
      doc.text(payment.from, marginX, y, { maxWidth: 160 });
      doc.text(payment.to, 230, y, { maxWidth: 160 });
      doc.text(formatCurrency(payment.amount, payment.currency), 460, y, { align: "right" });
      y += 18;
    }
  }

  y += 20;
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text(
    "All obligations must be verified, eligible, and legally permitted to be netted. This report reflects illustrative or synthetic data unless generated from your organization's approved dataset.",
    marginX,
    Math.min(y, 760),
    { maxWidth: 500 }
  );

  doc.save("nicomach-settlement-summary.pdf");
}
