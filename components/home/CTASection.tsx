"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "./ContactForm";

export function CTASection() {
  return (
    <section id="pilot" className="relative overflow-hidden border-t border-border-gold bg-olive/20 py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #C4A052 0, #C4A052 1px, transparent 1px, transparent 26px)",
        }}
      />
      <div className="container-nico relative grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="eyebrow mb-5">Get involved</p>
          <h2 className="text-balance font-serif text-3xl leading-tight text-cream sm:text-4xl">
            Help us test what business payments could become.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
            We are speaking with CFOs, controllers, treasury leaders, and
            accounts-payable professionals to understand where settlement
            friction creates the greatest cost.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button href="#pilot-form" size="lg">
              Request a Pilot
            </Button>
            <Button href="#pilot-form" variant="secondary" size="lg">
              Share Your Perspective
            </Button>
          </div>
        </motion.div>

        <motion.div
          id="pilot-form"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="rounded-3xl border border-border-gold bg-bg-primary/70 p-8 backdrop-blur-sm sm:p-10"
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}
