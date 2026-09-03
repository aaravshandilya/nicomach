"use client";

import { useMemo, useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  MarkerType,
  Node,
} from "reactflow";
import "reactflow/dist/style.css";
import { motion, AnimatePresence } from "framer-motion";
import { useDashboard } from "../DashboardProvider";
import { CompanyNode, CompanyNodeData } from "./CompanyNode";
import { circleLayout } from "./layout";
import { SettlementPayment } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { IconCheck } from "../icons";

const nodeTypes = { company: CompanyNode };

export function NetworkGraph({ height = 620 }: { height?: number }) {
  const { result, networkView, setNetworkView, selectedCompany, setSelectedCompany } =
    useDashboard();
  const [selectedPayment, setSelectedPayment] = useState<SettlementPayment | null>(null);

  const companies = result.participatingCompanies;
  const positions = useMemo(() => circleLayout(companies), [companies]);

  const bestPosition = useMemo(() => {
    const map = new Map<string, { netPosition: number; currency: string }>();
    for (const group of result.groups) {
      for (const p of group.positions) {
        const existing = map.get(p.company);
        if (!existing || Math.abs(p.netPosition) > Math.abs(existing.netPosition)) {
          map.set(p.company, { netPosition: p.netPosition, currency: group.currency });
        }
      }
    }
    return map;
  }, [result.groups]);

  const nodes: Node<CompanyNodeData>[] = useMemo(
    () =>
      companies.map((company) => {
        const pos = positions.get(company) ?? { x: 0, y: 0 };
        const best = bestPosition.get(company);
        return {
          id: company,
          type: "company",
          position: pos,
          data: {
            label: company,
            netPosition: best?.netPosition ?? 0,
            currency: best?.currency ?? "USD",
            onSelect: setSelectedCompany,
            selected: selectedCompany === company,
          },
          draggable: false,
        };
      }),
    [companies, positions, bestPosition, selectedCompany, setSelectedCompany]
  );

  const payments = useMemo(() => {
    const list: SettlementPayment[] = [];
    for (const group of result.groups) {
      list.push(...(networkView === "original" ? group.originalPayments : group.optimizedPayments));
    }
    return list;
  }, [result.groups, networkView]);

  const maxAmount = useMemo(() => Math.max(1, ...payments.map((p) => p.amount)), [payments]);

  const edges: Edge[] = useMemo(
    () =>
      payments.map((p) => ({
        id: p.id,
        source: p.from,
        target: p.to,
        animated: networkView === "optimized",
        style: {
          stroke: networkView === "optimized" ? "#DEC177" : "#C4A052",
          strokeWidth: 1 + (p.amount / maxAmount) * 3,
          opacity: networkView === "optimized" ? 0.9 : 0.55,
        },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#C4A052", width: 14, height: 14 },
        data: p,
      })),
    [payments, networkView, maxAmount]
  );

  return (
    <div className="relative">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-full border border-border-gold p-1">
          {(["original", "optimized"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setNetworkView(v)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium capitalize transition-colors ${
                networkView === v ? "bg-gold text-bg-primary" : "text-cream/70 hover:text-cream"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted">
          {payments.length} payment{payments.length === 1 ? "" : "s"} &middot; click a node or
          connection for details
        </p>
      </div>

      <div
        style={{ height }}
        className="overflow-hidden rounded-2xl border border-border-gold bg-bg-secondary/40"
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.18 }}
          minZoom={0.4}
          maxZoom={1.5}
          proOptions={{ hideAttribution: true }}
          onEdgeClick={(_, edge) => setSelectedPayment(edge.data as SettlementPayment)}
          onPaneClick={() => {
            setSelectedCompany(null);
            setSelectedPayment(null);
          }}
        >
          <Background variant={BackgroundVariant.Dots} color="#3F4A35" gap={24} size={1} />
          <Controls
            showInteractive={false}
            className="!border !border-border-gold !bg-bg-elevated [&>button]:!border-border-gold [&>button]:!bg-bg-elevated [&>button]:!fill-cream [&>button]:!text-cream"
          />
        </ReactFlow>
      </div>

      <AnimatePresence>
        {selectedPayment && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="absolute inset-x-4 bottom-4 rounded-xl border border-gold/40 bg-bg-primary/95 p-4 shadow-card backdrop-blur sm:inset-x-auto sm:right-4 sm:w-80"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-widest2 text-muted">Settlement</p>
                <p className="mt-1 text-sm text-cream">
                  {selectedPayment.from} <span className="text-gold">&rarr;</span>{" "}
                  {selectedPayment.to}
                </p>
                <p className="mt-1 font-sans text-lg font-bold tabular-nums text-gold-light">
                  {formatCurrency(selectedPayment.amount, selectedPayment.currency)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPayment(null)}
                className="text-muted hover:text-cream"
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <div className="mt-3 border-t border-border-gold pt-3">
              <p className="mb-2 flex items-center gap-1.5 text-xs text-muted">
                <IconCheck width={12} height={12} className="text-success" />
                Contributing obligations ({selectedPayment.contributingInvoiceIds.length})
              </p>
              <div className="max-h-28 space-y-1 overflow-y-auto pr-1">
                {selectedPayment.contributingInvoiceIds.map((id) => (
                  <p key={id} className="text-xs text-cream/80">
                    {id}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
