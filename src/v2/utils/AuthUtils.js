import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { SignJWT } from "jose";

// const AllowedDomains = ["localhost", "http://calllog.web/", "http://calllog.web/", "calllog.web"];

// if (process.env.NODE_ENV === "development" || AllowedDomains.some((domain) => window.location.hostname.includes(domain))) {
//     Cookies.set("skey", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJpdGFzayIsImF1ZCI6IllXMXlkWFJBWldjdVkyOXQiLCJleHAiOjE3NDcxMzk2ODYsInVpZCI6IllXMXlkWFJBWldjdVkyOXQiLCJ5YyI6ImUzdHVlbVZ1ZlgxN2V6SXdmWDE3ZTI5eVlXbHNNalY5Zlh0N2IzSmhhV3d5TlgxOSIsInN2IjoiMCJ9.m4NonzyJfWdM0frEq1Cn4h1ABThBa1wgosx8Z7Mg5VI", { path: "/" });
// }
// Amrut Sir Login Cookies
// if (process.env.NODE_ENV === 'development') {
//     console.log("AuthUtils.js is running in development mode");
// }
export function decodeBase64(base64Str) {
  try {
    return decodeURIComponent(
      atob(base64Str)
        .split("")
        .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join("")
    );
  } catch (error) {
    console.error("Base64 decoding failed:", error);
    return null;
  }
}

export function safeDecodeUserId(base64Str) {
  if (!base64Str) return null;
  const decoded = decodeBase64(base64Str);
  if (!decoded) return base64Str;

  // Handle double-base64 encoded user IDs (common in legacy ERP skey tokens)
  if (!decoded.includes("@") && /^[A-Za-z0-9+/=]+$/.test(decoded)) {
    try {
      const secondDecode = decodeBase64(decoded);
      if (secondDecode && (secondDecode.includes("@") || secondDecode.length > 0)) {
        return secondDecode;
      }
    } catch {
      // ignore
    }
  }
  return decoded;
}

export function isTokenExpired(jwtToken) {
  if (!jwtToken) return true;
  try {
    const decoded = jwtDecode(jwtToken);
    if (decoded?.exp) {
      // 10-second skew allowance
      return decoded.exp * 1000 < Date.now() - 10000;
    }
    return false;
  } catch {
    return true;
  }
}

export function GetCredentialsFromCookie() {
  try {
    const urlParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
    const isExplicitThirdParty = urlParams?.get("thirdparty") === "true" ||
      (typeof sessionStorage !== "undefined" && sessionStorage.getItem("is_third_party") === "true");

    let token = null;
    let isSkey = false;

    const skey = Cookies.get("skey");
    const helpSupport = Cookies.get("help_support");
    const isUserLoggedIn = Cookies.get("isUserLoggedIn") === "true";

    const skeyValid = skey && !isTokenExpired(skey);
    const helpSupportValid = helpSupport && !isTokenExpired(helpSupport);

    // Priority 1: Explicit third-party flag from URL or active session -> prefer valid skey
    if (isExplicitThirdParty && skeyValid) {
      token = skey;
      isSkey = true;
    }
    // Priority 2: Explicit corporate login via portal (help_support + isUserLoggedIn flag)
    else if (isUserLoggedIn && helpSupportValid) {
      token = helpSupport;
      isSkey = false;
    }
    // Priority 3: Valid skey from ERP
    else if (skeyValid) {
      token = skey;
      isSkey = true;
    }
    // Priority 4: Valid help_support fallback
    else if (helpSupportValid) {
      token = helpSupport;
      isSkey = false;
    }
    // Priority 5: Unverified fallback if tokens exist without exp
    else if (helpSupport) {
      token = helpSupport;
      isSkey = false;
    } else if (skey) {
      token = skey;
      isSkey = true;
    }

    if (!token) {
      console.warn("Neither valid help_support nor skey cookie found");
      return null;
    }

    const decoded = jwtDecode(token);
    const companyEncoded = decoded?.uid || decoded?.aud;
    const user = safeDecodeUserId(companyEncoded);

    return {
      ...decoded,
      userId: user,
      isSkeyCookie: isSkey,
      tokenType: isSkey ? "normal" : "corporate",
    };
  } catch (error) {
    console.error("Failed to parse JWT from cookie:", error);
    return null;
  }
}

/**
 * Domain-aware skey removal.
 * js-cookie's remove() requires matching path/domain options used at set-time.
 * Trying all combinations ensures removal even when skey was set on a parent domain.
 */
export function removeSkeyCookie() {
  const cookieOptions = { path: "/", sameSite: "Lax" };
  Cookies.remove("skey", cookieOptions);
  Cookies.remove("skey", { path: "/" });
  Cookies.remove("skey");
  const domain = typeof window !== "undefined" ? window.location.hostname : "";
  if (domain && domain !== "localhost" && domain !== "127.0.0.1") {
    Cookies.remove("skey", { path: "/", domain });
    Cookies.remove("skey", { path: "/", domain: `.${domain}` });
    const parts = domain.split(".");
    if (parts.length > 2) {
      const parentDomain = "." + parts.slice(-2).join(".");
      Cookies.remove("skey", { path: "/", domain: parentDomain });
    }
  }
}

const encodeBase64 = (str) => {
  const encoded = btoa(str);
  return encoded;
};

export async function createJWT(userInfo) {
  if (!userInfo?.userid) throw new Error("Missing userid for JWT");

  const base64UserId = encodeBase64(userInfo?.userid);

  const payload = {
    iss: "support.optigo",
    aud: base64UserId,
    uid: base64UserId,
    yc: userInfo.yearcode,
    sv: userInfo.svid,
  };

  const secret = new TextEncoder().encode("🔓frontend-secret");

  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2d")
    .sign(secret);

  return jwt;
}
