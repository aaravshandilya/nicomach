# NicoMach

Marketing site and interactive demo dashboard for NicoMach, a read-only cash flow
optimization platform for verified invoices between independent businesses.
NicoMach analyzes obligations and recommends settlement plans with fewer
payments and less gross cash movement. It does not hold, transfer, lend, or
invest money.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- React Flow (`reactflow`) for the interactive payment network graph
- Recharts
- Papaparse (CSV import/export) + jsPDF (summary report export)
- Self-hosted fonts via `@fontsource/cormorant-garamond` and `@fontsource/inter`

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. The marketing site is at `/`; the interactive
demo dashboard (synthetic data, CSV upload, network graph, optimization
engine, CSV/PDF export) is at `/demo`.

## Production build

```bash
npm run build
npm start
```

## Project structure

- `app/` — routes (`/`, `/demo`, `/privacy`, `/terms`, `/api/contact`)
- `components/home/` — marketing page sections (Hero, ProblemSection,
  DollarExample, HowItWorks, ResultsSection, TrustSecurity, MarketContext,
  WhyNicoMach, About, CTASection, ContactForm)
- `components/dashboard/` — the `/demo` app (sidebar/mobile tabs, summary
  cards, CSV upload, invoice table, network graph, optimization results,
  reports/export, settings)
- `components/logo/` — the parametric laurel wreath mark (`lib/laurel.ts`
  generates the geometry; `LaurelWreath`, `WreathMark`, `Wordmark`, and
  `LoadingWreath` all render from it, so the brand mark stays consistent
  everywhere it appears)
- `components/ui/` — shared primitives (Button, MetricCard/AnimatedNumber,
  SectionHeading, GreekKeyPattern)
- `lib/` — domain types, the netting/optimization algorithm
  (`optimization.ts`), synthetic sample data generation (`sampleData.ts`),
  CSV parsing/export (`csv.ts`), PDF export (`pdf.ts`), and
  `useReducedMotionSafe` (a hydration-safe replacement for framer-motion's
  `useReducedMotion` — see note below)
- `scripts/gen-icon.mjs` — regenerates the favicon/app icons from the same
  wreath geometry used elsewhere; rerun it if the wreath design changes

## Notes for future work

- **Reduced motion / hydration**: use `lib/useReducedMotionSafe.ts` instead
  of framer-motion's `useReducedMotion()` in any code path that affects
  initial render output (not just animation props). Framer Motion's hook can
  return `true` on the very first client render, before hydration
  reconciles against server-rendered markup that always assumes motion is
  allowed — branching visible markup on it causes hydration mismatches.
- **No `Math.random()` in render paths that run on both server and client**
  (e.g. particle timing in `HeroNetwork.tsx`) — use a deterministic seed and
  round to a fixed number of decimals, since raw floating-point math can
  differ in the last few digits between server and client JS engines.
- The optimization engine is a deterministic, explainable greedy
  min-cash-flow matching (no ML/AI) — every recommended settlement payment
  traces back to the specific invoices that produced it (see
  `contributingInvoiceIds` in `lib/optimization.ts` and the expandable rows
  in `SettlementComparison.tsx`).
- Copy throughout avoids unsupported claims (no SOC 2/bank-grade/regulated
  language without those controls actually being in place) — keep new copy
  to the same standard.
