// use a cacheName for cache versioning
var cacheName = 'productCache_v1_21';

const cacheElements = [
    './css/styles.css',
    './css/fonts/roboto.woff',
    './offline.html',
    './images/peripheral_vane_qb1.png',
    './images/single_stage_cpm.png',
    './images/borehole_c.png',
    './images/end_suction_c.png',
    './images/submersible_c.png',
    './images/end_suction_c.png',
    './images/vertical_ms_c.png',
    './index.html',
    './ProductPage.html',
    './headTool.html',
    './PressureBooster.html',
    './js/main_v1.js',
    './js/indexjs.js'
];
// during the install phase you usually want to cache static assets
self.addEventListener('install', function(e) {
    // once the SW is installed, go ahead and fetch the resources to make this work offline
    var splt = cacheName.split("_");
    var name = splt[0] + "_" + splt[1];
    var no = splt[2];
    for (i = 0; i <= no-1; i++)
    {
      try {
      caches.delete(name + "_i");
      }
      catch (err) {}
    }
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
    // either respond with the cached object or go ahead and fetch the actual url
    if(event.request.url.includes(".png"))
    {
      event.respondWith(
          caches.match(event.request).then(function(response) {
              if (response) {
                  // retrieve from cache
                  return response;
              }
              // fetch as normal
              return fetch(event.request);
          })
      );
    }
    else
    {
      event.respondWith(
        fetch(event.request).catch(function() {
          return caches.match(event.request);
        })
      );
  }
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
