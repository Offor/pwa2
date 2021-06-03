var cacheName = 'petstore-v1';
var cacheFiles = [
    'index.html',
    'products.js',
    'petstore.webmanifest',
    'images/product-fullsize.jpg',
    'images/icon-512.png'
];

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching all the files');
            return cache.addAll(cacheFiles);

        })
    );
});

self.addEventListener('fetch',function (e) {
    //e.response checks if the cache has the file (it it's existing) add
    e.respondWith(
        caches.match(e.request).then(function (r) {
            console.log('[Service Worker] Fetching resource: ' + e.request.url);
            //r is the matching file if it exists in the cache
            return r
        })
    );
});