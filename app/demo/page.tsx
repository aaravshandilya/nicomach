import type { Metadata } from "next";
import { DemoDashboard } from "@/components/dashboard/DemoDashboard";

export const metadata: Metadata = {
  title: "Demo Dashboard — NicoMach",
  description: "Synthetic-data demonstration of NicoMach's settlement optimization analysis.",
};

export default function DemoPage() {
  return <DemoDashboard />;
}
