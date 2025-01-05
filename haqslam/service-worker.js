self.addEventListener('push', function(event) {
    let options = {
      body: event.data.text(),
      icon: 'image.png',
      badge: 'image.png'
    };
    
    event.waitUntil(
      self.registration.showNotification('Prayer Time', options)
    );
  });
  
  self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    // Add behavior for when the notification is clicked
  });
  const CACHE_NAME = 'my-webapp-cache-v1';
  const folders = ['IMAGE', 'IMAGE1', 'IMAGE2', 'IMAGE3']; // List your folders here
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/2nd.html',
    '/about.html',
    '/2nd.png',
    '/azalatu.html',
    '/contact.html',
    '/donate.html',
    '/haq.png',
    '/image.png',
    '/interactive-book.html',
    '/last.html',
    '/manifest.json',
    '/mmm.png',
    '/nig.png',
    '/night.html',
    '/night.png',
    '/prayer-countdown.html',
    '/prayer.html',
    '/profile.html',
    '/Quran.html',
    '/quran.png',
    '/service-worker.js',
    '/service.html',
    '/signin.html',
    '/signup.html',
    '/tree.jpg',
    '/mua.html',
  ]



// Install Event: Cache files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

// Fetch Event: Serve cached files
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});

// Activate Event: Cleanup old caches
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames =>
            Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            )
        )
    );
});
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(function(registration) {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch(function(error) {
      console.log('Service Worker registration failed:', error);
    });
}

self.addEventListener('push', (event) => {
  const options = {
      body: event.data.text(),
      icon: 'mmm.png', // Icon for notification
      badge: 'mmm.png', // Badge to display (dot or number)
      data: { url: 'prayer-countdown.html' }, // Link to navigate when clicked
  };

  event.waitUntil(
      self.registration.showNotification('Prayer Time', options)
  );
});

if (Notification.permission !== "granted") {
  Notification.requestPermission();
}

  