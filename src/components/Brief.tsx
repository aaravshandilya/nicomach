import { useEffect, useState } from "react";
import { Console } from "./Console";

/**
 * The brief. The panels carry one idea each; everything a controller
 * actually needs to read lives here, in one reading view, so the front
 * of the site never has to become a brochure again.
 */

const SECTIONS = [
  ["problem", "The problem"],
  ["process", "How it works"],
  ["security", "Trust & security"],
  ["position", "Why NicoMach"],
  ["landscape", "The landscape"],
  ["team", "About"],
  ["questions", "Questions"],
];

const problems = [
  ["Fragmented obligations", "Invoices are processed one at a time, with no shared view of what a wider network of counterparties owes each other."],
  ["Unnecessary movement", "Money moves between businesses whose obligations, netted against each other, may not have required that movement at all."],
  ["Trapped liquidity", "Working capital sits committed to gross payment flows rather than the smaller settlement those same obligations could represent."],
];

const steps = [
  ["Connect", "Import approved invoice data through a CSV, an ERP connection, or a secure data environment. The ledger loads exactly as your systems hold it — payer, payee, amount, currency, due date, status."],
  ["Verify", "Exclude disputed, incomplete, duplicated, restricted or unapproved obligations. Anything either side has not separately confirmed drops out of scope before it can influence a recommendation."],
  ["Optimise", "Model eligible obligations as a network and solve it as a whole rather than invoice by invoice. What returns is the shortest set of transfers that discharges every eligible obligation."],
  ["Approve", "Present an explainable recommendation for review before any payment occurs. Each instruction carries the obligations it closes, so a controller can audit the plan line by line."],
];

const principles = [
  ["Read-only first", "NicoMach reads obligation data to model a settlement. It never initiates a transfer and never gains the access required to move funds."],
  ["Minimum necessary data", "Only the invoice-level fields needed to determine eligibility and calculate a settlement. No banking credentials, no account access."],
  ["Customer-controlled approval", "Every participant approves a recommended plan before any payment is made, through their own banking relationships."],
  ["Explainable and auditable", "Each recommendation carries the verified obligations that produced it, so the whole plan can be reviewed line by line."],
];

const position = [
  ["Across independent businesses", "The optimisation logic corporate treasury applies inside one ownership structure, extended to companies with no shared ownership."],
  ["Optimisation before payment", "Obligations are modelled as a network and analysed before a payment is scheduled — not reconciled after the money has already moved."],
  ["A lower-risk starting point", "Read-only analysis with no custody means adopting NicoMach doesn't change who holds your money or who moves it."],
];

const rows = [
  ["Treasury management systems", "Cash positioning and netting inside one corporate group", "Subsidiaries of a single parent", "Initiates transfers", false],
  ["Payment platforms & AP automation", "Executing, routing and reconciling payments", "One invoice at a time", "Moves funds", false],
  ["Working-capital & supply-chain finance", "Financing or accelerating an invoice", "One invoice at a time", "Funds the invoice", false],
  ["NicoMach", "Removing the payments that offset each other", "The network between independent companies", "Read-only. No custody", true],
] as [string, string, string, string, boolean][];

const distinctions = [
  ["Across ownership boundaries", "Corporate treasury netting works inside a single ownership structure. NicoMach applies the same logic between companies with no shared ownership, using obligations both sides have separately verified."],
  ["Before the payment, not after", "The other categories act once a payment already exists — routing it, financing it, or reconciling it afterwards. NicoMach runs before anything is scheduled, and asks which payments need to exist at all."],
  ["Nothing to trust us with", "Every adjacent category has to touch money to do its job. NicoMach returns a recommendation. Each participant executes through their own banking relationships, after their own approval."],
];

const founders = [
  ["Aarav Shandilya", "Technical modelling & product", "Leads technical modelling, optimisation and product development. His background includes developing and benchmarking supply-chain optimisation models using industrial data at Arizona State University."],
  ["Hayden", "Finance & strategy", "Leads finance, business strategy, sales and customer discovery. His background includes writing C++ trading algorithms for the NinjaScript environment on the NinjaTrader platform, several years in sales and customer service, and ongoing mathematical modelling research at Grand Canyon University."],
];

const faqs = [
  ["Does NicoMach ever hold or move money?", "No. NicoMach is a read-only analysis platform. It calculates a recommended settlement plan from verified obligations, but every payment is still executed through each participant's own banking relationships after explicit approval."],
  ["How is this different from netting inside one company's treasury?", "Corporate treasury netting works within a single ownership structure. NicoMach applies the same optimisation logic across independent businesses — companies with no shared ownership — using obligations that both sides have separately verified."],
  ["What data do you need from us?", "Only the invoice-level fields required to determine eligibility and calculate a settlement: payer, recipient, amount, currency, due date, and verification status. No banking credentials or account access are required for the analysis."],
  ["What happens to disputed or unverified invoices?", "They are automatically excluded from optimisation. Only obligations both parties have marked verified and undisputed are eligible to be netted — disputed, pending, restricted or unapproved items are never included in a recommendation."],
  ["Who has to approve a settlement plan before anything happens?", "Every participant reviews the recommended plan — including which obligations contributed to each proposed payment — before anything is approved. No settlement is executed without that review."],
  ["Is this live in production today?", "NicoMach is an early-stage platform. The public demo runs on sample data so you can see how the analysis, netting and approval flow would work; it does not currently provide banking, lending, investment, custody or money-transmission services."],
];

function Head({ id, n, children }: { id: string; n: string; children: React.ReactNode }) {
  return (
    <div id={id} className="mb-10 pt-4" style={{ scrollMarginTop: 92 }}>
      <p className="t-tag" style={{ color: "var(--dim)" }}>{n}</p>
      <h2 className="t-head mt-5 max-w-[22ch]">{children}</h2>
    </div>
  );
}

export function Brief({ onClose, onOpenDemo }: { onClose: () => void; onOpenDemo: () => void }) {
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="The NicoMach brief"
      data-ground="paper"
      className="fixed inset-0 z-[60] overflow-y-auto"
      style={{ background: "var(--paper)", color: "var(--ink)" }}
    >
      <div
        className="sticky top-0 z-10 flex items-baseline justify-between gap-6 border-b border-[color:var(--rule)] px-[var(--pad)] py-5"
        style={{ background: "var(--paper)" }}
      >
        <p className="t-tag" style={{ color: "var(--dim)" }}>NicoMach — the brief</p>
        <button onClick={onClose} className="plain" style={{ background: "none", border: 0, padding: 0, cursor: "pointer", font: "inherit", fontSize: 17, fontWeight: 500 }}>
          Close
        </button>
      </div>

      <div className="shell grid12 gap-y-16 pb-32 pt-16">
        {/* contents, held in view */}
        <nav className="col-span-12 lg:col-span-3" aria-label="Contents">
          <div className="lg:sticky lg:top-[104px]">
            <p className="t-tag" style={{ color: "var(--dim)" }}>Contents</p>
            <ul className="mt-6 space-y-3">
              {SECTIONS.map(([id, label], i) => (
                <li key={id}>
                  <a href={`#${id}`} className="plain t-small">
                    {String(i + 1).padStart(2, "0")} &nbsp; {label}
                  </a>
                </li>
              ))}
            </ul>
            <button className="btn btn--line mt-9" onClick={onOpenDemo}>Open the demo</button>
          </div>
        </nav>

        <div className="col-span-12 lg:col-span-8 lg:col-start-5">
          {/* 01 the problem */}
          <Head id="problem" n="01">
            Businesses optimise everything except the obligations between them.
          </Head>
          <p className="t-lead max-w-[58ch]" style={{ color: "var(--dim)" }}>
            Companies commonly process invoices one at a time. Across a larger network
            some obligations may offset, but fragmented systems and independent payment
            processes make those opportunities difficult to identify.
          </p>
          <div className="mt-12">
            {problems.map(([t, b]) => (
              <div key={t} className="brief-row">
                <h3 className="t-sub">{t}</h3>
                <p className="t-body mt-3 max-w-[62ch]" style={{ color: "var(--dim)" }}>{b}</p>
              </div>
            ))}
            <p className="t-fine border-t border-[color:var(--rule)] pt-6 max-w-[66ch]" style={{ color: "var(--dim)" }}>
              Not all working-capital inefficiency comes from invoice netting — this is one
              contributing factor among several.
            </p>
          </div>

          {/* 02 how it works */}
          <div className="mt-28">
            <Head id="process" n="02">A deliberate, reviewable process.</Head>
            <ol>
              {steps.map(([t, b], i) => (
                <li key={t} className="brief-row">
                  <div className="flex items-baseline gap-6">
                    <span className="t-tag" style={{ color: "var(--dim)" }}>{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="t-sub">{t}</h3>
                  </div>
                  <p className="t-body ml-[3.4rem] mt-3 max-w-[58ch]" style={{ color: "var(--dim)" }}>{b}</p>
                </li>
              ))}
            </ol>
            <div className="mt-12">
              <Console step={3} />
              <p className="t-fine mt-4" style={{ color: "var(--dim)" }}>
                Demonstration data; no funds are held or moved.
              </p>
            </div>
          </div>

          {/* 03 trust & security */}
          <div className="mt-28">
            <Head id="security" n="03">Designed to minimise the trust required.</Head>
            {principles.map(([t, b]) => (
              <div key={t} className="brief-row">
                <h3 className="t-sub">{t}</h3>
                <p className="t-body mt-3 max-w-[62ch]" style={{ color: "var(--dim)" }}>{b}</p>
              </div>
            ))}
            <p className="t-fine border-t border-[color:var(--rule)] pt-6 max-w-[66ch]" style={{ color: "var(--dim)" }}>
              Production deployments will require independent security review, appropriate
              compliance controls, and trusted financial partners.
            </p>
          </div>

          {/* 04 why nicomach */}
          <div className="mt-28">
            <Head id="position" n="04">A different starting point.</Head>
            {position.map(([t, b]) => (
              <div key={t} className="brief-row">
                <h3 className="t-sub">{t}</h3>
                <p className="t-body mt-3 max-w-[62ch]" style={{ color: "var(--dim)" }}>{b}</p>
              </div>
            ))}
            <blockquote className="mt-14 border-t border-[color:var(--rule)] pt-10" style={{ margin: "3.5rem 0 0" }}>
              <p className="t-head max-w-[24ch]">
                Eligible obligations should first be analysed as a connected network —
                before they are individually routed, financed or reconciled.
              </p>
              <p className="t-fine mt-7" style={{ color: "var(--dim)" }}>
                NicoMach — company position, not a customer quote.
              </p>
            </blockquote>
          </div>

          {/* 05 the landscape */}
          <div className="mt-28">
            <Head id="landscape" n="05">
              Everyone else optimises the payment. We ask whether it needs to happen.
            </Head>
            <p className="t-lead max-w-[58ch]" style={{ color: "var(--dim)" }}>
              These categories are real, they are well funded, and several of them do their
              job better than we could. They are also solving a different problem.
            </p>
            <div className="mt-10 overflow-x-auto">
              <table className="tbl min-w-[720px]">
                <thead>
                  <tr>
                    {["Category", "What it optimises", "Unit it works on", "Funds"].map((h) => (
                      <th key={h} className="t-tag font-medium" style={{ color: "var(--dim)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map(([cat, opt, unit, funds, ours]) => (
                    <tr key={cat}>
                      <th scope="row" className="t-sub w-[26%] py-6 font-medium" style={{ fontSize: 17 }}>{cat}</th>
                      <td className="t-small w-[27%] py-6" style={{ color: ours ? "var(--fg)" : "var(--dim)" }}>{opt}</td>
                      <td className="t-small w-[27%] py-6" style={{ color: ours ? "var(--fg)" : "var(--dim)" }}>{unit}</td>
                      <td className="t-small py-6" style={{ color: ours ? "var(--fg)" : "var(--dim)", fontWeight: ours ? 500 : 400 }}>{funds}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="t-fine mt-5 max-w-[66ch]" style={{ color: "var(--dim)" }}>
              Category descriptions, not claims about any individual vendor. Capabilities
              vary by product and by deployment.
            </p>
            <div className="mt-12">
              {distinctions.map(([t, b]) => (
                <div key={t} className="brief-row">
                  <h3 className="t-sub">{t}</h3>
                  <p className="t-body mt-3 max-w-[62ch]" style={{ color: "var(--dim)" }}>{b}</p>
                </div>
              ))}
              <div className="border-t border-[color:var(--rule)] pt-8">
                <p className="t-tag" style={{ color: "var(--dim)" }}>Where we don't compete</p>
                <p className="t-body mt-4 max-w-[62ch]" style={{ color: "var(--dim)" }}>
                  NicoMach does not replace an ERP, a bank, a payment rail or a treasury
                  system — it runs before all of them and hands the result back for approval.
                  Obligations that can't be netted still get paid the way they are paid today.
                  On the portion that can, the alternative to netting is usually financing the
                  same invoice or moving the cash anyway.
                </p>
              </div>
            </div>
          </div>

          {/* 06 about */}
          <div className="mt-28">
            <Head id="team" n="06">Meet the people building it.</Head>
            {founders.map(([n, r, b]) => (
              <div key={n} className="brief-row grid12 gap-y-4">
                <div className="col-span-12 md:col-span-4">
                  <h3 className="t-sub">{n}</h3>
                  <p className="t-fine mt-2" style={{ color: "var(--dim)" }}>{r}</p>
                </div>
                <p className="t-body col-span-12 max-w-[54ch] md:col-span-7 md:col-start-6" style={{ color: "var(--dim)" }}>{b}</p>
              </div>
            ))}
            <div className="border-t border-[color:var(--rule)]" />
          </div>

          {/* 07 questions */}
          <div className="mt-28">
            <Head id="questions" n="07">Questions worth asking directly.</Head>
            <dl style={{ margin: 0 }}>
              {faqs.map(([q, a], i) => {
                const isOpen = open === i;
                return (
                  <div key={q} className="border-t border-[color:var(--rule)]">
                    <dt style={{ margin: 0 }}>
                      <button
                        onClick={() => setOpen(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        className="flex w-full items-start justify-between gap-10 py-7 text-left"
                        style={{ background: "none", border: 0, color: "inherit", cursor: "pointer", font: "inherit" }}
                      >
                        <span className="t-sub">{q}</span>
                        <span className="t-sub shrink-0" style={{ color: "var(--dim)", fontWeight: 400 }} aria-hidden="true">
                          {isOpen ? "–" : "+"}
                        </span>
                      </button>
                    </dt>
                    <dd className="grid overflow-hidden" style={{ margin: 0, gridTemplateRows: isOpen ? "1fr" : "0fr", transition: "grid-template-rows 380ms cubic-bezier(0.4,0,0.2,1)" }}>
                      <div className="min-h-0 overflow-hidden">
                        <p className="t-body max-w-[62ch] pb-8 pr-10" style={{ color: "var(--dim)" }}>{a}</p>
                      </div>
                    </dd>
                  </div>
                );
              })}
              <div className="border-t border-[color:var(--rule)]" />
            </dl>
          </div>

          <p className="t-fine mt-20 max-w-[70ch]" style={{ color: "var(--dim)" }}>
            NicoMach is an early-stage analytical platform. It does not currently provide
            banking, lending, investment, custody or money-transmission services.
          </p>
        </div>
      </div>
    </div>
  );
}
