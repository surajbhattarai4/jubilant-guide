"use strict";

self.addEventListener('install', event => {
  console.log('Service Worker installed');
  event.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll(['/']);
    })
  );
});

self.addEventListener('activate', event => {
  console.log('Service Worker activated');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(response => {
        const responseClone = response.clone();
        caches.open('v1').then(cache => {
          cache.put(event.request, responseClone);
        });
        return response;
      });
    }).catch(() => {
      return caches.match('/');
    })
  );
});
