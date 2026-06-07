# Pixels résumé — "Dusk Mountain"

An atmospheric pixel-art variant of the résumé (Celeste-like dusk mountain scene):
glowing hero, an "About" panel, work experience as a vertical **Ascent** timeline, and a
sticky sidebar (avatar / skills / languages / education). All sprites and the mountain
backdrop are pure CSS — no raster assets.

**Route:** `/pixels` (the base/light view stays at `/`).

## Content
Pulled from the shared data layer in `src/data/` — the same source the base view uses, so a
content edit updates every variant. Hero framing strings (`kicker`, `headline`,
`teamLeadNote`) live on `profile` and are used only here.

## Files
- `PixelsResume.astro` — the whole view, generated from `src/data` with the dusk classes
  and `data-sprite` icons.
- `styles/base.css` — shared pixel foundation (panels, chips, bars, caret, print rules).
- `styles/dusk.css` — page theme + layout (sky, mountains, timeline, sidebar).
- `pixel.js` — CSS box-shadow sprite engine (`data-sprite` → sprites, `data-pixel-field`
  → floating decorations). Runs as a client script; exposes `window.Pixel`.
- `design/` — the original handoff (mockup, base.css, pixel.js, screenshots) kept for reference.

Rendered by the shared `src/layouts/Layout.astro` with `variant="pixel"` (adds the pixel Google Fonts; Tailwind stays off this route)
via `src/pages/pixels.astro`.

## Avatar
Uses the pixel челдобрек favicon (`/favicon.svg`) as the portrait. Swap the `<img>` in
`PixelsResume.astro` for a dedicated portrait if you make one.
