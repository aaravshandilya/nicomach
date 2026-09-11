import { useState } from "react";
import type { FormEvent } from "react";
import { Ground } from "./Ground";

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
  const [busy, setBusy] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    window.setTimeout(() => { setBusy(false); setSent(true); }, 700);
  };

  return (
    <section id="pilot" data-ground="sand" className="band band-y relative overflow-hidden">
      <Ground flat />

      <div className="shell relative grid12 gap-y-16">
        <div className="col-span-12 lg:col-span-5">
          <p className="t-tag" style={{ color: "var(--dim)" }}>Pilot · currently in discovery</p>
          <h2 className="t-head mt-8 max-w-[16ch]">
            Help us test what business payments could become.
          </h2>
          <p className="t-lead mt-8 max-w-[42ch]">
            We are speaking with CFOs, controllers, treasury leaders and
            accounts-payable professionals to understand where settlement friction
            creates the greatest cost.
          </p>

          <dl className="mt-14 max-w-[34ch]" style={{ margin: "3.5rem 0 0" }}>
            {[
              ["Request a pilot", "Run the analysis against your own obligation data."],
              ["Share your perspective", "Tell us where settlement friction actually costs you."],
            ].map(([t, d]) => (
              <div key={t} className="border-t border-[color:var(--rule)] py-6">
                <dt className="t-sub" style={{ fontSize: 17 }}>{t}</dt>
                <dd className="t-small mt-2" style={{ margin: "0.5rem 0 0", color: "var(--dim)" }}>{d}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <div className="border border-[color:var(--rule)] p-7 md:p-11" style={{ background: "rgba(245,241,233,0.58)" }}>
            {sent ? (
              <div className="flex min-h-[420px] flex-col justify-center">
                <p className="t-head">Thank you.</p>
                <p className="t-body mt-4 max-w-[34ch]" style={{ color: "var(--dim)" }}>
                  We'll follow up at the address you gave us. Nothing you entered was
                  transmitted — this demonstration form does not submit to a server.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="grid12 gap-y-1">
                <div className="fld col-span-12 sm:col-span-6">
                  <label htmlFor="p-name">Name</label>
                  <input id="p-name" name="name" required placeholder="Jordan Lee" autoComplete="name" />
                </div>
                <div className="fld col-span-12 sm:col-span-6">
                  <label htmlFor="p-email">Work email</label>
                  <input id="p-email" name="email" type="email" required placeholder="jordan@company.com" autoComplete="email" />
                </div>
                <div className="fld col-span-12 sm:col-span-6">
                  <label htmlFor="p-company">Company</label>
                  <input id="p-company" name="company" required placeholder="Company, Inc." autoComplete="organization" />
                </div>
                <div className="fld col-span-12 sm:col-span-6">
                  <label htmlFor="p-role">Role</label>
                  <input id="p-role" name="role" required placeholder="Controller" autoComplete="organization-title" />
                </div>
                <div className="fld col-span-12">
                  <label htmlFor="p-volume">Approximate monthly invoice volume</label>
                  <select id="p-volume" name="volume" required defaultValue="">
                    <option value="" disabled>Select a range</option>
                    {volumes.map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
                <div className="fld col-span-12">
                  <label htmlFor="p-challenge">Primary cash-flow challenge</label>
                  <select id="p-challenge" name="challenge" required defaultValue="">
                    <option value="" disabled>Select the closest fit</option>
                    {challenges.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="fld col-span-12">
                  <label htmlFor="p-message">Message</label>
                  <textarea id="p-message" name="message" rows={3} placeholder="What settlement friction are you seeing today?" />
                </div>
                <div className="col-span-12 pt-9">
                  <button type="submit" className="btn w-full" disabled={busy}>
                    {busy ? "Sending…" : "Submit"}
                  </button>
                  <p className="t-fine mt-5" style={{ color: "var(--dim)" }}>
                    Demonstration form. Nothing is transmitted or stored.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
