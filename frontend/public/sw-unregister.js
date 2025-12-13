// public/sw-unregister.js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    console.log('Unregistering service workers...');
    for(let registration of registrations) {
      registration.unregister();
      console.log('Service worker unregistered:', registration);
    }
    
    // Also try to remove any existing service workers
    navigator.serviceWorker.ready.then(function(registration) {
      registration.unregister();
    });
  });
  
  // Clear all caches
  caches.keys().then(function(cacheNames) {
    cacheNames.forEach(function(cacheName) {
      caches.delete(cacheName);
    });
  });
}