import { WreathMark } from "@/components/marks/WreathMark";
import { CrackRule } from "@/components/marks/CrackRule";

const columns = [
  {
    title: "Platform",
    links: [
      { label: "Product", href: "#problem" },
      { label: "Demo", href: "#demo" },
      { label: "Security", href: "#security" },
      { label: "FAQ", href: "#questions" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#team" },
      { label: "Contact", href: "#pilot" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#privacy" },
      { label: "Terms", href: "#terms" },
    ],
  },
];

export function Footer({ onOpenDemo }: { onOpenDemo: () => void }) {
  return (
    <footer data-ground="ink" className="band">
      <CrackRule id="foot" />
      <div className="frame cols gap-y-12 pt-14">
        <div className="col-span-12 md:col-span-5">
          <span className="t-serif flex items-center gap-2 text-[17px] font-medium">
            <WreathMark size={26} className="text-gold" />
            NicoMach
          </span>
          <p className="t-body mt-5 max-w-xs" style={{ color: "var(--dim)" }}>
            A read-only settlement analysis platform for verified obligations between
            independent businesses.
          </p>
          <p className="t-label mt-6" style={{ color: "var(--dim)" }}>
            Est. Phoenix, Arizona
          </p>
        </div>

        {columns.map((col) => (
          <nav key={col.title} className="col-span-6 sm:col-span-4 md:col-span-2">
            <p className="t-label" style={{ color: "var(--dim)" }}>
              {col.title}
            </p>
            <ul className="mt-5 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  {l.label === "Demo" ? (
                    <button onClick={onOpenDemo} className="t-body transition-opacity hover:opacity-60">
                      {l.label}
                    </button>
                  ) : (
                    <a href={l.href} className="t-body transition-opacity hover:opacity-60">
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="frame mt-16 border-t border-[color:var(--rule)] py-8 pb-24">
        <div className="cols gap-y-4">
          <p className="t-micro col-span-12 max-w-2xl md:col-span-8" style={{ color: "var(--dim)" }}>
            NicoMach is an early-stage analytical platform. It does not currently provide
            banking, lending, investment, custody, or money-transmission services.
          </p>
          <p className="t-micro col-span-12 md:col-span-3 md:col-start-10 md:text-right" style={{ color: "var(--dim)", opacity: 0.7 }}>
            © {new Date().getFullYear()} NicoMach
          </p>
        </div>
      </div>
    </footer>
  );
}
