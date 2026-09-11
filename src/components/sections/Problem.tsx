import { SectionHead } from "@/components/ui/SectionHead";

const items = [
  {
    n: "01",
    title: "Fragmented obligations",
    body: "Invoices are processed one at a time, with no shared view of what a wider network of counterparties owes each other.",
  },
  {
    n: "02",
    title: "Unnecessary movement",
    body: "Money moves between businesses whose obligations, netted against each other, may not have required that movement at all.",
  },
  {
    n: "03",
    title: "Trapped liquidity",
    body: "Working capital sits committed to gross payment flows rather than the smaller settlement those same obligations could represent.",
  },
];

export function Problem() {
  return (
    <section id="problem" data-ground="ink" className="band">
      <SectionHead n="01" label="The Problem" note="One factor among several" />

      <div className="frame cols gap-y-10 pb-6 pt-14 md:pt-20">
        <h2 className="t-statement col-span-12 lg:col-span-8">
          Businesses optimize everything except the obligations{" "}
          <em className="t-italic" style={{ color: "var(--accent)" }}>between</em> them.
        </h2>
        <p className="t-body col-span-12 self-end sm:col-span-8 lg:col-span-4" style={{ color: "var(--dim)" }}>
          Companies commonly process invoices one at a time. Across a larger network, some
          obligations may offset, but fragmented systems and independent payment processes
          make these opportunities difficult to identify.
        </p>
      </div>

      <div className="frame pb-16 pt-6 md:pb-24">
        {items.map((it) => (
          <div key={it.n} className="ledger-row">
            <span className="t-label tabular pt-1" style={{ color: "var(--accent)" }}>
              {it.n}
            </span>
            <h3 className="t-statement-sm">{it.title}</h3>
            <p className="ledger-body t-body max-w-xl" style={{ color: "var(--dim)" }}>
              {it.body}
            </p>
          </div>
        ))}
        <div className="border-t border-[color:var(--rule)] pt-5">
          <p className="t-micro max-w-2xl" style={{ color: "var(--dim)" }}>
            Not all working-capital inefficiency comes from invoice netting — this is one
            contributing factor among several.
          </p>
        </div>
      </div>
    </section>
  );
}
