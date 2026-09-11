# NicoMach — Visual Redesign Brief

**What this document is:** a from-the-real-site design direction, written against NicoMach's actual production copy, actual color tokens, and actual components (pulled directly from the `nicomach` codebase — nothing here is a placeholder). It exists to answer one question: how does the current site keep every claim it makes, keep every word it's already earned through several rounds of "no fake claims" editing, and still look like it was made by people with real taste — not like a template with the brand's name swapped in.

Four reference sites came with this brief. None of them get copied. Section 1 says exactly what each one contributes and what gets left on the floor, because two of them lean on fabricated social proof and NicoMach doesn't get to do that — it's pre-revenue, and the whole brand voice up to this point has been built on saying so plainly.

---

## 0. Ground rules

Three things this redesign will not do, stated up front so they don't get lost in the excitement of a moodboard:

1. **No invented numbers, logos, or quotes.** "14+ Awards Worldwide," "78 Happy Clients," a testimonial from a CEO who doesn't exist — that's the fastest way to make a real, honest, pre-revenue platform look like a $200 Dribbble template wearing a new name. Every stat pattern borrowed from the references gets re-filled with NicoMach's real, already-labeled numbers (the €1.84T PwC estimate, the "illustrative example based on synthetic data" comparison, the actual founder bios) or it doesn't ship.
2. **Every existing disclaimer survives.** "Read-only analysis. No custody of funds." "Illustrative example based on synthetic data, not a guaranteed outcome." "NicoMach does not hold or transfer funds." These sentences are load-bearing, not legal garnish — they stay exactly as prominent as they are today, possibly more so, never smaller or grayer just because the new design is prettier.
3. **The palette doesn't get replaced — it gets used with more nerve.** The gold-on-near-black identity is already good. The problem isn't the color scheme; it's that the site uses one visual register (soft fade-up card grids) for eleven very different ideas in a row. The fix is contrast and hierarchy, not a rebrand.

---

## 1. The reference set — what's actually being borrowed

| Reference | What's genuinely strong about it | What NicoMach takes | What NicoMach leaves behind |
|---|---|---|---|
| **A — "Lumora"** (cream agency site, liquid glass-gold sculptural hero object, italic "*impact.*" headline, circular badge, wireframe case-study card) | Confident asymmetry — a light panel crashing into a dark one in the same viewport; one word of the headline getting special treatment instead of the whole line shouting | The light/dark split as an occasional breakout panel; a single italic gold word inside the H1; the fine wireframe-line treatment for a preview card | The liquid-glass hero object itself (NicoMach already has a better, more specific hero visual — see §2) |
| **B — "The Property"** (dark luxury real estate, bronze gradient pill buttons, isometric 3D house, overlapping search bar) | A UI card overlapping the hero image with real confidence — half on the image, half off; gradient buttons that feel tactile, not flat | The overlap-the-hero-image move for the network metric readout; validation that NicoMach's existing gradient-pill `Button` component is already the right idea | The literal isometric real-estate render (wrong industry) and the property-listing search UI |
| **C — "webwandel"** (dark agency, orange accent, marble statue with a colored halo disc, dotted world map, stat row) | A statue as the emotional center of a hero, lit from behind by a colored disc; a full-width "by the numbers" band | The statue-with-halo hero treatment (NicoMach already built this exact idea — a laurel-crowned marble figure with a gold halo — for the debt-annihilation demo; see §6); the full-width stat-band *layout* | The fabricated stat values ("78 Happy Clients," "50+ Successful Projects") and the dotted world map (no real global footprint to show yet — a fake map is a fake map even if the dots are subtle) |
| **D — "Ancient Greek Sculptures"** (near-black event site, marble hand with luminous gold cracks running through it, thin circular scroll-cue, small-caps eyebrow over a large serif headline) | This is the closest sibling to NicoMach's existing identity by a wide margin — marble + gold veins running through a fracture is a genuinely apt metaphor for "value finding a more efficient path through the cracks in a broken payment network" | The gold-veined-marble texture as a recurring material across the whole site (borders, dividers, section transitions); the thin outline circular scroll-cue; validation that the existing eyebrow-over-serif-headline pattern is already correct | Nothing — this one just gets adopted almost wholesale as the site's core material language |

---

## 2. The idea that ties it together

NicoMach's brand already has three assets most redesign briefs would have to invent from nothing: a laurel-wreath emblem, a Greek-key geometric motif, and — as of the debt-annihilation interactive demo — an actual gold-crowned marble statue that catches a coin in a pouch. Reference D's gold-veined marble hand and Reference C's haloed statue aren't new ideas to chase; they're confirmation that the direction already underway is the right one. It just isn't showing up anywhere on the *marketing site itself* yet — it's currently sealed inside one standalone HTML file (§6).

The unifying material for this redesign is **gold-veined marble**: cracked stone with luminous gold light running through the fractures, used the way Reference D uses it — as texture, not illustration. Concretely:

- Card and section borders stop being a flat `1px solid rgba(196,160,82,0.18)` line everywhere and become, in a handful of high-impact spots (the hero, the About cards, the CTA panel), a hairline crack-and-glow — the same gold-on-dark contrast, drawn as a fracture instead of a ruled line.
- The laurel wreath and Greek-key ring (`WreathMark`, `GreekKeyRing` — both already built) get pulled out of the header/footer corners where they currently do favicon-duty and used as large, low-opacity background geometry the way Reference D's sculptures fill their frame.
- The statue from the debt-annihilation demo becomes the site's actual hero figure — not a metaphor for one.

This is a material upgrade, not a rebrand. Every hex value in §3.1 is already in production.

---

## 3. Foundation

### 3.1 Color system

Nothing here is new — this is the exact palette from `tailwind.config.ts`, documented properly for the first time, plus three additions already quietly in use inside the debt-annihilation demo that deserve to be formal tokens instead of one-off hex codes.

| Token | Hex / value | Current usage | Redesign role |
|---|---|---|---|
| `bg.primary` | `#050705` | Page background | Unchanged — the base black stays this warm near-black, not a true `#000` |
| `bg.secondary` | `#0C110D` | Alternating section backgrounds | Unchanged |
| `bg.elevated` | `#121912` | Cards | Unchanged |
| `gold` | `#C4A052` | Borders, icons, dividers | Unchanged — the workhorse accent |
| `gold.light` | `#DEC177` | Headline gradients, active states, glow | Unchanged |
| `cream` | `#F4EBD8` | Primary text | Gets a second job (see below) |
| `muted` | `#A8A696` | Secondary text | Unchanged |
| `success` | `#798C68` | Net-receiver states, positive deltas | Unchanged |
| `olive` | `#3F4A35` | CTA section wash | Unchanged |
| `border.gold` | `rgba(196,160,82,0.18)` | Hairline borders | Reserved for low-emphasis dividers; high-emphasis borders move to the new crack-glow treatment |
| **`marble`** *(new)* | `#DFC493` | Already the statue's stone color in the debt demo | Formalized as the token for any illustrated stone/marble surface — statue renders, texture fills, iconography |
| **`marble.dark`** *(new)* | `#B99A5E` | Already the statue's shadow-stone color | Shading partner to `marble` |
| **`pouch`** *(new)* | `#8B6B3E` | Already the statue's pouch/leather color | For any "container of value" iconography — used sparingly |

**The one deliberate departure:** `cream` (`#F4EBD8`) gets used as an actual light *panel* background — not just text — in one or two breakout moments per page (Reference A's light/dark split). A cream card with near-black text, dropped into an otherwise dark page, reads as a considered accent, not a theme switch, as long as it's rare. Candidates: the pull-quote in §4.9 (About), and the metric readout card overlapping the hero visual.

### 3.2 Type system

Also unchanged at the family level — the upgrade is in how confidently the existing scale gets used.

| Element | Family | Weight / size today | Redesign note |
|---|---|---|---|
| Eyebrow labels | Inter | 600, 0.72rem, `0.28em` tracking, uppercase | Correct as-is (this is Reference D's pattern already) — no change |
| H1 (hero) | Cormorant Garamond | 600, clamp(2.1rem–3.75rem) | Give **one word** the Reference A treatment: italic, `gold-light`, slightly larger — e.g. "Unlock more *liquidity*." instead of the whole line in one weight |
| H2 (section) | Cormorant Garamond | 600, clamp(1.875rem–2.75rem) | Unchanged |
| Body | Inter | 400, 1rem–1.125rem | Unchanged |
| Numerals (stats) | Inter, tabular-nums | 700, 1.6rem–3rem | These are already the site's best-looking element (`AnimatedNumber` count-ups) — give them more room to breathe; see §7's stat-tile spec |
| Italic accent line | Cormorant Garamond italic | 400, 1.25rem–1.5rem, `gold-light/90` | Already used once ("See what never needed to move.") — this device is strong and under-used; repeat it as a one-line "so what" under two or three more section headings instead of only the hero |

### 3.3 Motifs already on hand

No new logo, no new iconography system needs to be designed — it exists and is under-deployed:

- **`WreathMark`** (laurel wreath around an "N") — currently favicon-sized in the nav and footer. Redesign use: full-bleed, 400–600px, 4–6% opacity, as background geometry behind the About section and the CTA panel.
- **`GreekKeyRing`** — a circular meander pattern, currently a 640px ring at 5.5–6% opacity behind the hero network graphic only. Redesign use: repeat behind the FAQ and Market Context sections at the same low opacity, so the motif reads as a running thread through the page rather than a one-off hero decoration.
- **The statue and coin** (from the debt-annihilation demo's `drawStatue`/`drawCoin` canvas code) — see §6. This is the single biggest untapped asset in the whole brand.

### 3.4 Motion language

The existing `framer-motion` vocabulary — `fade-up` on scroll, `whileHover={{ y: -3 }}` card lifts, staggered children — is calm and appropriate; it should not be replaced with anything busier. Three additions:

- **Parallax depth on the hero only.** The `HeroNetwork` graphic and the (new) statue-halo background move at slightly different scroll speeds than the text column — 8–12px of drift, no more. This is the one place the site is allowed to feel three-dimensional.
- **A crack-shimmer reveal** for the new gold-veined borders: on scroll-into-view, a thin highlight travels once along the crack line (400–600ms, `ease-out`), then settles to a static glow. This replaces a plain opacity fade for the handful of elements using the marble-crack border treatment.
- **Magnetic primary buttons.** The gradient pill CTA (`Button` primary variant) gains a small cursor-follow offset (max 6px) on non-touch devices — a common, subtle "this is expensive to make" signal that costs almost nothing to implement.

Every motion addition must respect the existing `useReducedMotionSafe` hook — `HeroNetwork` already has a static, legible reduced-motion end-state; every new animated element needs the same fallback before it ships.

---

## 4. Page-by-page redesign

Each section below states what's on the site **today** (condensed, but nothing paraphrased away from its actual meaning — full verbatim copy is in the Appendix) and the **upgrade** — a specific treatment, not a mood.

### 4.1 Navigation

**Today:** a floating pill nav, blurred glass background, scroll progress bar as a 2px top-of-viewport line, four links (Product / How It Works / Security / About), two CTAs (View Demo / Request a Pilot).

**Upgrade:** keep the pill shape and scroll-progress line exactly as built — it already reads as intentional. Add: the `WreathMark` gains a slow, one-time laurel-leaf shimmer on first page load (600ms, plays once, respects reduced motion), and the pill's border switches from flat `border-gold` to the hairline crack-glow treatment once `scrolled` is true, so the moment the nav gains its background is also the moment it gains texture.

### 4.2 Hero

**Today:** "Move less money. Unlock more liquidity." over an italic gold subline ("See what never needed to move."), a paragraph, two buttons, a read-only disclaimer, and the `HeroNetwork` animated graph on the right — a hexagonal arrangement of six company nodes whose edges fade from a tangled six-cycle into two clean settlement lines, with a metric readout card overlapping its bottom edge.

**Upgrade:** this is where the statue moves from "hidden inside a demo file" to "the face of the company." Behind the existing two-column layout, add a large (500–700px), very low-opacity (6–9%) render of the laurel-crowned statue from the debt-annihilation demo, positioned center-right, partially behind the `HeroNetwork` graphic, with the same soft gold halo it already has in the canvas piece. It should read as texture at first glance and reward a second look — exactly the effect Reference C gets from its statue-with-halo treatment, but earned rather than decorative, because this is literally the site's own payoff visual. Give the H1 the single-italic-word treatment from §3.2. Push the metric readout card to overlap the graphic more assertively (Reference B) — currently it sits just below the graphic's bottom edge; let it ride up over the graphic by 20–30px.

### 4.3 The Problem

**Today:** "Businesses optimize everything except the obligations between them," three numbered cards (Fragmented obligations / Unnecessary movement / Trapped liquidity), a caveat line underneath ("Not all working-capital inefficiency comes from invoice netting — this is one contributing factor among several").

**Upgrade:** the three cards are correctly simple — leave the layout. Give the section's top border the crack-glow treatment (this is the first `border-t` divider a scrolling visitor hits after the hero; it should announce the material language immediately, not eleven sections later).

### 4.4 The Simple Example ($20/$20/$20 triangle)

**Today:** an interactive SVG — three companies in a triangle, each owing the next $20, a button that animates the triangle away and reveals "No payment required. Gross cash movement reduced by $60."

**Upgrade:** this is already the site's best piece of interaction design — a real, honest, tiny worked example. Don't touch the mechanic. Do replace the flat circle-and-line SVG styling with the same gold-gradient-edge and node-glow treatment already built for `HeroNetwork`, so the two graphs feel like the same visual system instead of two different SVG sketches that happen to share a color.

### 4.5 How It Works

**Today:** four numbered steps (Connect / Verify / Optimize / Approve) on a horizontal line with circular numeral badges, collapsing to a vertical timeline on mobile.

**Upgrade:** the horizontal connecting line (`bg-gold-line`, a simple gradient) becomes the crack-glow treatment, and each circular numeral badge gets a faint marble texture fill instead of flat `bg-primary` — small, consistent reinforcement of the material language at a step where it costs nothing to add.

### 4.6 Results (Before / After)

**Today:** a two-column comparison (14 payments / four bullet negatives vs. 4 payments / four bullet positives), a three-tile stat band (10 payments removed, 81% gross movement reduced, −71% reconciliation events), all under the heading "Fewer payments. The same obligations, honored." with the caveat "Figures below are illustrative unless drawn from your own data" repeated at both the section and stat-band level.

**Upgrade:** this three-tile band is the direct answer to Reference C's stat row — same visual confidence (big tabular numerals, generous spacing, full-width treatment), same honesty NicoMach already insists on. Widen it to breathe more (currently constrained to the container width alongside the two comparison cards above it; give it its own full-width moment below them, larger type). Do not add a single number that isn't already here, and do not let the "illustrative" caveat shrink in the redesign — if anything, set it in the same `eyebrow` treatment as section labels so it reads as a design element, not a legal footnote.

### 4.7 Trust & Security

**Today:** "Designed to minimize the trust required," four principle cards (Read-only first / Minimum necessary data / Customer-controlled approval / Explainable and auditable), a closing note that production deployments will require independent security review and trusted financial partners.

**Upgrade:** this section is where a fake "SOC 2 / ISO 27001 / bank-grade encryption" badge row would normally get bolted on. Don't. NicoMach doesn't have those certifications yet and the copy already says so honestly ("Production deployments will require independent security review"). Instead, give each of the four cards a small hairline-crack icon treatment (a single gold vein motif, not a padlock or shield stock icon) — visually distinctive without implying a certification that doesn't exist.

### 4.8 Market Context

**Today:** a single large stat, "€1.84T," PwC-sourced, in a centered card, with a caveat that NicoMach addresses only the portion connected to eligible obligations and settlement.

**Upgrade:** this is a real, cited, external number — treat it with more weight, not less. Give it the full-bleed `WreathMark` background treatment from §3.3 behind the card, and let the number itself be noticeably larger than any other numeral on the page (it's the site's single biggest claim and its most defensible one).

### 4.9 Why NicoMach

**Today:** "A different starting point," three cards (Across independent businesses / Optimization before payment / A lower-risk starting point), then a three-row "Where NicoMach fits" competitive-positioning table (Treasury platforms / Payment platforms / Working-capital platforms) with a closing thesis statement.

**Upgrade:** the competitive-positioning row is unusually candid for a startup site (it names adjacent categories instead of pretending to have no competitors) — that candor deserves a pull-quote treatment. Set the closing sentence ("NicoMach's thesis is that eligible obligations should first be analyzed as a connected network — before they are individually routed, financed, or reconciled") as a large, centered, cream-panel-on-dark breakout (the Reference A light/dark split from §3.1), the same way a testimonial would normally sit — except it's the company's own thesis statement, not a fabricated customer quote.

### 4.10 About

**Today:** two founder cards, Aarav Shandilya (technical modeling & product — supply-chain optimization modeling background at Arizona State University) and Hayden (finance & strategy — C++ trading algorithms for NinjaScript/NinjaTrader, sales and customer service experience, ongoing mathematical modeling research at Grand Canyon University).

**Upgrade:** two real people are a stronger trust signal than a fake client-logo row (Reference A's "Trusted by forward-thinking brands" strip). Give this section more visual weight than it currently gets as a mid-page card pair — larger cards, the marble-crack border, and enough white space that it reads as "meet the people," not "footnote about the team." No stock headshots if real photos aren't available: the existing text-only card treatment, done larger and more deliberately, beats a generic avatar icon.

### 4.11 FAQ

**Today:** six accordion questions covering custody, the netting-vs-treasury distinction, required data fields, disputed-invoice handling, approval workflow, and current production status ("NicoMach is an early-stage platform... it does not currently provide banking, lending, investment, custody, or money-transmission services").

**Upgrade:** purely a polish pass — the `GreekKeyRing` motif at low opacity behind this section (per §3.3), otherwise leave the accordion mechanic untouched; it already works and answers the hardest questions directly instead of dodging them.

### 4.12 Pilot CTA + Contact Form

**Today:** "Help us test what business payments could become," addressed to CFOs/controllers/treasury leaders/AP professionals, two CTAs (Request a Pilot / Share Your Perspective), and a real form (name, work email, company, role, invoice-volume range, primary cash-flow challenge, free-text message) on a diagonal gold-hatch background wash.

**Upgrade:** the diagonal hatch pattern is a nice, understated texture — replace it with the same crack-glow linework at equivalent opacity so the CTA section's texture matches the rest of the redesigned page instead of being its own one-off pattern. Form itself is functionally solid; only the field borders move to the crack treatment on focus (currently a flat `border-gold` on focus — let the focus state be a small animated highlight along the border instead of an instant color swap).

### 4.13 Footer

**Today:** four columns (wordmark + one-line description + "Est. Phoenix, Arizona" with `WreathMark`; Platform links; Company links; Legal links), a divider, then the standing disclaimer ("NicoMach is an early-stage analytical platform. It does not currently provide banking, lending, investment, custody, or money-transmission services") and a copyright line.

**Upgrade:** no structural change — this is a correctly boring, correctly complete footer. Only the `WreathMark` next to "Est. Phoenix, Arizona" gets slightly larger (it's currently 22px, easy to miss as a brand moment rather than an icon).

---

## 5. The Demo Dashboard

**Today:** a real, functioning six-section product surface (`Overview`, `Obligations`, `Network`, `Optimization`, `Reports`, `Settings`) behind a persistent sidebar, gated by a standing banner ("Demonstration data. NicoMach does not move funds.") repeated in both the top bar and the sidebar. The Overview section alone shows: original vs. optimized gross settlement figures, a "Run Optimization" action, a live result banner ("X payments removed — gross movement reduced by $Y (Z%)"), data-source and excluded-invoice callouts. Six summary metric tiles run across the top of every section (Total invoice value, Obligations, Companies, Original settlement, Optimized settlement, Potential reduction).

**Upgrade:** this is the most "product," least "marketing" surface in the whole site, and it should keep that restraint — a finance tool that looks like a magazine spread is a worse finance tool. The redesign here is narrow and functional: give the six summary tiles (`MetricCard`) the same tabular-numeral confidence as the marketing site's stat bands (currently smaller and more cramped, 2–6 column responsive grid), and let the active sidebar item's gradient fill (`from-gold-light to-gold`, already built) cast a soft glow onto the icon beside it rather than sitting flat. Nothing here should get a marble/crack treatment — that visual language belongs to the marketing site's storytelling, not to a working data table someone is trying to read quickly.

---

## 6. The debt-annihilation demo — promote it, don't hide it

This is the single most important recommendation in this brief. NicoMach already has a bespoke, fully-animated interactive piece — `debt-annihilation.html` — that dramatizes the exact netting algorithm the product runs, ending with the settled network converging into a coin that a large, centered, laurel-crowned marble statue receives into a pouch, set against a warm gold-tinted dark stage. It is, right now, a **standalone file** — not linked from the live site, not on a route, not discoverable by anyone who hasn't been sent the file directly.

Reference C's entire hero concept (a haloed statue as the emotional center of the page) is something NicoMach has already built better and more specifically than the reference achieves — because NicoMach's statue isn't decorative, it's a literal visualization of the product's core value proposition. Shipping this demo as a linked, first-class part of the site is worth more than any new hero illustration this brief could otherwise propose.

Concretely:

- Give it a real route (e.g., `/demo/annihilation` or `/annihilation`) inside the existing Next.js app instead of a file someone has to be emailed.
- Link to it from the hero's secondary CTA area and from the Results section ("See it happen" alongside "Fewer payments. The same obligations, honored.").
- Consider a muted, autoplaying loop of just its opening seconds (the tangled network before annihilation) as the literal hero background animation described in §4.2, with a "Watch it resolve" CTA that deep-links to the full piece — this is how the hero visual and the flagship demo become one connected story instead of two separate builds.

---

## 7. Component specs

| Component | Today | Redesign spec |
|---|---|---|
| **Primary button** | `bg-gradient-to-b from-gold-light to-gold`, `text-bg-primary`, pill radius, `shadow-gold-sm` → `shadow-gold` on hover | Keep exactly — this already matches Reference B's gradient-pill treatment. Add the magnetic cursor-follow from §3.4 |
| **Secondary button** | Transparent, `border-border-gold`, hover → `border-gold` + `bg-gold/5` | Unchanged |
| **Card border (standard)** | Flat `1px solid rgba(196,160,82,0.18)` | Unchanged for low-emphasis grids (Problem, Why NicoMach, Trust cards) |
| **Card border (high-emphasis)** | Same flat line | New: crack-glow treatment — a hairline SVG fracture pattern at 30–40% opacity, brightening to 70% on hover/in-view, used only on About cards, the hero metric-readout card, and the CTA form panel — three to five uses sitewide, never the default |
| **Stat tile / `MetricCard`** | Label (uppercase, `muted`, 0.66rem) over tabular-numeral value | Unchanged structurally; widen letter-spacing slightly and give the marketing-site stat bands (§4.6, §4.8) more vertical padding than the dashboard's tiles — the two contexts (storytelling vs. working tool) should feel related, not identical |
| **Section divider** | `.divider-gold` — a simple horizontal gradient line | Reserve for the footer and legal pages only; every homepage section transition uses the crack-glow border instead |
| **Badge / numeral circle** | Plain `border-gold` circle with a serif numeral (How It Works steps) | Add the faint marble fill from §4.5 |

---

## 8. Terms of Use & Privacy Policy

Both pages already carry an explicit "draft framework, not a final legal document" disclaimer and a full table of contents. No content or legal-caveat change is proposed here — restyle only: the disclaimer callout box gains the cream-panel treatment from §3.1 (it's the one place on these two pages where drawing extra visual attention to a piece of text is entirely appropriate, since the entire point of that box is "read this before you rely on anything below it").

---

## 9. Accessibility & responsiveness — carried forward, not renegotiated

- `useReducedMotionSafe` already exists and is respected by `HeroNetwork`; every new motion element in §3.4 must ship with the same static, legible fallback before merge.
- The mobile nav, mobile FAQ accordion, and the `HowItWorks` mobile timeline are already well-built responsive patterns — none of the redesign proposals above change their structure, only shared tokens (colors, borders) that already cascade correctly.
- New background geometry (large low-opacity `WreathMark`/`GreekKeyRing` placements, the hero statue silhouette) must be `aria-hidden` and never load as a blocking image — inline SVG or canvas, matching how these assets are already built.

---

## Appendix — verbatim content inventory

Every section's real copy, as it exists in production today, for reference during build:

**Metadata:** "NicoMach — Move less money. Unlock more liquidity." / "NicoMach analyzes verified obligations between businesses and recommends a simpler settlement plan with fewer payments and less gross cash movement." / "A read-only B2B settlement analysis platform. NicoMach does not hold or transfer funds."

**Hero:** Eyebrow "B2B cash flow optimization." H1 "Move less money. Unlock more liquidity." Italic subline "See what never needed to move." Body: "NicoMach analyzes verified obligations between businesses and recommends a simpler settlement plan with fewer payments and less gross cash movement." CTAs: "Explore the Demo" / "See How It Works." Disclaimer: "Read-only analysis. No custody of funds. Every settlement requires approval."

**The Problem:** "Businesses optimize everything except the obligations between them." / "Companies commonly process invoices one at a time. Across a larger network, some obligations may offset, but fragmented systems and independent payment processes make these opportunities difficult to identify." Cards: Fragmented obligations; Unnecessary movement; Trapped liquidity (full bodies in §4.3). Caveat: "Not all working-capital inefficiency comes from invoice netting — this is one contributing factor among several."

**Simple Example:** "Three obligations. Sixty dollars moved. Zero-dollar net position." A owes B $20, B owes C $20, C owes A $20. "No payment required." / "Gross cash movement reduced by $60." / "All obligations must be verified, eligible, and legally permitted to be netted."

**How It Works:** "A deliberate, reviewable process." Connect — "Import approved invoice data through a CSV, ERP connection, or secure data environment." Verify — "Exclude disputed, incomplete, duplicated, restricted, or unapproved obligations." Optimize — "Model eligible obligations as a network and calculate a smaller settlement plan." Approve — "Present an explainable recommendation for review before any payment occurs."

**Results:** "Fewer payments. The same obligations, honored." Before: 14 payments — many payment lines, higher gross cash movement, more reconciliation events, fragmented visibility. After: 4 payments — fewer settlement lines, lower gross cash movement, clear participant-level positions, fully reviewable recommendation. Stat band: 10 payments removed, 81% gross movement reduced, −71% reconciliation events. "Illustrative example based on synthetic data, not a guaranteed outcome."

**Trust & Security:** "Designed to minimize the trust required." Read-only first; Minimum necessary data; Customer-controlled approval; Explainable and auditable (full bodies in §4.7). "Production deployments will require independent security review, appropriate compliance controls, and trusted financial partners."

**Market Context:** "Working capital is one of the world's largest underused assets." "€1.84T — PwC estimates that €1.84 trillion in excess working capital could potentially be released globally." "This estimate includes inventory, receivables, payables, and other working-capital inefficiencies. NicoMach addresses only the portion connected to eligible business obligations and settlement."

**Why NicoMach:** "A different starting point." Across independent businesses; Optimization before payment; A lower-risk starting point. Where NicoMach fits: Treasury platforms (often support netting within corporate groups); Payment platforms (help businesses process individual payments); Working-capital platforms (help finance or accelerate individual invoices). Thesis: "NicoMach's thesis is that eligible obligations should first be analyzed as a connected network — before they are individually routed, financed, or reconciled."

**About:** Aarav Shandilya — Technical modeling & product. "Leads technical modeling, optimization, and product development. His background includes developing and benchmarking supply-chain optimization models using industrial data at Arizona State University." Hayden — Finance & strategy. "Leads finance, business strategy, sales, and customer discovery. His background includes writing C++ trading algorithms for the NinjaScript environment on the NinjaTrader platform, several years in sales and customer service, and ongoing mathematical modeling research at Grand Canyon University."

**FAQ (six questions, full text):**
1. "Does NicoMach ever hold or move money?" — "No. NicoMach is a read-only analysis platform. It calculates a recommended settlement plan from verified obligations, but every payment is still executed through each participant's own banking relationships after explicit approval."
2. "How is this different from netting inside one company's treasury?" — "Corporate treasury netting works within a single ownership structure. NicoMach applies the same optimization logic across independent businesses — companies with no shared ownership — using obligations that both sides have separately verified."
3. "What data do you need from us?" — "Only the invoice-level fields required to determine eligibility and calculate a settlement: payer, recipient, amount, currency, due date, and verification/eligibility status. No banking credentials or account access are required for the analysis."
4. "What happens to disputed or unverified invoices?" — "They are automatically excluded from optimization. Only obligations both parties have marked verified and undisputed are eligible to be netted — disputed, pending, restricted, or unapproved items are never included in a recommendation."
5. "Who has to approve a settlement plan before anything happens?" — "Every participant reviews the recommended plan — including which obligations contributed to each proposed payment — before anything is approved. No settlement is executed without that review."
6. "Is this live in production today?" — "NicoMach is an early-stage platform. The public demo runs on sample data so you can see how the analysis, netting, and approval flow would work; it does not currently provide banking, lending, investment, custody, or money-transmission services."

**Pilot CTA:** "Help us test what business payments could become." "We are speaking with CFOs, controllers, treasury leaders, and accounts-payable professionals to understand where settlement friction creates the greatest cost." CTAs: "Request a Pilot" / "Share Your Perspective." Form fields: Name, Work email, Company, Role, Approximate monthly invoice volume (Under $100K / $100K–$1M / $1M–$10M / $10M–$50M / Over $50M), Primary cash-flow challenge (Too many outgoing payments / Slow collections-receivables / Reconciliation overhead / Working capital constraints / Cross-entity settlement complexity / Other), Message.

**Footer:** "A read-only settlement analysis platform for verified obligations between independent businesses." "Est. Phoenix, Arizona." Columns — Platform (Product, Demo, Security, FAQ); Company (About, Contact); Legal (Privacy, Terms). "NicoMach is an early-stage analytical platform. It does not currently provide banking, lending, investment, custody, or money-transmission services."

**Demo Dashboard sections:** Overview, Obligations, Network, Optimization, Reports, Settings. Standing banner: "Demonstration data. NicoMach does not move funds." Overview copy: "Run the optimization to see what can be simplified." / "Here is what actually needs to move." / "[N] payments removed — gross movement reduced by [$X] ([Y]%)." / "Disputed, pending, restricted, or otherwise ineligible obligations are never netted."

**Terms of Use & Privacy Policy:** both live at `/terms` and `/privacy`, each carrying a "draft framework, not a final legal document" disclaimer, a full anchor-linked table of contents, and complete section text (acceptance, service description, demo-data handling, no-financial-advice disclaimer, pilot participation, data collection/use/retention, security, user rights, cookies, children's privacy, international users, governing law, contact) — unchanged by this brief; restyle only, per §8.
