# NicoMach — marketing site

A read-only settlement analysis platform. This repository holds the public
site: React 18 + TypeScript + Vite + Tailwind, with the whole page compiled
into one self-contained HTML file.

## Hosting on GitHub Pages

There are two routes; **the first needs no build at all.**

### 1. Serve the prebuilt file (simplest)

`docs/index.html` is the finished site — every byte of CSS, JavaScript and the
typeface is inlined, so there are no asset paths to break.

1. Push this repository to GitHub.
2. **Settings → Pages → Source: Deploy from a branch**, branch `main`, folder
   `/docs`.

It works at `you.github.io` and at `you.github.io/repo/` without any change,
because the file references nothing outside itself. `docs/.nojekyll` is there
so Pages serves it verbatim.

### 2. Build with Actions

`.github/workflows/deploy.yml` runs `npm run build` and publishes `dist/`.
Set **Settings → Pages → Source: GitHub Actions**. `VITE_BASE` is passed as
`/<repo-name>/` so a project-page sub-path resolves correctly.

## Local development

```bash
npm install
npm run dev            # http://localhost:5173
npm run build          # dist/
bash ../scripts/bundle-artifact.sh   # rebuilds bundle.html, the single file
```

After rebuilding, copy the single file into place:

```bash
cp bundle.html docs/index.html
```

## Layout

```
src/
  index.css              tokens, type scale, the .row / .fld / .tbl primitives
  font.css               Figtree Variable, embedded as base64
  App.tsx                section order
  components/
    Nav.tsx              fixed transparent bar that reads the ground beneath it
    Ground.tsx           the hero surface — plane, wall, raking light
    Hero.tsx  Market.tsx  Netting.tsx  Problem.tsx  Process.tsx
    Console.tsx          the settlement ledger, with its loading state
    Results.tsx  Security.tsx  Position.tsx  About.tsx  FAQ.tsx
    Landscape.tsx  Pilot.tsx  Footer.tsx
    Demo.tsx             the four-stage demonstration overlay
    Legal.tsx            terms of use and privacy policy
    CookieBar.tsx
reference/
  design-sources.md      what was measured off everyday.io, and the departures
  demo-data.md           the arithmetic behind the demonstration ledger
docs/
  index.html             the built site, ready to serve
```

## Two things to do before this goes live

- **The pilot form does not submit anywhere.** It validates and shows a
  confirmation; nothing is transmitted. Wire it to a form endpoint (Formspree,
  Basin, a Worker, your own API) before you publish.
- **The terms and privacy policy are written in plain language and have not
  been reviewed by counsel.** They describe accurately what the site does and
  does not do, but have a lawyer read them before commercial launch.

## Content rules this build follows

No invented metrics, customer names, logos, quotes, testimonials or
certifications. The €1.84T figure is attributed to PwC and carries its scope
caveat. Every illustrative figure is labelled illustrative. The disclaimers —
"Read-only analysis. No custody of funds. Every settlement requires approval.",
"Illustrative example based on synthetic data, not a guaranteed outcome.", and
the early-stage footer notice — appear verbatim.
