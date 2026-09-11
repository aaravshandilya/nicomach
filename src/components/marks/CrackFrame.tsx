import type { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

/**
 * The high-emphasis crack-glow border (brief §7) — a hairline fracture
 * pattern that brightens in view and on hover. Used three times sitewide and
 * never as a default: the hero metric readout, the About entries, and the
 * pilot form panel.
 */
export function CrackFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);

  const cracks = [
    "M 0 14 L 7 10 L 4 5 L 11 0",
    "M 100 86 L 93 90 L 96 95 L 89 100",
    "M 0 62 L 5 66 L 2 72 L 6 78",
    "M 100 30 L 95 34 L 98 41 L 94 47",
  ];

  return (
    <div ref={ref} className={`group relative ${className}`}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="cf-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DEC177" stopOpacity="0" />
            <stop offset="50%" stopColor="#FFF3D2" stopOpacity="1" />
            <stop offset="100%" stopColor="#C4A052" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect
          x="0.5"
          y="0.5"
          width="99"
          height="99"
          fill="none"
          stroke="var(--rule)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          className="transition-opacity duration-500 group-hover:opacity-100"
          style={{ opacity: inView ? 0.9 : 0.55 }}
        />
        {cracks.map((d, i) => (
          <g key={i}>
            <path d={d} fill="none" stroke="var(--rule)" strokeWidth="1" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            <path
              d={d}
              pathLength={1}
              fill="none"
              stroke="url(#cf-grad)"
              strokeWidth="1.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              strokeDasharray="1"
              strokeDashoffset={inView ? 0 : 1}
              style={{ transition: `stroke-dashoffset 700ms cubic-bezier(0,0,0.2,1) ${i * 110}ms` }}
            />
          </g>
        ))}
      </svg>
      <div className="relative h-full">{children}</div>
    </div>
  );
}
