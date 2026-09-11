import { Ground } from "./Ground";

export function Hero({ onOpenDemo }: { onOpenDemo: () => void }) {
  return (
    <section id="top" className="panel" style={{ background: "var(--sand)" }}>
      <Ground />
      <div className="panel-in items-center text-center">
        <h1 className="t-panel max-w-[13ch]" style={{ color: "#FCF9F2" }}>
          Move less money. Unlock more liquidity.
        </h1>

        <p className="t-lead mt-8 max-w-[34ch]" style={{ color: "#FBF6EC" }}>
          Settlement analysis for obligations between independent businesses.
        </p>

        <div className="mt-11 flex flex-wrap items-center justify-center gap-3">
          <button className="btn btn--veil" onClick={onOpenDemo}>Open the demo</button>
          <a href="#pilot" className="btn btn--ghost">Request a pilot</a>
        </div>
      </div>

      <p
        className="relative pb-8 text-center t-fine"
        style={{ color: "rgba(252,249,242,0.88)", paddingLeft: "var(--pad)", paddingRight: "var(--pad)" }}
      >
        Read-only analysis. No custody of funds. Every settlement requires approval.
      </p>
    </section>
  );
}
