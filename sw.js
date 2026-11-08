// Network-only service worker: avoids serving stale accounting code or caching private customer data.
const CACHE_VERSION = 'dui-bhai-network-only-v1';
self.addEventListener('install', event => { self.skipWaiting(); });
self.addEventListener('activate', event => { event.waitUntil((async () => {
  const keys = await caches.keys();
  await Promise.all(keys.map(key => caches.delete(key)));
  await self.clients.claim();
})()); });
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  // Always use the network; do not cache customer/accounting or Firebase data.
  event.respondWith(fetch(event.request));
});
