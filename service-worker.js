self.addEventListener('install', event => {
  console.log('Service Worker geïnstalleerd');
});

self.addEventListener('fetch', event => {
  // Voeg hier caching-logica toe indien gewenst
});
