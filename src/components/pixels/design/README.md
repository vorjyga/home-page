# Handoff: Dusk Mountain — Pixel-Art Resume

## Overview
A single-page personal résumé for **Pavel Novaikin** (Front End Senior / Lead Developer),
rendered in an atmospheric "indie pixel-art" style (Celeste-like dusk mountain scene).
It presents a hero, an "About" summary, a vertical timeline of work experience styled as
an **ascent up a mountain**, and a sticky sidebar with avatar, skills, languages, and
education. Pixel sprites and the mountain backdrop are drawn entirely with **CSS + a tiny
JS sprite builder — there are no raster image assets**.

The page is fully responsive and has a print/PDF stylesheet.

## About the Design Files
The files in this bundle are **design references created in HTML** — a working prototype
that shows the intended look, layout, and behavior. They are **not** meant to be shipped as-is.

Your task is to **recreate this design inside the target project's existing environment**
(React, Vue, Svelte, Astro, plain HTML, etc.), using its established component patterns,
styling approach, and build tooling. If no codebase exists yet, pick the framework that best
fits the goal (a personal résumé site → a static setup like **Astro / Vite + React or Vue**
is ideal) and implement it there.

The prototype's CSS and the `pixel.js` sprite engine are clean and self-contained, so you can
port them nearly verbatim or re-express them as components — your call.

## Fidelity
**High-fidelity (hifi).** Colors, typography, spacing, and interactions are final and
intentional. Recreate the UI pixel-perfectly. Exact values are listed under **Design Tokens**.

---

## Screens / Views

There is **one view** (a long scrolling page), composed of these regions. Outer page max-width
is **1060px**, centered, with `40px 22px 90px` padding. Background is a fixed full-viewport
dusk sky + parallax mountains layer behind everything (`z-index: 0`); content sits at `z-index: 1`.

### 1. Hero (centered, full width)
- **Purpose:** Name, role headline, location, contact links.
- **Layout:** Centered text block, `padding: 22px 18px 8px`.
- **Components:**
  - **Kicker** — `// Front End · Senior / Lead`. Font Silkscreen, 12px, letter-spacing 4px,
    uppercase, color `#ffe9d4`, text-shadow `2px 2px 0 rgba(43,30,64,.6)`.
  - **Name** — "Pavel Novaikin". Font **Press Start 2P**, `clamp(22px, 5.2vw, 44px)`,
    line-height 1.22, color `#fff7f1`, text-shadow `0 0 18px rgba(255,210,170,.65), 4px 4px 0 #5a4878` (glow + hard pixel shadow).
  - **Role line** — "Building reliable web products for 10 years" + blinking caret.
    21px / weight 600 / `#fff2ea`, text-shadow `2px 2px 0 rgba(43,30,64,.5)`.
  - **Location** — flag sprite + "Tbilisi, Georgia · 3 yrs as Team Lead". 16px `#ffe6d6`.
  - **Contacts** — row of pixel "chips" (see Components → Chip). 5 links: email, novaikin.com,
    github.com/vorjyga, linkedin.com/in/novaikin, t.me/Pavel_Novaikin. Each has a small sprite icon.

### 2. Two-column body
- **Layout:** CSS grid, `grid-template-columns: 1fr 330px; gap: 26px; align-items: start;`
  Collapses to a single column at **≤860px**, with the sidebar moved **above** the main column (`order: -1`).
- **Left = main column:** About panel + "The Ascent" timeline.
- **Right = sidebar (`.side`):** `position: sticky; top: 18px;` stack of avatar / skills / languages / education panels, `gap: 18px`.

### 3. About panel (main column)
- Section title "About" (slime sprite + Press Start 2P 14px, glow shadow).
- Glass panel (`.panel`, semi-opaque cream `rgba(255,250,252,.92)` + `backdrop-filter: blur(2px)`).
- Lead paragraph 19px `#443a5e`; following paragraphs 17.5px. Copy is in the HTML verbatim.

### 4. "The Ascent" timeline (main column) — the signature element
- Section title "The Ascent" (flag sprite).
- A vertical **dashed waypoint trail** on the left (`.ascent::before`): a 4px-wide
  `repeating-linear-gradient(#ffffffcc 0 6px, transparent 6px 12px)` running top→bottom.
- Each job is a **`.stop`**: a glowing circular **waypoint node** (`.way`, 18px, 3px ink
  border, filled with the job's accent color, with a double glow ring
  `0 0 0 4px rgba(255,255,255,.5), 0 0 14px <accent>`) sitting on the trail, next to a
  `.panel` card.
- The **current job** (`.stop.cur`) gets a pulsing waypoint (`@keyframes pulse`, 1.8s steps(4))
  and a "NOW" tag.
- **Each card contains:**
  - `.j-role` (19px / 700 / ink) + optional `.cur-tag` ("NOW", mint pill).
  - `.j-co` (15px `#6c5d88`) — company + project line.
  - `.j-when` (Silkscreen 11px) — date range + bold duration, right-aligned.
  - `ul.bul` — bullet list; each bullet has a small square pixel marker in the accent color
    (`li::before`, 8px, 2px ink border). Bullets 15.5px `#4d4168`.
- **Accent color per job** (top → bottom): `#ef9fc0`, `#f4a98f`, `#f3cf86`, `#8fd9bf`,
  `#8aa3e8`, `#b79ee6`, `#f4a98f`, and a muted `#c7b59a` for the final "Earlier (2008–2016)" note.
- Job entries, in order: Front End Team Lead (News Co, NDA, NOW) · Senior FE (News Co, NDA) ·
  Senior FE (cryptopay.me) · Fullstack (Introduct tech) · FE Team Lead (aaatrade.com) ·
  FE Dev (strictlogic.com) · FE Dev (arview.pro) · Earlier note. All copy is in the HTML.

### 5. Sidebar panels (right column, sticky)
- **Avatar** (`.s-avatar`): a 120×120 portrait slot inside a pixel frame
  (`.avatar-frame`: 3px ink border, `repeating-linear-gradient(45deg, #efe2f3 0 8px, #e6d4ee 8px 16px)` backing).
  In the prototype this is an `<image-slot>` web component the user drag-drops an image into;
  **in production replace with a normal `<img>`** (or an upload field if you want it user-editable).
- **Skills** (`.s-card`): heading "Skills" + groups (Languages, Front End, State, Styling,
  Backend · API, Mobile, CMS · Auth · BaaS, Testing, Build · DevOps, Architecture). Each group =
  small Silkscreen label + wrap of `.tag2` chips (13px, 2px ink border, white-ish bg, 2px hard shadow).
- **Languages** (`.s-card.lang`): Russian (NATIVE, bar 100%, `#ef9fc0`) and
  English (C1 · ADVANCED, bar 85%, `#8aa3e8`). Bars use the shared `.bar` style (12px tall,
  2px ink border, striped fill).
- **Education** (`.s-card.edu`): TUSUR degree, faculty, 2018 · Bachelor.

### 6. Footer
- "Save / Print PDF" pixel button (`.dl`, mint `#8fd9bf` fill, 3px ink border, hard shadow,
  `href="javascript:window.print()"`) + a caption line. Hidden in print (`.no-print`).

---

## Interactions & Behavior
- **Blinking caret** after the role headline — `@keyframes blink`, 1s steps(1) infinite.
- **Floating decorative sprites** — sparkles/stars/gems gently bob across the sky
  (`.px-float` → `@keyframes floaty`, randomized duration/amplitude/position via `pixel.js`).
- **Twinkle** helper (`@keyframes twinkle`) available for star sprites.
- **Current-job waypoint pulse** — `@keyframes pulse`.
- **Chips & cards** — on hover, pixel "lift": translate up-left a couple px and grow the hard
  box-shadow (`.chip:hover`, `.lift:hover`), with `steps()` transitions for a chunky feel.
  `:active` presses them back down.
- **Sticky sidebar** — follows scroll on desktop (`position: sticky; top: 18px`); becomes a
  normal stacked block above the main content on mobile.
- **All motion is gated** by `@media (prefers-reduced-motion: reduce)` → animations off.
- **Print** (`@media print`): white background, decorative sprite fields and `.no-print`
  hidden, panel shadows removed, `break-inside: avoid` on panels.

## State Management
Essentially **none** — this is a static document. The only stateful piece is the prototype's
`<image-slot>` avatar (persists a dropped image to localStorage). In production:
- If the avatar is fixed → just an `<img>`, no state.
- If you want it user-uploadable → a single piece of local state / file input is enough.
No data fetching is required; all content is static and lives in the markup.

## Design Tokens

### Colors
| Token | Hex | Use |
|---|---|---|
| `--bg` | `#2d2440` | Page base (deep dusk purple) |
| Sky gradient | `#5b4a7e → #8f6e9e → #c98fa9 → #f0b39a → #f6c9a6 → #f7d6b0` | Dusk sky (top→bottom) |
| Mountain m1 | `#6f5a8e` (opacity .55) | Farthest ridge |
| Mountain m2 | `#5a4878` (opacity .70) | Mid ridge |
| Mountain m3 | `#43345f` (opacity .85) | Nearest ridge |
| `--panel` | `rgba(255,250,252,0.92)` | Card background (glass) |
| `--ink` | `#3c3158` | Text / borders (primary) |
| `--muted` | `#8d7fab` | Secondary text |
| `--shadow` | `rgba(43,30,64,0.30)` | Hard pixel drop-shadows |
| Body text (cards) | `#4d4168`, `#443a5e`, `#6c5d88` | Paragraphs / meta |
| Hero text | `#fff7f1`, `#fff2ea`, `#ffe9d4`, `#ffe6d6` | On-sky text |
| Accent · peri | `#8aa3e8` | |
| Accent · pink | `#ef9fc0` | |
| Accent · coral | `#f4a98f` | |
| Accent · mint | `#8fd9bf` | Buttons / "NOW" tag |
| Accent · gold | `#f3cf86` | |
| Accent · lilac | `#b79ee6` | |

### Typography
- **Display/headings:** `"Press Start 2P"` (Google Fonts) — name, section titles.
- **Body:** `"Pixelify Sans"` (Google Fonts), 400–700.
- **Labels/meta/UI:** `"Silkscreen"` (Google Fonts), 400/700.
- Base body size **18px**, line-height 1.55, letter-spacing 0.1px.
- Scale used: name `clamp(22px,5.2vw,44px)` · section titles 14px · role 22px ·
  lead 19px · body 17.5px · job role 19px · bullets 15.5px · meta/labels 11–13px.

### Spacing
- Page padding `40px 22px 90px`; column gap `26px`; sidebar gap `18px`; card padding
  `16–24px`. Timeline waypoints 18px on a 4px trail, cards offset by `padding-left: 34px`.

### Borders / Radius / Shadows
- Panels: **3px solid `--ink`**, `border-radius: 2px` (intentionally tiny — pixel feel),
  hard shadow `6px 6px 0 0 var(--shadow)`.
- Chips: 2.5px border, `3px 3px 0` shadow. Tags: 2px border, `2px 2px 0` shadow.
- **No soft/blurred shadows anywhere** except the hero name glow and waypoint glow rings.
- Everything uses `image-rendering: pixelated` where sprites are involved.

### Animation
- `blink` 1s steps(1) · `floaty` ~4.5–9s ease-in-out · `pulse` 1.8s steps(4) ·
  `twinkle` 2.4s steps(3). Hover transitions use `steps(2)` for chunkiness.

## Assets
- **No raster images.** All sprites (heart, sparkle, star4, gem, coin, cloud, slime, mushroom,
  leaf, flag, arrow) are generated from small ASCII grids by `assets/pixel.js` using stacked
  `box-shadow`s. The mountains are CSS `clip-path` polygons; the sky is a CSS gradient + dither.
- **Fonts:** Press Start 2P, Pixelify Sans, Silkscreen — all Google Fonts (loaded via `<link>`
  in the HTML head).
- **Avatar:** placeholder slot only — supply Pavel's real pixel portrait (recommended ~128×128,
  rendered with `image-rendering: pixelated`).
- The `pixel.js` sprite engine and sprite dictionary are reusable; port or wrap them as you like.

## Screenshots
Reference renders of the prototype are in **`screenshots/`**:
- `01-hero.png` — hero (dusk sky, name, contacts) + top of About / sidebar.
- `02-about-ascent.png` — About panel and the start of the "Ascent" timeline.
- `03-timeline.png` — mid timeline (glowing waypoints, job cards).
- `04-sidebar-footer.png` — lower timeline + "Earlier" note + Save/Print button.

## Files
Included in this bundle:
- `Dusk Resume.html` — the complete prototype (page markup + all page-specific CSS in a
  `<style>` block: sky, mountains, timeline, sidebar).
- `assets/base.css` — shared foundation: reset, type scale, `.panel` / `.chip` / `.tag2` /
  `.bar` styles, sprite/float/animation helpers, and **print rules**.
- `assets/pixel.js` — the CSS-sprite builder (`data-sprite` → `box-shadow`), the
  `[data-pixel-field]` decorative scatterer, and small FX. Public API: `window.Pixel`.
- `assets/image-slot.js` — the drag-drop avatar web component used only by the prototype;
  **replace with an `<img>`/upload in production** (included for reference).

> Tip: the fastest path is to copy `base.css` + `pixel.js` into your project, port the
> `Dusk Resume.html` `<style>` block and markup into components, and swap the `<image-slot>`
> for a real image. Everything else is plain, framework-agnostic CSS.
