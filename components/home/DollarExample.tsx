"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const PARTIES = [
  { id: "A", label: "Company A", x: 200, y: 40 },
  { id: "B", label: "Company B", x: 360, y: 300 },
  { id: "C", label: "Company C", x: 40, y: 300 },
];

const OBLIGATIONS = [
  { from: "A", to: "B", label: "$20" },
  { from: "B", to: "C", label: "$20" },
  { from: "C", to: "A", label: "$20" },
];

function findParty(id: string) {
  return PARTIES.find((p) => p.id === id)!;
}

export function DollarExample() {
  const [optimized, setOptimized] = useState(false);

  return (
    <section id="product" className="relative border-t border-border-gold bg-bg-primary py-24 sm:py-32">
      <div className="container-nico grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            eyebrow="A simple example"
            title="Three obligations. Sixty dollars moved. Zero-dollar net position."
            className="mx-0"
          />

          <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border-gold p-4">
              <dt className="text-xs uppercase tracking-widest2 text-muted">A owes B</dt>
              <dd className="mt-1 font-sans text-xl font-bold tabular-nums text-cream">$20</dd>
            </div>
            <div className="rounded-xl border border-border-gold p-4">
              <dt className="text-xs uppercase tracking-widest2 text-muted">B owes C</dt>
              <dd className="mt-1 font-sans text-xl font-bold tabular-nums text-cream">$20</dd>
            </div>
            <div className="rounded-xl border border-border-gold p-4">
              <dt className="text-xs uppercase tracking-widest2 text-muted">C owes A</dt>
              <dd className="mt-1 font-sans text-xl font-bold tabular-nums text-cream">$20</dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest2 text-muted">
                Original gross volume
              </p>
              <p className="mt-1 font-sans text-2xl font-bold tabular-nums text-cream">$60</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest2 text-muted">
                Final net position, every company
              </p>
              <p className="mt-1 font-sans text-2xl font-bold tabular-nums text-cream">$0</p>
            </div>
          </div>

          <Button
            className="mt-8"
            size="lg"
            onClick={() => setOptimized((o) => !o)}
            aria-pressed={optimized}
          >
            {optimized ? "Reset Example" : "Optimize Settlement"}
          </Button>

          <AnimatePresence>
            {optimized && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-6 overflow-hidden rounded-xl border border-success/30 bg-success/10 p-5"
              >
                <p className="font-serif text-lg text-cream">No payment required.</p>
                <p className="mt-1 text-sm text-success">
                  Gross cash movement reduced by $60.
                </p>
                <p className="mt-3 text-xs leading-relaxed text-muted">
                  All obligations must be verified, eligible, and legally permitted
                  to be netted.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted">
            The mathematics is simple with three companies. Real business
            networks contain thousands of invoices with different dates,
            currencies, approvals, and restrictions. NicoMach is designed to
            evaluate those constraints together.
          </p>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[420px]">
          <svg viewBox="0 0 400 340" className="h-full w-full" role="img" aria-label="Diagram of three companies each owing the next twenty dollars">
            {OBLIGATIONS.map((ob) => {
              const from = findParty(ob.from);
              const to = findParty(ob.to);
              const mx = (from.x + to.x) / 2;
              const my = (from.y + to.y) / 2;
              return (
                <g key={`${ob.from}-${ob.to}`}>
                  <motion.line
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke="#C4A052"
                    strokeWidth={2}
                    markerEnd="url(#arrow)"
                    initial={false}
                    animate={{ opacity: optimized ? 0 : 1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <motion.g
                    initial={false}
                    animate={{ opacity: optimized ? 0 : 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <rect x={mx - 18} y={my - 12} width={36} height={20} rx={10} fill="#0C110D" stroke="#C4A052" strokeOpacity={0.4} />
                    <text x={mx} y={my + 3} textAnchor="middle" fontSize="11" fill="#F4EBD8">
                      {ob.label}
                    </text>
                  </motion.g>
                </g>
              );
            })}

            <defs>
              <marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="#C4A052" />
              </marker>
            </defs>

            {PARTIES.map((p) => (
              <g key={p.id} transform={`translate(${p.x} ${p.y})`}>
                <circle r={28} fill="#121912" stroke="#C4A052" strokeWidth={1.4} />
                <text textAnchor="middle" y={5} fontSize="16" fill="#DEC177" fontFamily="var(--font-display)">
                  {p.id}
                </text>
                <text textAnchor="middle" y={44} fontSize="10" fill="#A8A696">
                  {p.label}
                </text>
              </g>
            ))}

            <AnimatePresence>
              {optimized && (
                <motion.text
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  x={200}
                  y={175}
                  textAnchor="middle"
                  fontSize="13"
                  fill="#798C68"
                  fontFamily="var(--font-body)"
                >
                  Net position: $0 for all parties
                </motion.text>
              )}
            </AnimatePresence>
          </svg>
        </div>
      </div>
    </section>
  );
}
