const cacheName = "DefaultCompany-Indie-0.1.2";
const contentToCache = [
    "Build/7a2dbded24d57e056180125b1583e7c4.loader.js",
    "Build/9a6028d232cd12a554ff6717bc87cc85.framework.js",
    "Build/74e0cefd831fbb0c245000c6425b07c4.data",
    "Build/901dbd5b7da311279bdebd927388f6c7.wasm",
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
