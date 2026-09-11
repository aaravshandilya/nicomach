/**
 * A single gold vein — the icon treatment for the trust principles (brief
 * §4.7). Deliberately not a padlock or a shield: no certification is being
 * implied that NicoMach doesn't hold.
 */
export function VeinIcon({ seed = 0, className = "" }: { seed?: number; className?: string }) {
  const paths = [
    "M 2 30 L 14 22 L 9 14 L 22 6 L 18 17 L 30 12",
    "M 2 8 L 12 16 L 8 24 L 20 28 L 16 18 L 30 22",
    "M 3 20 L 11 10 L 17 20 L 24 8 L 27 20 L 31 14",
    "M 2 26 L 10 26 L 14 12 L 20 24 L 25 10 L 31 18",
  ];
  return (
    <svg viewBox="0 0 34 34" className={className} fill="none" aria-hidden="true">
      <path
        d={paths[seed % paths.length]}
        stroke="var(--accent)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
