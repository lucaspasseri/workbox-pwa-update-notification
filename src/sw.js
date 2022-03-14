/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js"
);

// Set workbox config
workbox.setConfig({
  debug: true,
});

// SW version
const SW_VERSION = "1.0.24";

// Start controlling any existing clients as soon as it activates
workbox.core.clientsClaim();

// Skip over the SW waiting lifecycle stage
//workbox.core.skipWaiting();

workbox.precaching.cleanupOutdatedCaches();

// Precaches
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);


// Quick usage
workbox.recipes.pageCache();
workbox.recipes.googleFontsCache();
workbox.recipes.staticResourceCache();
workbox.recipes.imageCache();
workbox.recipes.offlineFallback();

// Communication between sw.js and workbox-windown in index.js
self.addEventListener("message", (event) => {
  if (event.data.type === "GET_VERSION") {
    event.ports[0].postMessage(SW_VERSION);
  }
});

// Skip waiting when recive a message
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    return self.skipWaiting();
  }
});