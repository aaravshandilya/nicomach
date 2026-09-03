"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GreekKeyRing } from "@/components/ui/GreekKeyPattern";
import { AnimatedNumber } from "@/components/ui/MetricCard";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

type Node = { id: string; label: string; x: number; y: number };
type Edge = { id: string; from: string; to: string };

const NODES: Node[] = [
  { id: "A", label: "Atlas Freight Co.", x: 300, y: 60 },
  { id: "B", label: "Meridian Supply", x: 500, y: 160 },
  { id: "C", label: "Solano Manufacturing", x: 520, y: 400 },
  { id: "D", label: "Kestrel Logistics", x: 300, y: 520 },
  { id: "E", label: "Harborview Textiles", x: 80, y: 400 },
  { id: "F", label: "Ridgeline Components", x: 100, y: 160 },
];

const ORIGINAL_EDGES: Edge[] = [
  { id: "e1", from: "A", to: "B" },
  { id: "e2", from: "B", to: "C" },
  { id: "e3", from: "C", to: "D" },
  { id: "e4", from: "D", to: "E" },
  { id: "e5", from: "E", to: "F" },
  { id: "e6", from: "F", to: "A" },
  { id: "e7", from: "A", to: "D" },
  { id: "e8", from: "B", to: "E" },
  { id: "e9", from: "C", to: "F" },
];

const CYCLE_IDS = ["e1", "e2", "e3", "e4", "e5", "e6"];

const OPTIMIZED_EDGES: Edge[] = [
  { id: "o1", from: "A", to: "C" },
  { id: "o2", from: "D", to: "F" },
];

const nodeById = (id: string) => NODES.find((n) => n.id === id)!;

function edgePath(edge: Edge) {
  const from = nodeById(edge.from);
  const to = nodeById(edge.to);
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  // slight outward bow so overlapping lines stay legible
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const nx = -dy * 0.08;
  const ny = dx * 0.08;
  return `M ${from.x} ${from.y} Q ${mx + nx} ${my + ny} ${to.x} ${to.y}`;
}

type Phase = "network" | "highlight" | "fade" | "optimized" | "reset";

const PHASE_DURATIONS: Record<Phase, number> = {
  network: 3600,
  highlight: 2600,
  fade: 1800,
  optimized: 5200,
  reset: 1600,
};

const ORIGINAL_TOTAL = 486000;
const OPTIMIZED_TOTAL = 94000;
const REDUCTION_PCT = Math.round(
  ((ORIGINAL_TOTAL - OPTIMIZED_TOTAL) / ORIGINAL_TOTAL) * 100
);

export function HeroNetwork() {
  const reduce = useReducedMotionSafe();
  const [phase, setPhase] = useState<Phase>("network");
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    if (reduce) return; // static, legible end-state for reduced motion
    const order: Phase[] = ["network", "highlight", "fade", "optimized", "reset"];
    let idx = 0;
    let timeout: ReturnType<typeof setTimeout>;
    const step = () => {
      const current = order[idx % order.length];
      setPhase(current);
      timeout = setTimeout(() => {
        idx += 1;
        step();
      }, PHASE_DURATIONS[current]);
    };
    step();
    return () => clearTimeout(timeout);
  }, [reduce]);

  const showOriginal = reduce ? false : phase === "network" || phase === "highlight" || phase === "fade";
  const showOptimized = reduce ? true : phase === "optimized" || phase === "reset";
  const isHighlight = phase === "highlight";
  const isFading = phase === "fade";

  const metricLabel = showOptimized ? "Optimized cash movement" : "Original cash movement";
  const metricValue = showOptimized ? OPTIMIZED_TOTAL : ORIGINAL_TOTAL;

  // Deterministic per-edge timing (not Math.random()) so server and client
  // render identical values — random values here would cause a hydration
  // mismatch on the animateMotion `dur`/`begin` attributes.
  const particles = useMemo(
    () =>
      ORIGINAL_EDGES.map((e, i) => {
        const seed = Math.sin(i * 12.9898) * 43758.5453;
        const frac = Math.round((seed - Math.floor(seed)) * 1000) / 1000;
        return {
          ...e,
          dur: Math.round((3.2 + frac * 1.6) * 1000) / 1000,
          delay: Math.round(((frac * 7) % 1) * 2 * 1000) / 1000,
        };
      }),
    []
  );

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      <div className="absolute inset-0 flex items-center justify-center">
        <GreekKeyRing size={560} opacity={0.055} className="animate-spin-slow" />
      </div>

      <svg viewBox="0 0 600 600" className="relative h-full w-full" role="img" aria-label="Animated illustration of NicoMach optimizing a payment network">
        <defs>
          <linearGradient id="edge-gold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C4A052" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#DEC177" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#C4A052" stopOpacity="0.15" />
          </linearGradient>
          <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#DEC177" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#DEC177" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Original / fragmented edges */}
        <g>
          {ORIGINAL_EDGES.map((edge) => {
            const inCycle = CYCLE_IDS.includes(edge.id);
            const dim = isFading || (isHighlight && !inCycle);
            return (
              <motion.path
                key={edge.id}
                id={`path-${edge.id}`}
                d={edgePath(edge)}
                fill="none"
                stroke={inCycle && isHighlight ? "#DEC177" : "url(#edge-gold)"}
                strokeWidth={inCycle && isHighlight ? 2.2 : 1}
                initial={false}
                animate={{
                  opacity: !showOriginal ? 0 : dim ? 0.12 : 1,
                }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
              />
            );
          })}
        </g>

        {/* Optimized / settlement edges */}
        <g>
          {OPTIMIZED_EDGES.map((edge) => (
            <motion.path
              key={edge.id}
              id={`path-${edge.id}`}
              d={edgePath(edge)}
              fill="none"
              stroke="#DEC177"
              strokeWidth={2.4}
              strokeDasharray="4 6"
              initial={false}
              animate={{ opacity: showOptimized ? 1 : 0 }}
              transition={{ duration: 1, ease: "easeInOut", delay: showOptimized ? 0.4 : 0 }}
            />
          ))}
        </g>

        {/* Payment particles along original edges */}
        {!reduce && (
          <g style={{ opacity: showOriginal && !isFading ? 1 : 0, transition: "opacity 0.6s ease" }}>
            {particles.map((p) => (
              <circle key={p.id} r={2.6} fill="#F4EBD8">
                <animateMotion
                  dur={`${p.dur}s`}
                  begin={`${p.delay}s`}
                  repeatCount="indefinite"
                  path={edgePath(p)}
                />
              </circle>
            ))}
          </g>
        )}

        {/* Nodes */}
        {NODES.map((node) => (
          <g
            key={node.id}
            transform={`translate(${node.x} ${node.y})`}
            onMouseEnter={() => setHovered(node.id)}
            onMouseLeave={() => setHovered((h) => (h === node.id ? null : h))}
            style={{ cursor: "pointer" }}
          >
            <circle r={26} fill="url(#node-glow)" />
            <circle
              r={9}
              fill="#0C110D"
              stroke="#C4A052"
              strokeWidth={1.4}
              className={reduce ? undefined : "animate-pulse-gold"}
            />
            <circle r={3} fill="#DEC177" />
            <AnimatePresence>
              {hovered === node.id && (
                <motion.g
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <rect
                    x={-70}
                    y={-46}
                    width={140}
                    height={26}
                    rx={13}
                    fill="#0C110D"
                    stroke="#C4A052"
                    strokeOpacity={0.5}
                  />
                  <text
                    x={0}
                    y={-28}
                    textAnchor="middle"
                    fontSize="11"
                    fill="#F4EBD8"
                    fontFamily="var(--font-body)"
                  >
                    {node.label}
                  </text>
                </motion.g>
              )}
            </AnimatePresence>
          </g>
        ))}
      </svg>

      {/* Metric readout */}
      <div className="absolute -bottom-2 left-1/2 w-[92%] -translate-x-1/2 rounded-2xl border border-border-gold bg-bg-primary/80 px-5 py-4 text-center backdrop-blur-md sm:w-[80%]">
        <AnimatePresence mode="wait">
          <motion.p
            key={metricLabel}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4 }}
            className="text-[0.68rem] uppercase tracking-widest2 text-muted"
          >
            {metricLabel}
          </motion.p>
        </AnimatePresence>
        <p className="mt-1 font-sans text-2xl font-bold tabular-nums tracking-tight text-gold-light sm:text-3xl">
          <AnimatedNumber value={metricValue} prefix="$" />
        </p>
        {showOptimized && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-1 text-xs text-success"
          >
            Reduced by {REDUCTION_PCT}% &middot; illustrative example
          </motion.p>
        )}
      </div>
    </div>
  );
}
