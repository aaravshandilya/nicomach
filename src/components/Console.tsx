import { useEffect, useState } from "react";

export interface Obligation {
  id: string; payer: string; payee: string; amount: number; due: string;
  status: "verified" | "disputed" | "pending";
}

const LEDGER: Obligation[] = [
  { id: "INV-4471", payer: "Cascade Orchards",    payee: "Northline Freight",   amount: 18420, due: "12 Oct", status: "verified" },
  { id: "INV-4488", payer: "Northline Freight",   payee: "Ridgeline Packaging", amount: 18420, due: "12 Oct", status: "verified" },
  { id: "INV-4502", payer: "Ridgeline Packaging", payee: "Harbor Provisions",   amount: 18420, due: "15 Oct", status: "verified" },
  { id: "INV-4510", payer: "Harbor Provisions",   payee: "Sunset Markets",      amount: 18420, due: "15 Oct", status: "verified" },
  { id: "INV-4517", payer: "Sunset Markets",      payee: "Cascade Orchards",    amount:  2000, due: "18 Oct", status: "verified" },
  { id: "INV-4521", payer: "Copperfield Labs",    payee: "Cascade Orchards",    amount: 10000, due: "18 Oct", status: "verified" },
  { id: "INV-4526", payer: "Ridgeline Packaging", payee: "Cascade Orchards",    amount:  6420, due: "20 Oct", status: "verified" },
  { id: "INV-4523", payer: "Copperfield Labs",    payee: "Sunset Markets",      amount:  6150, due: "18 Oct", status: "disputed" },
  { id: "INV-4529", payer: "Cascade Orchards",    payee: "Copperfield Labs",    amount:  4780, due: "20 Oct", status: "pending" },
];

/**
 * The plan those seven eligible rows actually net down to. Cascade, Northline
 * and Harbor all close at zero; Sunset ends +16,420, Copperfield −10,000 and
 * Ridgeline −6,420. Two transfers discharge all seven obligations.
 */
const INSTRUCTIONS = [
  { id: "STL-001", from: "Copperfield Labs",    to: "Sunset Markets", amount: 10000, closes: 4 },
  { id: "STL-002", from: "Ridgeline Packaging", to: "Sunset Markets", amount:  6420, closes: 3 },
];

const AUDIT = [
  { t: "09:41:02", actor: "cascade.ap@",      action: "Verification confirmed · INV-4471" },
  { t: "09:41:44", actor: "harbor.treasury@", action: "Verification confirmed · INV-4510" },
  { t: "09:42:10", actor: "system",           action: "INV-4523 excluded — disputed by counterparty" },
  { t: "09:42:11", actor: "system",           action: "Optimisation run · 7 eligible obligations in scope" },
];

const usd = (n: number) => "$" + n.toLocaleString("en-US");

function Status({ kind }: { kind: Obligation["status"] }) {
  const label = kind === "verified" ? "Verified" : kind === "disputed" ? "Disputed" : "Pending";
  const dim = kind !== "verified";
  return (
    <span
      className="t-fine whitespace-nowrap"
      style={{ color: dim ? "var(--dim)" : "var(--fg)", fontWeight: dim ? 400 : 500 }}
    >
      {kind === "disputed" ? "— " : ""}{label}
    </span>
  );
}

/** The real loading state: the ledger is fetched before it can be read. */
function Skeleton() {
  return (
    <div className="px-5 py-6" aria-hidden="true">
      {[...Array(7)].map((_, i) => (
        <div key={i} className="mb-5 grid grid-cols-12 items-center gap-4">
          <span className="sk sk-pulse col-span-2" />
          <span className="sk sk-pulse col-span-4" style={{ width: `${62 + ((i * 13) % 30)}%` }} />
          <span className="sk sk-pulse col-span-3" style={{ width: `${54 + ((i * 17) % 34)}%` }} />
          <span className="sk sk-pulse col-span-2 justify-self-end" style={{ width: "72%" }} />
          <span className="sk sk-pulse col-span-1 justify-self-end" style={{ width: "84%" }} />
        </div>
      ))}
    </div>
  );
}

export function Console({ step, className = "", dense = false }: { step: number; className?: string; dense?: boolean }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setLoaded(true), 1100);
    return () => window.clearTimeout(t);
  }, []);

  const showExclusions = step >= 1;
  const showResult = step >= 2;
  const showPlan = step >= 3 && !dense;
  const showAudit = showExclusions && !dense;
  const cell = dense ? "" : "t-small";

  const eligible = LEDGER.filter((o) => o.status === "verified");
  const gross = eligible.reduce((s, o) => s + o.amount, 0);
  const toMove = INSTRUCTIONS.reduce((s, i) => s + i.amount, 0);
  const reduction = Math.round((1 - toMove / gross) * 100);

  return (
    <div className={`border border-[color:var(--rule)] ${className}`}>
      <div className={`flex flex-wrap items-baseline justify-between gap-3 border-b border-[color:var(--rule)] ${dense ? "px-4 py-3" : "px-5 py-4"}`}>
        <div className="flex items-baseline gap-4">
          <span className="t-sub" style={{ fontSize: 17 }}>Obligation ledger</span>
          <span className="t-fine" style={{ color: "var(--dim)" }}>
            October cycle · {LEDGER.length} records
          </span>
        </div>
        <span className="t-fine" style={{ color: "var(--dim)" }}>
          {loaded ? "Demonstration data" : "Loading ledger…"}
        </span>
      </div>

      {!loaded ? (
        <Skeleton />
      ) : (
        <div className="overflow-x-auto">
          <table className={`tbl tbl--inset ${dense ? "tbl--dense" : ""} min-w-[520px]`}>
            <thead>
              <tr>
                {["Invoice", "Payer", "Payee", "Amount", "Status"].map((h, i) => (
                  <th
                    key={h}
                    className="t-tag font-medium"
                    style={{ color: "var(--dim)", textAlign: i === 3 ? "right" : "left" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {LEDGER.map((o) => {
                const out = showExclusions && o.status !== "verified";
                return (
                  <tr key={o.id} style={{ opacity: out ? 0.36 : 1, transition: "opacity 420ms ease" }}>
                    <td className={cell} style={{ color: "var(--dim)" }}>{o.id}</td>
                    <td className={cell}>{o.payer}</td>
                    <td className={cell}>{o.payee}</td>
                    <td className={cell} style={{ textAlign: "right", textDecoration: out ? "line-through" : "none" }}>
                      {usd(o.amount)}
                    </td>
                    <td className={cell}><Status kind={o.status} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {loaded && showResult && (
        <div className="grid grid-cols-3 border-t border-[color:var(--rule)]">
          {[
            ["Eligible gross", usd(gross)],
            ["Must actually move", usd(toMove)],
            ["Reduction", reduction + "%"],
          ].map(([k, v], i) => (
            <div key={k} className={dense ? "px-4 py-4" : "px-5 py-6"} style={{ borderLeft: i ? "1px solid var(--rule)" : undefined }}>
              <p className="t-tag" style={{ color: "var(--dim)" }}>{k}</p>
              <p className="t-num mt-3" style={{ fontSize: dense ? "clamp(1.2rem,1.9vw,1.6rem)" : "clamp(1.4rem, 2.4vw, 2rem)" }}>{v}</p>
            </div>
          ))}
        </div>
      )}

      {loaded && showPlan && (
        <div className="border-t border-[color:var(--rule)] px-5 py-6">
          <div className="flex items-baseline justify-between">
            <p className="t-tag" style={{ color: "var(--dim)" }}>Recommended settlement</p>
            <p className="t-fine" style={{ color: "var(--dim)" }}>Awaiting approval</p>
          </div>
          {INSTRUCTIONS.map((s) => (
            <div key={s.id} className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-[color:var(--rule)] pt-4">
              <span className="t-small" style={{ color: "var(--dim)" }}>{s.id}</span>
              <span className="t-small flex-1" style={{ minWidth: 220 }}>{s.from} → {s.to}</span>
              <span className="t-small" style={{ color: "var(--dim)" }}>closes {s.closes} obligations</span>
              <span className="t-sub" style={{ fontSize: 17 }}>{usd(s.amount)}</span>
            </div>
          ))}
        </div>
      )}

      {loaded && showAudit && (
        <div className="border-t border-[color:var(--rule)] px-5 py-5">
          <p className="t-tag" style={{ color: "var(--dim)" }}>Audit trail</p>
          <ul className="mt-4">
            {AUDIT.slice(0, showResult ? 4 : 3).map((a) => (
              <li key={a.t} className="t-fine flex flex-wrap gap-x-5 py-1" style={{ color: "var(--dim)" }}>
                <span style={{ minWidth: 66 }}>{a.t}</span>
                <span style={{ minWidth: 148 }}>{a.actor}</span>
                <span>{a.action}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
