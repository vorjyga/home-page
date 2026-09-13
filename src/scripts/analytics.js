// The standard Umami tracker records pageviews and standard UTM parameters.
// A tagged entry additionally produces ONE event, separate from pageviews.
export function initializeAnalytics(win, doc, { scriptUrl, websiteId }) {
  const params = new URLSearchParams(win.location.search);
  const tag = (params.get('utm') || params.get('utm_content') || '').trim().slice(0, 200);
  let attribution = tag;
  try {
    if (tag) win.sessionStorage.setItem('cv-link-tag', tag);
    else attribution = win.sessionStorage.getItem('cv-link-tag') || '';
  } catch { /* Tracking must not depend on storage access. */ }

  const send = (name, data) => {
    try { Promise.resolve(win.umami?.track(name, data)).catch(() => {}); }
    catch { /* An unavailable analytics service must not affect navigation. */ }
  };
  const script = doc.createElement('script');
  script.src = scriptUrl;
  script.defer = true;
  script.dataset.websiteId = websiteId;
  script.addEventListener('load', () => {
    if (tag) send('cv-link-open', { tag, path: win.location.pathname });
  }, { once: true });
  doc.head.appendChild(script);

  doc.addEventListener('click', (event) => {
    const link = event.target.closest?.('a[download]');
    if (!link) return;
    const path = new URL(link.href, win.location.href).pathname;
    if (!path.startsWith('/pdf/')) return;
    send('cv-pdf-download', { tag: attribution, file: path, path: win.location.pathname });
  });
}
