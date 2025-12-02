const cacheName = "DefaultCompany-Indie-0.1.2";
const contentToCache = [
    "Build/7a2dbded24d57e056180125b1583e7c4.loader.js",
    "Build/7539aa7c5eb21fa09938eb2502e16885.framework.js",
    "Build/6469df2ee531602f6415886da1c1d734.data",
    "Build/936407a488bfbd792fa6b498be1d184e.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
