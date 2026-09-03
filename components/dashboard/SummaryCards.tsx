"use client";

import { MetricCard, AnimatedNumber } from "@/components/ui/MetricCard";
import { useDashboard } from "./DashboardProvider";
import { formatCurrency } from "@/lib/utils";

export function SummaryCards() {
  const { result, hasRunOptimization } = useDashboard();

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      <MetricCard
        label="Total invoice value"
        value={<AnimatedNumber value={result.totalInvoiceValue} prefix="$" />}
      />
      <MetricCard
        label="Obligations"
        value={<AnimatedNumber value={result.originalPaymentCount + result.excludedInvoices.length} />}
        helper={`${result.originalPaymentCount} eligible`}
      />
      <MetricCard
        label="Companies"
        value={<AnimatedNumber value={result.participatingCompanies.length} />}
      />
      <MetricCard
        label="Original settlement"
        value={<AnimatedNumber value={result.originalGrossVolume} prefix="$" />}
      />
      <MetricCard
        label="Optimized settlement"
        value={
          hasRunOptimization ? (
            <AnimatedNumber value={result.optimizedGrossVolume} prefix="$" />
          ) : (
            <span className="text-muted">—</span>
          )
        }
        accent={hasRunOptimization}
      />
      <MetricCard
        label="Potential reduction"
        value={
          hasRunOptimization ? (
            <AnimatedNumber value={result.reductionPct} suffix="%" />
          ) : (
            <span className="text-muted">—</span>
          )
        }
        accent={hasRunOptimization}
        trend={
          hasRunOptimization
            ? { direction: "down", label: formatCurrency(result.reductionAmount) }
            : undefined
        }
      />
    </div>
  );
}
