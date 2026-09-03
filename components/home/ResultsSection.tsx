"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedNumber } from "@/components/ui/MetricCard";

const BEFORE = [
  "Many payment lines",
  "Higher gross cash movement",
  "More reconciliation events",
  "Fragmented visibility",
];

const AFTER = [
  "Fewer settlement lines",
  "Lower gross cash movement",
  "Clear participant-level positions",
  "Fully reviewable recommendation",
];

export function ResultsSection() {
  return (
    <section className="relative border-t border-border-gold bg-bg-primary py-24 sm:py-32">
      <div className="container-nico">
        <SectionHeading
          eyebrow="Illustrative comparison"
          title="Fewer payments. The same obligations, honored."
          description="Figures below are illustrative unless drawn from your own data."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border-gold bg-bg-elevated/60 p-8">
            <p className="eyebrow">Before NicoMach</p>
            <p className="mt-4 font-sans text-4xl font-bold tabular-nums tracking-tight text-cream">
              <AnimatedNumber value={14} />
              <span className="text-lg font-medium text-muted"> payments</span>
            </p>
            <ul className="mt-6 space-y-3">
              {BEFORE.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-muted">
                  <span className="h-1 w-1 shrink-0 rounded-full bg-muted" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-gold/40 bg-bg-elevated p-8 shadow-gold-sm">
            <p className="eyebrow">After NicoMach</p>
            <p className="mt-4 font-sans text-4xl font-bold tabular-nums tracking-tight text-gold-light">
              <AnimatedNumber value={4} />
              <span className="text-lg font-medium text-muted"> payments</span>
            </p>
            <ul className="mt-6 space-y-3">
              {AFTER.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-cream/90">
                  <span className="h-1 w-1 shrink-0 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 rounded-2xl border border-border-gold bg-bg-secondary/60 p-8 sm:grid-cols-3">
          <div className="text-center">
            <p className="text-xs uppercase tracking-widest2 text-muted">Payments removed</p>
            <p className="mt-2 font-sans text-3xl font-bold tabular-nums tracking-tight text-cream">
              <AnimatedNumber value={10} />
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs uppercase tracking-widest2 text-muted">Gross movement reduced</p>
            <p className="mt-2 font-sans text-3xl font-bold tabular-nums tracking-tight text-gold-light">
              <AnimatedNumber value={81} suffix="%" />
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs uppercase tracking-widest2 text-muted">Reconciliation events</p>
            <p className="mt-2 font-sans text-3xl font-bold tabular-nums tracking-tight text-cream">
              -<AnimatedNumber value={71} suffix="%" />
            </p>
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-muted">
          Illustrative example based on synthetic data, not a guaranteed outcome.
        </p>
      </div>
    </section>
  );
}
