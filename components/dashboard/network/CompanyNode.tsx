"use client";

import { memo } from "react";
import { Handle, Position } from "reactflow";
import { cn, formatCurrency } from "@/lib/utils";

export interface CompanyNodeData {
  label: string;
  netPosition: number;
  currency: string;
  onSelect?: (name: string) => void;
  selected?: boolean;
}

function CompanyNodeInner({ data }: { data: CompanyNodeData }) {
  const isReceiver = data.netPosition > 0.5;
  const isPayer = data.netPosition < -0.5;

  return (
    <button
      type="button"
      onClick={() => data.onSelect?.(data.label)}
      className={cn(
        "w-[150px] rounded-xl border bg-bg-elevated/95 px-3 py-2.5 text-left shadow-card backdrop-blur-sm transition-colors",
        data.selected ? "border-gold shadow-gold-sm" : "border-border-gold hover:border-gold/50"
      )}
    >
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
      <p className="truncate text-xs font-medium text-cream">{data.label}</p>
      <p
        className={cn(
          "mt-1 font-sans text-sm font-bold tabular-nums",
          isReceiver && "text-success",
          isPayer && "text-gold-light",
          !isReceiver && !isPayer && "text-muted"
        )}
      >
        {data.netPosition >= 0 ? "+" : ""}
        {formatCurrency(data.netPosition, data.currency)}
      </p>
      <p className="text-[0.6rem] uppercase tracking-widest2 text-muted">
        {isReceiver ? "Net receiver" : isPayer ? "Net payer" : "Settled"}
      </p>
    </button>
  );
}

export const CompanyNode = memo(CompanyNodeInner);
