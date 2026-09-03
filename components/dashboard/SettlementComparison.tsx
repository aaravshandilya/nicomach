"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDashboard } from "./DashboardProvider";
import { formatCurrency } from "@/lib/utils";
import { SettlementPayment } from "@/lib/types";
import { IconCheck } from "./icons";

function PaymentRow({ payment }: { payment: SettlementPayment }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-border-gold">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
        aria-expanded={open}
      >
        <span className="text-sm text-cream">
          {payment.from} <span className="text-gold">&rarr;</span> {payment.to}
        </span>
        <span className="flex items-center gap-3">
          <span className="font-sans text-sm font-bold tabular-nums text-gold-light">
            {formatCurrency(payment.amount, payment.currency)}
          </span>
          <span className={`text-muted transition-transform ${open ? "rotate-180" : ""}`}>
            &#9662;
          </span>
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border-gold px-4"
          >
            <p className="py-3 text-xs text-muted">
              Contributing obligations ({payment.contributingInvoiceIds.length}):{" "}
              {payment.contributingInvoiceIds.join(", ")}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SettlementComparison() {
  const { result } = useDashboard();
  const allOriginal = result.groups.flatMap((g) => g.originalPayments);
  const allOptimized = result.groups.flatMap((g) => g.optimizedPayments);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border-gold bg-bg-elevated/60 p-5">
          <p className="text-xs uppercase tracking-widest2 text-muted">Original payments</p>
          <p className="mt-2 font-sans text-2xl font-bold tabular-nums text-cream">
            {allOriginal.length}
          </p>
          <p className="mt-1 text-xs text-muted">{formatCurrency(result.originalGrossVolume)}</p>
        </div>
        <div className="rounded-xl border border-gold/40 bg-bg-elevated p-5 shadow-gold-sm">
          <p className="text-xs uppercase tracking-widest2 text-muted">Optimized payments</p>
          <p className="mt-2 font-sans text-2xl font-bold tabular-nums text-gold-light">
            {allOptimized.length}
          </p>
          <p className="mt-1 text-xs text-muted">{formatCurrency(result.optimizedGrossVolume)}</p>
        </div>
        <div className="rounded-xl border border-success/30 bg-success/10 p-5">
          <p className="flex items-center gap-1.5 text-xs uppercase tracking-widest2 text-success">
            <IconCheck width={12} height={12} /> Reduction
          </p>
          <p className="mt-2 font-sans text-2xl font-bold tabular-nums text-cream">
            {result.reductionPct.toFixed(1)}%
          </p>
          <p className="mt-1 text-xs text-muted">{formatCurrency(result.reductionAmount)} less moved</p>
        </div>
      </div>

      <div>
        <p className="eyebrow mb-3">Recommended settlement payments</p>
        <div className="space-y-2">
          {allOptimized.length === 0 && (
            <p className="text-sm text-muted">No settlement required &mdash; all positions already net to zero.</p>
          )}
          {allOptimized.map((p) => (
            <PaymentRow key={p.id} payment={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
