/* FR-2 · Service worker.
 *
 * The doctrine is taken whole from the reference project, because it is
 * correct and the reasoning is worth restating:
 *
 *   THIS SITE IS THE SOURCE OF TRUTH. A page must NEVER be served stale from
 *   cache while the network is available. A changed fee band, a corrected
 *   institutional-status statement or a new admissions date has to appear the
 *   moment it is published — with no reinstall and no app-store update. An
 *   institution whose honesty protocol (EB §46) depends on publishing
 *   corrections cannot ship a cache that hides them.
 *
 * So: NETWORK-FIRST for navigations, cache only as the offline fallback.
 * CACHE-FIRST for fingerprinted static assets, which are safe stale because a
 * page reload always re-fetches its own HTML fresh.
 *
 * Why this matters here specifically: EB §14 commits this College to a
 * three-year-old Android on 3G on a metered plan. That student pays for every
 * byte, and the fonts alone are 204KB. Caching them once is the difference
 * between a site they can use and one they avoid.
 */
const VERSION = 'almadinah-{{BUILT}}';
const SHELL = [
  '/', '/brand.css', '/site.js', '/offline/',
  '/assets/fonts/newsreader-roman.woff2',
  '/assets/fonts/bodoni-roman.woff2',
  '/assets/favicon.svg',
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL).catch(() => {})));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  /* Navigations: network first, cache as fallback, offline page as last resort. */
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match(req).then((hit) => hit || caches.match('/offline/')))
    );
    return;
  }

  /* Static assets: cache first, refreshed in the background. Fonts are
     immutable and versioned by filename, so a stale hit is never wrong. */
  if (/\.(css|js|woff2|svg|png|json)$/.test(url.pathname)) {
    e.respondWith(
      caches.match(req).then((hit) => {
        const net = fetch(req).then((res) => {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(req, copy)).catch(() => {});
          return res;
        }).catch(() => hit);
        return hit || net;
      })
    );
  }
});
