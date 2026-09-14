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
npm run pdf
npm run build
```

The generator starts Astro and prints the actual `/frontend/` and `/fullstack/`
pages with Chrome or Chromium, so the website and downloadable PDFs share the
same content, typography, spacing, and print styles. Set `CHROME_BIN` if the
browser executable is not in a standard location. Commit regenerated PDFs along
with content edits. Python and Chrome are only needed to regenerate files;
normal builds and production serving use the committed files. Review page breaks
after significant content changes.

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

### Ad-block-resistant tagged visits

The Cloudflare Worker in `src/worker.js` can also record tagged document requests
before serving `/frontend/*` and `/fullstack/*`. Because this happens at the edge,
browser extensions cannot block the write. The Worker stores no IP address. It
keeps the tag, path, referrer, user agent, two-letter Cloudflare country code, a
likely-bot flag, and the visit time.

Create and bind the production D1 database once:

```sh
npx wrangler d1 create cv-analytics
```

Accept Wrangler's offer to add the binding to `wrangler.jsonc`, then change its
generated `binding` value to `ANALYTICS_DB` and add
`"migrations_dir": "migrations"` to that D1 entry. Apply the schema:

```sh
npx wrangler d1 migrations apply cv-analytics --remote
```

After deploying, inspect totals privately in Cloudflare → D1 → `cv-analytics` →
Console with:

```sql
SELECT
  tag,
  path,
  COUNT(*) AS total_opens,
  SUM(CASE WHEN is_likely_bot = 0 THEN 1 ELSE 0 END) AS probable_human_opens,
  MAX(visited_at) AS last_opened_at
FROM cv_visits
GROUP BY tag, path
ORDER BY last_opened_at DESC;
```

The existing Umami events remain useful for sessions and navigation. D1 is the
more reliable source for tagged link openings. Link previews and security scanners
can open a URL before a person does, so the query reports them separately when the
user agent identifies them.

## Deployment

```sh
docker compose up -d --build
```

nginx listens on port 3000 behind the existing Traefik setup. Unknown routes and missing PDFs return 404. Deploying the new image enables the configured analytics on the production domain. Production delivery to Umami should be checked after deployment with one known test tag.

## Cloudflare Workers Static Assets

`wrangler.jsonc` publishes the static `dist` directory as `home-page`.
No Astro SSR adapter, Worker script, or Docker container is required.

In Cloudflare Workers Builds, select the GitHub repository and use:

- Project name: `home-page` (must match the Wrangler configuration).
- Build command: `npm run build`.
- Deploy command: `npx wrangler deploy`.
- Root directory: repository root.

Commit and push the configuration, public rules, and dependency lockfile before
starting the deployment. `public/_redirects` and `public/_headers` are copied into
`dist` by Astro. Old CV addresses redirect to `/frontend/*`; unmatched paths return
404 rather than the homepage. Hashed assets get immutable browser caching, while
CV pages and PDF files are revalidated.

First verify the `workers.dev` address, then connect `novaikin.com` as a custom
domain. Umami intentionally only runs on the production domain, not workers.dev.
The existing Vultr deployment can keep running until the domain has been moved.

Local deployment validation (does not publish):

```sh
npm run build
npx wrangler deploy --dry-run
```
