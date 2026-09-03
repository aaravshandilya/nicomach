"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedNumber } from "@/components/ui/MetricCard";

export function MarketContext() {
  return (
    <section className="relative border-t border-border-gold bg-bg-primary py-24 sm:py-32">
      <div className="container-nico">
        <SectionHeading
          eyebrow="Market context"
          title="Working capital is one of the world's largest underused assets."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto mt-14 max-w-3xl rounded-3xl border border-border-gold bg-bg-elevated/70 p-10 text-center"
        >
          <p className="font-sans text-4xl font-bold tabular-nums tracking-tight text-gold-light sm:text-5xl">
            &euro;<AnimatedNumber value={1.84} decimals={2} />T
          </p>
          <p className="mt-3 text-sm text-muted">
            PwC estimates that &euro;1.84 trillion in excess working capital
            could potentially be released globally.
          </p>
          <div className="divider-gold my-6" />
          <p className="text-sm leading-relaxed text-muted">
            This estimate includes inventory, receivables, payables, and other
            working-capital inefficiencies. NicoMach addresses only the portion
            connected to eligible business obligations and settlement.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
