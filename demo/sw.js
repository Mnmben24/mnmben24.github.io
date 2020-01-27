// use a cacheName for cache versioning
var cacheName = 'productCache_v1_15';

const cacheElements = [
    './css/styles.css',
    './css/fonts/roboto.woff',
    './offline.html',
    './images/peripheral_vane_qb1.png',
    './images/single_stage_cpm.png',
    './images/fps_ss_series.png',
    './images/fps_fs_series.png',
    './images/subdrive_solar.png',
    './images/svm_borehole_pump.png',
    './images/fps_s_series_industrial.png',
    './images/fps_s_series_agricultural.png',
    './images/fps_s_series_multistage.png',
    './images/encapsualted_submersible.png',
    './images/j_class_sandhandler.png',
    './images/svm_pressure_sets.png',
    './images/fps_mh.png',
    './images/fps_vr.png',
    './images/mono_bp.png',
    './images/mono_hand_pumps.png',
    './images/mono_hd.png',
    './images/ezstrip.png',
    './images/mono_industrial_g_range.png',
    './images/mono_industrial_m_range.png',
    './images/orbit_gw.png',
    './images/orbit_hop.png',
    './images/orbit_power_pump.png',
    './images/orbit_mini.png',
    './images/mono_industrial_b_d.png',
    './images/rotorflo.png',
    './images/tsunami.png',
    './images/compact_c.png',
    './images/fps_sr.png',
    './images/fps_t.png',
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
