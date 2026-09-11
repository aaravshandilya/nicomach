import { useEffect, useState } from "react";

/**
 * everyday.io's nav, measured: position fixed, 62px tall, no background at
 * all, and the items spread at wide intervals across the entire viewport
 * rather than clustered on the right — brand at the left edge, two links at
 * roughly a third and two thirds, the call to action at the right edge.
 * 22px, weight 500, sentence case, tight tracking.
 */
const item = { fontSize: 21, fontWeight: 500, letterSpacing: "-0.02em", background: "none", border: 0, cursor: "pointer", color: "inherit", padding: 0 } as const;

export function Nav({ onOpenDemo, onBrief }: { onOpenDemo: () => void; onBrief: () => void }) {
  const [light, setLight] = useState(true);
  const [menu, setMenu] = useState(false);

  /* The bar is transparent, so it has to read whatever ground is passing
     underneath it and invert — the same trick the reference uses, extended
     to a page that changes ground eleven times. */
  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const y = 22;
      const hit = document
        .elementsFromPoint(Math.round(window.innerWidth / 2), y)
        .find((el) => el.id === "top" || (el as HTMLElement).dataset?.ground);
      if (!hit) return;
      const g = hit.id === "top" ? "hero" : (hit as HTMLElement).dataset.ground;
      setLight(g === "hero" || g === "dark");
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(read); };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const tone = light ? "#FBF7EE" : "#1B1916";

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 flex items-center"
        style={{ height: "var(--nav-h)", color: tone, transition: "color 260ms linear" }}
      >
        <nav
          className="flex w-full items-center justify-between"
          style={{ paddingLeft: "var(--pad)", paddingRight: "var(--pad)" }}
          aria-label="Primary"
        >
          <a
            href="#top"
            className="plain shrink-0"
            style={{ fontSize: 21, fontWeight: 600, letterSpacing: "-0.03em" }}
          >
            NicoMach
          </a>

          <div className="hidden flex-1 items-center justify-evenly md:flex">
            <button onClick={onBrief} className="plain" style={item}>
              Brief
            </button>
            <button onClick={onOpenDemo} className="plain" style={item}>
              Demo
            </button>
          </div>

          <a
            href="#pilot"
            className="plain hidden shrink-0 md:block"
            style={{ fontSize: 21, fontWeight: 500, letterSpacing: "-0.02em" }}
          >
            Request a pilot
          </a>

          <button
            onClick={() => setMenu((v) => !v)}
            className="md:hidden"
            aria-expanded={menu}
            aria-label="Menu"
            style={{ background: "none", border: 0, color: "inherit", padding: 0, cursor: "pointer", fontSize: 17, fontWeight: 500 }}
          >
            {menu ? "Close" : "Menu"}
          </button>
        </nav>
      </header>

      {menu && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ background: "var(--paper)", paddingTop: "var(--nav-h)" }}
        >
          <div className="shell pt-10">
            {[{ label: "Request a pilot", href: "#pilot" }].map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMenu(false)}
                className="plain block border-t border-[color:var(--rule)] py-5"
                style={{ fontSize: 26, fontWeight: 500, letterSpacing: "-0.03em", color: "var(--ink)" }}
              >
                {l.label}
              </a>
            ))}
            {[["Brief", onBrief], ["Demo", onOpenDemo]].map(([label, fn]) => (
              <button
                key={label as string}
                onClick={() => { setMenu(false); (fn as () => void)(); }}
                className="plain block w-full border-t border-[color:var(--rule)] py-5 text-left"
                style={{ fontSize: 26, fontWeight: 500, letterSpacing: "-0.03em", color: "var(--ink)", background: "none", border: 0, cursor: "pointer" }}
              >
                {label as string}
              </button>
            ))}
            <div className="border-t border-[color:var(--rule)]" />
          </div>
        </div>
      )}
    </>
  );
}
