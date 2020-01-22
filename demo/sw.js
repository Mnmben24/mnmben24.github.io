// use a cacheName for cache versioning
var cacheName = 'productCache_v1_1';
var prevCacheName ='productCache';

const cacheElements = [
    './css/style.css',
    './css/fonts/roboto.woff',
    './offline.html',
    './images/peripheral_vane_qb1.png',
    './images/single_stage_cpm.png',
    './images/fps_ss_series.png'
    //'./Logo'
];
// during the install phase you usually want to cache static assets
self.addEventListener('install', function(e) {
    // once the SW is installed, go ahead and fetch the resources to make this work offline
    if (prevCacheName.length > 0){ caches.delete(prevCacheName);};
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
});
