const CACHE_NAME = 'video-cache-v1';
const VIDEO_URL = '/path/to/your/video.webm'; // ضع هنا المسار الصحيح للفيديو

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.add(VIDEO_URL);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => cacheName !== CACHE_NAME).map(cacheName => caches.delete(cacheName))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  const requestURL = new URL(event.request.url);
  if (requestURL.pathname === VIDEO_URL) {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request).then(fetchResponse => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      }).catch(() => {
        // اختياري: تقديم رسالة أو ملف بديل عند الفشل
      })
    );
  } else {
    event.respondWith(fetch(event.request));
  }
});
