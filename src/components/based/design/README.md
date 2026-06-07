# Handoff: Editorial Résumé — Pavel Novaikin

## Overview
A single-page personal résumé for **Pavel Novaikin** (Front-End Senior / Lead Developer)
in a refined **editorial / Swiss-typographic** style: warm-cool "porcelain" paper, a soft
dusty-blue accent, a huge grotesk display name, and monospace for all labels/meta/tiles.
It has a **light and dark theme** (toggle, persisted to localStorage) and a print/PDF
stylesheet. The page is one long scrolling column, centered, max-width **760px**.

Sections, in order: Hero → Stats → About (+ proof points + stack line) → Experience
(numbered, with the current role highlighted) → Toolkit (category cards of faint tiles +
an "all skills" card) → Education & Languages → Contact footer.

## About the Design Files
The file in this bundle is a **design reference created in HTML** — a working prototype of
the intended look, layout, and behavior. It is **not** meant to ship as-is.

Your task is to **recreate this design in the target project's environment** (React, Vue,
Svelte, Astro, plain static HTML, etc.) using its established patterns and tooling. If no
codebase exists yet, pick the framework that best fits a static personal résumé — a static
setup like **Astro** or **Vite + Vue/React** is ideal (mostly static content with one tiny
interactive piece: the theme toggle). The prototype's CSS is clean and self-contained, so
you can port it nearly verbatim or re-express it as components.

## Fidelity
**High-fidelity (hifi).** Colors, typography, spacing, and interactions are final. Recreate
pixel-perfectly. All exact values are in **Design Tokens** below.

---

## Screens / Views
One scrolling page, content column **max-width 760px**, side padding 26px, centered.
A fixed-width top bar (theme toggle + "Download CV") sits above the column, right-aligned.

### 1. Hero
- **Status badge** — pill, mono 12.5px, `border-radius:999px`, paper-2 fill, 1px border;
  green status dot (8px, with a soft 3px glow ring). Text: "Open to work · Remote-friendly · Tbilisi, Georgia".
- **Name** — "Pavel / Novaikin." set in **Archivo 900**, `clamp(54px,12vw,104px)`,
  line-height 0.92, letter-spacing -0.035em, color `--ink`. The trailing **dot** is `--accent`.
- **Role eyebrow** — mono 12px, weight 700, letter-spacing 2.5px, uppercase, color `--accent`:
  "Front-End Senior / Lead Developer".
- **Tagline** — Archivo 600, `clamp(21px,3.4vw,27px)`, color `--ink`; one phrase
  ("clean, reliable products") emphasized in `--accent`.
- **Summary box** — mono 13px, line-height 1.85, `--muted` text with select words in `--ink-2`;
  `--tint` fill, 1px `--line` border, radius 9px.
- **CTAs** — primary button (`--accent` fill, `#fff8f4` text) "Download CV (PDF)" → `window.print()`;
  ghost button (paper-2 fill, border) showing the email.
- **Links row** — mono 13px: GitHub · Telegram · LinkedIn · novaikin.com. Hover draws an
  `--accent` underline left→right (animated via a `::after` `right` transition — this one is
  safe, it's not a var-backed property).
- **"Open to" box** — `--tint` fill, **left 3px `--accent` border**, radius 9px; mono red
  eyebrow "Open to" + a `·`-separated role list (separators in `--accent`).

### 2. Stats
- A single bordered rounded container (radius 11px) split into **4 equal cells** by 1px
  `--line` dividers. Each cell: big number in **Archivo 800**, 40px, `--accent` (with a
  smaller superscript-ish unit like `+`, `K`, `%`, `yr`), and a 2-line mono 11.5px `--muted` caption.
- Values: **10+** years shipping front-ends · **6** engineers (largest team led) ·
  **30K** daily active users · **20%** faster load times.
- Mobile (≤640px): collapses to 2×2.

### 3. About
- Section header pattern (reused everywhere): bold Archivo 25px title left, mono `--muted`
  kicker right (e.g. "// profile"), 1px `--line` bottom rule, 26px gap below.
- Lead paragraph 18px `--ink`; body paragraphs `--ink-2` with select phrases in `--ink` 600.
- **Proof points** — mono red eyebrow "Proof points" + a **2-col grid** of 4 cards
  (`--tint` fill, 1px border, radius 9px), each with a 7px `--accent` dot and a sentence.
- **Stack line** — top dashed `--line-2` rule; mono 12.5px; `core stack` key in `--accent`,
  the value list in `--ink-2`.

### 4. Experience — the signature block
- A flat list of roles separated by 1px `--line` top borders. Grid: **44px index column +
  content**. Index = mono 700 `--accent` ("01"…"08").
- Per role: mono date range + bold duration + optional `· domain`; **title** in Archivo 700
  19px with `at` in `--muted` and the **company in `--accent`**; optional project line;
  bullet list (custom 5px `--accent` round markers, 15px `--ink-2`, key words in `--ink`);
  a row of **tag chips** (`.tag`: mono 11.5px, 1px `--line-2` border, paper fill, radius 6px).
- **Current role is highlighted**: `--accent-soft` fill, radius 12px, a 3px `--accent`
  vertical bar on the left, and a small bordered "NOW" mono pill next to the title.
- Final entry (#08) is a single "Earlier · 2008–2016" sentence.
- Mobile (≤640px): index column hidden, everything stacks to one column.

### 5. Toolkit  *(this was specifically iterated to match a tiles-on-faint-fill look)*
- Section header + "10 groups" kicker.
- **2-column grid of category cards** (`.kcard`: 1px `--line` border, radius 14px, `--paper-2`
  fill, padding 22–24px, `align-items:start` so cards size to content).
- Each card: a **lowercase mono `--muted` label** (e.g. "front end", "state management") +
  a wrapped row of **tiles** (`.tile`).
- **Tile = the key detail:** mono 13px, `--ink-2` text, on a **barely-visible fill**
  `--chip-bg` (≈ 5–6% ink-on-paper), radius 7px, padding 6px 11px, **`white-space:nowrap`**
  (multi-word tiles like "Reka UI", "Feature-Sliced Design" must stay single-line).
  Hover: text → `--ink`, fill → `--accent-soft`. **No CSS transition** on the tile (see Gotchas).
- Below the grid: one **full-width card** labeled "everything · all skills" containing every
  tech as tiles.
- Groups & contents (10): languages (TS, JS, Python) · front end (React, Vue, Nuxt.js,
  Next.js, Angular) · state management (Pinia, Vuex, Redux, Zustand, MobX) · styling
  (Tailwind, SCSS, Bootstrap, Reka UI, Radix UI) · backend & apis (Node.js, Nest.js, Bun,
  FastAPI, GraphQL, REST) · mobile (Expo, Ionic, Capacitor, Electron) · cms · auth · baas
  (Payload.js, Strapi, Keycloak, Supabase, Firebase) · testing (Vitest, Jest, Playwright,
  Cypress) · build · devops (Vite, Webpack, Gitlab CI, Sentry, Lighthouse) · architecture
  (Feature-Sliced Design, RxJS).

### 6. Education & Languages
- 2 cards (`.card`, 1.25fr / 1fr): **Education** (TUSUR degree, faculty, "2018 · Bachelor")
  and **Languages** (Russian NATIVE = 100% meter, English C1 ADVANCED = 85% meter). Meters:
  6px track in `--line`, fill in `--accent`. Card headings: mono uppercase `--accent`.

### 7. Contact footer
- Top 1px `--line` rule; big Archivo 900 headline "Let's build something reliable." with an
  `--accent` dot; sub line with `--accent` underlined mailto + Telegram links; a mono
  colophon row (name/role left, "Set in Archivo & JetBrains Mono" right).

---

## Interactions & Behavior
- **Theme toggle** (top bar): switches `data-theme` on `<html>` between `light`/`dark`,
  persists to `localStorage["cv-theme"]`, and updates the button label ("Dark"/"Light").
  On load it reads the saved value. All colors are CSS custom properties keyed off
  `html[data-theme="…"]`, so the whole page re-themes instantly.
- **Download CV** button + "Download CV (PDF)" → `window.print()`; the print stylesheet
  produces a clean white-paper version (chrome hidden).
- **Hover affordances:** primary button lifts + brightens; ghost/top buttons change border &
  text to `--accent`/`--ink`; contact links animate an underline; tiles brighten.
- Fully responsive at ≤640px (stats → 2×2, all multi-col grids → 1 col, experience index hidden).

## State Management
Essentially none — static content. The only state is the **theme** (a single string in
localStorage, read on load, toggled by one button). No data fetching.

## Design Tokens

CSS custom properties, defined per theme on `html[data-theme="light|dark"]`.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--paper` | `#ecedef` | `#15171c` | Page background |
| `--paper-2` | `#e3e5ea` | `#1c1f25` | Cards, badges, ghost buttons |
| `--tint` | `#e7e9ed` | `#1d2026` | Summary / proof / open-to fills |
| `--line` | `#cfd4dc` | `#2b2f37` | Hairline borders & dividers |
| `--line-2` | `#bcc3ce` | `#3a3f49` | Stronger borders, tag borders |
| `--ink` | `#1f232a` | `#eef1f6` | Headlines / primary text |
| `--ink-2` | `#494f5a` | `#c0c6d1` | Body text, tile text |
| `--muted` | `#828997` | `#7f8794` | Captions, kickers, card labels |
| `--accent` | `#5c7ea7` | `#7e9fcb` | Dusty-blue accent (numbers, eyebrows, dots, links) |
| `--accent-2` | `#4a6a92` | `#94afd6` | Accent hover/darker |
| `--accent-soft` | `rgba(92,126,167,.10)` | `rgba(126,159,203,.14)` | Highlighted role fill, tile hover |
| `--chip-bg` | `rgba(31,35,42,.055)` | `rgba(238,241,246,.06)` | **Tile fill (barely-visible)** |
| `--green` | `#6a9a5f` | `#84b06f` | "Open to work" status dot (semantic) |

### Typography
- **Display & body:** `"Archivo"` (Google) — weights 400/500/600/700/800/900.
  Headlines 800–900 with tight tracking (-0.02 to -0.035em); body 400–600.
- **Labels / meta / tiles / tags:** `"JetBrains Mono"` (Google) — 400/500/700.
- Base body 16.5px / line-height 1.62. Key sizes: name `clamp(54px,12vw,104px)` ·
  section title 25px · stat number 40px · lead 18px · body 15–16.5px · bullets 15px ·
  mono labels/tiles/tags 11.5–13px.

### Spacing / Radius
- Content column 760px; side padding 26px; section top margin 64px; section-header bottom
  rule + 26px gap. Card radii: stats 11px, cards 11px, toolkit cards 14px, tiles 7px,
  buttons/boxes 9px, badge 999px. Borders are 1px hairlines; the highlighted role uses a 3px
  accent bar; "Open to" uses a 3px accent left border.

### Animation
- Minimal: button lift (`transform` 0.12s) + brightness, and the link underline
  (`::after` `right` 0.22s). **No transitions on theme-var-backed color/background/border**
  (deliberate — see Gotchas).

## ⚠️ Implementation Gotchas (learned while building)
- **Do not put CSS `transition` on properties whose value comes from a theme custom property**
  (`color`, `background`, `background-color`, `border-color` that resolve to `var(--…)`).
  In at least one rendering engine, such a transition **fails to re-settle when the variable
  changes on theme toggle**, leaving the element frozen on the previous theme's color (e.g.
  dark text on a dark tile). This bit us on `body` and on `.tile`. In a real framework with a
  normal browser this is less likely, but the safe pattern is: theme changes apply **instantly**;
  only transition non-themed properties (`transform`, `opacity`, geometry). If you want a smooth
  global theme fade, do it deliberately (e.g. a transition class toggled only during the switch),
  not via per-element var-backed transitions.
- Keep **tiles single-line** (`white-space:nowrap`) — multi-word tech names otherwise wrap ugly.
- The status dot color (`--green`) is **semantic** (availability), intentionally not the accent.

## Assets
- **No images.** All visuals are CSS. Avatar is intentionally absent in this design.
- **Fonts:** Archivo + JetBrains Mono, both Google Fonts (loaded via `<link>` in the head).
- **Icons:** the only icon is an inline SVG sun/“theme” glyph in the toggle button.

## Files
- `Editorial Resume.html` — the complete prototype: markup + all CSS (themed tokens, layout,
  components, print rules) in one `<style>` block, plus a ~20-line theme-toggle script at the end.
- `screenshots/` — reference renders:
  - `01-hero-light.png`, `02-stats-about.png`, `03-experience.png`, `04-toolkit-light.png` (light)
  - `05-hero-dark.png`, `06-toolkit-dark.png` (dark)

> Suggested approach: lift the token table into your theme system (CSS vars or a JS theme
> object), build one component per section (Hero, Stats, About, Experience row, Toolkit card,
> Tile, Card, Footer), wire the theme toggle to a `data-theme` attribute + localStorage, and
> drop in the print stylesheet. Content is static and lives in the markup.
