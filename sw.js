{
  "returncode" : 0,
  "stdout" : "\/\/ sw.js — Service worker mínimo: solo se encarga de mostrar las notificaciones push\n\/\/ que le llegan del servidor. No cachea nada ni hace la app funcionar offline.\nself.addEventListener('push', (event) => {\n  let data = { title: 'FlowOps AI', body: 'Tienes una novedad.' };\n  try { data = event.data.json(); } catch (e) {}\n  event.waitUntil(\n    self.registration.showNotification(data.title || 'FlowOps AI', {\n      body: data.body || '',\n      icon: undefined,\n      tag: data.jobId || undefined,\n      data,\n    })\n  );\n});\n\nself.addEventListener('notificationclick', (event) => {\n  event.notification.close();\n  event.waitUntil(\n    clients.matchAll({ type: 'window' }).then((list) => {\n      for (const c of list) { if ('focus' in c) return c.focus(); }\n      if (clients.openWindow) return clients.openWindow('\/');\n    })\n  );\n});\n",
  "stderr" : ""
}
