/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope;

const CACHE_NAME = 'personal-website-cache-v1';
const RUNTIME_CACHE = 'runtime-cache';

// Assets to cache on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/static/css/',
  '/static/js/',
  '/static/media/',
];

// Cache strategies
const CACHE_STRATEGIES = {
  cacheFirst: [
    /\.(?:js|css|woff2?|ttf|otf|eot)$/,
    /^https:\/\/fonts\.googleapis\.com/,
    /^https:\/\/fonts\.gstatic\.com/,
  ],
  networkFirst: [
    /\/api\//,
    /\/blog\//,
  ],
  staleWhileRevalidate: [
    /\.(?:png|gif|jpg|jpeg|webp|svg)$/,
  ],
};

// Install event - precache static assets
self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
  self.clients.claim();
});

// Helper function to determine cache strategy based on request URL
const getCacheStrategy = (url: string): 'cacheFirst' | 'networkFirst' | 'staleWhileRevalidate' => {
  for (const [strategy, patterns] of Object.entries(CACHE_STRATEGIES)) {
    if (patterns.some((pattern) => pattern.test(url))) {
      return strategy as 'cacheFirst' | 'networkFirst' | 'staleWhileRevalidate';
    }
  }
  return 'networkFirst'; // Default strategy
};

// Cache-first strategy
const cacheFirst = async (request: Request): Promise<Response> => {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  if (cached) {
    return cached;
  }
  const response = await fetch(request);
  cache.put(request, response.clone());
  return response;
};

// Network-first strategy
const networkFirst = async (request: Request): Promise<Response> => {
  try {
    const response = await fetch(request);
    const cache = await caches.open(RUNTIME_CACHE);
    cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    throw error;
  }
};

// Stale-while-revalidate strategy
const staleWhileRevalidate = async (request: Request): Promise<Response> => {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request).then((response) => {
    cache.put(request, response.clone());
    return response;
  });

  return cached || fetchPromise;
};

// Fetch event - handle requests with appropriate strategy
self.addEventListener('fetch', (event: FetchEvent) => {
  if (event.request.method !== 'GET') return;

  const strategy = getCacheStrategy(event.request.url);
  
  switch (strategy) {
    case 'cacheFirst':
      event.respondWith(cacheFirst(event.request));
      break;
    case 'networkFirst':
      event.respondWith(networkFirst(event.request));
      break;
    case 'staleWhileRevalidate':
      event.respondWith(staleWhileRevalidate(event.request));
      break;
  }
});

// Background sync for offline form submissions
self.addEventListener('sync', (event: SyncEvent) => {
  if (event.tag === 'sync-forms') {
    event.waitUntil(syncForms());
  }
});

// Handle push notifications
self.addEventListener('push', (event: PushEvent) => {
  if (!event.data) return;

  const data = event.data.json();
  const options: NotificationOptions = {
    body: data.body,
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url,
    },
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event: NotificationEvent) => {
  event.notification.close();

  if (event.notification.data?.url) {
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  }
});

// Helper function for form sync
async function syncForms(): Promise<void> {
  try {
    const cache = await caches.open(RUNTIME_CACHE);
    const requests = await cache.keys();
    const formRequests = requests.filter(request => 
      request.url.includes('/api/forms') && request.method === 'POST'
    );

    await Promise.all(
      formRequests.map(async (request) => {
        try {
          await fetch(request.clone());
          await cache.delete(request);
        } catch (error) {
          console.error('Form sync failed:', error);
        }
      })
    );
  } catch (error) {
    console.error('Form sync failed:', error);
  }
}
