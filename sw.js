/* eslint-disable no-restricted-globals */
/**
 * FULL SPEED service worker.
 *
 * Strategy (kept deliberately small – the game is a handful of files):
 *   • app shell (index.html, manifest, icons) → PRECACHE, network-first so an
 *     update is picked up as soon as the player reloads online,
 *   • same-origin build assets (hashed JS/CSS of the multifile build) →
 *     cache-first, they are immutable,
 *   • cross-origin extras (Google font, the Yarin face and the music streamed
 *     from GitHub) → stale-while-revalidate into a runtime cache, so the game
 *     still starts offline once it has been played through once.
 */

const VERSION = "fullspeed-v1";
const SHELL_CACHE = `${VERSION}-shell`;
const RUNTIME_CACHE = `${VERSION}-runtime`;

const SHELL_ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-512.png",
  "./og-image.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(SHELL_CACHE)
      // addAll aborts on the first failure – add individually so one missing
      // file (e.g. a portal that strips a file) cannot break the install
      .then((cache) => Promise.all(SHELL_ASSETS.map((url) => cache.add(url).catch(() => null))))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== SHELL_CACHE && key !== RUNTIME_CACHE)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("message", (event) => {
  if (event.data === "skip-waiting") self.skipWaiting();
});

/** Cache-first, used for immutable build assets and cross-origin extras. */
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(request);
  if (hit) return hit;
  const response = await fetch(request);
  // opaque (cross-origin, no-cors) responses are still worth caching
  if (response && (response.ok || response.type === "opaque")) {
    cache.put(request, response.clone()).catch(() => undefined);
  }
  return response;
}

/** Network-first with an offline fallback, used for the app shell. */
async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response && response.ok) cache.put(request, response.clone()).catch(() => undefined);
    return response;
  } catch {
    const hit = await cache.match(request);
    if (hit) return hit;
    const shell = await cache.match("./index.html");
    if (shell) return shell;
    throw new Error("offline");
  }
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  const sameOrigin = url.origin === self.location.origin;

  // page navigations: always try the network first, fall back to the shell
  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request, SHELL_CACHE));
    return;
  }

  // hashed assets of the multifile build are immutable
  if (sameOrigin && /\/assets\//.test(url.pathname)) {
    event.respondWith(cacheFirst(request, RUNTIME_CACHE));
    return;
  }

  if (sameOrigin) {
    // manifest, icons, favicon …
    event.respondWith(
      cacheFirst(request, SHELL_CACHE).catch(() => fetch(request)),
    );
    return;
  }

  // fonts + music from GitHub / Google Fonts
  if (/fonts\.(googleapis|gstatic)\.com|raw\.githubusercontent\.com/.test(url.host)) {
    event.respondWith(cacheFirst(request, RUNTIME_CACHE).catch(() => fetch(request)));
  }
});
