const MAX_TAG_LENGTH = 200;
const MAX_HEADER_LENGTH = 500;
const TRACKED_SECTIONS = ['/frontend', '/fullstack'];
const BOT_USER_AGENT = /bot|crawler|spider|preview|facebookexternalhit|linkedinbot|slackbot|telegrambot|whatsapp/i;

function belongsToTrackedSection(pathname) {
  return TRACKED_SECTIONS.some((section) =>
    pathname === section || pathname.startsWith(`${section}/`),
  );
}

function clean(value, maxLength) {
  return value.trim().replace(/[\u0000-\u001f\u007f]/g, '').slice(0, maxLength);
}

export function getVisit(request) {
  if (request.method !== 'GET') return null;

  const url = new URL(request.url);
  if (!belongsToTrackedSection(url.pathname)) return null;

  const destination = request.headers.get('sec-fetch-dest');
  const acceptsHtml = request.headers.get('accept')?.includes('text/html');
  if (destination && destination !== 'document') return null;
  if (!destination && !acceptsHtml) return null;

  const tag = clean(url.searchParams.get('utm') || url.searchParams.get('utm_content') || '', MAX_TAG_LENGTH);
  if (!tag) return null;

  const userAgent = clean(request.headers.get('user-agent') || '', MAX_HEADER_LENGTH);

  return {
    tag,
    path: url.pathname,
    referrer: clean(request.headers.get('referer') || '', MAX_HEADER_LENGTH),
    userAgent,
    country: clean(request.cf?.country || '', 2),
    isLikelyBot: BOT_USER_AGENT.test(userAgent) ? 1 : 0,
  };
}

export async function recordVisit(database, visit) {
  await database
    .prepare(`
      INSERT INTO cv_visits (tag, path, referrer, user_agent, country, is_likely_bot)
      VALUES (?, ?, ?, ?, ?, ?)
    `)
    .bind(
      visit.tag,
      visit.path,
      visit.referrer,
      visit.userAgent,
      visit.country,
      visit.isLikelyBot,
    )
    .run();
}

export default {
  async fetch(request, env, context) {
    const visit = getVisit(request);

    if (visit && env.ANALYTICS_DB) {
      const write = recordVisit(env.ANALYTICS_DB, visit).catch((error) => {
        console.error('Unable to record tagged CV visit', error);
      });
      context.waitUntil(write);
    }

    return env.ASSETS.fetch(request);
  },
};
