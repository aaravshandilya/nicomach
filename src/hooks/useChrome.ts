import { useEffect, useState } from "react";

export type Ground = "ink" | "panel" | "cream" | "stone";

interface ChromeState {
  top: Ground;
  bottom: Ground;
  activeId: string;
  progress: number;
}

/**
 * The reference site swaps --current-bg / --text-color per project and lets
 * the fixed chrome ride along. Same mechanism here: the pinned wordmark and
 * the section index each resolve against whatever band is under them, so
 * they invert as the page moves between dark and light grounds.
 */
export function useChrome(): ChromeState {
  const [state, setState] = useState<ChromeState>({
    top: "ink",
    bottom: "ink",
    activeId: "overview",
    progress: 0,
  });

  useEffect(() => {
    let raf = 0;

    const read = () => {
      raf = 0;
      const bands = Array.from(document.querySelectorAll<HTMLElement>("[data-ground]"));
      const vh = window.innerHeight;

      const groundAt = (y: number): Ground => {
        for (const el of bands) {
          const r = el.getBoundingClientRect();
          if (r.top <= y && r.bottom >= y) return (el.dataset.ground as Ground) ?? "ink";
        }
        return "ink";
      };

      let activeId = "overview";
      let best = Infinity;
      for (const el of bands) {
        if (!el.id) continue;
        const r = el.getBoundingClientRect();
        const distance = Math.abs(r.top - vh * 0.34);
        if (r.bottom > vh * 0.2 && r.top < vh * 0.8 && distance < best) {
          best = distance;
          activeId = el.id;
        }
      }

      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;

      setState({
        top: groundAt(30),
        bottom: groundAt(vh - 30),
        activeId,
        progress: max > 0 ? Math.min(1, window.scrollY / max) : 0,
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return state;
}

export const GROUND_FG: Record<Ground, string> = {
  ink: "#F4EBD8",
  panel: "#F4EBD8",
  cream: "#050705",
  stone: "#17130A",
};

export const GROUND_DIM: Record<Ground, string> = {
  ink: "#A8A696",
  panel: "#A8A696",
  cream: "#6B6A5C",
  stone: "#6A5834",
};

export const GROUND_ACCENT: Record<Ground, string> = {
  ink: "#DEC177",
  panel: "#DEC177",
  cream: "#8A6B22",
  stone: "#6B4E14",
};

export const GROUND_BG: Record<Ground, string> = {
  ink: "#050705",
  panel: "#0C110D",
  cream: "#F4EBD8",
  stone: "#DFC493",
};
