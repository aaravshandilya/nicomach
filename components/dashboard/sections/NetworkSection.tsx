"use client";

import { NetworkGraph } from "../network/NetworkGraph";

export function NetworkSection() {
  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-serif text-xl text-cream">Payment network</h2>
          <p className="mt-1 text-sm text-muted">
            Each node is a participating company. Switch views to compare the original obligation
            network against the optimized settlement plan.
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
      <NetworkGraph />
    </div>
  );
}
