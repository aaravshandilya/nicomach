"use client";

import LaurelWreath from "./LaurelWreath";
import { cn } from "@/lib/utils";

export interface WreathMarkProps {
  size?: number;
  className?: string;
  uid?: string;
  animate?: boolean;
  /** render on a filled dark disc, useful for favicon / app-icon contexts */
  onDark?: boolean;
}

/**
 * The standalone NicoMach emblem: golden laurel wreath encircling the
 * letter "N". Used as favicon, loading mark, mobile nav glyph, footer
 * emblem, and small dashboard brand mark. Never redrawn per context.
 */
export default function WreathMark({
  size = 44,
  className,
  uid = "mark",
  animate = false,
  onDark = false,
}: WreathMarkProps) {
  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center shrink-0",
        onDark && "rounded-full bg-bg-primary",
        className
      )}
      style={{ width: size, height: size }}
      role="img"
      aria-label="NicoMach"
    >
      <LaurelWreath size={size} uid={uid} animate={animate} count={8} />
      <span
        aria-hidden
        className="absolute inset-0 flex items-center justify-center font-serif text-cream"
        style={{ fontSize: size * 0.36, lineHeight: 1, paddingBottom: size * 0.02 }}
      >
        N
      </span>
    </span>
  );
}
