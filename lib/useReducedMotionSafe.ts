"use client";

import { useEffect, useState } from "react";

/**
 * A hydration-safe alternative to framer-motion's `useReducedMotion`.
 *
 * Framer Motion reads `window.matchMedia` at module-init time on the
 * client, so its hook can already report `true` on the very first client
 * render — before React has a chance to reconcile against the
 * server-rendered HTML (which always renders as if motion is allowed,
 * since `window` doesn't exist during SSR). Branching visible markup on
 * that value causes a hydration mismatch.
 *
 * This hook always returns `false` for the server render and the first
 * client render, then updates (safely, post-mount) once the real
 * preference is known. Use it anywhere `prefers-reduced-motion` decides
 * what gets rendered, not just how it animates.
 */
export function useReducedMotionSafe(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}
