const CACHE_NAME = 'vigilancia-materna-v1';
const urlsToCache = [
  './',
  './VIGILANCIA MATERNA.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Instalación: Guardar archivos en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Archivos en caché');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activación: Limpiar cachés viejas si actualizas la versión
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch: Servir desde caché si no hay internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si está en caché, lo devuelve. Si no, lo pide a internet.
        return response || fetch(event.request);
      })
  );
});