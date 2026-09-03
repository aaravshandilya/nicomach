"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import LoadingWreath from "@/components/logo/LoadingWreath";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

/**
 * Wraps the whole app so the wreath loading animation can play briefly on
 * first paint. Kept intentionally short and skipped entirely for users who
 * prefer reduced motion.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotionSafe();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (reduce) {
      setLoading(false);
      return;
    }
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-bg-primary transition-transform focus:translate-y-0"
      >
        Skip to main content
      </a>
      <AnimatePresence>
        {loading && (
          <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <LoadingWreath />
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </MotionConfig>
  );
}
