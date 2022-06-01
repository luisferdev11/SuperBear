// Template Name: Olivera - PWA Mobile HTML5 Template
// Template Author: Orino Studio
// Template Author URL: https://themeforest.net/user/orinostu

/*=========================================================================
** You can find, detailed, and working examples of 
** service worker usage on https://github.com/mozilla/serviceworker-cookbook
===========================================================================*/

// Cache name
var CACHE_NAME = 'cache-version-1.2';

// Files required to make this app work offline
var REQUIRED_FILES = [
    'index.html',
    '/',
    'assets/css/bootstrap.min.css',
    'assets/css/icons.css',
    'assets/css/main.css',
    'assets/css/normalize.css',
    'assets/css/swiper-bundle.min.css',
    'assets/css/owl.carousel.min.css',
    'assets/fonts/The-Icon-of.ttf',
    'assets/fonts/The-Icon-of.woff',
    'assets/fonts/The-Icon-of.eot',
    'assets/fonts/The-Icon-of.svg',
    'assets/fonts/text-font/CircularStd-Bold.eot',
    'assets/fonts/text-font/CircularStd-Bold.otf',
    'assets/fonts/text-font/CircularStd-Bold.ttf',
    'assets/fonts/text-font/CircularStd-Bold.woff',
    'assets/fonts/text-font/CircularStd-Bold.woff2',
    'assets/fonts/text-font/CircularStd-Book.eot',
    'assets/fonts/text-font/CircularStd-Book.otf',
    'assets/fonts/text-font/CircularStd-Book.ttf',
    'assets/fonts/text-font/CircularStd-Book.woff',
    'assets/fonts/text-font/CircularStd-Book.woff2',
    'assets/fonts/text-font/CircularStd-Medium.eot',
    'assets/fonts/text-font/CircularStd-Medium.otf',
    'assets/fonts/text-font/CircularStd-Medium.ttf',
    'assets/fonts/text-font/CircularStd-Medium.woff',
    'assets/fonts/text-font/CircularStd-Medium.woff2',
    'assets/js/jquery-3.6.0.js',
    'assets/js/popper.min.js',
    'assets/js/bootstrap.min.js',
    'assets/js/vendor/owl.carousel.min.js',
    'assets/js/vendor/swiper-bundle.min.js',
    'assets/js/vendor/sharer.js',
    'assets/js/main.js',
    'assets/img/38.png'
];

self.addEventListener('install', function (event) {
    // load the required files into the cache
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                // Add to the cache
                return cache.addAll(REQUIRED_FILES);
            })
            .then(function () {
                return self.skipWaiting();
            })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // Cache hit - return the response from the cached version
                if (response) {
                    return response;
                }
                //return the result from the live server
                return fetch(event.request);
            }
            )
    );
});

self.addEventListener('activate', function (event) {

    event.waitUntil(self.clients.claim());
});