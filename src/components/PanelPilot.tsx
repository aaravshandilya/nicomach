import { useState } from "react";
import type { FormEvent } from "react";
import { Panel } from "./Panel";

const volumes = ["Under $100K", "$100K–$1M", "$1M–$10M", "$10M–$50M", "Over $50M"];
const challenges = [
  "Too many outgoing payments",
  "Slow collections / receivables",
  "Reconciliation overhead",
  "Working capital constraints",
  "Cross-entity settlement complexity",
  "Other",
];

export function PanelPilot() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    window.setTimeout(() => { setBusy(false); setSent(true); }, 700);
  };

  return (
    <Panel id="pilot" ground="sand" art="flat" tag="Pilot" note="Currently in discovery">
      <div className="grid12 items-center gap-y-14">
        <div className="col-span-12 lg:col-span-5">
          <h2 className="t-panel max-w-[12ch]">
            Run it against your own ledger.
          </h2>
          <p className="t-lead mt-9 max-w-[34ch]">
            We're speaking with CFOs, controllers and AP teams about where
            settlement friction actually costs money.
          </p>
        </div>

        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <div className="border border-[color:var(--rule)] p-7 md:p-10" style={{ background: "rgba(245,241,233,0.6)" }}>
            {sent ? (
              <div className="flex min-h-[360px] flex-col justify-center">
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
                <div className="col-span-12 pt-8">
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
    </Panel>
  );
}
