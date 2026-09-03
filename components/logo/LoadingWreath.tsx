"use client";

import { motion } from "framer-motion";
import WreathMark from "./WreathMark";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

export interface LoadingWreathProps {
  size?: number;
  label?: string;
}

/**
 * Full-screen loading state: the wreath emblem draws on and settles with a
 * slow, deliberate pulse — never a spinner. Respects reduced-motion.
 */
export default function LoadingWreath({ size = 72, label = "Loading NicoMach" }: LoadingWreathProps) {
  const reduce = useReducedMotionSafe();

  return (
    <div
      role="status"
      aria-label={label}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-bg-primary"
    >
      <motion.div
        initial={{ opacity: 0, scale: reduce ? 1 : 0.85 }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          animate={
            reduce
              ? {}
              : {
                  filter: [
                    "drop-shadow(0 0 0px rgba(196,160,82,0))",
                    "drop-shadow(0 0 14px rgba(196,160,82,0.55))",
                    "drop-shadow(0 0 0px rgba(196,160,82,0))",
                  ],
                }
          }
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <WreathMark size={size} animate={!reduce} uid="loading" />
        </motion.div>
      </motion.div>
      <span className="eyebrow tracking-widest2">{label}</span>
    </div>
  );
}
