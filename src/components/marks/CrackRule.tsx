import { useInView } from "@/hooks/useInView";

/**
 * Every homepage section transition is a crack-glow rule rather than a plain
 * divider (brief §7): a hairline with fractures in it, and a highlight that
 * travels once along the fracture on scroll-into-view before settling to a
 * static glow (§3.4).
 */
export function CrackRule({ id }: { id?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.6);
  const gradId = `crack-grad-${id ?? "x"}`;
  const d =
    "M 0 8 H 214 L 232 3 L 249 13 L 272 8 H 598 L 618 14 L 636 3 L 658 8 H 946 L 964 2 L 981 12 L 1000 8 H 1200";

  return (
    <div ref={ref} className="relative h-4 w-full">
      <svg viewBox="0 0 1200 16" preserveAspectRatio="none" className="h-4 w-full" aria-hidden="true">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C4A052" stopOpacity="0" />
            <stop offset="40%" stopColor="#DEC177" stopOpacity="1" />
            <stop offset="60%" stopColor="#FFF3D2" stopOpacity="1" />
            <stop offset="100%" stopColor="#C4A052" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={d}
          fill="none"
          stroke="var(--rule)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          style={{ opacity: inView ? 1 : 0.6, transition: "opacity 900ms ease" }}
        />
        <path
          d={d}
          pathLength={1}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="1.4"
          strokeDasharray="0.2 1"
          strokeDashoffset={1.2}
          vectorEffect="non-scaling-stroke"
          className={inView ? "crack-travel" : undefined}
        />
      </svg>
    </div>
  );
}
