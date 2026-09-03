"use client";

import { motion } from "framer-motion";
import { DashboardSection, useDashboard } from "./DashboardProvider";
import {
  IconObligations,
  IconNetwork,
  IconOptimize,
  IconOverview,
  IconReports,
  IconSettings,
} from "./icons";
import { cn } from "@/lib/utils";
import WreathMark from "@/components/logo/WreathMark";

const ITEMS: { id: DashboardSection; label: string; icon: (p: any) => JSX.Element }[] = [
  { id: "overview", label: "Overview", icon: IconOverview },
  { id: "obligations", label: "Obligations", icon: IconObligations },
  { id: "network", label: "Network", icon: IconNetwork },
  { id: "optimization", label: "Optimization", icon: IconOptimize },
  { id: "reports", label: "Reports", icon: IconReports },
  { id: "settings", label: "Settings", icon: IconSettings },
];

export function Sidebar({ className }: { className?: string }) {
  const { section, setSection } = useDashboard();

  return (
    <aside
      className={cn(
        "flex h-full w-full flex-col border-r border-border-gold bg-bg-secondary/60 px-3 py-6",
        className
      )}
    >
      <div className="mb-8 flex items-center gap-2 px-3">
        <WreathMark size={26} />
        <div>
          <p className="font-serif text-sm leading-none text-cream">NicoMach</p>
          <p className="mt-1 text-[0.63rem] uppercase tracking-widest2 text-muted">Demo</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {ITEMS.map((item) => {
          const active = section === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSection(item.id)}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors duration-150",
                active ? "text-bg-primary" : "text-cream/75 hover:bg-white/5 hover:text-cream"
              )}
            >
              {active && (
                <motion.span
                  layoutId="sidebar-active"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  className="absolute inset-0 rounded-xl bg-gradient-to-b from-gold-light to-gold"
                />
              )}
              <Icon className="relative z-10 shrink-0" />
              <span className="relative z-10 font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-6 rounded-xl border border-border-gold p-3 text-xs leading-relaxed text-muted">
        Demonstration data. NicoMach does not move funds.
      </div>
    </aside>
  );
}
