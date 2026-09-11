interface WreathMarkProps {
  size?: number;
  className?: string;
  letter?: boolean;
}

/** Laurel wreath around an "N" — `WreathMark` (brief §3.3). */
export function WreathMark({ size = 22, className, letter = true }: WreathMarkProps) {
  const branch = (side: 1 | -1) =>
    Array.from({ length: 8 }).map((_, i) => {
      const t = i / 7;
      const angle = -104 - t * 76;
      const r = 35 + t * 2;
      const x = 50 + side * r * Math.cos((angle * Math.PI) / 180) * -1;
      const y = 50 + r * Math.sin((angle * Math.PI) / 180);
      const rot = side === 1 ? -(angle + 104) - 20 : angle + 104 + 20;
      const s = 0.7 + t * 0.55;
      return (
        <g key={`${side}-${i}`} transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
          <ellipse cx="0" cy="0" rx="7" ry="2.5" fill="currentColor" opacity={0.5 + t * 0.5} />
        </g>
      );
    });

  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} aria-hidden="true" focusable="false">
      {branch(-1)}
      {branch(1)}
      {letter && (
        <text
          x="50"
          y="62"
          textAnchor="middle"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontWeight="500"
          fontSize="36"
          fill="currentColor"
        >
          N
        </text>
      )}
    </svg>
  );
}
