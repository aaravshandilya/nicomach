import { SectionHead } from "@/components/ui/SectionHead";
import { Figure } from "@/components/ui/Figure";
import { ArrowButton } from "@/components/ui/ArrowLink";

const before = [
  "Many individual payment lines",
  "Higher gross cash movement",
  "More reconciliation events",
  "Fragmented visibility",
];

const after = [
  "Fewer settlement lines",
  "Lower gross cash movement",
  "Clear participant-level positions",
  "Fully reviewable recommendation",
];

export function Results({ onOpenDemo }: { onOpenDemo: () => void }) {
  return (
    <section id="results" data-ground="panel" className="band">
      <SectionHead n="04" label="Results" note="Synthetic data" />

      <div className="frame cols gap-y-8 pt-14 md:pt-20">
        <h2 className="t-statement col-span-12 lg:col-span-7">
          Fewer payments. The same obligations,{" "}
          <em className="t-italic" style={{ color: "var(--accent)" }}>honored.</em>
        </h2>
        <div className="col-span-12 self-end lg:col-span-4 lg:col-start-9">
          <ArrowButton onClick={onOpenDemo}>See it happen</ArrowButton>
        </div>
      </div>

      {/* before / after, as two ledger columns divided by a rule */}
      <div className="frame cols gap-y-12 pb-16 pt-16 md:pb-20">
        <div className="col-span-12 md:col-span-6 md:pr-[clamp(20px,4vw,64px)]">
          <div className="flex items-baseline justify-between border-t border-[color:var(--rule)] pt-4">
            <span className="t-label" style={{ color: "var(--dim)" }}>
              Before
            </span>
            <span className="t-figure text-[clamp(2.6rem,5vw,4rem)]" style={{ color: "var(--dim)" }}>
              14
            </span>
          </div>
          <p className="t-label mt-1" style={{ color: "var(--dim)" }}>
            payments
          </p>
          <ul className="mt-7">
            {before.map((b) => (
              <li
                key={b}
                className="t-body border-t border-[color:var(--rule)] py-3"
                style={{ color: "var(--dim)" }}
              >
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-12 md:col-span-6 md:border-l md:border-[color:var(--rule)] md:pl-[clamp(20px,4vw,64px)]">
          <div className="flex items-baseline justify-between border-t border-[color:var(--rule)] pt-4">
            <span className="t-label" style={{ color: "var(--accent)" }}>
              After
            </span>
            <span className="t-figure text-[clamp(2.6rem,5vw,4rem)]">
              <Figure value={4} />
            </span>
          </div>
          <p className="t-label mt-1" style={{ color: "var(--dim)" }}>
            payments
          </p>
          <ul className="mt-7">
            {after.map((a) => (
              <li key={a} className="t-body border-t border-[color:var(--rule)] py-3">
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* full-width stat band */}
      <div className="border-y border-[color:var(--rule)] py-14 md:py-20">
        <div className="frame">
          <p className="t-label" style={{ color: "var(--dim)" }}>
            Figures below are illustrative unless drawn from your own data
          </p>
          <dl className="cols mt-10 gap-y-12">
            <div className="col-span-12 sm:col-span-4">
              <dd className="text-[clamp(3.6rem,9vw,7.5rem)]">
                <Figure value={10} />
              </dd>
              <dt className="t-label mt-4" style={{ color: "var(--dim)" }}>
                Payments removed
              </dt>
            </div>
            <div className="col-span-12 sm:col-span-4">
              <dd className="text-[clamp(3.6rem,9vw,7.5rem)]">
                <Figure value={81} suffix="%" />
              </dd>
              <dt className="t-label mt-4" style={{ color: "var(--dim)" }}>
                Gross movement reduced
              </dt>
            </div>
            <div className="col-span-12 sm:col-span-4">
              <dd className="text-[clamp(3.6rem,9vw,7.5rem)]">
                <Figure value={71} prefix="−" suffix="%" />
              </dd>
              <dt className="t-label mt-4" style={{ color: "var(--dim)" }}>
                Reconciliation events
              </dt>
            </div>
          </dl>
          <p className="t-micro mt-12 max-w-lg" style={{ color: "var(--dim)" }}>
            Illustrative example based on synthetic data, not a guaranteed outcome.
          </p>
        </div>
      </div>
    </section>
  );
}
