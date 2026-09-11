export function Footer({
  onBrief,
  onOpenDemo,
  onLegal,
}: {
  onBrief: () => void;
  onOpenDemo: () => void;
  onLegal: (t: "terms" | "privacy") => void;
}) {
  const link = { background: "none", border: 0, padding: 0, color: "inherit", cursor: "pointer", font: "inherit" } as const;

  return (
    <footer data-ground="dark" className="band">
      <div className="shell pb-12 pt-[clamp(56px,7vw,96px)]">
        <div className="grid12 gap-y-12">
          <div className="col-span-12 md:col-span-5">
            <p style={{ fontSize: 21, fontWeight: 600, letterSpacing: "-0.03em" }}>NicoMach</p>
            <p className="t-small mt-4 max-w-[32ch]" style={{ color: "var(--dim)" }}>
              Read-only settlement analysis for verified obligations between independent
              businesses.
            </p>
            <p className="t-fine mt-6" style={{ color: "var(--dim)" }}>Phoenix, Arizona</p>
          </div>

          <nav className="col-span-6 md:col-span-3 md:col-start-7" aria-label="Read">
            <p className="t-tag" style={{ color: "var(--dim)" }}>Read</p>
            <ul className="mt-5 space-y-3">
              <li><button onClick={onBrief} className="plain t-small" style={link}>The brief</button></li>
              <li><button onClick={onOpenDemo} className="plain t-small" style={link}>The demonstration</button></li>
              <li><a href="#pilot" className="plain t-small">Request a pilot</a></li>
            </ul>
          </nav>

          <nav className="col-span-6 md:col-span-2 md:col-start-11" aria-label="Legal">
            <p className="t-tag" style={{ color: "var(--dim)" }}>Legal</p>
            <ul className="mt-5 space-y-3">
              <li><button onClick={() => onLegal("privacy")} className="plain t-small" style={link}>Privacy policy</button></li>
              <li><button onClick={() => onLegal("terms")} className="plain t-small" style={link}>Terms of use</button></li>
            </ul>
          </nav>
        </div>

        <div className="mt-16 grid12 gap-y-4 border-t border-[color:var(--rule)] pt-8">
          <p className="t-fine col-span-12 max-w-[72ch] md:col-span-8" style={{ color: "var(--dim)" }}>
            NicoMach is an early-stage analytical platform. It does not currently provide
            banking, lending, investment, custody or money-transmission services.
          </p>
          <p className="t-fine col-span-12 md:col-span-3 md:col-start-10 md:text-right" style={{ color: "var(--dim)" }}>
            © {new Date().getFullYear()} NicoMach
          </p>
        </div>
      </div>
    </footer>
  );
}
