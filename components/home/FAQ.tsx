"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const QUESTIONS = [
  {
    q: "Does NicoMach ever hold or move money?",
    a: "No. NicoMach is a read-only analysis platform. It calculates a recommended settlement plan from verified obligations, but every payment is still executed through each participant's own banking relationships after explicit approval.",
  },
  {
    q: "How is this different from netting inside one company's treasury?",
    a: "Corporate treasury netting works within a single ownership structure. NicoMach applies the same optimization logic across independent businesses — companies with no shared ownership — using obligations that both sides have separately verified.",
  },
  {
    q: "What data do you need from us?",
    a: "Only the invoice-level fields required to determine eligibility and calculate a settlement: payer, recipient, amount, currency, due date, and verification/eligibility status. No banking credentials or account access are required for the analysis.",
  },
  {
    q: "What happens to disputed or unverified invoices?",
    a: "They are automatically excluded from optimization. Only obligations both parties have marked verified and undisputed are eligible to be netted — disputed, pending, restricted, or unapproved items are never included in a recommendation.",
  },
  {
    q: "Who has to approve a settlement plan before anything happens?",
    a: "Every participant reviews the recommended plan — including which obligations contributed to each proposed payment — before anything is approved. No settlement is executed without that review.",
  },
  {
    q: "Is this live in production today?",
    a: "NicoMach is an early-stage platform. The public demo runs on sample data so you can see how the analysis, netting, and approval flow would work; it does not currently provide banking, lending, investment, custody, or money-transmission services.",
  },
];

function FAQItem({
  q,
  a,
  open,
  onToggle,
  index,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
  index: number;
}) {
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div className="border-b border-border-gold last:border-b-0">
      <h3>
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-center justify-between gap-6 py-6 text-left"
        >
          <span className="font-serif text-lg text-cream sm:text-xl">{q}</span>
          <span
            aria-hidden
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border-gold text-gold-light transition-transform duration-300 ${
              open ? "rotate-45 border-gold" : ""
            }`}
          >
            +
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-6 text-sm leading-relaxed text-muted">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative border-t border-border-gold bg-bg-primary py-24 sm:py-32">
      <div className="container-nico">
        <SectionHeading eyebrow="Questions" title="What people usually ask first." />

        <div className="mx-auto mt-14 max-w-3xl">
          {QUESTIONS.map((item, i) => (
            <FAQItem
              key={item.q}
              q={item.q}
              a={item.a}
              index={i}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
