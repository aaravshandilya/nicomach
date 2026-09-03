"use client";

import { useDashboard } from "../DashboardProvider";
import { Button } from "@/components/ui/Button";

export function Settings() {
  const { dataSource, loadSampleData } = useDashboard();

  return (
    <div className="max-w-2xl space-y-6">
      <div className="rounded-2xl border border-border-gold bg-bg-elevated/60 p-6">
        <p className="eyebrow">Dataset</p>
        <p className="mt-2 text-sm text-cream">
          Currently using {dataSource === "sample" ? "the built-in sample dataset" : "an uploaded CSV"}.
        </p>
        <Button variant="secondary" size="sm" className="mt-4" onClick={loadSampleData}>
          Reset to sample data
        </Button>
      </div>

      <div className="rounded-2xl border border-border-gold bg-bg-elevated/60 p-6">
        <p className="eyebrow">About this demo</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          This dashboard runs entirely in your browser on synthetic or uploaded data. Nothing is
          sent to a payment network, bank, or third party. NicoMach does not currently hold,
          transfer, lend, or invest funds.
        </p>
      </div>

      <div className="rounded-2xl border border-border-gold bg-bg-elevated/60 p-6">
        <p className="eyebrow">Accessibility</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          This demo respects your device&rsquo;s reduced-motion preference and is fully
          keyboard-navigable. If something is difficult to use, please tell us &mdash; we are
          still early.
        </p>
      </div>
    </div>
  );
}
