// Odyssée Pinball — service worker (hors ligne + mises à jour)
const VERSION = 'odyssee-v18';
const SHELL = ['./', './index.html', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/maskable-512.png', './icons/apple-touch-icon.png', './music/volcan.m4a', './music/meadow.m4a', './music/nebula.m4a', './music/castle.m4a', './music/abyss.m4a'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Page du jeu : réseau d'abord (pour recevoir les nouvelles tables), cache si hors ligne
  if (req.mode === 'navigate' || url.pathname.endsWith('/index.html')) {
    e.respondWith(fetch(url.href, {cache: 'no-store'}).then(r => { const c = r.clone(); caches.open(VERSION).then(x => x.put('./index.html', c)); return r; })
      .catch(() => caches.match('./index.html')));
    return;
  }
  // Polices Google : gardées en cache après la première ouverture
  if (url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
    e.respondWith(caches.open(VERSION + '-fonts').then(c => c.match(req).then(hit => hit || fetch(req).then(r => { c.put(req, r.clone()); return r; }))));
    return;
  }
  // Le reste : cache d'abord
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => { if (r.ok && url.pathname.includes('/music/')) { const c = r.clone(); caches.open(VERSION).then(x => x.put(req, c)); } return r; })));
});
