let allCache = [
    '/',
    'index.html',
    'restaurant.html',
    '/css/base.css',
    '/css/mobile.css',
    '/css/tablet.css',
    '/css/desktop.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
];

self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open('cache_v1').then(function(cache){
            cache.addAll(allCache);
        })
    );
});

self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request).then(function(response){
            if (response) return response;
            return fetch(event.request);
        })
    )
});

//cache.match(request);
//caches.match(request);