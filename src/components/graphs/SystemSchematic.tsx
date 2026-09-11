import { useEffect, useState } from "react";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

/**
 * The product drawn as a schematic — the move taken from Hazeltree
 * (siteinspire.com/website/12424-hazeltree): lead with the system, not with
 * decoration. Verified obligations enter on the left, the optimization sits in
 * the middle, and what actually has to be paid leaves on the right.
 *
 * Flat 1px linework and flat fills throughout: no gradients, no glow, no
 * halo. Gold is reserved for the resolved output.
 */

const COMPANIES = [
  "Atlas Robotics",
  "Meridian Foods",
  "Sable Textiles",
  "Driftwood Logistics",
  "Northwind Co.",
  "Kestrel Supply",
];

const PAYMENTS = [
  "Meridian → Atlas",
  "Sable → Driftwood",
  "Northwind → Kestrel",
  "Atlas → Northwind",
];

const W = 720;
const H = 500;
const LEFT_X = 206;
const HUB_X = 362;
const RIGHT_X = 524;
const BOX_W = 96;
const BOX_H = 74;

export function SystemSchematic({ className = "" }: { className?: string }) {
  const reduced = useReducedMotionSafe();
  const [step, setStep] = useState(reduced ? 3 : 0);

  useEffect(() => {
    if (reduced) return;
    let alive = true;
    (async () => {
      while (alive) {
        setStep(0);
        await wait(700);
        if (!alive) return;
        setStep(1); // obligations arrive
        await wait(1500);
        if (!alive) return;
        setStep(2); // optimization runs
        await wait(1100);
        if (!alive) return;
        setStep(3); // settlement leaves
        await wait(3400);
        if (!alive) return;
      }
    })();
    return () => {
      alive = false;
    };
  }, [reduced]);

  const inRows = COMPANIES.map((name, i) => ({
    name,
    y: 88 + i * 56,
  }));
  const outRows = PAYMENTS.map((name, i) => ({
    name,
    y: 144 + i * 56,
  }));

  return (
    <figure className={className}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="How an obligation network resolves into a settlement plan">
        {/* ---- inbound obligations ---- */}
        {inRows.map((r, i) => (
          <g
            key={r.name}
            style={{
              opacity: step >= 1 ? 1 : 0.18,
              transition: `opacity 480ms ease ${i * 70}ms`,
            }}
          >
            <text
              x={LEFT_X - 16}
              y={r.y + 4}
              textAnchor="end"
              fontFamily="Inter, sans-serif"
              fontSize="12"
              fontWeight="300"
              fill="#F4EBD8"
            >
              {r.name}
            </text>
            <rect x={LEFT_X - 8} y={r.y - 8} width="16" height="16" fill="none" stroke="#A8A696" strokeWidth="1" />
            {/* elbow into the hub */}
            <path
              d={`M ${LEFT_X + 8} ${r.y} H ${HUB_X - 74} V ${H / 2} H ${HUB_X - BOX_W / 2}`}
              fill="none"
              stroke="#A8A696"
              strokeWidth="1"
              opacity="0.5"
            />
          </g>
        ))}

        {/* ---- the hub ---- */}
        <g>
          <rect
            x={HUB_X - BOX_W / 2}
            y={H / 2 - BOX_H / 2}
            width={BOX_W}
            height={BOX_H}
            fill="#050705"
            stroke={step >= 2 ? "#C4A052" : "#A8A696"}
            strokeWidth="1"
            style={{ transition: "stroke 500ms ease" }}
          />
          <text
            x={HUB_X}
            y={H / 2 - 6}
            textAnchor="middle"
            fontFamily="Inter, sans-serif"
            fontSize="10"
            fontWeight="500"
            letterSpacing="1.6"
            fill="#F4EBD8"
          >
            NICOMACH
          </text>
          <text
            x={HUB_X}
            y={H / 2 + 12}
            textAnchor="middle"
            fontFamily="Inter, sans-serif"
            fontSize="9"
            fontWeight="300"
            letterSpacing="0.6"
            fill={step >= 2 ? "#C4A052" : "#A8A696"}
            style={{ transition: "fill 500ms ease" }}
          >
            {step >= 2 ? "netting" : "idle"}
          </text>
          <text
            x={HUB_X}
            y={H / 2 + 26}
            textAnchor="middle"
            fontFamily="Inter, sans-serif"
            fontSize="9"
            fontWeight="300"
            letterSpacing="0.6"
            fill="#A8A696"
          >
            read-only
          </text>
        </g>

        {/* ---- outbound settlement ---- */}
        {outRows.map((r, i) => (
          <g
            key={r.name}
            style={{
              opacity: step >= 3 ? 1 : 0,
              transition: `opacity 420ms ease ${i * 130}ms`,
            }}
          >
            <path
              d={`M ${HUB_X + BOX_W / 2} ${H / 2} H ${HUB_X + 74} V ${r.y} H ${RIGHT_X - 8}`}
              fill="none"
              stroke="#C4A052"
              strokeWidth="1"
            />
            <rect x={RIGHT_X - 8} y={r.y - 8} width="16" height="16" fill="none" stroke="#C4A052" strokeWidth="1" />
            <text
              x={RIGHT_X + 16}
              y={r.y + 4}
              fontFamily="Inter, sans-serif"
              fontSize="12"
              fontWeight="300"
              fill="#F4EBD8"
            >
              {r.name}
            </text>
          </g>
        ))}

        {/* ---- column labels ---- */}
        <text x={LEFT_X - 16} y="46" textAnchor="end" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="500" letterSpacing="2.2" fill="#A8A696">
          VERIFIED OBLIGATIONS
        </text>
        <text x={LEFT_X - 16} y="64" textAnchor="end" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="300" fill="#A8A696">
          6 companies · 14 payments
        </text>

        <text x={RIGHT_X - 8} y="46" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="500" letterSpacing="2.2" fill="#C4A052" style={{ opacity: step >= 3 ? 1 : 0.25, transition: "opacity 400ms ease" }}>
          SETTLEMENT PLAN
        </text>
        <text x={RIGHT_X - 8} y="64" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="300" fill="#A8A696" style={{ opacity: step >= 3 ? 1 : 0.25, transition: "opacity 400ms ease" }}>
          4 payments · awaiting approval
        </text>
      </svg>

      <figcaption className="t-micro mt-3 flex items-center justify-between border-t border-[color:var(--rule)] pt-2" style={{ color: "var(--dim)" }}>
        <span>Demonstration data. No funds are held or moved.</span>
        <span className="tabular">10 payments removed</span>
      </figcaption>
    </figure>
  );
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
