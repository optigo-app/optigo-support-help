export function registerAuthServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl =
        process.env.NODE_ENV === 'development'
          ? `${process.env.PUBLIC_URL}/sw.js`
          : `/sw.js`;

      console.log('Service Worker URL:', swUrl);

      navigator.serviceWorker
        .register(swUrl, { scope: '/' })
        .then((registration) => {
          console.log('✅ Auth Service Worker registered:', registration.scope);

          // 🆕 Detect new service worker when a new build is deployed
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (!newWorker) return;

            newWorker.addEventListener('statechange', () => {
              if (
                newWorker.state === 'installed' &&
                navigator.serviceWorker.controller
              ) {
                console.log('🆕 New service worker detected!');
                const newVersion = window.__APP_VERSION__;

                // 🚀 Notify app that a new version is available
                window.dispatchEvent(
                  new CustomEvent('NEW_VERSION_AVAILABLE', {
                    detail: { version: newVersion },
                  })
                );
              }
            });
          });
        })
        .catch((error) => {
          console.error('❌ Service Worker registration failed:', error);
        });
    });

    // Optional: logging
    if (navigator.serviceWorker.controller) {
      console.log('Service worker already active');
    } else {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('Service worker now controlling the page');
      });
    }
  }
}

export function getServiceWorkerRegistration() {
  return navigator.serviceWorker.getRegistration();
}

export function sendMessageToServiceWorker(message) {
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage(message);
    return true;
  }
  return false;
}
