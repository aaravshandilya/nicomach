import { useState } from "react";
import type { FormEvent } from "react";
import { SectionHead } from "@/components/ui/SectionHead";
import { CrackFrame } from "@/components/marks/CrackFrame";

const volumes = ["Under $100K", "$100K–$1M", "$1M–$10M", "$10M–$50M", "Over $50M"];
const challenges = [
  "Too many outgoing payments",
  "Slow collections / receivables",
  "Reconciliation overhead",
  "Working capital constraints",
  "Cross-entity settlement complexity",
  "Other",
];

export function Pilot() {
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="pilot" data-ground="ink" className="band relative overflow-hidden">
      <SectionHead n="10" label="Pilot" note="Currently in discovery" />
      <CrackHatch />

      <div className="frame relative cols gap-y-14 pb-24 pt-14 md:pt-20">
        <div className="col-span-12 lg:col-span-5">
          <h2 className="t-statement max-w-lg">
            Help us test what business payments could{" "}
            <em className="t-italic" style={{ color: "var(--accent)" }}>become.</em>
          </h2>
          <p className="t-body-lg mt-8 max-w-md" style={{ color: "var(--dim)" }}>
            We are speaking with CFOs, controllers, treasury leaders, and accounts-payable
            professionals to understand where settlement friction creates the greatest
            cost.
          </p>
          <dl className="mt-12 max-w-sm">
            {[
              ["Request a pilot", "Run the analysis against your own obligation data."],
              ["Share your perspective", "Tell us where settlement friction actually costs you."],
            ].map(([t, d]) => (
              <div key={t} className="border-t border-[color:var(--rule)] py-5">
                <dt className="t-label">{t}</dt>
                <dd className="t-micro mt-2" style={{ color: "var(--dim)" }}>
                  {d}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <CrackFrame>
            <div className="p-7 md:p-10">
              {sent ? (
                <div className="flex min-h-[380px] flex-col justify-center">
                  <p className="t-statement-sm">Thank you.</p>
                  <p className="t-body mt-3 max-w-xs" style={{ color: "var(--dim)" }}>
                    We'll follow up at the address you gave us.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} className="cols gap-y-6">
                  <Field className="col-span-12 sm:col-span-6" id="p-name" label="Name">
                    <input id="p-name" name="name" required className="field-line" placeholder="Jordan Lee" />
                  </Field>
                  <Field className="col-span-12 sm:col-span-6" id="p-email" label="Work email">
                    <input id="p-email" name="email" type="email" required className="field-line" placeholder="jordan@company.com" />
                  </Field>
                  <Field className="col-span-12 sm:col-span-6" id="p-company" label="Company">
                    <input id="p-company" name="company" required className="field-line" placeholder="Company, Inc." />
                  </Field>
                  <Field className="col-span-12 sm:col-span-6" id="p-role" label="Role">
                    <input id="p-role" name="role" required className="field-line" placeholder="Controller" />
                  </Field>
                  <Field className="col-span-12" id="p-volume" label="Approximate monthly invoice volume">
                    <select id="p-volume" name="volume" required defaultValue="" className="field-line">
                      <option value="" disabled>
                        Select a range
                      </option>
                      {volumes.map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field className="col-span-12" id="p-challenge" label="Primary cash-flow challenge">
                    <select id="p-challenge" name="challenge" required defaultValue="" className="field-line">
                      <option value="" disabled>
                        Select the closest fit
                      </option>
                      {challenges.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field className="col-span-12" id="p-message" label="Message">
                    <textarea
                      id="p-message"
                      name="message"
                      rows={3}
                      className="field-line resize-none"
                      placeholder="What settlement friction are you seeing today?"
                    />
                  </Field>
                  <div className="col-span-12 pt-2">
                    <button type="submit" className="link-rule w-full justify-between">
                      Submit
                      <svg className="arrow" width="16" height="8" viewBox="0 0 16 8" fill="none" aria-hidden="true">
                        <path d="M0 4h14M10.5 0.5L14.5 4l-4 3.5" stroke="currentColor" strokeWidth="1" />
                      </svg>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </CrackFrame>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  children,
  className = "",
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="t-label mb-1 block" style={{ color: "var(--dim)" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

/** The CTA wash: crack linework at the same weight the diagonal hatch had (§4.12). */
function CrackHatch() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.09]" aria-hidden="true">
      <defs>
        <pattern id="pilot-cracks" width="118" height="118" patternUnits="userSpaceOnUse" patternTransform="rotate(18)">
          <path d="M -10 26 L 16 12 L 8 -4 L 34 -18" fill="none" stroke="#DEC177" strokeWidth="1" />
          <path d="M 44 108 L 70 92 L 60 74 L 88 58" fill="none" stroke="#DEC177" strokeWidth="1" />
          <path d="M 92 34 L 110 22 L 104 6" fill="none" stroke="#C4A052" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pilot-cracks)" />
    </svg>
  );
}
