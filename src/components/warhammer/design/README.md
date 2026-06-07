# Handoff: Grimdark Conscription Dossier — Pavel Novaikin

## Overview
A single-page personal résumé reimagined as a **grimdark, gothic-military "conscription
dossier."** The candidate (front-end engineer **Pavel Novaikin**) is presented in-universe as
a **Cogitator-Wright / Forge-Sergeant** — a warrior-artisan who forges the battle-interfaces
("war-cogitators / helm-glyphs") of a fictional empire. His real résumé content is fully
preserved; only the framing language and visual style are themed.

The page opens **sealed**: a dimmed dossier behind an **"Oath of Service"** overlay. The
visitor presses a seal → a stamp slams down (with a synthesized impact **sound**, screen
flash, shake, shockwave), the dossier **un-dims and powers up** with a staggered entrance, and
the status flips to *"Oath Sworn — Cleared."* The sworn state persists in localStorage.

Aesthetic: **stamped gunmetal steel** with rivets and yellow-black hazard tape, a palette of
**bone + blood-red + gunmetal**, stencil / blackletter / stamped display type, CRT scanlines
and vignette. Fully responsive; print-friendly.

> **IP note for implementers:** This is an **original** grimdark-military pastiche. It does NOT
> use Games Workshop / Warhammer 40,000 trademarks or assets — no Imperial Aquila, no faction
> insignia, no protected names. The faction ("Iron Dominion"), ranks ("Cogitator-Wright"),
> emblem (an original hammer-and-bolt sigil) and all copy are bespoke. Keep it that way: if you
> extend this, invent your own lore terms; do not substitute in trademarked names.

## About the Design Files
The file is a **design reference created in HTML** — a working prototype of look, layout, and
behavior, **not** production code to ship verbatim. Recreate it in the target project's
environment (React, Vue, Svelte, Astro, static HTML…) using that codebase's patterns. If none
exists, a static setup (Astro / Vite + Vue/React) suits it — the only runtime logic is the
oath state machine + a Web Audio sound, both tiny.

## Fidelity
**High-fidelity (hifi).** Colors, type, spacing, motion, and the oath interaction are final.
Exact values are in **Design Tokens**.

---

## Screens / Views
One scrolling page (content column **max-width 1080px**, side padding 20px), plus a full-screen
**oath overlay** and a fixed decorative layer (scanlines + vignette). Two macro-states:
**Sealed/locked** (pre-oath) and **Activated** (post-oath).

### Persistent chrome
- **Top hazard strip** (`.haz.topband`, ~15px) — yellow-black 45° stripes.
- **Classification bar** (`.classbar`) — a **solid amber** warning bar with black stencil text:
  "Conscription Bureau · Iron Dominion", "Clearance: Obsidian", and a right-aligned serial № .
- **Fixed overlays:** `.scan` (CRT scanlines + a slow downward light **sweep**), `.vig` (inner
  vignette).
- **Bottom hazard strip.**

### 1. Hero
- Riveted steel plate (`.plate.rivets`) with: an **original circular crest** (SVG: double ring,
  rivet dots, an upright hammer crossed by a red lightning bolt), the **designation eyebrow**
  ("Cogitator-Wright · Forge-Sergeant", stencil red), the **name** "PAVEL NOVAIKIN" in the
  stamped face (`Black Ops One`, clamp 40–82px), a blackletter **rank line** ("Master-Wright of
  the War-Cogitators ✠ Tenth Cohort"), and a themed **creed** paragraph (his real summary, lore-flavored).
- **Vitals strip** (`.plate.vitals`) — 4 cells: Designation / Origin World (Tomsk-Forge) /
  Holdfast (Tbilisi Bastion) / **Status** (amber, live-pulsing): "Awaiting Oath" → "Oath Sworn — Cleared".
- **Vox channels** (`.vox`) — riveted button-links: email, GitHub ("Cipher-Vault"),
  Telegram ("Vox"), LinkedIn ("Registry"), site ("Holo-Sigil").

### 2. Service Record (Stats)
- Red **section tab** (`.shead .tab`) "I. Service Record" + hazard rail.
- 4 metrics on a riveted plate, big stamped numerals in bone with red unit: **X+** years,
  **VI** wrights led, **30K** souls/day, **−20%** swifter. (Roman numerals are intentional lore flavor.)

### 3. Adjutant's Assessment (About)
- A **parchment insert** (`.parchment`, warm bone gradient, dark ink) — the one "document"
  amid the steel. Blackletter **drop-cap**, three themed paragraphs (his real summary), a
  **"Marks of Distinction"** 2-col grid (proof points with ✠ runemarks + red left border), a
  **"Sanctioned Wargear"** stack line, and a faint seal watermark.

### 4. Campaign Record (Experience) — signature block
- Tab "III. Campaign Record" + "// 2017 — present".
- **VIII** riveted tour plates. Each `.tour`: a header row of **Roman index** (red stamped),
  a blackletter **theatre name** (lore reskin of the employer/domain), a stencil **real-role
  gloss** (real title in red + real company), and a right-aligned **date + duration**; then a
  citation list (diamond red markers) and **wargear** chips (real tech).
- **Current tour** (`.tour.active`): red-tinted header, inset red border, and a **blinking amber
  "Active Theatre"** tag. Tour VIII is the "Initiate Years" summary (2008–2016).
- Theatre→reality map is in the markup (e.g. "The High News-Spire" = Front-End Team Lead,
  News Company NDA, crypto; "The Exchange-Bastion" = AAATrade FinTech; etc.).

### 5. Battle Disciplines & Wargear (Skills)
- Tab "IV." + "// ten armouries". A **2-col grid of riveted plates** (`.dcard`). Each: a red
  stencil **discipline name** + a lowercase stencil **sub-label**, then **tiles** of the **real
  tech** (`.tile`: stencil, on a faint inset-dark fill, `white-space:nowrap`, hover→amber).
- 10 disciplines map to the real categories: Machine-Tongues=languages, Helm-Glyph
  Craft=front-end, Memory-Rites=state, War-Heraldry=styling, Engine-Cant & Vox-Links=backend/api,
  Field-Cogitators=mobile, Reliquaries & Ward-Gates=cms/auth/baas, Trials & Proofing=testing,
  Forge-Rites & Watch-Wards=build/devops, War-Architecture=architecture.

### 6. Schola & Tongues (Education + Languages)
- Tab "V." Two riveted blocks: **Schola Training** (TUSUR, themed) and **Tongues** — Russian
  ("Mother-Cant · Native", 100% gauge) and English ("C1 · Trade-Gothic", 85% gauge). Gauges are
  striped blood-red fills.

### 7. Petition (Contact footer)
- Riveted plate: blackletter "Summon this wright to your war.", a vox line with amber
  email/Telegram links, and a stencil colophon. A small **"↺ Revoke oath"** link resets the
  sworn state (useful for demos; you may drop it in production).

---

## Interactions & Behavior
- **Oath of Service (the centerpiece).** Pre-oath: `#oath` overlay is shown and `.lockable`
  (the whole dossier) is rendered dim + desaturated (`filter: grayscale brightness`). On press
  (click or Enter/Space anywhere on the overlay):
  1. **Sound** — `playStamp()` synthesizes a stamp impact via Web Audio (a deep pitch-dropping
     sine thud + a band-passed noise crack + two square-wave metallic ring partials + a low
     triangle "power-up" swell). No audio files; created on the user gesture so autoplay
     policy is satisfied.
  2. **Stamp visuals** — `body.stamping` triggers: `#brand` (the corner seal) **slams** in
     (`@keyframes slam`), `#flash` white flash, `.wrap` shake, `#shock` expanding ring.
  3. At 360ms `body.sworn` is added (overlay animates out via `dismiss`, dossier un-dims via
     `unlock`), status → "Oath Sworn — Cleared", and `activate()` runs.
  4. `activate()` adds `body.activated` (after ~40ms) → **staggered entrance** (`rise`) of the
     7 top-level blocks; and `body.lit` (after 1.6s) as a **safety net** forcing `opacity:1`.
  - Persisted: `localStorage["dossier-oath-sworn"]`. On reload when already sworn, the page
    skips straight to the activated state (overlay hidden, seal stamped).
- **Ambient loops:** CRT scanline sweep, live-status amber glow pulse, blinking "Active
  Theatre" warning light, a subtle seal glow when sworn. All **gated by
  `prefers-reduced-motion`** (and the oath then resolves instantly, no animation/flash; the
  sound still plays).
- **Hover:** vox channels & tiles shift toward amber/blood; links underline.
- Responsive at ≤720px (hero stacks, vitals/metrics → 2×2, tours collapse, seal shrinks).

## ⚠️ Implementation Gotchas (learned building this)
- **This rendering engine does not reliably *settle* CSS transitions whose trigger is a
  class/var change**, and **CSS animations whose triggering class is present at first paint can
  freeze on their start frame.** Both bit us here. The patterns that proved reliable:
  1. Drive **state reveals with keyframe animations, not transitions.**
  2. **Keep the end-state in plain static rules** (those always apply); use animations only as a
     transient flourish gated on a class added **after first paint** (we add `activated` via a
     short `setTimeout`, not at load, not via `requestAnimationFrame` alone — rAF can be starved
     in background tabs).
  3. **Never let an entrance animation's only "visible" state live inside the keyframe** —
     always have a static fallback (here: the `body.lit` safety net forces `opacity:1` after
     1.6s so content can never get stuck hidden). In a normal browser this is belt-and-suspenders,
     but it guarantees the résumé is always readable.
- Audio must be created inside a user gesture (the oath press) — don't try to init `AudioContext` on load.

## State Management
Minimal state machine on `<body>` classes: `stamping` (transient), `sworn` (persisted),
`activated` + `lit` (entrance). One localStorage key. No data fetching; all content is static
markup. The audio is a stateless one-shot.

## Design Tokens
CSS custom properties (`:root`). Single dark theme.

| Token | Value | Use |
|---|---|---|
| `--steel-0..4` | `#0d0e11 · #15171c · #1d2027 · #262a33 · #313641` | Metal value ramp (page→plates→raised) |
| `--bevel-hi / --bevel-lo` | `rgba(255,255,255,.065)` / `rgba(0,0,0,.6)` | Plate top-bevel / inner shadow |
| `--bone / --bone-2` | `#d8cdb2 / #b9ad90` | Headings, key text on steel |
| `--ink / --ink-dim / --ink-mut` | `#e6e0d0 / #9a937e / #73705f` | Body / secondary / faint |
| `--parch` / `--paper-ink` | `#cdc1a3` / `#211a0f` | Parchment insert + its ink |
| `--blood / --blood-2 / --blood-deep` | `#a8241f / #c63a2b / #5f1411` | Primary red, bright red, deep red |
| `--rust` | `#b65a2b` | Secondary warm accent |
| `--hazard` | `#d6a316` | Hazard tape, classification bar, status, "Active" tag |

### Typography (all Google Fonts)
- `--stamp` **Black Ops One** — name, metric numerals, section tabs, block H3 (stamped military).
- `--gothic` **Pirata One** — blackletter: order/rank lines, theatre names, drop-caps, petition headline.
- `--stencil` **Stardos Stencil** (400/700) — eyebrows, labels, dates, tiles, chips, vitals, classification.
- `--body` **Oswald** (300–700) — running text, citations, creed (condensed, "official form" feel).
- Base 17px / line-height 1.6. Name `clamp(40px,8.5vw,82px)`; tabs `clamp(16–22px)`; metrics `clamp(34–50px)`.

### Texture / shape
- **Plates:** layered vertical gradient + 1px near-black border with a lighter top edge + inset
  bevel highlight/shadow + drop shadow. `.rivets` adds 4 corner rivet dots (radial-gradient).
- **Hazard tape:** `repeating-linear-gradient(45deg, var(--hazard) 0 15px, #131418 15px 30px)`.
- **Parchment:** warm radial bone gradient, inset amber glow, brown border.
- Tiles/chips: faint inset-dark fill, 1px near-black border. Corners are square/sharp (1–2px max).
- Background: layered radial glows + a faint brushed-metal vertical line pattern + vertical gradient.

### Motion
- One-shot: `slam`, `flash`, `shake`, `shock`, `dismiss`, `unlock`, `rise` (staggered .02–.60s).
- Loops: `sweep` (7.5s), `livepulse` (2.4s), `warnblink` (1.5s), `sealglow` (3.2s), seal `pulsering`.
- All loops + reveals disabled under `prefers-reduced-motion`.

### Audio (synthesized, no assets)
`playStamp()` — Web Audio graph: sine thud 150→42 Hz; band-passed noise burst (~1.7 kHz);
square partials 510/860 Hz; triangle swell 55→190 Hz. ~0.9 s total. Re-implement with the
platform's audio API; values above are the recipe.

## Assets
- **No images.** Crest & seal are inline SVG (original hammer-and-bolt sigil). All texture is CSS.
- **Fonts:** Black Ops One, Pirata One, Stardos Stencil, Oswald (Google Fonts `<link>`).
- **Sound:** generated at runtime (Web Audio); nothing to bundle.

## Files
- `Grimdark Dossier.html` — complete prototype: markup + all CSS in one `<style>` + a ~90-line
  script (oath state machine, entrance activation, synthesized stamp sound).
- `screenshots/` — `01-locked-oath` (sealed state), `02-hero-activated`, `03-assessment`
  (parchment), `04-campaign-record`, `05-wargear`, `06-wargear-2`.

> Build path: port the token block + plate/hazard/parchment mixins, build one component per
> region (Hero, VitalStrip, MetricPlate, Tour, DisciplineCard, Tile, Block, Petition, OathOverlay),
> model the oath as a small state machine (`sealed → stamping → sworn/activated`), and reproduce
> the synthesized sound with your audio API. Heed the Gotchas — keep reveals as animations with
> static fallbacks, and a visibility safety net.
