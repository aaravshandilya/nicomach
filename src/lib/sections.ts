export interface SectionMeta {
  id: string;
  n: string;
  label: string;
}

/**
 * The bottom index — the reference site pins every project across the foot
 * of the page with the current one at full strength. Here it's every section
 * of the argument, in the order it's made.
 */
export const SECTIONS: SectionMeta[] = [
  { id: "overview", n: "00", label: "Overview" },
  { id: "problem", n: "01", label: "The Problem" },
  { id: "example", n: "02", label: "Simple Example" },
  { id: "process", n: "03", label: "How It Works" },
  { id: "results", n: "04", label: "Results" },
  { id: "security", n: "05", label: "Trust & Security" },
  { id: "market", n: "06", label: "Market Context" },
  { id: "position", n: "07", label: "Why NicoMach" },
  { id: "team", n: "08", label: "About" },
  { id: "questions", n: "09", label: "FAQ" },
  { id: "pilot", n: "10", label: "Pilot" },
];
