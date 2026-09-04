"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const FOUNDERS = [
  {
    name: "Aarav Shandilya",
    role: "Technical modeling & product",
    body: "Leads technical modeling, optimization, and product development. His background includes developing and benchmarking supply-chain optimization models using industrial data at Arizona State University.",
  },
  {
    name: "Hayden",
    role: "Finance & strategy",
    body: "Leads finance, business strategy, sales, and customer discovery.",
  },
];

export function About() {
  return (
    <section id="about" className="relative border-t border-border-gold bg-bg-primary py-24 sm:py-32">
      <div className="container-nico">
        <SectionHeading
          eyebrow="About"
          title="Built at the intersection of optimization and finance."
        />

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
          {FOUNDERS.map((f, i) => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="rounded-2xl border border-border-gold bg-bg-elevated/70 p-7 transition-colors duration-200 hover:border-gold/45 hover:bg-bg-elevated"
            >
              <h3 className="font-serif text-2xl text-cream">{f.name}</h3>
              <p className="mt-1 text-xs uppercase tracking-widest2 text-gold-light">{f.role}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
