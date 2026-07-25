// sw.js — Service worker mínimo: solo se encarga de mostrar las notificaciones push
// que le llegan del servidor. No cachea nada ni hace la app funcionar offline.
self.addEventListener('push', (event) => {
  let data = { title: 'FlowOps AI', body: 'Tienes una novedad.' };
  try { data = event.data.json(); } catch (e) {}
  event.waitUntil(
    self.registration.showNotification(data.title || 'FlowOps AI', {
      body: data.body || '',
      icon: undefined,
      tag: data.jobId || undefined,
      data,
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((list) => {
      for (const c of list) { if ('focus' in c) return c.focus(); }
      if (clients.openWindow) return clients.openWindow('/');
    })
  );
});
