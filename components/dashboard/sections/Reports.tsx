"use client";

import { useDashboard } from "../DashboardProvider";
import { Button } from "@/components/ui/Button";
import { SettlementComparison } from "../SettlementComparison";
import { downloadTextFile, invoicesToCSV, paymentsToCSV } from "@/lib/csv";
import { exportSummaryPDF } from "@/lib/pdf";
import { IconDownload } from "../icons";

export function Reports() {
  const { invoices, result, hasRunOptimization, runOptimizationNow } = useDashboard();

  const allOptimized = result.groups.flatMap((g) => g.optimizedPayments);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border-gold bg-bg-elevated/60 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow">Export</p>
            <h2 className="mt-1 font-serif text-xl text-cream">Downloadable summary report</h2>
            <p className="mt-1 text-sm text-muted">
              Demonstration data. NicoMach does not move funds &mdash; use these files to review
              the recommendation with your team.
            </p>
          </div>
          {!hasRunOptimization && (
            <Button size="sm" onClick={runOptimizationNow}>
              Run optimization first
            </Button>
          )}
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => downloadTextFile("nicomach-invoices.csv", invoicesToCSV(invoices))}
          >
            <IconDownload width={14} height={14} /> Invoice data (CSV)
          </Button>
          <Button
            variant="secondary"
            size="sm"
            disabled={!hasRunOptimization}
            onClick={() =>
              downloadTextFile("nicomach-settlement-payments.csv", paymentsToCSV(allOptimized))
            }
          >
            <IconDownload width={14} height={14} /> Settlement payments (CSV)
          </Button>
          <Button
            size="sm"
            disabled={!hasRunOptimization}
            onClick={() => exportSummaryPDF(result)}
          >
            <IconDownload width={14} height={14} /> Summary report (PDF)
          </Button>
        </div>
      </div>

      {hasRunOptimization ? (
        <SettlementComparison />
      ) : (
        <div className="rounded-2xl border border-border-gold bg-bg-elevated/60 p-10 text-center text-sm text-muted">
          Run the optimization to generate a settlement comparison and enable PDF export.
        </div>
      )}
    </div>
  );
}
