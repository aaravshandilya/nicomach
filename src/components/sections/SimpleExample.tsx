import { useState } from "react";
import { SectionHead } from "@/components/ui/SectionHead";
import { ArrowButton } from "@/components/ui/ArrowLink";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

const S = 380;
const pts = [
  { x: S / 2, y: 44, label: "A" },
  { x: S - 52, y: S - 74, label: "B" },
  { x: 52, y: S - 74, label: "C" },
];
const edges: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 0],
];

export function SimpleExample() {
  const [netted, setNetted] = useState(false);
  const reduced = useReducedMotionSafe();
  const ms = reduced ? 0 : 720;

  return (
    <section id="example" data-ground="cream" className="band">
      <SectionHead n="02" label="Simple Example" note="Three obligations" />

      <div className="frame cols gap-y-12 pb-20 pt-14 md:pb-28 md:pt-20">
        <div className="col-span-12 lg:col-span-6">
          <h2 className="t-statement max-w-xl">
            Three obligations. Sixty dollars moved. Zero-dollar{" "}
            <em className="t-italic" style={{ color: "var(--accent)" }}>net position.</em>
          </h2>

          <p className="t-body-lg mt-8 max-w-md" style={{ color: "var(--dim)" }}>
            A owes B $20. B owes C $20. C owes A $20. Three payments, sixty dollars of
            gross movement, and every participant ends exactly where they started.
          </p>

          <div className="mt-9">
            <ArrowButton onClick={() => setNetted((v) => !v)}>
              {netted ? "Reset the example" : "Run the optimization"}
            </ArrowButton>
          </div>

          <div
            className="overflow-hidden"
            style={{
              maxHeight: netted ? 240 : 0,
              opacity: netted ? 1 : 0,
              transition: `max-height ${ms}ms ease, opacity ${ms}ms ease`,
            }}
          >
            <p className="t-statement-sm mt-9">No payment required.</p>
            <p className="t-body mt-2" style={{ color: "var(--dim)" }}>
              Gross cash movement reduced by $60.
            </p>
          </div>

          <p className="t-micro mt-12 max-w-sm" style={{ color: "var(--dim)" }}>
            All obligations must be verified, eligible, and legally permitted to be netted.
          </p>
        </div>

        <div className="col-span-12 lg:col-span-5 lg:col-start-8">
          <svg viewBox={`0 0 ${S} ${S}`} className="mx-auto w-full max-w-[420px]" aria-hidden="true">
            {edges.map(([a, b], i) => {
              const mx = (pts[a].x + pts[b].x) / 2;
              const my = (pts[a].y + pts[b].y) / 2;
              return (
                <g
                  key={i}
                  style={{
                    opacity: netted ? 0 : 1,
                    transition: `opacity ${ms}ms ease ${i * 110}ms`,
                  }}
                >
                  <line
                    x1={pts[a].x}
                    y1={pts[a].y}
                    x2={pts[b].x}
                    y2={pts[b].y}
                    stroke="var(--fg)"
                    strokeWidth="1"
                  />
                  <rect x={mx - 21} y={my - 9} width="42" height="18" fill="var(--bg)" />
                  <text
                    x={mx}
                    y={my + 4}
                    textAnchor="middle"
                    fontFamily="Inter, sans-serif"
                    fontSize="12"
                    fontWeight="400"
                    fill="var(--accent)"
                  >
                    $20
                  </text>
                </g>
              );
            })}

            {pts.map((p, i) => (
              <g key={i}>
                <circle cx={p.x} cy={p.y} r="17" fill="var(--fg)" />
                <text
                  x={p.x}
                  y={p.y + 4.5}
                  textAnchor="middle"
                  fontFamily="Inter, sans-serif"
                  fontSize="12"
                  fontWeight="500"
                  fill="var(--bg)"
                >
                  {p.label}
                </text>
              </g>
            ))}

            <text
              x={S / 2}
              y={S / 2 + 6}
              textAnchor="middle"
              fontFamily="'Cormorant Garamond', Georgia, serif"
              fontStyle="italic"
              fontSize="30"
              fill="var(--fg)"
              style={{ opacity: netted ? 1 : 0, transition: `opacity ${ms}ms ease ${ms * 0.5}ms` }}
            >
              $0 net
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
