import { useEffect, useRef } from "react";

function useSWVersionChecker() {
  const isCheckingRef = useRef(false);

  useEffect(() => {
    const checkVersion = async () => {
      if (isCheckingRef.current) return;
      isCheckingRef.current = true;
      try {
        // Fetch version.json directly with cache-busting timestamp and no-store
        const res = await fetch(`/version.json?_t=${Date.now()}`, {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        });

        if (!res.ok) {
          isCheckingRef.current = false;
          return;
        }

        const data = await res.json();
        const serverVersion = data?.version;
        const currentVersion = window.__APP_VERSION__;

        if (serverVersion && currentVersion && serverVersion !== currentVersion) {
          console.log(
            `[VersionChecker] New version detected on server: ${serverVersion} (current: ${currentVersion})`
          );

          // Prompt Service Worker to update if present
          if ("serviceWorker" in navigator) {
            navigator.serviceWorker.getRegistrations().then((registrations) => {
              registrations.forEach((r) => r.update());
            });
          }

          // Dispatch event for UI notification
          window.dispatchEvent(
            new CustomEvent("NEW_VERSION_AVAILABLE", {
              detail: { version: serverVersion, buildTime: data.buildTime },
            })
          );
        }
      } catch (_) {
        // Silent catch for network drops
      } finally {
        isCheckingRef.current = false;
      }
    };

    // 1. Initial check on mount
    checkVersion();

    // 2. Check when user switches to or focuses the tab
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        checkVersion();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", checkVersion);

    // 3. Periodic check every 2 minutes
    const interval = setInterval(checkVersion, 120000);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", checkVersion);
      clearInterval(interval);
    };
  }, []);
}

export default useSWVersionChecker;

