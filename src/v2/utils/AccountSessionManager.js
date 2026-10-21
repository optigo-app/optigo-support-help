import Cookies from "js-cookie";
import { isTokenExpired, removeSkeyCookie } from "./AuthUtils";

const MULTI_ACCOUNTS_KEY = "optigo_multi_accounts";
const ACTIVE_ACCOUNT_ID_KEY = "optigo_active_account_id";

/**
 * Retrieve all saved account sessions from localStorage.
 */
export function getSavedAccounts() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(MULTI_ACCOUNTS_KEY);
    if (!raw) return [];
    const accounts = JSON.parse(raw);
    if (!Array.isArray(accounts)) return [];
    return accounts.map((acc) => ({
      ...acc,
      isExpired: isTokenExpired(acc.token),
    }));
  } catch (error) {
    console.error("Failed to parse saved accounts:", error);
    return [];
  }
}

/**
 * Get the currently active account ID.
 */
export function getActiveAccountId() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACTIVE_ACCOUNT_ID_KEY) || null;
}

/**
 * Generate a unique account ID from userId and companyCode.
 */
export function generateAccountId(userId, companyCode = "") {
  const cleanUser = (userId || "").trim().toLowerCase();
  const cleanCompany = (companyCode || "default").trim().toLowerCase();
  return `${cleanUser}_${cleanCompany}`;
}

/**
 * Save or update an account session in the multi-account registry.
 */
export function saveAccountSession({
  userId,
  fullName,
  companyCode = "",
  companyName = "",
  token,
  tokenType = "corporate", // "corporate" | "normal"
  userRights = [],
  companyInfo = null,
  userInfo = null,
}) {
  if (typeof window === "undefined" || !userId || !token) return null;

  try {
    const accountId = generateAccountId(userId, companyCode);
    const existingAccounts = getSavedAccounts();

    const accountData = {
      accountId,
      userId: userId.trim(),
      fullName: (fullName || userId).trim(),
      companyCode: (companyCode || "").trim(),
      companyName: (companyName || companyCode || "").trim(),
      token,
      tokenType,
      userRights: userRights || [],
      companyInfo: companyInfo || null,
      userInfo: userInfo || null,
      lastActive: Date.now(),
    };

    // Filter out previous version of this account if exists
    const updatedAccounts = existingAccounts.filter((acc) => acc.accountId !== accountId);
    updatedAccounts.unshift(accountData); // Add to beginning

    localStorage.setItem(MULTI_ACCOUNTS_KEY, JSON.stringify(updatedAccounts));
    localStorage.setItem(ACTIVE_ACCOUNT_ID_KEY, accountId);

    return accountData;
  } catch (error) {
    console.error("Failed to save account session:", error);
    return null;
  }
}

/**
 * Switch active account to the given accountId.
 * Synchronizes cookies and session storage for the new active account.
 */
export function switchAccountSession(accountId) {
  if (typeof window === "undefined") return null;

  try {
    const accounts = getSavedAccounts();
    const target = accounts.find((acc) => acc.accountId === accountId);

    if (!target) {
      console.warn(`Account with ID "${accountId}" not found`);
      return null;
    }

    if (isTokenExpired(target.token)) {
      console.warn("Target account token is expired");
      return { ...target, isExpired: true };
    }

    // Set active ID
    localStorage.setItem(ACTIVE_ACCOUNT_ID_KEY, accountId);

    // Apply cookies based on tokenType
    if (target.tokenType === "corporate") {
      removeSkeyCookie();
      Cookies.set("help_support", target.token);
      Cookies.set("isUserLoggedIn", "true", { sameSite: "Lax" });
      localStorage.setItem("app_active_skey", target.token);
      localStorage.setItem("auth_mode", "corporate");
      sessionStorage.removeItem("is_third_party");
      Cookies.remove("is_third_party");
    } else {
      Cookies.remove("help_support");
      Cookies.remove("isUserLoggedIn");
      Cookies.set("skey", target.token, { path: "/", sameSite: "Lax" });
      localStorage.setItem("auth_mode", "normal");
    }

    // Sync userRights and clear logout barrier
    if (target.userRights) {
      sessionStorage.setItem("userRights", JSON.stringify(target.userRights));
    }
    sessionStorage.removeItem("explicit_logout");

    // Update lastActive timestamp
    target.lastActive = Date.now();
    const updated = accounts.map((acc) => (acc.accountId === accountId ? target : acc));
    localStorage.setItem(MULTI_ACCOUNTS_KEY, JSON.stringify(updated));

    return target;
  } catch (error) {
    console.error("Failed to switch account session:", error);
    return null;
  }
}

/**
 * Remove a specific account from the multi-account registry.
 */
export function removeAccountSession(accountId) {
  if (typeof window === "undefined") return [];

  try {
    const accounts = getSavedAccounts();
    const updated = accounts.filter((acc) => acc.accountId !== accountId);
    localStorage.setItem(MULTI_ACCOUNTS_KEY, JSON.stringify(updated));

    const currentActiveId = getActiveAccountId();
    if (currentActiveId === accountId) {
      if (updated.length > 0) {
        // Switch to the first available non-expired account
        const nextValid = updated.find((acc) => !acc.isExpired) || updated[0];
        switchAccountSession(nextValid.accountId);
      } else {
        localStorage.removeItem(ACTIVE_ACCOUNT_ID_KEY);
      }
    }

    return updated;
  } catch (error) {
    console.error("Failed to remove account session:", error);
    return [];
  }
}

/**
 * Clear all multi-account sessions from storage.
 */
export function clearAllAccountSessions() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(MULTI_ACCOUNTS_KEY);
    localStorage.removeItem(ACTIVE_ACCOUNT_ID_KEY);
  } catch (error) {
    console.error("Failed to clear multi-account sessions:", error);
  }
}
