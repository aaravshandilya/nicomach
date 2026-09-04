"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Line, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useDashboard } from "../DashboardProvider";
import { sphereLayout } from "./layout3d";
import { SettlementPayment } from "@/lib/types";
import { cn, formatCurrency } from "@/lib/utils";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

const GOLD = "#C4A052";
const GOLD_LIGHT = "#DEC177";
const SUCCESS = "#798C68";
const MUTED = "#A8A696";

function statusColor(netPosition: number) {
  if (netPosition > 0.5) return SUCCESS;
  if (netPosition < -0.5) return GOLD_LIGHT;
  return MUTED;
}

interface NodeDatum {
  id: string;
  position: [number, number, number];
  netPosition: number;
  currency: string;
}

interface EdgeDatum {
  id: string;
  fromId: string;
  toId: string;
  from: [number, number, number];
  to: [number, number, number];
  amount: number;
  currency: string;
}

function CompanyNode3D({
  node,
  selected,
  dimmed,
  onSelect,
}: {
  node: NodeDatum;
  selected: boolean;
  dimmed: boolean;
  onSelect: (id: string | null) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const color = statusColor(node.netPosition);
  const isReceiver = node.netPosition > 0.5;
  const isPayer = node.netPosition < -0.5;

  return (
    <group position={node.position}>
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onSelect(selected ? null : node.id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <sphereGeometry args={[selected || hovered ? 0.22 : 0.16, 24, 24]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={selected || hovered ? 1.1 : 0.55}
          roughness={0.35}
          metalness={0.2}
          transparent
          opacity={dimmed ? 0.25 : 1}
        />
      </mesh>
      <Html distanceFactor={9} center zIndexRange={[10, 0]} style={{ pointerEvents: "none" }}>
        <div
          className={cn(
            "pointer-events-none w-[128px] select-none rounded-lg border px-2 py-1.5 text-center backdrop-blur-sm transition-opacity",
            selected
              ? "border-gold bg-bg-primary/90 shadow-gold-sm"
              : "border-border-gold bg-bg-primary/75",
            dimmed ? "opacity-30" : "opacity-100"
          )}
        >
          <p className="truncate text-[0.6rem] font-medium text-cream">{node.id}</p>
          <p
            className={cn(
              "font-sans text-[0.68rem] font-bold tabular-nums",
              isReceiver && "text-success",
              isPayer && "text-gold-light",
              !isReceiver && !isPayer && "text-muted"
            )}
          >
            {node.netPosition >= 0 ? "+" : ""}
            {formatCurrency(node.netPosition, node.currency)}
          </p>
        </div>
      </Html>
    </group>
  );
}

function FlowEdge({
  from,
  to,
  amount,
  currency,
  maxAmount,
  optimized,
  reduceMotion,
  speedSeed,
  dimmed,
  emphasized,
}: {
  from: [number, number, number];
  to: [number, number, number];
  amount: number;
  currency: string;
  maxAmount: number;
  optimized: boolean;
  reduceMotion: boolean;
  speedSeed: number;
  dimmed: boolean;
  emphasized: boolean;
}) {
  const particleRef = useRef<THREE.Mesh>(null);

  const curve = useMemo(() => {
    const a = new THREE.Vector3(...from);
    const b = new THREE.Vector3(...to);
    const mid = a.clone().add(b).multiplyScalar(0.5);
    const outward =
      mid.lengthSq() > 0.0001
        ? mid.clone().normalize().multiplyScalar(mid.length() * 0.14 + 0.3)
        : new THREE.Vector3(0, 0.3, 0);
    const control = mid.add(outward);
    return new THREE.QuadraticBezierCurve3(a, control, b);
  }, [from, to]);

  const points = useMemo(() => curve.getPoints(24), [curve]);
  const weight = (0.6 + (amount / maxAmount) * 2.2) * (emphasized ? 1.3 : 1);
  const color = optimized ? GOLD_LIGHT : GOLD;
  const baseOpacity = optimized ? 0.85 : 0.4;
  const opacity = dimmed ? baseOpacity * 0.12 : emphasized ? Math.min(1, baseOpacity * 1.3) : baseOpacity;
  const speed = 0.15 + (amount / maxAmount) * 0.35;

  useFrame(({ clock }) => {
    if (reduceMotion || !particleRef.current) return;
    const t = (clock.elapsedTime * speed + speedSeed) % 1;
    particleRef.current.position.copy(curve.getPoint(t));
  });

  const midpoint = useMemo(() => curve.getPoint(0.5), [curve]);

  return (
    <group>
      <Line points={points} color={color} lineWidth={weight} transparent opacity={opacity} />
      {!reduceMotion && !dimmed && (
        <mesh ref={particleRef} position={points[0]}>
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshBasicMaterial color={GOLD_LIGHT} transparent opacity={dimmed ? 0.12 : 1} />
        </mesh>
      )}
      {optimized && !dimmed && (
        <Html position={midpoint} distanceFactor={10} center zIndexRange={[5, 0]} style={{ pointerEvents: "none" }}>
          <div className="pointer-events-none whitespace-nowrap rounded-full border border-border-gold bg-bg-primary/80 px-2 py-0.5 text-[0.58rem] font-medium tabular-nums text-gold-light backdrop-blur-sm">
            {formatCurrency(amount, currency)}
          </div>
        </Html>
      )}
    </group>
  );
}

function Scene({
  nodes,
  edges,
  maxAmount,
  networkView,
  selectedCompany,
  setSelectedCompany,
  reduceMotion,
  radius,
}: {
  nodes: NodeDatum[];
  edges: EdgeDatum[];
  maxAmount: number;
  networkView: "original" | "optimized";
  selectedCompany: string | null;
  setSelectedCompany: (id: string | null) => void;
  reduceMotion: boolean;
  radius: number;
}) {
  return (
    <>
      <ambientLight intensity={0.55} />
      <pointLight position={[radius * 2, radius * 2, radius * 2]} intensity={60} color="#F4EBD8" />
      <pointLight position={[-radius * 2, -radius, -radius * 2]} intensity={30} color={GOLD} />

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius * 1.22, 0.004, 8, 96]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.18} />
      </mesh>

      {edges.map((e, i) => {
        const touchesSelected =
          !!selectedCompany && (e.fromId === selectedCompany || e.toId === selectedCompany);
        return (
          <FlowEdge
            key={e.id}
            from={e.from}
            to={e.to}
            amount={e.amount}
            currency={e.currency}
            maxAmount={maxAmount}
            optimized={networkView === "optimized"}
            reduceMotion={reduceMotion}
            speedSeed={(i * 0.173) % 1}
            dimmed={!!selectedCompany && !touchesSelected}
            emphasized={touchesSelected}
          />
        );
      })}

      {nodes.map((n) => {
        const connected =
          !selectedCompany ||
          n.id === selectedCompany ||
          edges.some(
            (e) =>
              (e.fromId === selectedCompany && e.toId === n.id) ||
              (e.toId === selectedCompany && e.fromId === n.id)
          );
        return (
          <CompanyNode3D
            key={n.id}
            node={n}
            selected={selectedCompany === n.id}
            dimmed={!connected}
            onSelect={setSelectedCompany}
          />
        );
      })}

      <OrbitControls
        enablePan={false}
        minDistance={radius * 1.6}
        maxDistance={radius * 4}
        autoRotate={!reduceMotion}
        autoRotateSpeed={0.5}
        enableDamping
        dampingFactor={0.08}
      />
    </>
  );
}

export function NetworkGraph3D({ height = 620 }: { height?: number }) {
  const { result, networkView, selectedCompany, setSelectedCompany } = useDashboard();
  const reduceMotion = useReducedMotionSafe();

  const companies = result.participatingCompanies;
  const radius = Math.max(3.2, Math.sqrt(Math.max(companies.length, 1)) * 1.5);
  const positions = useMemo(() => sphereLayout(companies, radius), [companies, radius]);

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

  const nodes: NodeDatum[] = useMemo(
    () =>
      companies.map((id) => {
        const best = bestPosition.get(id);
        return {
          id,
          position: positions.get(id) ?? [0, 0, 0],
          netPosition: best?.netPosition ?? 0,
          currency: best?.currency ?? "USD",
        };
      }),
    [companies, positions, bestPosition]
  );

  const payments: SettlementPayment[] = useMemo(() => {
    const list: SettlementPayment[] = [];
    for (const group of result.groups) {
      list.push(...(networkView === "original" ? group.originalPayments : group.optimizedPayments));
    }
    return list;
  }, [result.groups, networkView]);

  const maxAmount = useMemo(() => Math.max(1, ...payments.map((p) => p.amount)), [payments]);

  const edges: EdgeDatum[] = useMemo(
    () =>
      payments
        .filter((p) => positions.has(p.from) && positions.has(p.to))
        .map((p) => ({
          id: p.id,
          fromId: p.from,
          toId: p.to,
          from: positions.get(p.from)!,
          to: positions.get(p.to)!,
          amount: p.amount,
          currency: p.currency,
        })),
    [payments, positions]
  );

  const selectedNode = selectedCompany ? nodes.find((n) => n.id === selectedCompany) : undefined;
  const selectedPayments = selectedCompany
    ? payments.filter((p) => p.from === selectedCompany || p.to === selectedCompany)
    : [];
  const selectedOutbound = selectedPayments
    .filter((p) => p.from === selectedCompany)
    .reduce((sum, p) => sum + p.amount, 0);
  const selectedInbound = selectedPayments
    .filter((p) => p.to === selectedCompany)
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div
      style={{ height }}
      className="relative overflow-hidden rounded-2xl border border-border-gold bg-bg-secondary/40"
    >
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, radius * 0.5, radius * 2.4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        onPointerMissed={() => setSelectedCompany(null)}
      >
        <Scene
          nodes={nodes}
          edges={edges}
          maxAmount={maxAmount}
          networkView={networkView}
          selectedCompany={selectedCompany}
          setSelectedCompany={setSelectedCompany}
          reduceMotion={reduceMotion}
          radius={radius}
        />
      </Canvas>
      <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-[0.65rem] text-muted">
        Drag to rotate &middot; scroll to zoom &middot; click a company for detail
      </p>

      {selectedNode && (
        <div className="absolute inset-x-4 bottom-4 rounded-xl border border-gold/40 bg-bg-primary/95 p-4 shadow-card backdrop-blur sm:inset-x-auto sm:right-4 sm:w-80">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-widest2 text-muted">Company</p>
              <p className="mt-1 text-sm text-cream">{selectedNode.id}</p>
              <p
                className={cn(
                  "mt-1 font-sans text-lg font-bold tabular-nums",
                  selectedNode.netPosition >= 0 ? "text-success" : "text-gold-light"
                )}
              >
                {selectedNode.netPosition >= 0 ? "+" : ""}
                {formatCurrency(selectedNode.netPosition, selectedNode.currency)}
              </p>
              <p className="text-xs text-muted">
                {selectedNode.netPosition >= 0 ? "Net receiver" : "Net payer"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSelectedCompany(null)}
              className="text-muted hover:text-cream"
              aria-label="Close"
            >
              &times;
            </button>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 border-t border-border-gold pt-3 text-xs">
            <div>
              <p className="text-muted">Sending</p>
              <p className="mt-0.5 font-sans font-semibold tabular-nums text-cream">
                {formatCurrency(selectedOutbound, selectedNode.currency)}
              </p>
            </div>
            <div>
              <p className="text-muted">Receiving</p>
              <p className="mt-0.5 font-sans font-semibold tabular-nums text-cream">
                {formatCurrency(selectedInbound, selectedNode.currency)}
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs text-muted">
            {selectedPayments.length} connected payment{selectedPayments.length === 1 ? "" : "s"} in
            this view
          </p>
        </div>
      )}
    </div>
  );
}
