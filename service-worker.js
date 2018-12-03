var CACHE_NAME = 'sepeda-cache';
var urlsToCache = [
    '/vendor/bootstrap/css/bootstrap.min.css',
    '/vendor/bootstrap/js/bootstrap.min.js',
    // '/bin/pygment/default.css',
    '/vendor/jquery/jquery.min.js',
    '/vendor/lunr/lunr.min.js',
    '/vendor/theia/ResizeSensor.min.js',
    '/vendor/theia/theia-sticky-sidebar.min.js',
    '/gambar/404.png',
    '/favicon.ico',
    // '/messenger.png',
    '//twemoji.maxcdn.com/2/twemoji.min.js?11.2'
    // '/gambar/play store.png'
];
console.log('loading sw');

self.addEventListener('install', function(event) {
    // Perform install steps
    console.log('installing sw');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                var x = cache.addAll(urlsToCache);
                console.log('cache added');
                return x;
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                    // Cache hit - return response
                    if (response) {
                        return response;
                    }
                    return fetch(event.request);
                }
            )
    );
});