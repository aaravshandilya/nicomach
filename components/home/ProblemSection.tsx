"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const CARDS = [
  {
    title: "Fragmented obligations",
    body: "Invoice data is separated across businesses, systems, and payment schedules.",
  },
  {
    title: "Unnecessary movement",
    body: "Companies may send multiple gross payments when a smaller net settlement could preserve the same final positions.",
  },
  {
    title: "Trapped liquidity",
    body: "Payment timing, prefunding, fees, and reconciliation can place unnecessary pressure on working capital.",
  },
];

export function ProblemSection() {
  return (
    <section className="relative border-t border-border-gold bg-bg-secondary py-24 sm:py-32">
      <div className="container-nico">
        <SectionHeading
          eyebrow="The problem"
          title="Businesses optimize everything except the obligations between them."
          description="Companies commonly process invoices one at a time. Across a larger network, some obligations may offset, but fragmented systems and independent payment processes make these opportunities difficult to identify."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group rounded-2xl border border-border-gold bg-bg-elevated/70 p-7 transition-colors hover:border-gold/50"
            >
              <span className="mb-5 flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 font-serif text-sm text-gold-light">
                {i + 1}
              </span>
              <h3 className="font-serif text-xl text-cream">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{card.body}</p>
            </motion.div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-muted">
          Not all working-capital inefficiency comes from invoice netting &mdash;
          this is one contributing factor among several.
        </p>
      </div>
    </section>
  );
}
