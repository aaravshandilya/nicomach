import { useState } from "react";
import { Panel } from "./Panel";

const S = 400;
const R = 29;

const parties = [
  { id: "A", name: "Grower", x: S / 2, y: 54 },
  { id: "B", name: "Packer", x: S - 60, y: S - 88 },
  { id: "C", name: "Distributor", x: 60, y: S - 88 },
];
const edges = [
  { from: 0, to: 1 },
  { from: 1, to: 2 },
  { from: 2, to: 0 },
];

function trim(ax: number, ay: number, bx: number, by: number, pad = R + 11) {
  const dx = bx - ax, dy = by - ay;
  const len = Math.hypot(dx, dy) || 1;
  return { x1: ax + (dx / len) * pad, y1: ay + (dy / len) * pad, x2: bx - (dx / len) * pad, y2: by - (dy / len) * pad };
}

export function PanelExample() {
  const [netted, setNetted] = useState(false);
  const [sel, setSel] = useState<number | null>(null);

  return (
    <Panel id="example" ground="tone" tag="A worked example" note="Three obligations">
      <div className="grid12 items-center gap-y-14">
        <div className="col-span-12 lg:col-span-5">
          <h2 className="t-panel max-w-[11ch]">Three obligations. Nothing owed.</h2>
          <p className="t-lead mt-9 max-w-[34ch]" style={{ color: "var(--dim)" }}>
            Each company owes the next twenty dollars. Sixty moves. Everyone ends
            where they started.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <button className="btn btn--line" onClick={() => setNetted((v) => !v)}>
              {netted ? "Reset" : "Run the optimisation"}
            </button>
            {netted && <p className="t-body" style={{ color: "var(--dim)" }}>$60 removed.</p>}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <svg
            viewBox={`0 0 ${S} ${S}`}
            className="mx-auto w-full max-w-[min(470px,58vh)]"
            role="img"
            aria-label="Three companies each owing the next twenty dollars, netting to zero"
          >
            <defs>
              <marker id="nm-head" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--fg)" />
              </marker>
            </defs>

            {edges.map((e, i) => {
              const a = parties[e.from], b = parties[e.to];
              const { x1, y1, x2, y2 } = trim(a.x, a.y, b.x, b.y);
              const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
              const lit = sel === e.from || sel === e.to;
              return (
                <g key={i} style={{ opacity: netted ? 0 : 1, transition: `opacity 620ms ease ${i * 100}ms` }}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--fg)" strokeWidth={lit ? 1.9 : 1} markerEnd="url(#nm-head)" />
                  <rect x={mx - 26} y={my - 11} width="52" height="22" fill="var(--bg)" />
                  <text x={mx} y={my + 5} textAnchor="middle" fontSize="14" fontWeight={lit ? 600 : 400} fill="var(--fg)">$20</text>
                </g>
              );
            })}

            {parties.map((p, i) => {
              const lit = sel === i;
              return (
                <g
                  key={p.id}
                  tabIndex={0}
                  role="button"
                  aria-label={`${p.id}, ${p.name}. Owes twenty dollars, is owed twenty dollars, net zero.`}
                  onMouseEnter={() => setSel(i)}
                  onMouseLeave={() => setSel(null)}
                  onFocus={() => setSel(i)}
                  onBlur={() => setSel(null)}
                  style={{ cursor: "pointer" }}
                >
                  <circle cx={p.x} cy={p.y} r={R + 10} fill="transparent" />
                  <circle cx={p.x} cy={p.y} r={R} fill={lit && !netted ? "var(--fg)" : "var(--bg)"} stroke="var(--fg)" strokeWidth="1" />
                  <text x={p.x} y={p.y + 6} textAnchor="middle" fontSize="17" fontWeight="500" fill={lit && !netted ? "var(--bg)" : "var(--fg)"} style={{ pointerEvents: "none" }}>
                    {p.id}
                  </text>
                  <text x={p.x} y={p.y < S / 2 ? p.y - R - 14 : p.y + R + 22} textAnchor="middle" fontSize="13" fill="var(--dim)" style={{ pointerEvents: "none" }}>
                    {p.name}
                  </text>
                </g>
              );
            })}

            <text
              x={S / 2} y={S / 2 + 10} textAnchor="middle"
              fontSize="30" fontWeight="500" letterSpacing="-1.1" fill="var(--fg)"
              style={{ opacity: netted ? 1 : 0, transition: "opacity 620ms ease 340ms" }}
            >
              No payment required
            </text>
          </svg>
        </div>
      </div>

      <p className="t-fine mt-10 max-w-[62ch]" style={{ color: "var(--dim)" }}>
        All obligations must be verified, eligible, and legally permitted to be netted.
      </p>
    </Panel>
  );
}
