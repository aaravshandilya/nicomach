"use client";

import LaurelWreath from "./LaurelWreath";
import { cn } from "@/lib/utils";

export interface WordmarkProps {
  className?: string;
  /** font-size in px for the wordmark text; the wreath scales to match */
  size?: number;
  uid?: string;
  tone?: "cream" | "dark";
}

/**
 * The full NicoMach wordmark, exactly as licensed: "Nic" + a golden laurel
 * wreath standing in for the "o" + "Mach", set in the classical display
 * serif. Spelling, capitalization, and the wreath-as-o substitution are
 * fixed — only size and color tone vary by placement.
 */
export default function Wordmark({
  className,
  size = 28,
  uid = "wordmark",
  tone = "cream",
}: WordmarkProps) {
  const textColor = tone === "cream" ? "text-cream" : "text-bg-primary";
  const wreathSize = size * 0.8;

  return (
    <span
      className={cn("inline-flex items-center select-none", className)}
      style={{ fontSize: size, lineHeight: 1 }}
      aria-label="NicoMach"
      role="img"
    >
      <span className={cn("font-serif", textColor)} style={{ letterSpacing: "0.01em" }}>
        Nic
      </span>
      <LaurelWreath
        size={wreathSize}
        uid={uid}
        count={8}
        className="relative shrink-0"
        style={{ top: "0.13em" }}
      />
      <span
        className={cn("font-serif", textColor)}
        style={{ letterSpacing: "0.01em", marginLeft: "0.02em" }}
      >
        Mach
      </span>
    </span>
  );
}
