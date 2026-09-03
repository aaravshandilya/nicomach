"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const STEPS = [
  {
    n: "01",
    title: "Connect",
    body: "Import approved invoice data through a CSV, ERP connection, or secure data environment.",
  },
  {
    n: "02",
    title: "Verify",
    body: "Exclude disputed, incomplete, duplicated, restricted, or unapproved obligations.",
  },
  {
    n: "03",
    title: "Optimize",
    body: "Model eligible obligations as a network and calculate a smaller settlement plan.",
  },
  {
    n: "04",
    title: "Approve",
    body: "Present an explainable recommendation for review before any payment occurs.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative border-t border-border-gold bg-bg-secondary py-24 sm:py-32">
      <div className="container-nico">
        <SectionHeading eyebrow="How it works" title="A deliberate, reviewable process." />

        <div className="relative mt-20 hidden lg:block">
          <div className="absolute left-0 right-0 top-8 h-px bg-gold-line" />
          <div className="grid grid-cols-4 gap-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative pt-0"
              >
                <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold bg-bg-primary font-serif text-lg text-gold-light">
                  {step.n}
                </div>
                <h3 className="mt-6 text-center font-serif text-xl text-cream">{step.title}</h3>
                <p className="mt-3 text-center text-sm leading-relaxed text-muted">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative mt-14 space-y-8 lg:hidden">
          <div className="absolute left-8 top-2 bottom-2 w-px bg-gold-line" />
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex gap-5 pl-0"
            >
              <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-gold bg-bg-primary font-serif text-lg text-gold-light">
                {step.n}
              </div>
              <div className="pt-3">
                <h3 className="font-serif text-lg text-cream">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
