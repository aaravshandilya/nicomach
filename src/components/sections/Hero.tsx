import { SystemSchematic } from "@/components/graphs/SystemSchematic";
import { Figure } from "@/components/ui/Figure";
import { ArrowButton, ArrowLink } from "@/components/ui/ArrowLink";

/**
 * Split hero, after Hazeltree (siteinspire.com/website/12424-hazeltree):
 * the system on one side, the claim on the other, and a strip of real figures
 * across the foot. Gold appears in the typography and on the resolved output
 * of the schematic — nowhere else, and never as a gradient.
 */
export function Hero({ onOpenDemo }: { onOpenDemo: () => void }) {
  return (
    <section id="overview" data-ground="ink" className="band">
      <div className="frame flex items-baseline justify-between pt-[74px]">
        <p className="t-label" style={{ color: "var(--accent)" }}>
          B2B cash flow optimization
        </p>
        <p className="t-label hidden sm:block" style={{ color: "var(--dim)" }}>
          Est. Phoenix, Arizona
        </p>
      </div>

      <div className="frame cols items-center gap-y-14 pb-14 pt-10 md:pb-16 md:pt-8">
        {/* ---- the system ---- */}
        <div className="col-span-12 lg:col-span-6">
          <SystemSchematic className="mx-auto w-full max-w-[620px]" />
        </div>

        {/* ---- the claim ---- */}
        <div className="col-span-12 lg:col-span-5 lg:col-start-8">
          <h1 className="text-[clamp(2.1rem,4.2vw,3.5rem)] font-light leading-[1.06] tracking-[-0.025em]">
            Move less money.
            <br />
            Unlock more{" "}
            <em className="t-italic font-normal" style={{ color: "var(--accent)" }}>
              liquidity.
            </em>
          </h1>

          <p className="t-body-lg mt-7 max-w-md" style={{ color: "var(--dim)" }}>
            NicoMach analyzes verified obligations between businesses and recommends a
            simpler settlement plan — fewer payments, less gross cash movement, and a
            record of which obligations each transfer closes.
          </p>

          <div className="mt-9 flex flex-col items-start gap-1">
            <ArrowButton onClick={onOpenDemo} className="w-full max-w-[280px]">
              Explore the demo
            </ArrowButton>
            <ArrowLink href="#process" className="w-full max-w-[280px]">
              See how it works
            </ArrowLink>
          </div>

          <p className="t-micro mt-6 max-w-sm" style={{ color: "var(--dim)" }}>
            Read-only analysis. No custody of funds. Every settlement requires approval.
          </p>
        </div>
      </div>

      {/* ---- the figures, across the foot ---- */}
      <div className="frame border-t border-[color:var(--rule)] py-9">
        <div className="cols gap-y-9">
          <div className="col-span-6 md:col-span-3">
            <p className="text-[clamp(1.9rem,3vw,2.6rem)]">
              <Figure value={14} />
              <span className="t-figure px-1.5" style={{ color: "var(--dim)" }}>
                →
              </span>
              <Figure value={4} />
            </p>
            <p className="t-label mt-2.5" style={{ color: "var(--dim)" }}>
              Payments
            </p>
          </div>
          <div className="col-span-6 md:col-span-3">
            <p className="text-[clamp(1.9rem,3vw,2.6rem)]">
              <Figure value={81} suffix="%" />
            </p>
            <p className="t-label mt-2.5" style={{ color: "var(--dim)" }}>
              Gross movement reduced
            </p>
          </div>
          <div className="col-span-6 md:col-span-3">
            <p className="text-[clamp(1.9rem,3vw,2.6rem)]">
              <Figure value={71} prefix="−" suffix="%" />
            </p>
            <p className="t-label mt-2.5" style={{ color: "var(--dim)" }}>
              Reconciliation events
            </p>
          </div>
          <div className="col-span-6 md:col-span-3">
            <p className="t-micro" style={{ color: "var(--dim)" }}>
              Illustrative example based on synthetic data, not a guaranteed outcome.
              Figures are illustrative unless drawn from your own data.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
