"use client";

import { useId, useMemo } from "react";
import { generateWreath } from "@/lib/laurel";

export interface LaurelWreathProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  /** unique id suffix so multiple wreaths on one page don't share gradient ids */
  uid?: string;
  /** stagger a gentle draw-on animation, respects prefers-reduced-motion via CSS */
  animate?: boolean;
  count?: number;
  strokeOnly?: boolean;
}

/**
 * The NicoMach laurel wreath: a closed ring of tapered, marquise-shaped
 * leaves in brushed antique gold. Used standalone (with the N mark) and
 * inline (replacing the "o" in the wordmark). Never redrawn per-brand-use,
 * only re-sized — the geometry always comes from lib/laurel.ts.
 */
export default function LaurelWreath({
  size = 40,
  className,
  style,
  uid = "default",
  animate = false,
  count = 6,
  strokeOnly = false,
}: LaurelWreathProps) {
  const geom = useMemo(() => generateWreath({ count }), [count]);
  const reactId = useId().replace(/[:]/g, "");
  const gradId = `nicomach-gold-${uid}-${reactId}`;

  const allLeaves = [...geom.left, ...geom.right];

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      style={style}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DEC177" />
          <stop offset="55%" stopColor="#C4A052" />
          <stop offset="100%" stopColor="#9C7F41" />
        </linearGradient>
      </defs>
      <g
        fill={strokeOnly ? "none" : `url(#${gradId})`}
        stroke={strokeOnly ? `url(#${gradId})` : "rgba(5,7,5,0.35)"}
        strokeWidth={strokeOnly ? 1.4 : 0.6}
      >
        {allLeaves.map((leaf, i) => (
          <g
            key={i}
            dangerouslySetInnerHTML={{ __html: leaf.d }}
            style={
              animate
                ? {
                    transformOrigin: "50px 50px",
                    animation: `wreath-grow 0.9s cubic-bezier(0.16,1,0.3,1) both`,
                    animationDelay: `${leaf.order * 0.4 + (i >= geom.left.length ? 0 : 0)}s`,
                  }
                : undefined
            }
          />
        ))}
      </g>
      <style>{`
        @keyframes wreath-grow {
          0% { opacity: 0; transform: scale(0.4); }
          100% { opacity: 1; transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          g[style] { animation: none !important; opacity: 1 !important; }
        }
      `}</style>
    </svg>
  );
}
