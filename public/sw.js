// Khamer Menu Service Worker
// Cache version for managing updates
const CACHE_NAME = 'khamer-menu-v1.0.0'
const STATIC_CACHE = 'khamer-static-v1.0.0'
const DYNAMIC_CACHE = 'khamer-dynamic-v1.0.0'

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/src/main.js',
  '/src/styles/main.css',
  '/favicon.svg',
  '/images/kabsa.jpg',
  '/images/mandi.jpg',
  '/images/machboos.jpg',
  '/images/mansaf.jpg',
  '/images/ouzi.jpg'
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Khamer Menu SW: Installing...')
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Khamer Menu SW: Caching static assets')
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => {
        console.log('Khamer Menu SW: Installation complete')
        return self.skipWaiting()
      })
      .catch((error) => {
        console.error('Khamer Menu SW: Installation failed', error)
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Khamer Menu SW: Activating...')
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Khamer Menu SW: Deleting old cache', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        console.log('Khamer Menu SW: Activation complete')
        return self.clients.claim()
      })
  )
})

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  
  // Handle different types of requests
  if (request.method === 'GET') {
    // Static assets - cache first strategy
    if (STATIC_ASSETS.includes(url.pathname)) {
      event.respondWith(
        caches.match(request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse
            }
            return fetch(request)
              .then((response) => {
                return caches.open(STATIC_CACHE)
                  .then((cache) => {
                    cache.put(request, response.clone())
                    return response
                  })
              })
          })
          .catch(() => {
            // Fallback for offline
            if (url.pathname.endsWith('.jpg') || url.pathname.endsWith('.png')) {
              return new Response(
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="#1a1a2e"/><text x="100" y="100" text-anchor="middle" fill="#d4af37" font-size="16">صورة غير متاحة</text></svg>',
                { headers: { 'Content-Type': 'image/svg+xml' } }
              )
            }
          })
      )
    }
    // Dynamic content - network first strategy
    else {
      event.respondWith(
        fetch(request)
          .then((response) => {
            // Cache successful responses
            if (response.status === 200) {
              const responseClone = response.clone()
              caches.open(DYNAMIC_CACHE)
                .then((cache) => {
                  cache.put(request, responseClone)
                })
            }
            return response
          })
          .catch(() => {
            // Fallback to cache
            return caches.match(request)
              .then((cachedResponse) => {
                if (cachedResponse) {
                  return cachedResponse
                }
                // Ultimate fallback for HTML pages
                if (request.headers.get('accept').includes('text/html')) {
                  return caches.match('/')
                }
              })
          })
      )
    }
  }
})

// Background sync for offline functionality
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('Khamer Menu SW: Background sync triggered')
    event.waitUntil(
      // Handle any offline actions here
      Promise.resolve()
    )
  }
})

// Push notifications for special offers
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.body || 'عرض خاص من مطعم خمر',
      icon: '/favicon.svg',
      badge: '/favicon.svg',
      dir: 'rtl',
      lang: 'ar',
      data: {
        url: data.url || '/'
      },
      actions: [
        {
          action: 'view',
          title: 'عرض العرض',
          icon: '/favicon.svg'
        },
        {
          action: 'close',
          title: 'إغلاق'
        }
      ]
    }
    
    event.waitUntil(
      self.registration.showNotification(data.title || 'مطعم خمر', options)
    )
  }
})

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  
  if (event.action === 'view') {
    const url = event.notification.data.url || '/'
    event.waitUntil(
      clients.openWindow(url)
    )
  }
})

// Periodic sync for updates
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'menu-update') {
    event.waitUntil(
      // Check for menu updates
      fetch('/api/menu-version')
        .then(response => response.json())
        .then(data => {
          // Handle menu updates
          console.log('Khamer Menu SW: Checking for menu updates')
        })
        .catch(error => {
          console.log('Khamer Menu SW: Failed to check for updates', error)
        })
    )
  }
})

// Message handling for cache updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME })
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        )
      })
    )
  }
})