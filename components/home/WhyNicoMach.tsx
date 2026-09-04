"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const CARDS = [
  {
    title: "Across independent businesses",
    body: "Extend the netting concept beyond entities owned by the same corporate group.",
  },
  {
    title: "Optimization before payment",
    body: "Determine what truly needs to move before routing or financing the remaining payments.",
  },
  {
    title: "A lower-risk starting point",
    body: "Quantify potential value through read-only analysis before introducing settlement infrastructure.",
  },
];

const COMPETITIVE = [
  {
    label: "Treasury platforms",
    body: "Often support netting within corporate groups.",
  },
  {
    label: "Payment platforms",
    body: "Help businesses process individual payments.",
  },
  {
    label: "Working-capital platforms",
    body: "Help finance or accelerate individual invoices.",
  },
];

export function WhyNicoMach() {
  return (
    <section className="relative border-t border-border-gold bg-bg-secondary py-24 sm:py-32">
      <div className="container-nico">
        <SectionHeading eyebrow="Why NicoMach" title="A different starting point." />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-2xl border border-border-gold bg-bg-elevated/70 p-7 transition-colors duration-200 hover:border-gold/45 hover:bg-bg-elevated"
            >
              <h3 className="font-serif text-xl text-gold-light">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{card.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="mx-auto mt-24 max-w-4xl">
          <p className="eyebrow mb-6 text-center">Where NicoMach fits</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {COMPETITIVE.map((row) => (
              <div
                key={row.label}
                className="rounded-xl border border-border-gold p-5 transition-colors duration-200 hover:border-gold/45 hover:bg-bg-elevated/40"
              >
                <p className="font-serif text-base text-cream">{row.label}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted">{row.body}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-muted">
            NicoMach&rsquo;s thesis is that eligible obligations should first be
            analyzed as a connected network &mdash; before they are individually
            routed, financed, or reconciled.
          </p>
        </div>
      </div>
    </section>
  );
}
