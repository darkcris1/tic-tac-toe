const cacheName = 'TICTAC_TOE_SW'

const urlToCache = [
  '/index.html',
  '/scripts/utils.js',
  '/scripts/index.js',
  '/scripts/store.js',
  '/css/main.css',
]

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(urlToCache)
    }),
  )
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cachesNames) => {
      return Promise.all(
        cachesNames.map((cache) => {
          if (cache !== cacheName) {
            // Delete old cache
            return caches.delete(cache)
          }
        }),
      )
    }),
  )
})

self.addEventListener('fetch', (e) => {
  e.respondWith(fetch(e.request).catch(caches.match(e.request)))
})
