import { WreathMark } from "@/components/marks/WreathMark";
import { GROUND_BG, GROUND_DIM, GROUND_FG, type Ground } from "@/hooks/useChrome";

interface TopBarProps {
  ground: Ground;
  progress: number;
  onOpenDemo: () => void;
}

export function TopBar({ ground, progress, onOpenDemo }: TopBarProps) {
  const fg = GROUND_FG[ground];
  const dim = GROUND_DIM[ground];
  const bg = GROUND_BG[ground];

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-50 h-px origin-left bg-gold-light/70"
        style={{ transform: `scaleX(${progress})` }}
      />

      <header
        className="frame pointer-events-none fixed inset-x-0 top-0 z-40 flex items-start justify-between pb-6 pt-5"
        style={{
          color: fg,
          background: `linear-gradient(to bottom, ${bg} 46%, transparent)`,
          transition: "color 700ms cubic-bezier(0.4,0,0.2,1), background 700ms cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <a href="#overview" className="pointer-events-auto flex items-center gap-2">
          <WreathMark size={20} className="opacity-90" />
          <span className="t-serif text-[15px] font-medium tracking-tight">NicoMach</span>
        </a>

        <nav className="pointer-events-auto flex items-center gap-5 sm:gap-7">
          <button onClick={onOpenDemo} className="t-label transition-opacity hover:opacity-60">
            Demo
          </button>
          <a href="#pilot" className="t-label transition-opacity hover:opacity-60">
            Pilot
          </a>
          <span className="t-label hidden md:inline" style={{ color: dim }}>
            Phoenix, AZ
          </span>
        </nav>
      </header>
    </>
  );
}
