import { useEffect, useMemo, useState } from "react";

const IP_LOOKUP_TIMEOUT = 2500;

const getTimezoneOffset = () => {
  const offsetMinutes = -new Date().getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const absoluteOffset = Math.abs(offsetMinutes);
  const hours = String(Math.floor(absoluteOffset / 60)).padStart(2, "0");
  const minutes = String(absoluteOffset % 60).padStart(2, "0");
  return `${sign}${hours}:${minutes}`;
};

const detectBrowserDetails = () => {
  const userAgent = typeof navigator !== "undefined" ? navigator.userAgent || "" : "";
  const browserRules = [
    { regex: /EdgA\/([\d.]+)/, name: "Microsoft Edge" },
    { regex: /EdgiOS\/([\d.]+)/, name: "Microsoft Edge" },
    { regex: /Edg\/([\d.]+)/, name: "Microsoft Edge" },
    { regex: /OPR\/([\d.]+)/, name: "Opera" },
    { regex: /SamsungBrowser\/([\d.]+)/, name: "Samsung Internet" },
    { regex: /Chrome\/([\d.]+)/, name: "Google Chrome" },
    { regex: /Firefox\/([\d.]+)/, name: "Mozilla Firefox" },
    { regex: /Version\/([\d.]+).*Safari/, name: "Safari" },
  ];

  const browser = browserRules.find(({ regex }) => regex.test(userAgent));
  const browserMatch = browser ? userAgent.match(browser.regex) : null;

  let osname = "Unknown";
  if (/Windows NT 10\.0/i.test(userAgent)) osname = "Windows 10/11";
  else if (/Windows NT 6\.3/i.test(userAgent)) osname = "Windows 8.1";
  else if (/Windows NT 6\.1/i.test(userAgent)) osname = "Windows 7";
  else if (/Android/i.test(userAgent)) osname = "Android";
  else if (/iPhone|iPad|iPod/i.test(userAgent)) osname = "iOS";
  else if (/Mac OS X/i.test(userAgent)) osname = "macOS";
  else if (/Linux/i.test(userAgent)) osname = "Linux";

  const isMobile =
    typeof navigator !== "undefined" && typeof navigator.userAgentData?.mobile === "boolean"
      ? navigator.userAgentData.mobile
      : /Android|iPhone|iPad|iPod|Mobile/i.test(userAgent);

  return {
    browsername: browser?.name || "Unknown",
    browserversion: browserMatch?.[1] || "",
    DeviceType: isMobile ? "Mobile" : "Desktop",
    osname,
    timezone: getTimezoneOffset(),
  };
};

const useBrowserDetails = () => {
  const browserDetails = useMemo(() => detectBrowserDetails(), []);
  const [ipaddress, setIpaddress] = useState("");
  const [isIpLoading, setIsIpLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined" || typeof fetch === "undefined" || typeof AbortController === "undefined") {
      setIsIpLoading(false);
      return undefined;
    }

    let isActive = true;
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), IP_LOOKUP_TIMEOUT);

    fetch("https://api.ipify.org?format=json", {
      signal: controller.signal,
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) throw new Error("IP lookup request failed");
        return response.json();
      })
      .then((data) => {
        if (isActive && data?.ip) {
          setIpaddress(data.ip);
        }
      })
      .catch(() => {
        if (isActive) setIpaddress("");
      })
      .finally(() => {
        window.clearTimeout(timeoutId);
        if (isActive) setIsIpLoading(false);
      });

    return () => {
      isActive = false;
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  return {
    ...browserDetails,
    ipaddress,
    isIpLoading,
  };
};

export default useBrowserDetails;
