import { test } from 'node:test';
import assert from 'node:assert/strict';
import worker, { getVisit } from '../src/worker.js';

function pageRequest(url, headers = {}) {
  return new Request(url, {
    headers: {
      accept: 'text/html',
      'sec-fetch-dest': 'document',
      'user-agent': 'Mozilla/5.0',
      ...headers,
    },
  });
}

test('extracts a bounded tag from a tracked CV page', () => {
  const visit = getVisit(pageRequest(`https://novaikin.com/frontend/?utm=${'a'.repeat(300)}`));
  assert.equal(visit.tag.length, 200);
  assert.equal(visit.path, '/frontend/');
  assert.equal(visit.isLikelyBot, 0);
});

test('supports utm_content and marks likely preview bots', () => {
  const visit = getVisit(pageRequest(
    'https://novaikin.com/fullstack/?utm_content=company-a',
    { 'user-agent': 'LinkedInBot/1.0' },
  ));
  assert.equal(visit.tag, 'company-a');
  assert.equal(visit.isLikelyBot, 1);
});

test('ignores untagged pages, other sections, and non-document requests', () => {
  assert.equal(getVisit(pageRequest('https://novaikin.com/frontend/')), null);
  assert.equal(getVisit(pageRequest('https://novaikin.com/game/?utm=x')), null);
  assert.equal(getVisit(pageRequest('https://novaikin.com/frontend/?utm=x', {
    'sec-fetch-dest': 'image',
    accept: 'image/avif',
  })), null);
});

test('records asynchronously and always serves the static page', async () => {
  const boundValues = [];
  const pending = [];
  const env = {
    ANALYTICS_DB: {
      prepare() {
        return {
          bind(...values) {
            boundValues.push(values);
            return { run: async () => ({ success: true }) };
          },
        };
      },
    },
    ASSETS: { fetch: async () => new Response('cv') },
  };
  const response = await worker.fetch(
    pageRequest('https://novaikin.com/frontend/?utm=company-a'),
    env,
    { waitUntil: (promise) => pending.push(promise) },
  );
  await Promise.all(pending);

  assert.equal(await response.text(), 'cv');
  assert.deepEqual(boundValues[0].slice(0, 2), ['company-a', '/frontend/']);
});

test('serves pages before the D1 binding is configured', async () => {
  const response = await worker.fetch(
    pageRequest('https://novaikin.com/frontend/?utm=company-a'),
    { ASSETS: { fetch: async () => new Response('cv') } },
    { waitUntil: () => assert.fail('no write should be queued') },
  );
  assert.equal(await response.text(), 'cv');
});
