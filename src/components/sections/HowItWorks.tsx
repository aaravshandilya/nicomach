import { SectionHead } from "@/components/ui/SectionHead";
import { useInView } from "@/hooks/useInView";

const steps = [
  {
    n: "1",
    title: "Connect",
    body: "Import approved invoice data through a CSV, ERP connection, or secure data environment.",
  },
  {
    n: "2",
    title: "Verify",
    body: "Exclude disputed, incomplete, duplicated, restricted, or unapproved obligations.",
  },
  {
    n: "3",
    title: "Optimize",
    body: "Model eligible obligations as a network and calculate a smaller settlement plan.",
  },
  {
    n: "4",
    title: "Approve",
    body: "Present an explainable recommendation for review before any payment occurs.",
  },
];

export function HowItWorks() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);

  return (
    <section id="process" data-ground="ink" className="band">
      <SectionHead n="03" label="How It Works" note="Nothing moves without review" />

      <div className="frame cols gap-y-8 pt-14 md:pt-20">
        <h2 className="t-statement col-span-12 lg:col-span-7">A deliberate, reviewable process.</h2>
      </div>

      <div ref={ref} className="frame relative pb-20 pt-16 md:pb-28">
        {/* the connecting line, fractured */}
        <svg
          className="pointer-events-none absolute left-0 right-0 top-[74px] hidden h-3 w-full md:block"
          viewBox="0 0 1200 12"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="how-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C4A052" stopOpacity="0" />
              <stop offset="50%" stopColor="#DEC177" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#C4A052" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M 60 6 H 320 L 336 2 L 352 10 L 372 6 H 640 L 656 11 L 672 2 L 690 6 H 960 L 976 2 L 992 10 L 1010 6 H 1140"
            fill="none"
            stroke="var(--rule)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 60 6 H 320 L 336 2 L 352 10 L 372 6 H 640 L 656 11 L 672 2 L 690 6 H 960 L 976 2 L 992 10 L 1010 6 H 1140"
            pathLength={1}
            fill="none"
            stroke="url(#how-grad)"
            strokeWidth="1.4"
            strokeDasharray="0.22 1"
            strokeDashoffset={1.22}
            vectorEffect="non-scaling-stroke"
            className={inView ? "crack-travel" : undefined}
          />
        </svg>

        <ol className="cols gap-y-12">
          {steps.map((s) => (
            <li key={s.n} className="col-span-12 sm:col-span-6 md:col-span-3">
              <span
                className="relative flex h-12 w-12 items-center justify-center rounded-full"
                style={{
                  background: "linear-gradient(150deg,#DFC493,#B99A5E)",
                  boxShadow: "inset 0 0 0 1px rgba(5,7,5,0.22)",
                }}
              >
                <span className="t-serif text-[19px] font-medium text-ink">{s.n}</span>
              </span>
              <h3 className="t-statement-sm mt-5">{s.title}</h3>
              <p className="t-body mt-2.5 max-w-[260px]" style={{ color: "var(--dim)" }}>
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
