"use client";

import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

const VOLUME_OPTIONS = [
  "Under $100K",
  "$100K - $1M",
  "$1M - $10M",
  "$10M - $50M",
  "Over $50M",
];

const CHALLENGE_OPTIONS = [
  "Too many outgoing payments",
  "Slow collections / receivables",
  "Reconciliation overhead",
  "Working capital constraints",
  "Cross-entity settlement complexity",
  "Other",
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-success/40 bg-success/10 p-8 text-center"
      >
        <p className="font-serif text-xl text-cream">Thank you.</p>
        <p className="mt-2 text-sm text-muted">
          We&rsquo;ve received your message and will follow up shortly.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <Field label="Name" name="name" required />
      <Field label="Work email" name="email" type="email" required />
      <Field label="Company" name="company" required />
      <Field label="Role" name="role" />

      <SelectField
        label="Approximate monthly invoice volume"
        name="volume"
        options={VOLUME_OPTIONS}
      />
      <SelectField
        label="Primary cash flow challenge"
        name="challenge"
        options={CHALLENGE_OPTIONS}
      />

      <div className="sm:col-span-2">
        <label className="mb-2 block text-xs uppercase tracking-widest2 text-muted" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full rounded-xl border border-border-gold bg-bg-elevated px-4 py-3 text-sm text-cream outline-none transition-colors placeholder:text-muted/60 focus:border-gold"
          placeholder="Tell us about your settlement process today."
        />
      </div>

      <div className="sm:col-span-2">
        <Button type="submit" size="lg" disabled={status === "submitting"} className="w-full sm:w-auto">
          {status === "submitting" ? "Sending…" : "Send Message"}
        </Button>
        <AnimatePresence>
          {status === "error" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-3 text-sm text-red-300"
            >
              Something went wrong. Please try again or email us directly.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-widest2 text-muted" htmlFor={name}>
        {label}
        {required && <span className="text-gold"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-border-gold bg-bg-elevated px-4 py-3 text-sm text-cream outline-none transition-colors placeholder:text-muted/60 focus:border-gold"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-widest2 text-muted" htmlFor={name}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue=""
        className="w-full rounded-xl border border-border-gold bg-bg-elevated px-4 py-3 text-sm text-cream outline-none transition-colors focus:border-gold"
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
