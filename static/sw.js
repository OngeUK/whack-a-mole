importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.skipWaiting();

workbox.precaching.precacheAndRoute([]);

workbox.routing.registerNavigationRoute("./index.html");
