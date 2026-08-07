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

export function GetCredentialsFromCookie() {
  try {
    let token = null;
    let isSkey = false;

    const skey = Cookies.get("skey");
    const helpSupport = Cookies.get("help_support");
    const isUserLoggedIn = Cookies.get("isUserLoggedIn") === "true";

    // Prefer help_support when user explicitly logged in via normal login.
    // This prevents a stale skey (set by ERP) from shadowing a fresh session.
    if (isUserLoggedIn && helpSupport) {
      token = helpSupport;
      isSkey = false;
    } else if (skey) {
      // Third-party / ERP skey path
      token = skey;
      isSkey = true;
    } else if (helpSupport) {
      token = helpSupport;
      isSkey = false;
    }

    if (!token) {
      console.warn("Neither help_support nor skey cookie found");
      return null;
    }

    const decoded = jwtDecode(token);
    const companyEncoded = decoded?.uid;
    const user = companyEncoded ? decodeBase64(companyEncoded) : null;
    return {
      ...decoded,
      userId: user,
      isSkeyCookie: isSkey,
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
  const domain = window.location.hostname;
  if (domain && domain !== "localhost" && domain !== "127.0.0.1") {
    Cookies.remove("skey", { path: "/", domain });
    // Also try parent domain (e.g. .optigoapps.com)
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
