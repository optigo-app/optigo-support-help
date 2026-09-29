import { useEffect } from "react";
import { getSavedUpdate, saveUpdate } from "./../utils/idbUtils";

function useSWVersionChecker() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker.ready
      .then(async (registration) => {
        const messageChannel = new MessageChannel();
        const saved = await getSavedUpdate();
        let lastVersion = saved?.version || null;

        messageChannel.port1.onmessage = async (event) => {
          if (event.data === "CHECK_COOKIE") {
            try {
              const newVersion = window.__APP_VERSION__;
              if (!lastVersion) {
                await saveUpdate({ version: newVersion });
                lastVersion = newVersion;
                return;
              }
              if (newVersion !== lastVersion) {
                console.log("New version available", newVersion);
                window.dispatchEvent(
                  new CustomEvent("NEW_VERSION_AVAILABLE", {
                    detail: { version: newVersion },
                  })
                );
                await saveUpdate({ version: newVersion });
                lastVersion = newVersion;
              }
            } catch (err) {
              console.error("Version check failed:", err);
            }
          }
        };

        window.swChannel = messageChannel;
        registration.active?.postMessage("START_TIMER", [messageChannel.port2]);
      })
      .catch((err) => console.error("Service Worker error:", err));

    return () => {
      if (window.swChannel?.port1?.close) window.swChannel.port1.close();
    };
  }, []);
}

export default useSWVersionChecker;
