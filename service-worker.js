const cacheName = "cache-v1";
const preCachedResources = [
  "/",
  "index.html",
  "assets/js/jquery.ime.js",
  "assets/js/jquery.ime.preferences.js",
  "assets/js/jquery.ime.selector.js",
  "assets/js/jquery.ime.inputmethods.js",
  "assets/js/clipboard.min.js",
  "assets/js/bn-avro.js",
  "assets/js/app.js",
];

self.addEventListener("install", (event) => {
  console.log("Service worker install event!");
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(preCachedResources);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    cache.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
