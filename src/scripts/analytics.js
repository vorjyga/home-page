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
    try { Promise.resolve(win.umami.track(name, data)).catch(() => {}); }
    catch { /* An unavailable analytics service must not affect navigation. */ }
  };

  // Umami starts its automatic pageview request while the tracker script is
  // loading. Wait for that request to establish a session before attaching
  // custom event data. Sending both requests concurrently can leave an event
  // without its properties in Umami Cloud.
  const sendWhenReady = (name, data, attempt = 0) => {
    const tracker = win.umami;
    const trackerReady = typeof tracker?.track === 'function';
    let sessionReady = false;

    if (trackerReady) {
      try {
        sessionReady = typeof tracker.getSession !== 'function' || Boolean(tracker.getSession()?.cache);
      } catch { /* Retry while the tracker initializes. */ }
    }

    if (trackerReady && (sessionReady || attempt >= 20)) {
      send(name, data);
      return;
    }

    if (attempt < 20) {
      win.setTimeout(() => sendWhenReady(name, data, attempt + 1), 100);
    }
  };
  const script = doc.createElement('script');
  script.src = scriptUrl;
  script.defer = true;
  script.dataset.websiteId = websiteId;
  script.addEventListener('load', () => {
    if (tag) sendWhenReady('cv-link-open', { tag, path: win.location.pathname });
  }, { once: true });
  doc.head.appendChild(script);

  doc.addEventListener('click', (event) => {
    const link = event.target.closest?.('a[download]');
    if (!link) return;
    const path = new URL(link.href, win.location.href).pathname;
    if (!path.startsWith('/pdf/')) return;
    sendWhenReady('cv-pdf-download', { tag: attribution, file: path, path: win.location.pathname });
  });
}
