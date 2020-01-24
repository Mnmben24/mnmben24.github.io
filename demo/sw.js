// use a cacheName for cache versioning
var cacheName = 'productCache_v1_10';

const cacheElements = [
    './css/styles.css',
    './css/fonts/roboto.woff',
    './offline.html',
    './images/peripheral_vane_qb1.png',
    './images/single_stage_cpm.png',
    './index.html',
    './ProductPage.html',
    './headTool.html',
    './PressureBooster.html'
];
// during the install phase you usually want to cache static assets
self.addEventListener('install', function(e) {
    // once the SW is installed, go ahead and fetch the resources to make this work offline
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(cacheElements).then(function() {
                self.skipWaiting();
            });
        })
    );
});


// when the browser fetches a url
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          // Return true if you want to remove this cache,
          // but remember that caches are shared across
          // the whole origin
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
