interface GreekKeyRingProps {
  size?: number;
  className?: string;
  segments?: number;
}

/** Circular meander — `GreekKeyRing` (brief §3.3), repeated as a running thread. */
export function GreekKeyRing({ size = 640, className, segments = 32 }: GreekKeyRingProps) {
  const r = 46;
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} aria-hidden="true" focusable="false">
      <circle cx="50" cy="50" r={r} fill="none" stroke="currentColor" strokeWidth="0.35" opacity="0.7" />
      <circle cx="50" cy="50" r={r - 4.4} fill="none" stroke="currentColor" strokeWidth="0.35" opacity="0.7" />
      <g stroke="currentColor" strokeWidth="0.4" fill="none" strokeLinecap="square">
        {Array.from({ length: segments }).map((_, i) => (
          <g key={i} transform={`rotate(${(360 / segments) * i} 50 50)`}>
            <path d={`M ${50 - 1.1} ${50 - r} v 2 h 2.2 v -1.2 h -1.2 v 2.4 h 2.4 v 1.2`} />
          </g>
        ))}
      </g>
    </svg>
  );
}
