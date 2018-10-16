let staticCacheName = 'cache_v1';
let urlsToCache = [
    '/',
    'index.html',
    'restaurant.html',
    'restaurant.html?id=1',
    'restaurant.html?id=2',
    'restaurant.html?id=3',
    'restaurant.html?id=4',
    'restaurant.html?id=5',
    'restaurant.html?id=6',
    'restaurant.html?id=7',
    'restaurant.html?id=8',
    'restaurant.html?id=9',
    'restaurant.html?id=10',
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

// create cache on install
self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(staticCacheName).then(function(cache){
            cache.addAll(urlsToCache);
        })
    );
});

// custom response with cache
self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request).then(function(response){
            if (response) {
                console.log('Found ' + event.request + ' in cache.');
                return response;
            } else {
                console.log('Could not find ' + event.request + ' in cache.');
                return fetch(event.request)
                .then(function(response){
                    let clonedResponse = response.clone();
                    caches.open('cache_v1').then(function(cache){
                        cache.put(event.request, clonedResponse);
                    })
                    return response;
                })
                .catch(function(error){
                    console.log(error);
                })
            }
        })
    )
});

// update cache
self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames){
        return Promise.all(
            cacheNames.filter(function(cacheName){
                return cacheName.startsWith('cache_') &&
                cacheName != staticCacheName;
            }).map(function(cacheName){
                return cache.delete(cacheName);
            })
        )
      })
    );
  });