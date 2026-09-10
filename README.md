# NicoMach — marketing site

The NicoMach marketing site: a single-page editorial build in React + Tailwind
that compiles to one self-contained HTML file.

## Hosting on GitHub Pages

The build output is **one HTML file with everything inlined** — no JS bundle, no
CSS file, no image requests. That matters here: a GitHub project site is served
from `https://<user>.github.io/<repo>/`, and a conventional build deployed there
requests its assets from the domain root and 404s. A file with no asset
references can't have that problem, so it works at the apex domain, at a
subpath, or opened straight off disk, with no `base` to configure.

Two ways to turn it on. Pick one.

**A — GitHub Actions (recommended; rebuilds on every push)**

`.github/workflows/deploy.yml` is already here. After pushing:
Settings → Pages → Source → **GitHub Actions**. That's the whole setup. Every
push to `main` rebuilds and redeploys.

**B — Branch deploy (no build, no Actions minutes)**

`docs/index.html` is the prebuilt site, committed. After pushing:
Settings → Pages → Source → **Deploy from a branch** → `main` / **`/docs`**.

If you take route B, remember `docs/` is a build output — regenerate it after
changing anything in `src/`:

```bash
pnpm build:single && cp dist-single/index.html docs/index.html
```

A `.nojekyll` file sits in both output folders so Pages skips Jekyll processing.

**Custom domain** — add a `CNAME` file containing your domain to `dist-single/`
(route A: add a step to the workflow) or to `docs/` (route B), then point the DNS
at GitHub.

## Run it locally

```bash
pnpm install     # or npm install
pnpm dev         # http://localhost:5173
```

## Build

```bash
pnpm build:single   # -> dist-single/index.html   one self-contained file (what Pages serves)
pnpm build          # -> dist/                    conventional Vite build, split assets
```

If you deploy the conventional `dist/` build to a project page instead, set the
base path or the assets will 404:

```bash
VITE_BASE=/nicomach-site/ pnpm build
```

One build-tooling note: `pnpm build:single` runs Parcel and then `html-inline`.
`html-inline` tries to resolve absolute URLs as local files and crashes on the
Google Fonts `<link>`, so `scripts/build-single.mjs` strips the font tags into a
temporary entry, bundles, and re-injects them into the finished file. It throws
if the re-injection fails, so a silently font-less build can't ship.

## Structure

```
index.html                Vite entry (carries the font link + meta description)
scripts/build-single.mjs  the single-file build
docs/                     prebuilt site for branch-based Pages deploys
src/
  index.css               design tokens, ground system, type scale
  App.tsx                 section order + demo overlay state
  lib/sections.ts         the section index (drives the pinned footer nav)
  hooks/
    useChrome.ts          tracks which ground sits under the fixed chrome
    useInView.ts          one-shot scroll reveal
    useReducedMotionSafe.ts
  components/
    chrome/               TopBar, SectionIndex — the two pinned elements
    marks/                Statue, WreathMark, GreekKeyRing, CrackRule,
                          CrackFrame, VeinIcon
    graphs/HeroNetwork.tsx  six-node obligation network
    ui/                   ArrowLink, Figure (count-up), SectionHead
    sections/             one file per numbered section
    Annihilation.tsx      full-screen debt-annihilation demo
docs/NicoMach-Visual-Redesign-Brief.md   the brief this was built against
```

## Design system

**Grounds.** The page runs on one inverting token set. A section declares
`data-ground="ink | panel | cream | stone"`; `--bg`, `--fg`, `--dim`, `--rule`
and `--accent` resolve from it, and the pinned chrome reads whichever ground sits
under it and inverts to match. Adding a section means picking a ground — nothing
else changes.

| token | hex | role |
|---|---|---|
| ink | `#050705` | base ground |
| panel | `#0C110D` | alternating ground |
| elevated | `#121912` | raised surfaces |
| gold | `#C4A052` | rules, accents |
| gold.light | `#DEC177` | accent on dark grounds |
| gold.deep | `#8A6B22` | accent on light grounds (contrast) |
| cream | `#F4EBD8` | text on dark / light breakout ground |
| fog | `#A8A696` | secondary text |
| marble | `#DFC493` | stone ground, statue highlight |
| marble.dark | `#B99A5E` | statue shading |
| pouch | `#8B6B3E` | the coin pouch |
| success | `#798C68` | positive deltas |
| olive | `#3F4A35` | CTA wash |

**Type.** Archivo for the big wordmark only — set with SVG `textLength`, so it
spans the measure exactly whether or not the font loads. Cormorant Garamond for
statements, Inter 300 at a 13px base for everything else.

**Rules, not boxes.** No cards, rounded corners, shadows or gradients anywhere.
Hierarchy is hairline rules, ledger rows, grid alignment and whitespace. The
crack-glow treatment appears on every section-transition rule plus exactly three
framed elements: the hero metric readout, the About entries, and the pilot form.

## Content rules baked into this build

Every figure is one of the real, already-labeled numbers (the €1.84T PwC
estimate; 14 → 4 payments; 10 removed; 81% / −71%). No invented stats, client
logos, testimonials or certification badges. Every standing disclaimer is carried
verbatim and set at eyebrow weight rather than shrunk.

Card body copy for The Problem, Why NicoMach and Trust & Security was not in the
brief's appendix — only the titles were — so those one-liners were written from
language already used elsewhere on the site, mostly the FAQ answers. Worth
diffing against production copy.

The contact form is client-side only; submitting sets a thank-you state and sends
nothing. Wire it to an endpoint in `src/components/sections/Pilot.tsx`.

## Push it

This folder is already a git repository with history.

```bash
git remote add origin git@github.com:<you>/nicomach-site.git
git push -u origin main
```
