self.addEventListener('install', (event) => {
  console.log("Service Worker Installed");
});

self.addEventListener('activate', (event) => {
  console.log("Service Worker Activated");
  event.waitUntil(self.clients.claim());
});

let messagePort = null;

self.addEventListener('message', (event) => {
  console.log('Service worker received message:', event.data);

  if (event.data === 'START_TIMER') {
    if (event.ports && event.ports[0]) {
      messagePort = event.ports[0];

      // Start sending messages every 3 seconds
      setInterval(() => {
        if (messagePort) {
          messagePort.postMessage('CHECK_COOKIE');
        }
      },  3000);
    } else {
      console.error('No MessageChannel port provided');
    }
  }
});





// --- PUSH NOTIFICATION SETUP ---
self.addEventListener("push", (event) => {
  const data = event.data ? JSON.parse(event.data.text()) : {};
  const title = data.title || "New Notification";
  const options = {
    body: data.body || "You have a new update!",
    icon: "/icon-192.png",       // optional app icon
    badge: "/badge.png",         // optional badge
    data,                        // attach any custom data
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const targetUrl = event.notification.data?.url || "/"; // fallback
  event.waitUntil(
    clients.openWindow(targetUrl)
  );
});
