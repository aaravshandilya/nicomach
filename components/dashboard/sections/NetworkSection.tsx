"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { NetworkGraph } from "../network/NetworkGraph";
import { useDashboard } from "../DashboardProvider";

const NetworkGraph3D = dynamic(
  () => import("../network/NetworkGraph3D").then((m) => m.NetworkGraph3D),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[620px] items-center justify-center rounded-2xl border border-border-gold bg-bg-secondary/40 text-sm text-muted">
        Loading 3D view&hellip;
      </div>
    ),
  }
);

export function NetworkSection() {
  const [mode, setMode] = useState<"3d" | "2d">("3d");
  const { networkView, setNetworkView } = useDashboard();

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-serif text-xl text-cream">Payment network</h2>
          <p className="mt-1 text-sm text-muted">
            Each node is a participating company. Switch views to compare the original obligation
            network against the optimized settlement plan
            {mode === "3d" ? " — drag to rotate the scene, scroll to zoom" : ""}.
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-success" /> Net receiver
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Net payer
          </span>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-full border border-border-gold p-1" role="group" aria-label="Graph dimension">
          {(["3d", "2d"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              aria-pressed={mode === m}
              className={`rounded-full px-3.5 py-1 text-xs font-medium uppercase tracking-wide transition-colors ${
                mode === m ? "bg-gold text-bg-primary" : "text-cream/70 hover:text-cream"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
        <div className="inline-flex rounded-full border border-border-gold p-1" role="group" aria-label="Network state">
          {(["original", "optimized"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setNetworkView(v)}
              aria-pressed={networkView === v}
              className={`rounded-full px-4 py-1.5 text-xs font-medium capitalize transition-colors ${
                networkView === v ? "bg-gold text-bg-primary" : "text-cream/70 hover:text-cream"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {mode === "3d" ? <NetworkGraph3D /> : <NetworkGraph />}
    </div>
  );
}
