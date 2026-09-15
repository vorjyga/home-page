import { test } from 'node:test';
import assert from 'node:assert/strict';
import { initializeAnalytics } from '../src/scripts/analytics.js';

function setup(search, { blockedStorage = false, tracker = true, sessionReady = true } = {}) {
  const calls = [], listeners = {}, storage = new Map(), timers = [];
  let load;
  const win = {
    location: { search, pathname: '/frontend/', href: `https://novaikin.com/frontend/${search}` },
    sessionStorage: {
      setItem(key, value) { if (blockedStorage) throw Error('blocked'); storage.set(key, value); },
      getItem(key) { if (blockedStorage) throw Error('blocked'); return storage.get(key); },
    },
    umami: tracker ? {
      track: (...args) => { calls.push(args); },
      getSession: () => ({ cache: sessionReady ? 'ready' : '' }),
    } : undefined,
    setTimeout: (callback) => { timers.push(callback); },
  };
  const doc = {
    createElement: () => ({ dataset: {}, addEventListener: (_, fn) => { load = fn; } }),
    head: { appendChild() {} },
    addEventListener: (name, fn) => { listeners[name] = fn; },
  };
  initializeAnalytics(win, doc, { scriptUrl: 'https://cloud.umami.is/script.js', websiteId: 'test' });
  return {
    calls, win, doc, listeners,
    load: () => load(),
    runTimer: () => timers.shift()?.(),
    pendingTimers: () => timers.length,
  };
}
test('tagged entry is one custom event and does not duplicate automatic pageviews', () => {
  const s = setup('?utm=xxXXxx');
  assert.equal(s.calls.length, 0);
  s.load();
  assert.deepEqual(s.calls, [['cv-link-open', { tag: 'xxXXxx', path: '/frontend/' }]]);
});
test('untagged navigation does not create another tagged entry', () => {
  const s = setup(''); s.load(); assert.equal(s.calls.length, 0);
});
test('standard utm_content works; PDF clicks retain the entry tag', () => {
  const s = setup('?utm_content=campaign-42'); s.load();
  s.listeners.click({ target: { closest: () => ({ href: '/pdf/cv-Pavel-Novaikin-senior-frontend.pdf' }) } });
  assert.equal(s.calls[1][0], 'cv-pdf-download');
  assert.equal(s.calls[1][1].tag, 'campaign-42');
});
test('blocked storage and unavailable analytics do not break the page', () => {
  const s = setup('?utm=tag', { blockedStorage: true, tracker: false });
  assert.doesNotThrow(() => s.load());
  assert.doesNotThrow(() => s.listeners.click({ target: { closest: () => null } }));
});
test('untrusted tags are bounded and kept as data', () => {
  const s = setup('?utm=' + 'x'.repeat(600)); s.load();
  assert.equal(s.calls[0][1].tag.length, 200);
});

test('tagged event waits until the automatic pageview establishes a session', () => {
  const s = setup('?utm=company-a', { sessionReady: false });
  s.load();
  assert.equal(s.calls.length, 0);
  assert.equal(s.pendingTimers(), 1);

  s.win.umami.getSession = () => ({ cache: 'session-ready' });
  s.runTimer();
  assert.deepEqual(s.calls, [['cv-link-open', { tag: 'company-a', path: '/frontend/' }]]);
});
