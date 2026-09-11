import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

interface FigureProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  duration?: number;
}

/** `AnimatedNumber` — tabular count-up, static end state under reduced motion. */
export function Figure({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
  duration = 1500,
}: FigureProps) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const reduced = useReducedMotionSafe();
  const [shown, setShown] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    if (reduced) {
      setShown(value);
      return;
    }
    const t0 = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      setShown(value * (1 - Math.pow(1 - t, 4)));
      if (t < 1) requestAnimationFrame(step);
      else setShown(value);
    };
    requestAnimationFrame(step);
  }, [inView, reduced, value, duration]);

  return (
    <span ref={ref} className={`t-figure ${className}`}>
      {prefix}
      {shown.toFixed(decimals)}
      {suffix}
    </span>
  );
}
