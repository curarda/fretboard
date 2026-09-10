/* Uygulamayı çevrimdışı çalıştıran servis işçisi.

   Uygulamada hiç ağ çağrısı yok: sesler Web Audio ile sentezleniyor
   (ses dosyası yok), ayarlar localStorage'da, yazı tipi sistemden geliyor.
   Yani ilk açılıştan sonra uçak modunda da birebir aynı çalışır.

   CACHE adı değişince eski önbellek atılır — sync.py bunu otomatik artırır. */
var CACHE = 'gk-v4';
var ASSETS = ['./', './index.html', './manifest.webmanifest',
              './icon-180.png', './icon-192.png', './icon-512.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE)
      .then(function (c) { return c.addAll(ASSETS); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (ks) {
      return Promise.all(ks.map(function (k) {
        return k === CACHE ? null : caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

/* Önce ağ, olmazsa önbellek: çevrimiçiyken hep güncel sürüm gelir,
   çevrimdışıyken en son kaydedilen sürüm açılır. */
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  var url = new URL(e.request.url);
  if (url.origin !== location.origin) return;

  e.respondWith(
    fetch(e.request).then(function (res) {
      if (res && res.ok) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
      }
      return res;
    }).catch(function () {
      return caches.match(e.request).then(function (hit) {
        if (hit) return hit;
        if (e.request.mode === 'navigate') return caches.match('./index.html');
        return Response.error();
      });
    })
  );
});
