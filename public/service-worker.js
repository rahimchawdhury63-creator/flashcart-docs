/**
 * =============================================================================
 * FLASHCART DOCS — Service Worker
 * =============================================================================
 * 
 * Purpose: Lightweight service worker for the documentation portal.
 * 
 * Documentation pages change infrequently, so we use aggressive caching
 * with a stale-while-revalidate approach for most content.
 * No push notifications needed for docs.
 * 
 * Developer: Rizwan Rahim Chowdhury
 * Powered by: Bangladesh Software Development Community (BSDC)
 * =============================================================================
 */

const CACHE_VERSION = 'flashcart-docs-v1.0.0';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;

const PRECACHE_URLS = [
  '/',
  '/offline.html',
  '/manifest.json'
];

/* --- INSTALL --- */
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(PRECACHE_URLS).catch((err) => {
        console.warn('[Docs SW] Pre-cache failure:', err);
      });
    })
  );
});

/* --- ACTIVATE --- */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name.startsWith('flashcart-docs-') && name !== STATIC_CACHE && name !== DYNAMIC_CACHE)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

/* --- FETCH --- */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET' || !request.url.startsWith('http')) return;

  const url = new URL(request.url);

  /* Firebase API calls — network first */
  if (url.hostname.includes('firestore.googleapis.com') || url.hostname.includes('identitytoolkit')) {
    event.respondWith(networkFirst(request));
    return;
  }

  /* CDN resources — cache first */
  if (url.hostname.includes('fonts.g') || url.hostname.includes('unpkg.com')) {
    event.respondWith(cacheFirst(request));
    return;
  }

  /* Static assets — cache first */
  if (url.pathname.match(/\.(js|css|woff|woff2|png|jpg|svg|ico)$/i)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  /* Pages — stale while revalidate (docs change infrequently) */
  event.respondWith(staleWhileRevalidate(request));
});

/* --- MESSAGE --- */
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

/* --- Strategy Implementations --- */

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (e) {
    const cached = await caches.match(request);
    return cached || (request.mode === 'navigate' ? caches.match('/offline.html') : new Response('', { status: 503 }));
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (e) {
    return request.mode === 'navigate' ? caches.match('/offline.html') : new Response('', { status: 404 });
  }
}

async function staleWhileRevalidate(request) {
  const cached = await caches.match(request);
  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) {
      caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, response.clone()));
    }
    return response;
  }).catch(() => null);

  if (cached) return cached;
  const response = await fetchPromise;
  return response || (request.mode === 'navigate' ? caches.match('/offline.html') : new Response('', { status: 503 }));
}
