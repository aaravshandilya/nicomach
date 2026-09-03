import Link from "next/link";
import Wordmark from "@/components/logo/Wordmark";
import WreathMark from "@/components/logo/WreathMark";

const COLUMNS = [
  {
    heading: "Platform",
    links: [
      { label: "Product", href: "/#product" },
      { label: "Demo", href: "/demo" },
      { label: "Security", href: "/#security" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/#about" },
      { label: "Contact", href: "/#pilot" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border-gold bg-bg-secondary">
      <div className="container-nico py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Wordmark size={24} />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              A read-only settlement analysis platform for verified obligations
              between independent businesses.
            </p>
            <div className="mt-6 flex items-center gap-2 text-muted">
              <WreathMark size={22} />
              <span className="text-xs uppercase tracking-widest2">Est. Phoenix, Arizona</span>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="eyebrow mb-4">{col.heading}</p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream/75 transition-colors hover:text-gold-light"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="divider-gold my-10" />

        <div className="flex flex-col gap-4 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl leading-relaxed">
            NicoMach is an early-stage analytical platform. It does not currently
            provide banking, lending, investment, custody, or money-transmission
            services.
          </p>
          <p>&copy; {new Date().getFullYear()} NicoMach. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
