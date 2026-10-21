import { useEffect } from "react";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.optigo.optigocarely";
const APP_STORE_URL = "https://apps.apple.com/app/id6757185516";
const HELP_WEB_URL = "https://help.optigoapps.com/";

const AppRedirect = () => {
  useEffect(() => {
    const userAgent = (
      navigator.userAgent ||
      navigator.vendor ||
      window.opera ||
      ""
    ).toLowerCase();

    const isAndroid = /android/i.test(userAgent);
    const isIOS =
      /iphone|ipad|ipod/i.test(userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const isDesktop = /windows|win32|win64|macintosh|mac os x|linux/i.test(userAgent) && !isAndroid && !isIOS;

    if (isAndroid) {
      window.location.replace(PLAY_STORE_URL);
    } else if (isIOS) {
      window.location.replace(APP_STORE_URL);
    } else if (isDesktop) {
      window.location.replace(HELP_WEB_URL);
    } else {
      window.location.replace(HELP_WEB_URL);
    }
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "Poppins, sans-serif",
        textAlign: "center",
        background: "#f8fafc",
      }}
    >
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: 600,
          color: "#1e293b",
          marginBottom: "8px",
        }}
      >
        Redirecting to Optigo...
      </h2>
      <p style={{ fontSize: "0.95rem", color: "#64748b", marginBottom: "24px" }}>
        If you are not redirected automatically, select an option below:
      </p>
      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <a
          href={PLAY_STORE_URL}
          style={{
            padding: "10px 20px",
            background: "#059669",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "8px",
            fontWeight: 500,
            fontSize: "0.9rem",
          }}
        >
          Google Play Store
        </a>
        <a
          href={APP_STORE_URL}
          style={{
            padding: "10px 20px",
            background: "#0284c7",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "8px",
            fontWeight: 500,
            fontSize: "0.9rem",
          }}
        >
          Apple App Store
        </a>
        <a
          href={HELP_WEB_URL}
          style={{
            padding: "10px 20px",
            background: "#4f46e5",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "8px",
            fontWeight: 500,
            fontSize: "0.9rem",
          }}
        >
          Visit Help Website
        </a>
      </div>
    </div>
  );
};

export default AppRedirect;
