import { CrackRule } from "@/components/marks/CrackRule";

interface SectionHeadProps {
  n: string;
  label: string;
  note?: string;
}

/** Ledger header: the fracture rule, then the entry line that sits on it. */
export function SectionHead({ n, label, note }: SectionHeadProps) {
  return (
    <div className="w-full">
      <CrackRule id={n} />
      <div className="frame flex items-baseline justify-between gap-6 pt-3">
        <div className="flex items-baseline gap-4">
          <span className="t-label tabular" style={{ color: "var(--accent)" }}>
            {n}
          </span>
          <span className="t-label">{label}</span>
        </div>
        {note && (
          <span className="t-label hidden text-right sm:block" style={{ color: "var(--dim)" }}>
            {note}
          </span>
        )}
      </div>
    </div>
  );
}
