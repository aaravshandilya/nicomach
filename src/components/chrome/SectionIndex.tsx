import { useEffect, useRef } from "react";
import { SECTIONS } from "@/lib/sections";
import { GROUND_BG, GROUND_DIM, GROUND_FG, type Ground } from "@/hooks/useChrome";

interface SectionIndexProps {
  ground: Ground;
  activeId: string;
}

/**
 * Pinned index of every section, the way the reference pins its full project
 * list across the foot of the page: current entry at full strength, the rest
 * held back. It is the only navigation the site has.
 */
export function SectionIndex({ ground, activeId }: SectionIndexProps) {
  const fg = GROUND_FG[ground];
  const dim = GROUND_DIM[ground];
  const bg = GROUND_BG[ground];
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scroller.current?.querySelector<HTMLElement>(`[data-idx="${activeId}"]`);
    if (!el || !scroller.current) return;
    if (scroller.current.scrollWidth <= scroller.current.clientWidth + 4) return;
    el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeId]);

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40"
      style={{
        color: fg,
        background: `linear-gradient(to top, ${bg} 66%, transparent)`,
        transition: "color 700ms cubic-bezier(0.4,0,0.2,1), background 700ms cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      <div
        ref={scroller}
        className="frame flex gap-x-[clamp(14px,2.1vw,30px)] overflow-x-auto pb-3 pt-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {SECTIONS.map((s) => {
          const active = s.id === activeId;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              data-idx={s.id}
              className="group shrink-0 whitespace-nowrap"
              style={{
                color: active ? fg : dim,
                opacity: active ? 1 : 0.62,
                transition: "color 500ms ease, opacity 500ms ease",
              }}
            >
              <span className="block text-[10.5px] font-normal leading-[1.35] tracking-[0.02em] transition-opacity group-hover:opacity-100">
                {s.label}
              </span>
              <span className="tabular block text-[10.5px] font-normal leading-[1.35] tracking-[0.02em]">
                {active ? `${s.n} — Reading` : s.n}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
