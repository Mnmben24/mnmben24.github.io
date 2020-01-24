// use a cacheName for cache versioning
var cacheName = 'productCache_v1_14';

const cacheElements = [
    './css/styles.css',
    './css/fonts/roboto.woff',
    './offline.html',
    './images/peripheral_vane_qb1.png',
    './images/single_stage_cpm.png',
    './images/fps_ss_series.png',
    './images/fps_fs_series.png',
    './index.html',
    './ProductPage.html',
    './headTool.html',
    './PressureBooster.html',
    './js/data.js',
    './js/data1.js',
    './js/main_v1.js',
    './js/indexjs.js'
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
          return false;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
