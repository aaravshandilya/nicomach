"use client";

import { createContext, useContext, useMemo, useState, useCallback } from "react";
import { Invoice, OptimizationResult, ValidationError } from "@/lib/types";
import { SAMPLE_INVOICES } from "@/lib/sampleData";
import { runOptimization } from "@/lib/optimization";

export type DashboardSection =
  | "overview"
  | "obligations"
  | "network"
  | "optimization"
  | "reports"
  | "settings";

export type NetworkView = "original" | "optimized";

interface DashboardState {
  invoices: Invoice[];
  validationErrors: ValidationError[];
  dataSource: "sample" | "upload";
  section: DashboardSection;
  networkView: NetworkView;
  hasRunOptimization: boolean;
  result: OptimizationResult;
  selectedCompany: string | null;
  setSection: (s: DashboardSection) => void;
  setNetworkView: (v: NetworkView) => void;
  loadSampleData: () => void;
  loadUploadedData: (invoices: Invoice[], errors: ValidationError[]) => void;
  runOptimizationNow: () => void;
  setSelectedCompany: (c: string | null) => void;
}

const DashboardContext = createContext<DashboardState | null>(null);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [invoices, setInvoices] = useState<Invoice[]>(SAMPLE_INVOICES);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [dataSource, setDataSource] = useState<"sample" | "upload">("sample");
  const [section, setSection] = useState<DashboardSection>("overview");
  const [networkView, setNetworkView] = useState<NetworkView>("original");
  const [hasRunOptimization, setHasRunOptimization] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  const result = useMemo(() => runOptimization(invoices), [invoices]);

  const loadSampleData = useCallback(() => {
    setInvoices(SAMPLE_INVOICES);
    setValidationErrors([]);
    setDataSource("sample");
    setHasRunOptimization(false);
    setNetworkView("original");
  }, []);

  const loadUploadedData = useCallback((newInvoices: Invoice[], errors: ValidationError[]) => {
    setInvoices(newInvoices);
    setValidationErrors(errors);
    setDataSource("upload");
    setHasRunOptimization(false);
    setNetworkView("original");
  }, []);

  const runOptimizationNow = useCallback(() => {
    setHasRunOptimization(true);
    setNetworkView("optimized");
  }, []);

  const value: DashboardState = {
    invoices,
    validationErrors,
    dataSource,
    section,
    networkView,
    hasRunOptimization,
    result,
    selectedCompany,
    setSection,
    setNetworkView,
    loadSampleData,
    loadUploadedData,
    runOptimizationNow,
    setSelectedCompany,
  };

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboard must be used within DashboardProvider");
  return ctx;
}
