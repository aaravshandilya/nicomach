"use client";

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

const ITEMS: { id: DashboardSection; label: string; icon: (p: any) => JSX.Element }[] = [
  { id: "overview", label: "Overview", icon: IconOverview },
  { id: "obligations", label: "Obligations", icon: IconObligations },
  { id: "network", label: "Network", icon: IconNetwork },
  { id: "optimization", label: "Optimize", icon: IconOptimize },
  { id: "reports", label: "Reports", icon: IconReports },
  { id: "settings", label: "Settings", icon: IconSettings },
];

export function MobileSectionTabs() {
  const { section, setSection } = useDashboard();

  return (
    <div className="scroll-fade-x sticky top-0 z-20 flex gap-2 border-b border-border-gold bg-bg-primary/95 px-3 py-3 backdrop-blur lg:hidden">
      {ITEMS.map((item) => {
        const active = section === item.id;
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => setSection(item.id)}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-medium transition-colors",
              active
                ? "border-gold bg-gold text-bg-primary"
                : "border-border-gold text-cream/75"
            )}
          >
            <Icon width={14} height={14} />
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
