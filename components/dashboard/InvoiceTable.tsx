"use client";

import { useMemo, useState } from "react";
import { useDashboard } from "./DashboardProvider";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { isEligible } from "@/lib/optimization";
import { Invoice } from "@/lib/types";

type Filter = "all" | "eligible" | "excluded";

function StatusBadge({ label, tone }: { label: string; tone: "success" | "muted" | "gold" }) {
  const tones: Record<string, string> = {
    success: "border-success/40 text-success bg-success/10",
    muted: "border-border-gold text-muted bg-white/5",
    gold: "border-gold/40 text-gold-light bg-gold/10",
  };
  return (
    <span className={cn("inline-flex rounded-full border px-2 py-0.5 text-[0.65rem] capitalize", tones[tone])}>
      {label}
    </span>
  );
}

function verificationTone(v: Invoice["verification_status"]) {
  if (v === "verified") return "success";
  if (v === "pending") return "gold";
  return "muted";
}

function eligibilityTone(v: Invoice["eligibility_status"]) {
  if (v === "eligible") return "success";
  if (v === "restricted") return "gold";
  return "muted";
}

export function InvoiceTable() {
  const { invoices } = useDashboard();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    return invoices.filter((inv) => {
      if (filter === "eligible" && !isEligible(inv)) return false;
      if (filter === "excluded" && isEligible(inv)) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        inv.payer.toLowerCase().includes(q) ||
        inv.recipient.toLowerCase().includes(q) ||
        inv.invoice_id.toLowerCase().includes(q)
      );
    });
  }, [invoices, query, filter]);

  return (
    <div className="rounded-2xl border border-border-gold bg-bg-elevated/60 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="eyebrow">Obligations</p>
          <h3 className="mt-1 font-serif text-xl text-cream">
            {filtered.length} invoice{filtered.length === 1 ? "" : "s"}
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search company or ID"
            className="rounded-full border border-border-gold bg-bg-primary px-4 py-2 text-xs text-cream outline-none placeholder:text-muted/70 focus:border-gold"
          />
          <div className="inline-flex rounded-full border border-border-gold p-1">
            {(["all", "eligible", "excluded"] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium capitalize transition-colors",
                  filter === f ? "bg-gold text-bg-primary" : "text-cream/70 hover:text-cream"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop / tablet table */}
      <div className="scroll-fade-x mt-5 hidden sm:block">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border-gold text-xs uppercase tracking-widest2 text-muted">
              <th className="py-2 pr-4 font-medium">Invoice</th>
              <th className="py-2 pr-4 font-medium">Payer</th>
              <th className="py-2 pr-4 font-medium">Recipient</th>
              <th className="py-2 pr-4 text-right font-medium">Amount</th>
              <th className="py-2 pr-4 font-medium">Due</th>
              <th className="py-2 pr-4 font-medium">Verification</th>
              <th className="py-2 pr-0 font-medium">Eligibility</th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, 200).map((inv) => (
              <tr key={inv.invoice_id} className="border-b border-border-gold/60">
                <td className="py-2.5 pr-4 font-mono text-xs text-muted">{inv.invoice_id}</td>
                <td className="py-2.5 pr-4 text-cream">{inv.payer}</td>
                <td className="py-2.5 pr-4 text-cream">{inv.recipient}</td>
                <td className="py-2.5 pr-4 text-right font-sans font-semibold tabular-nums text-cream">
                  {formatCurrency(inv.amount, inv.currency)}
                </td>
                <td className="py-2.5 pr-4 text-xs text-muted">{formatDate(inv.due_date)}</td>
                <td className="py-2.5 pr-4">
                  <StatusBadge
                    label={inv.verification_status}
                    tone={verificationTone(inv.verification_status)}
                  />
                </td>
                <td className="py-2.5 pr-0">
                  <StatusBadge
                    label={inv.eligibility_status}
                    tone={eligibilityTone(inv.eligibility_status)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="mt-5 space-y-3 sm:hidden">
        {filtered.slice(0, 200).map((inv) => (
          <div key={inv.invoice_id} className="rounded-xl border border-border-gold p-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-muted">{inv.invoice_id}</span>
              <span className="font-sans text-sm font-bold tabular-nums text-cream">
                {formatCurrency(inv.amount, inv.currency)}
              </span>
            </div>
            <p className="mt-2 text-sm text-cream">
              {inv.payer} <span className="text-gold">&rarr;</span> {inv.recipient}
            </p>
            <p className="mt-1 text-xs text-muted">Due {formatDate(inv.due_date)}</p>
            <div className="mt-3 flex gap-2">
              <StatusBadge
                label={inv.verification_status}
                tone={verificationTone(inv.verification_status)}
              />
              <StatusBadge
                label={inv.eligibility_status}
                tone={eligibilityTone(inv.eligibility_status)}
              />
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-6 text-center text-sm text-muted">No invoices match your filters.</p>
      )}
    </div>
  );
}
