self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("crypvisionx-cache").then(cache =>
      cache.addAll(["index.html", "style.css", "script.js", "smiley.png"])
    )
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
