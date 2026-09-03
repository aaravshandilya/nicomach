"use client";

import { AnimatePresence, motion } from "framer-motion";
import { DashboardProvider, useDashboard } from "./DashboardProvider";
import { Sidebar } from "./Sidebar";
import { MobileSectionTabs } from "./MobileSectionTabs";
import { SummaryCards } from "./SummaryCards";
import { Overview } from "./sections/Overview";
import { Obligations } from "./sections/Obligations";
import { NetworkSection } from "./sections/NetworkSection";
import { OptimizationSection } from "./sections/OptimizationSection";
import { Reports } from "./sections/Reports";
import { Settings } from "./sections/Settings";

const SECTION_TITLES: Record<string, string> = {
  overview: "Overview",
  obligations: "Obligations",
  network: "Network",
  optimization: "Optimization",
  reports: "Reports",
  settings: "Settings",
};

function DashboardBody() {
  const { section } = useDashboard();

  return (
    <div className="flex min-h-screen bg-bg-primary pt-16">
      <Sidebar className="fixed inset-y-0 left-0 top-16 z-30 hidden w-64 lg:flex" />

      <div className="min-w-0 flex-1 lg:pl-64">
        <MobileSectionTabs />

        <div className="border-b border-border-gold bg-bg-secondary/40 px-4 py-3 text-center text-xs text-gold-light sm:px-8">
          Demonstration data. NicoMach does not move funds.
        </div>

        <main className="px-4 py-6 sm:px-8 sm:py-8">
          <div className="mb-6 flex flex-col gap-1">
            <p className="eyebrow">{SECTION_TITLES[section]}</p>
            <h1 className="font-serif text-2xl text-cream sm:text-3xl">NicoMach Demo</h1>
          </div>

          <div className="mb-8">
            <SummaryCards />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {section === "overview" && <Overview />}
              {section === "obligations" && <Obligations />}
              {section === "network" && <NetworkSection />}
              {section === "optimization" && <OptimizationSection />}
              {section === "reports" && <Reports />}
              {section === "settings" && <Settings />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export function DemoDashboard() {
  return (
    <DashboardProvider>
      <DashboardBody />
    </DashboardProvider>
  );
}
