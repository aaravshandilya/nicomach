"use client";

import { motion } from "framer-motion";
import { useDashboard } from "../DashboardProvider";
import { Button } from "@/components/ui/Button";
import { AnimatedNumber } from "@/components/ui/MetricCard";
import { formatCurrency } from "@/lib/utils";
import { IconAlert, IconCheck } from "../icons";

export function Overview() {
  const { result, hasRunOptimization, runOptimizationNow, setSection, validationErrors } =
    useDashboard();

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]">
      <div className="rounded-2xl border border-border-gold bg-bg-elevated/60 p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="eyebrow">Settlement snapshot</p>
            <h2 className="mt-2 font-serif text-2xl text-cream">
              {hasRunOptimization
                ? "Here is what actually needs to move."
                : "Run the optimization to see what can be simplified."}
            </h2>
          </div>
          {!hasRunOptimization && (
            <Button onClick={runOptimizationNow}>Run Optimization</Button>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-widest2 text-muted">Original gross settlement</p>
            <p className="mt-2 font-sans text-3xl font-bold tabular-nums text-cream">
              <AnimatedNumber value={result.originalGrossVolume} prefix="$" />
            </p>
            <p className="mt-1 text-xs text-muted">{result.originalPaymentCount} payments</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest2 text-muted">Optimized gross settlement</p>
            <p className="mt-2 font-sans text-3xl font-bold tabular-nums text-gold-light">
              {hasRunOptimization ? (
                <AnimatedNumber value={result.optimizedGrossVolume} prefix="$" />
              ) : (
                "—"
              )}
            </p>
            <p className="mt-1 text-xs text-muted">
              {hasRunOptimization ? `${result.optimizedPaymentCount} payments` : "Not yet run"}
            </p>
          </div>
        </div>

        {hasRunOptimization && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex items-center gap-3 rounded-xl border border-success/30 bg-success/10 p-4"
          >
            <IconCheck className="shrink-0 text-success" />
            <p className="text-sm text-cream">
              {result.paymentsRemoved} payments removed &mdash; gross movement reduced by{" "}
              {formatCurrency(result.reductionAmount)} ({result.reductionPct.toFixed(1)}%).
            </p>
          </motion.div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <Button variant="secondary" size="sm" onClick={() => setSection("network")}>
            View network
          </Button>
          <Button variant="secondary" size="sm" onClick={() => setSection("obligations")}>
            Review obligations
          </Button>
          <Button variant="secondary" size="sm" onClick={() => setSection("reports")}>
            Export report
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="rounded-2xl border border-border-gold bg-bg-elevated/60 p-6">
          <p className="eyebrow">Data source</p>
          <p className="mt-2 text-sm text-cream">
            {result.eligibleInvoiceValue > 0
              ? `${formatCurrency(result.eligibleInvoiceValue)} in eligible invoice value across ${result.participatingCompanies.length} companies.`
              : "No eligible invoices in the current dataset."}
          </p>
          {validationErrors.length > 0 && (
            <div className="mt-4 flex items-start gap-2 rounded-lg border border-gold/30 bg-gold/5 p-3">
              <IconAlert className="mt-0.5 shrink-0 text-gold-light" width={14} height={14} />
              <p className="text-xs text-muted">
                {validationErrors.length} validation issue(s) in the uploaded file. See Obligations
                for details.
              </p>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-border-gold bg-bg-elevated/60 p-6">
          <p className="eyebrow">Excluded from optimization</p>
          <p className="mt-2 font-sans text-2xl font-bold tabular-nums text-cream">
            {result.excludedInvoices.length}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Disputed, pending, restricted, or otherwise ineligible obligations are never netted.
          </p>
        </div>
      </div>
    </div>
  );
}
