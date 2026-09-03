"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { HeroNetwork } from "./HeroNetwork";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 sm:pt-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gold-radial opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gold-line"
      />

      <div className="container-nico relative grid grid-cols-1 items-center gap-16 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow mb-6">B2B cash flow optimization</p>
          <h1 className="text-balance font-serif text-4xl leading-[1.08] text-cream sm:text-5xl md:text-6xl lg:text-[3.75rem]">
            Move less money.
            <br />
            Unlock more liquidity.
          </h1>
          <p className="mt-5 font-serif text-xl italic text-gold-light/90 sm:text-2xl">
            See what never needed to move.
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            NicoMach analyzes verified obligations between businesses and
            recommends a simpler settlement plan with fewer payments and less
            gross cash movement.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href="/demo" size="lg">
              Explore the Demo
            </Button>
            <Button href="/#how-it-works" variant="secondary" size="lg">
              See How It Works
            </Button>
          </div>

          <div className="mt-8 flex items-start gap-3 border-t border-border-gold pt-6">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
            <p className="text-sm text-muted">
              Read-only analysis. No custody of funds. Every settlement requires
              approval.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <HeroNetwork />
        </motion.div>
      </div>
    </section>
  );
}
