"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

function useCountUp(target: number, active: boolean, duration = 1.4) {
  const [value, setValue] = useState(0);
  const reduce = useReducedMotionSafe();

  useEffect(() => {
    if (!active) return;
    if (reduce) {
      setValue(target);
      return;
    }
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration, reduce]);

  return value;
}

export function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const animated = useCountUp(value, inView);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {animated.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

export function MetricCard({
  label,
  value,
  helper,
  className,
  accent = false,
  trend,
}: {
  label: string;
  value: React.ReactNode;
  helper?: string;
  className?: string;
  accent?: boolean;
  /** small up/down delta shown next to the value, Robinhood-ticker style */
  trend?: { direction: "up" | "down"; label: string };
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "rounded-2xl border border-border-gold bg-bg-elevated/80 p-5 backdrop-blur-sm transition-colors duration-200 hover:border-gold/45",
        accent && "shadow-gold-sm",
        className
      )}
    >
      <p className="text-xs font-medium uppercase tracking-widest2 text-muted">{label}</p>
      <div className="mt-3 flex items-baseline gap-2">
        <p
          className={cn(
            "font-sans text-[1.7rem] font-semibold tabular-nums tracking-tight md:text-[2rem]",
            accent ? "text-gold-light" : "text-cream"
          )}
        >
          {value}
        </p>
        {trend && (
          <span
            className={cn(
              "text-xs font-medium tabular-nums",
              trend.direction === "up" ? "text-success" : "text-red-300"
            )}
          >
            {trend.direction === "up" ? "↑" : "↓"} {trend.label}
          </span>
        )}
      </div>
      {helper && <p className="mt-2 text-xs text-muted">{helper}</p>}
    </motion.div>
  );
}
