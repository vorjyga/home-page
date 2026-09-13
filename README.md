# Pavel Novaikin — personal website

Astro 5 + React + Tailwind. Static output served by nginx in Docker.

## Local development

```sh
npm ci
npm run dev
npm run build
npm run preview
npm test
```

## Pages and content

- `/`: personal website placeholder.
- `/frontend/`: standard CV; `/frontend/pixels/`, `/frontend/based/`, `/frontend/warhammer/`: existing visual variants.
- `/fullstack/`: fullstack CV, without the site navigation header.
- `/game/`: placeholder for a future browser game. Add its client script only to this route.

Only `FrontendLayout.astro` adds `FrontendHeader.astro`. The base `Layout.astro` owns fonts and analytics.
Shared factual content lives in `src/data/`. `src/data/resumes.js` composes the frontend profile and fullstack overrides. The fullstack summary uses existing documented experience; employment titles remain unchanged. Editorial and Grimdark retain their existing curated copy.

nginx redirects old `/pixels`, `/based`, `/warhammer` addresses (with or without a trailing slash) to the frontend section, preserving query parameters. Static fallback pages perform the same navigation in preview/other hosts using JavaScript, preserving query and hash; without JavaScript they provide a direct link. The old root now intentionally shows the placeholder.

## Downloadable PDFs

Both profiles have actual downloadable files under `public/pdf/`. Every frontend design downloads the same frontend PDF. Fullstack has its own PDF. These are separate from browser printing.

Regenerate after editing résumé data:

```sh
python3 -m pip install -r scripts/requirements-pdf.txt
npm run pdf
npm run build
```

The generator reads `src/data/resumes.js` through Node.js. Commit regenerated PDFs along with content edits. Python is only needed to regenerate files; normal builds and production serving use the committed files. Review page breaks after significant content changes.

## Umami analytics

The supplied Umami Cloud site is configured by default:

- Script: `https://cloud.umami.is/script.js`
- Website ID: `55a90479-f60c-47fc-85f5-05f905719786`

Optional build-time overrides are listed in `.env.example`. Docker builds accept the same names as build arguments. Analytics only runs in production builds on `novaikin.com` and `www.novaikin.com`; local previews do not send events. Update the allowlist in `Analytics.astro` if changing domains.

Send a unique code per recipient/application, for example:

```text
https://novaikin.com/frontend/?utm=xxXXxx
https://novaikin.com/fullstack/?utm=another-code
```

Standard `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` work with Umami's built-in UTM reports. `utm_content` also acts as a tag when `utm` is absent.

In the website's Umami dashboard:

- Pageviews show normal traffic.
- Events → `cv-link-open` → Properties → `tag` shows openings of each tagged URL. Reloading a tagged page counts again; following an untagged internal link does not add another tagged-opening event.
- `cv-pdf-download` records PDF link clicks with `file`, `path`, and `tag`. The tag is retained for PDF attribution across pages within the browser tab using sessionStorage when available. A click is not proof that the transfer completed.

Events have no recipient names: keep your mapping from codes to applications separately. Counts measure recorded opens, not proof of reading or unique people. Blocking scripts prevents collection. Do not add UTM parameters to internal navigation: they would count additional tagged entries.

## Deployment

```sh
docker compose up -d --build
```

nginx listens on port 3000 behind the existing Traefik setup. Unknown routes and missing PDFs return 404. Deploying the new image enables the configured analytics on the production domain. Production delivery to Umami should be checked after deployment with one known test tag.
