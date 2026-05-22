// PWA service worker with offline support dummy
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', (e) => {
  // Satisfy Chrome's PWA install criteria by calling respondWith
  e.respondWith(
    fetch(e.request).catch(() => {
      return new Response("بوابة معرب الألعاب - وضع عدم الاتصال", {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    })
  );
});
