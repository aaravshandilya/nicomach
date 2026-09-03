"use client";

import { motion } from "framer-motion";
import { useDashboard } from "../DashboardProvider";
import { Button } from "@/components/ui/Button";
import { SettlementComparison } from "../SettlementComparison";

export function OptimizationSection() {
  const { hasRunOptimization, runOptimizationNow, result } = useDashboard();

  if (!hasRunOptimization) {
    return (
      <div className="rounded-2xl border border-border-gold bg-bg-elevated/60 p-10 text-center">
        <p className="eyebrow">Optimization</p>
        <h2 className="mx-auto mt-3 max-w-xl font-serif text-2xl text-cream">
          Model {result.participatingCompanies.length} companies as a network and calculate the
          smallest settlement plan.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted">
          Only invoices marked verified and eligible are included. Every recommendation shows
          exactly which obligations contributed to it.
        </p>
        <Button className="mt-6" size="lg" onClick={runOptimizationNow}>
          Run Optimization
        </Button>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <SettlementComparison />
    </motion.div>
  );
}
