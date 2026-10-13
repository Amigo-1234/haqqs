/*
 * HAQSLAM V2: retire the legacy service worker.
 *
 * The old static site registered /service-worker.js with a cache-first fetch
 * handler and a fixed cache name, so returning visitors could keep seeing the
 * old pages indefinitely. Browsers re-check this script on navigation; when
 * they fetch this version it clears every cache, unregisters itself and reloads
 * open tabs from the network. V2 never registers a service worker.
 */
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();
      const windows = await self.clients.matchAll({ type: "window" });
      windows.forEach((client) => client.navigate(client.url));
    })(),
  );
});
