import { SectionHead } from "@/components/ui/SectionHead";

const cards = [
  {
    n: "01",
    title: "Across independent businesses",
    body: "The optimization logic corporate treasury applies inside one ownership structure, extended to companies with no shared ownership.",
  },
  {
    n: "02",
    title: "Optimization before payment",
    body: "Obligations are modeled as a network and analyzed before a payment is scheduled — not reconciled after the money has already moved.",
  },
  {
    n: "03",
    title: "A lower-risk starting point",
    body: "Read-only analysis with no custody means adopting NicoMach doesn't change who holds your money or who moves it.",
  },
];

const positioning = [
  { name: "Treasury platforms", body: "Often support netting within corporate groups." },
  { name: "Payment platforms", body: "Help businesses process individual payments." },
  { name: "Working-capital platforms", body: "Help finance or accelerate individual invoices." },
];

export function WhyNicoMach() {
  return (
    <>
      <section id="position" data-ground="ink" className="band">
        <SectionHead n="07" label="Why NicoMach" note="Where it fits" />

        <div className="frame cols gap-y-8 pt-14 md:pt-20">
          <h2 className="t-statement col-span-12 lg:col-span-6">A different starting point.</h2>
        </div>

        <div className="frame pt-14">
          {cards.map((c) => (
            <div key={c.n} className="ledger-row">
              <span className="t-label tabular pt-1" style={{ color: "var(--accent)" }}>
                {c.n}
              </span>
              <h3 className="t-statement-sm">{c.title}</h3>
              <p className="ledger-body t-body max-w-xl" style={{ color: "var(--dim)" }}>
                {c.body}
              </p>
            </div>
          ))}
        </div>

        <div className="frame pb-16 pt-16 md:pb-24">
          <p className="t-label" style={{ color: "var(--dim)" }}>
            Where NicoMach fits
          </p>
          <table className="mt-6 w-full border-collapse text-left">
            <tbody>
              {positioning.map((row) => (
                <tr key={row.name} className="border-t border-[color:var(--rule)]">
                  <th className="t-statement-sm w-[42%] py-5 pr-6 align-top font-normal">
                    {row.name}
                  </th>
                  <td className="t-body py-5 align-top" style={{ color: "var(--dim)" }}>
                    {row.body}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* the thesis, given the cream breakout a testimonial would normally take */}
      <section data-ground="cream" className="band">
        <div className="frame cols py-24 md:py-32">
          <p className="t-label col-span-12 mb-10" style={{ color: "var(--dim)" }}>
            The thesis
          </p>
          <blockquote className="t-statement col-span-12 lg:col-span-10">
            Eligible obligations should first be analyzed as a{" "}
            <em className="t-italic" style={{ color: "var(--accent)" }}>connected network</em> —
            before they are individually routed, financed, or reconciled.
          </blockquote>
          <p className="t-label col-span-12 mt-10" style={{ color: "var(--dim)" }}>
            NicoMach — Company position, not a customer quote
          </p>
        </div>
      </section>
    </>
  );
}
