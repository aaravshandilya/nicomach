# Where this design came from

The brief asked for a trending site on siteinspire.com to be chosen, shown
before modelling, and its HTML used as the basis for the rebuild. The site
chosen — at your direction — was **everyday.io**.

## Structure — the thing that actually makes it the reference

everyday.io is **not a scrolling brochure**. It is a sequence of full-bleed
frames, one idea each, carrying roughly thirty words. Restyling a long page
in its colours is not the same site. So this build is eight panels:

| # | Panel | The one idea |
| --- | --- | --- |
| 1 | Hero | Move less money. Unlock more liquidity. |
| 2 | Market context | €1.84T |
| 3 | The problem | Businesses optimise everything except the obligations between them. |
| 4 | A worked example | Three obligations. Nothing owed. *(interactive)* |
| 5 | The ledger | Nine obligations. Two transfers. *(the live ledger)* |
| 6 | The result | 14 → 4 |
| 7 | Trust | Nothing to trust us with. |
| 8 | Pilot | Run it against your own ledger. |

Every panel is exactly one viewport tall, has its own ground, and pins its
eyebrow to the top of the frame.

Everything dense — the three problem items, the four process steps, the four
security principles, the positioning, the competitive table, the founders and
the FAQ — moved into **the brief**, a reading view opened from the nav, the
problem panel, the trust panel and the footer. Nothing was cut; it stopped
living on the front page.

## What was measured, not eyeballed

The values below were read off the live everyday.io page in a browser, not
estimated from a screenshot.

| Property | everyday.io | NicoMach |
| --- | --- | --- |
| H1 | 38.4px, weight 500, letter-spacing −1.15px (≈ −0.03em), line-height 44.6px (≈1.16) | `clamp(2.3rem, 4.6vw, 3.95rem)`, weight 500, ls −0.035em, lh 1.08 |
| Body | 16px, weight 400, `rgb(33,33,33)` | 16.5px, weight 400, `#1B1916` |
| Nav | `position: fixed`, height 62px, fully transparent, zero padding; items spread at wide intervals across the whole viewport (brand x=16, then x=294, x=516, CTA x=740 at a 947px viewport); 22px, weight 500, ls −0.44px, sentence case | identical structure — fixed, 62px, transparent, items at `justify-evenly` across the full width, 21px / 500 / −0.02em |
| Sections | one ground, generous heights (910, 1229, 935, 1374, 613, 1390, 605, 1237, 518px), custom `pt-page-y` spacing tokens | `--band-y: clamp(88px, 11vw, 172px)` |
| Hero | full-bleed photograph of a warm material under raking daylight; centred headline; small dark translucent CTA | a plane, the wall behind it, and a window's worth of light that breaks at the seam — built in SVG, not photographed |
| Consent | a real cookie bar with an explicit Decline and a link to the privacy policy | same, with nothing actually set to consent to |

## The two deliberate departures

**Typeface.** everyday.io self-hosts a proprietary face literally named
`Everyday` (`/fonts/Everyday-Medium.woff2`, weights 300–800). It is licensed
to them and cannot be used here. **Figtree** stands in: a geometric-humanist
sans with the same single-storey `g`, warm terminals and tight tracking. It is
under the SIL Open Font License and is embedded in the page as base64, so the
site makes **no external font request at all** — nothing to fail on a slow
network, a blocked CDN, or GitHub Pages.

**The hero image.** everyday.io shows its product. NicoMach has no product
photograph, and inventing one — a stock desk, a fake dashboard, a rendered
device — would be exactly the fakery the brief rules out. The honest
translation of "a warm material under raking light" is the material and the
light themselves, drawn as geometry: a plane, a wall, a shaft that shears at
the seam where they meet, and the grain of the surface. The product appears
where it should — in the ledger, with real arithmetic.

## Against the banned list

| Banned | How this build stands |
| --- | --- |
| Harsh gradients | None. The only tonal transitions are a soft light shaft and its falloff on a single hue. |
| Pure white background | The paper ground is `#F5F1E9`. There is no `#FFFFFF` anywhere. |
| Rainbow / neon / basic pastels / purple + black | One earth palette: paper, sand, slate. |
| Drop shadows, liquid glass | None. |
| Three feature cards in a row | Replaced by `.row` — a baseline-aligned ledger row. There is no card grid on the page. |
| Soft corner radius | `border-radius: 0` on every control, container and input. |
| Radial orbs, dot grids, sparkle icons, animated arrows | None. There are no decorative icons on the page at all. |
| Lucide icons | No icon library is installed. |
| Inter / Geist / Space Grotesk | Figtree. |
| Coloured left stripe, bento grid, terminal window | None. The ledger is a data table on paper, not a terminal. |
| Checkmark bullets, emoji | None. |
| "It's not X, it's Y" | Not used. |
| Three pricing tiers | There is no pricing section. |
| Fake testimonials | The one quote on the page is labelled "company position, not a customer quote". |
| *No* real product demos | There is one: the four-stage settlement console, plus the interactive worked example. |
| *No* TOS or privacy policy | Both are written and reachable from the footer and the cookie bar. |
| *No* skeleton loaders | The ledger renders a skeleton while it loads, then the data. |
| Hover animations | Hover states are instant — an underline or an opacity step, no transforms or motion. |
