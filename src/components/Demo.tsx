import { useEffect, useState } from "react";
import { Console } from "./Console";

const STAGES = ["Connect", "Verify", "Optimise", "Approve"];

const NOTES = [
  "Nine obligations arrive exactly as the participants' own systems hold them. Nothing has been normalised, merged or inferred.",
  "One invoice is disputed by its counterparty and one is still pending confirmation. Both leave the eligible set before any calculation runs.",
  "The seven remaining obligations are solved as one network. $92,100 of gross obligations resolve to $16,420 that has to move.",
  "Two instructions discharge all seven obligations, each carrying the obligations it closes. Nothing is executed until every participant approves.",
];

export function Demo({ onClose }: { onClose: () => void }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setStage((s) => Math.min(3, s + 1));
      if (e.key === "ArrowLeft") setStage((s) => Math.max(0, s - 1));
    };
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", k);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="NicoMach settlement demonstration"
      data-ground="paper"
      className="fixed inset-0 z-[60] overflow-y-auto"
      style={{ background: "var(--paper)", color: "var(--ink)" }}
    >
      <div className="shell py-8 md:py-12">
        <div className="flex items-baseline justify-between gap-6 border-b border-[color:var(--rule)] pb-6">
          <div>
            <p className="t-tag" style={{ color: "var(--dim)" }}>Live demonstration</p>
            <h2 className="t-sub mt-3" style={{ fontSize: "clamp(1.3rem,2.4vw,1.85rem)" }}>
              One October cycle, from ledger to settlement
            </h2>
          </div>
          <button onClick={onClose} className="plain shrink-0" style={{ background: "none", border: 0, padding: 0, cursor: "pointer", font: "inherit", fontSize: 17, fontWeight: 500 }}>
            Close
          </button>
        </div>

        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
          {STAGES.map((s, i) => (
            <button
              key={s}
              onClick={() => setStage(i)}
              aria-current={stage === i}
              style={{
                background: "none", border: 0, padding: "4px 0", cursor: "pointer", font: "inherit",
                fontSize: 17, fontWeight: 500, letterSpacing: "-0.02em",
                color: stage === i ? "var(--ink)" : "var(--dim)",
                borderBottom: stage === i ? "1px solid var(--ink)" : "1px solid transparent",
              }}
            >
              {String(i + 1).padStart(2, "0")} {s}
            </button>
          ))}
        </div>

        <div className="mt-10 grid12 gap-y-10">
          <div className="col-span-12 lg:col-span-8">
            <Console step={stage} />
          </div>
          <div className="col-span-12 lg:col-span-3 lg:col-start-10">
            <p className="t-tag" style={{ color: "var(--dim)" }}>Stage {stage + 1} of 4</p>
            <p className="t-body mt-5">{NOTES[stage]}</p>

            <div className="mt-10 flex gap-3">
              <button className="btn btn--line" onClick={() => setStage((s) => Math.max(0, s - 1))} disabled={stage === 0}>
                Back
              </button>
              <button className="btn" onClick={() => setStage((s) => Math.min(3, s + 1))} disabled={stage === 3}>
                {stage === 3 ? "Complete" : "Next stage"}
              </button>
            </div>

            <p className="t-fine mt-10" style={{ color: "var(--dim)" }}>
              Illustrative example based on synthetic data, not a guaranteed outcome.
              Read-only analysis. No custody of funds. Every settlement requires approval.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
