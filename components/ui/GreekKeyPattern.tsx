"use client";

import { cn } from "@/lib/utils";

/**
 * A circular meander (Greek key) motif, rendered as fine technical geometry
 * at very low opacity. Meant to sit behind the hero network, not to read as
 * decoration.
 */
export function GreekKeyRing({
  size = 640,
  className,
  opacity = 0.06,
}: {
  size?: number;
  className?: string;
  opacity?: number;
}) {
  const id = "gk-ring";
  return (
    <svg
      viewBox="0 0 640 640"
      width={size}
      height={size}
      className={cn("pointer-events-none", className)}
      style={{ opacity }}
      aria-hidden
    >
      <defs>
        <pattern
          id={id}
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(0)"
        >
          <path
            d="M0 20 H10 V10 H20 V30 H30 V0"
            fill="none"
            stroke="#C4A052"
            strokeWidth="1.5"
          />
        </pattern>
        <mask id="ring-mask">
          <circle cx="320" cy="320" r="300" fill="none" stroke="white" strokeWidth="46" />
        </mask>
      </defs>
      <circle
        cx="320"
        cy="320"
        r="300"
        fill="none"
        stroke={`url(#${id})`}
        strokeWidth="46"
        mask="url(#ring-mask)"
      />
      {[220, 260, 340, 380].map((r) => (
        <circle
          key={r}
          cx="320"
          cy="320"
          r={r}
          fill="none"
          stroke="#C4A052"
          strokeWidth="0.5"
        />
      ))}
    </svg>
  );
}
