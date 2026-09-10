import { useState } from "react";
import { SectionHead } from "@/components/ui/SectionHead";
import { GreekKeyRing } from "@/components/marks/GreekKeyRing";

const faqs = [
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

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="questions" data-ground="panel" className="band relative overflow-hidden">
      <SectionHead n="09" label="FAQ" note="Answered directly" />

      <GreekKeyRing
        size={620}
        className="pointer-events-none absolute -left-48 top-1/3 text-gold opacity-[0.07]"
      />

      <div className="frame relative cols gap-y-10 pb-20 pt-14 md:pb-28 md:pt-20">
        <h2 className="t-statement col-span-12 lg:col-span-4">
          Questions worth asking{" "}
          <em className="t-italic" style={{ color: "var(--accent)" }}>directly.</em>
        </h2>

        <dl className="col-span-12 lg:col-span-7 lg:col-start-6">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border-t border-[color:var(--rule)]">
                <dt>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start justify-between gap-8 py-6 text-left"
                  >
                    <span className="t-statement-sm">{f.q}</span>
                    <span
                      className="mt-2 shrink-0"
                      style={{
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                        transition: "transform 380ms cubic-bezier(0.2,0.8,0.2,1)",
                      }}
                      aria-hidden="true"
                    >
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <path d="M6.5 0v13M0 6.5h13" stroke="var(--accent)" strokeWidth="1" />
                      </svg>
                    </span>
                  </button>
                </dt>
                <dd
                  className="grid overflow-hidden"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition: "grid-template-rows 420ms cubic-bezier(0.4,0,0.2,1)",
                  }}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className="t-body max-w-xl pb-7 pr-10" style={{ color: "var(--dim)" }}>
                      {f.a}
                    </p>
                  </div>
                </dd>
              </div>
            );
          })}
          <div className="border-t border-[color:var(--rule)]" />
        </dl>
      </div>
    </section>
  );
}
