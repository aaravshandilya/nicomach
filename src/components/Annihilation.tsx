import { useEffect, useState } from "react";
import { SystemSchematic } from "@/components/graphs/SystemSchematic";
import { Figure } from "@/components/ui/Figure";
import { ArrowButton } from "@/components/ui/ArrowLink";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

type Phase = "idle" | "collapsing" | "falling" | "landed";

/**
 * The debt-annihilation demo, promoted out of a standalone file and onto a
 * real surface (brief §6): the tangled network collapses, the value that
 * never needed to move becomes a single coin, and the statue receives it.
 */
export function Annihilation({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const reduced = useReducedMotionSafe();

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const run = () => {
    if (phase !== "idle") return;
    setPhase("collapsing");
    setTimeout(() => setPhase("falling"), reduced ? 0 : 620);
    setTimeout(() => setPhase("landed"), reduced ? 30 : 1750);
  };


  return (
    <div
      data-ground="ink"
      className="band fixed inset-0 z-[60] overflow-y-auto"
      style={{ background: "#050705" }}
      role="dialog"
      aria-modal="true"
      aria-label="Debt annihilation demo"
    >
      <div className="frame flex items-baseline justify-between pt-5">
        <button onClick={onClose} className="t-label transition-opacity hover:opacity-60">
          ← Back to index
        </button>
        <span className="t-label" style={{ color: "var(--dim)" }}>
          Demonstration data
        </span>
      </div>

      <div className="frame cols gap-y-4 pt-7">
        <p className="t-label col-span-12" style={{ color: "var(--accent)" }}>
          Interactive demo
        </p>
        <h2 className="t-statement col-span-12 lg:col-span-6">
          Watch the network{" "}
          <em className="t-italic" style={{ color: "var(--accent)" }}>resolve.</em>
        </h2>
        <p className="t-body col-span-12 self-end sm:col-span-8 lg:col-span-4 lg:col-start-9" style={{ color: "var(--dim)" }}>
          Six companies, tangled in obligations to one another. Run the netting and watch
          what is actually left once the network cancels against itself.
        </p>
      </div>

      {/* ---------------- stage ---------------- */}
      <div className="frame relative pb-4 pt-8">
        <SystemSchematic className="mx-auto w-full max-w-[720px]" />
      </div>

      {/* ---------------- readout ---------------- */}
      <div className="frame border-t border-[color:var(--rule)] pb-10 pt-6">
        {phase === "landed" ? (
          <div className="cols gap-y-8">
            <div className="col-span-12 md:col-span-4">
              <p className="t-statement-sm">Debt annihilated.</p>
              <button
                onClick={() => setPhase("idle")}
                className="link-rule mt-5"
              >
                Watch it resolve again
              </button>
            </div>
            <div className="col-span-6 md:col-span-2 md:col-start-6">
              <p className="text-[clamp(2.4rem,5vw,3.6rem)]">
                <Figure value={10} />
              </p>
              <p className="t-label mt-2" style={{ color: "var(--dim)" }}>
                Payments removed
              </p>
            </div>
            <div className="col-span-6 md:col-span-2">
              <p className="text-[clamp(2.4rem,5vw,3.6rem)]">
                <Figure value={81} suffix="%" />
              </p>
              <p className="t-label mt-2" style={{ color: "var(--dim)" }}>
                Gross movement reduced
              </p>
            </div>
            <p className="t-micro col-span-12 md:col-span-3 md:col-start-10" style={{ color: "var(--dim)" }}>
              Demonstration data. NicoMach does not move funds. Illustrative example,
              not a guaranteed outcome.
            </p>
          </div>
        ) : (
          <div className="cols gap-y-6">
            <div className="col-span-12 md:col-span-4">
              <ArrowButton onClick={run} disabled={phase !== "idle"}>
                {phase === "idle" ? "Run the annihilation" : "Netting…"}
              </ArrowButton>
            </div>
            <p className="t-micro col-span-12 md:col-span-4 md:col-start-9" style={{ color: "var(--dim)" }}>
              Demonstration data. NicoMach does not move funds. Illustrative example, not
              a guaranteed outcome.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
