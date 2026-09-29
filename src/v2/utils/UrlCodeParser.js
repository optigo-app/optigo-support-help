import { useMemo } from "react";
import { useLocation } from "react-router-dom";

/**
 * Safely decode a Base64 string, handling URL-safe variants and padding.
 * Returns null if decoding fails.
 */
function safeBase64Decode(str) {
  if (!str || typeof str !== "string") return null;

  try {
    // Replace URL-safe chars
    let normalized = str.replace(/-/g, "+").replace(/_/g, "/");

    // Remove invalid characters (keep only Base64 chars)
    normalized = normalized.replace(/[^A-Za-z0-9+/=]/g, "");

    // Pad to multiple of 4
    while (normalized.length % 4 !== 0) {
      normalized += "=";
    }

    // Decode
    return atob(normalized);
  } catch (err) {
    console.warn("❌ Failed to decode Base64:", err, "raw:", str);
    return null;
  }
}

/**
 * Parse decoded string into customer object.
 * Format: "customerCode&userID&customerID"
 */
function decodeCustomerData(decodedStr) {
  if (!decodedStr || typeof decodedStr !== "string") return null;

  const parts = decodedStr.split("&");

  // Defensive: Ensure at least customerCode exists
  if (!parts[0]) return null;

  return {
    customerCode: parts[0] || "",
    userID: parts[1] || "",
    customerID: parts[2] || "",
  };
}

/**
 * Hook to decode customer info from the URL's `auth` query param.
 * Returns null if decoding fails.
 */
export function useDecodedCustomer() {
  const location = useLocation();

  return useMemo(() => {
    try {
      const params = new URLSearchParams(location.search);
      const authParam = params.get("auth");

      if (!authParam) return null;

      const decoded = safeBase64Decode(authParam);

      if (!decoded) return null;

      const customer = decodeCustomerData(decoded);

      return customer;
    } catch (err) {
      console.error("❌ Failed to parse customer info:", err, "location.search:", location.search);
      return null;
    }
  }, [location.search]);
}
