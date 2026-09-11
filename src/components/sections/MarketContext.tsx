import { SectionHead } from "@/components/ui/SectionHead";
import { WreathMark } from "@/components/marks/WreathMark";

export function MarketContext() {
  return (
    <section id="market" data-ground="stone" className="band relative overflow-hidden">
      <SectionHead n="06" label="Market Context" note="PwC estimate" />

      <WreathMark
        size={880}
        letter={false}
        className="pointer-events-none absolute -right-40 top-1/2 -translate-y-1/2 opacity-[0.07]"
      />

      <div className="frame relative cols gap-y-10 pb-20 pt-14 md:pb-28 md:pt-20">
        <h2 className="t-statement col-span-12 lg:col-span-7">
          Working capital is one of the world's largest underused assets.
        </h2>

        <div className="col-span-12">
          {/* the largest numeral on the page — it is the site's most
              defensible claim, so it gets the most room (brief §4.8) */}
          <p
            className="t-figure mt-4 leading-[0.8]"
            style={{ fontSize: "clamp(4.5rem,20vw,17rem)", fontWeight: 200 }}
          >
            €1.84T
          </p>
        </div>

        <p className="t-body-lg col-span-12 border-t border-[color:var(--rule)] pt-5 md:col-span-6">
          PwC estimates that €1.84 trillion in excess working capital could potentially be
          released globally.
        </p>
        <p
          className="t-micro col-span-12 border-t border-[color:var(--rule)] pt-5 md:col-span-5 md:col-start-8"
          style={{ color: "var(--dim)" }}
        >
          This estimate includes inventory, receivables, payables, and other
          working-capital inefficiencies. NicoMach addresses only the portion connected to
          eligible business obligations and settlement.
        </p>
      </div>
    </section>
  );
}
