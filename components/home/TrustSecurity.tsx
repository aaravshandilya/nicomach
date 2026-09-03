"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const PRINCIPLES = [
  {
    title: "Read-only first",
    body: "NicoMach initially analyzes and recommends. It does not hold or transfer funds.",
  },
  {
    title: "Minimum necessary data",
    body: "Use only the invoice fields required to determine eligibility and calculate settlement.",
  },
  {
    title: "Customer-controlled approval",
    body: "No recommendation becomes a settlement without participant review and approval.",
  },
  {
    title: "Explainable and auditable",
    body: "Show how every result was calculated and which obligations contributed to it.",
  },
];

export function TrustSecurity() {
  return (
    <section id="security" className="relative border-t border-border-gold bg-bg-secondary py-24 sm:py-32">
      <div className="container-nico">
        <SectionHeading
          eyebrow="Trust & security"
          title="Designed to minimize the trust required."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-2xl border border-border-gold bg-bg-elevated/70 p-7"
            >
              <div className="mb-4 h-px w-10 bg-gold" />
              <h3 className="font-serif text-xl text-cream">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-border-gold bg-bg-primary/60 p-6 text-center">
          <p className="text-sm leading-relaxed text-muted">
            Production deployments will require independent security review,
            appropriate compliance controls, and trusted financial partners.
          </p>
        </div>
      </div>
    </section>
  );
}
