self.addEventListener('install', (event) => {
  console.log('Service Worker: Installed');
  // هنا يمكنك تنفيذ الكاش للملفات
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activated');
  // هنا يمكنك تنظيف الكاش القديم إن لزم الأمر
});

self.addEventListener('fetch', (event) => {
  console.log('Service Worker: Fetching', event.request.url);
  // هنا يمكنك التحكم في طلبات الفتش وتقديم البيانات من الكاش
});
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}
