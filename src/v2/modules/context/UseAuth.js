import { useContext, createContext, useState, useEffect } from "react";
import { GetCredentialsFromCookie, removeSkeyCookie } from "../utils/AuthUtils";
import { BaseAPI } from "../../apis/BaseAPI";
import CenteredCircularLoader from "../components/CallLogger/Loading";
import { Box, Typography, Button, Container, Paper } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Cookies from "js-cookie";
import { createJWT } from "../../utils/AuthUtils";
import { useUserRights } from "../hooks/useUserRights";
import { useSocketEvent } from "../hooks/useSocketListener";
import useSWVersionChecker from "../hooks/useSWVersionChecker";
import {
  getSavedAccounts,
  getActiveAccountId,
  saveAccountSession,
  switchAccountSession,
  removeAccountSession,
  clearAllAccountSessions,
} from "../../utils/AccountSessionManager";

const AuthContext = createContext(null);

const SERVICE_CONFIG = {
  TICKET: {
    SERVICE_NAME: "Ticket",
    VERSION_NO: "_Ticketv4",
    SP: "14",
  },
  CALL_LOG: {
    SERVICE_NAME: "CallLog",
    VERSION_NO: "v4",
    SP: "14",
  },
};

const PUBLIC_ROUTES = ["/", "/login", "/support"];

const isPublicRoute = (pathname) => {
  return PUBLIC_ROUTES.some((route) => {
    if (route === "/") {
      return pathname === "/" || pathname === "";
    }
    return pathname.startsWith(route);
  });
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [, setUserRights] = useUserRights();
  const [token, setToken] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [services, setServices] = useState({
    ticket: false,
    callLog: false,
  });
  const [CompanyInfo, SetCompanyInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [accounts, setAccounts] = useState(() => getSavedAccounts());
  const [activeAccountId, setActiveAccountId] = useState(() => getActiveAccountId());
  const [isThirdParty, setIsThirdParty] = useState(() => {
    // Priority 1: explicit URL param (fresh ERP entry)
    const urlParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
    if (urlParams?.get("thirdparty") === "true") {
      sessionStorage.setItem("is_third_party", "true");
      return true;
    }
    // Priority 2: persisted flag from previous load in this tab
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem("is_third_party") === "true") {
      return true;
    }
    return false;
  });

  const clearState = (keepThirdParty = false) => {
    setUser(null);
    setToken(null);
    setServices({
      ticket: false,
      callLog: false,
    });
    setIsAuthenticated(false);
    setAuthChecked(true);
    if (!keepThirdParty) {
      setIsThirdParty(false);
      sessionStorage.removeItem("is_third_party");
      Cookies.remove("is_third_party");
    }
  };

  useSWVersionChecker();

  const login = async (credentials) => {
    try {
      setIsThirdParty(false);
      sessionStorage.removeItem("is_third_party");
      sessionStorage.removeItem("isDummyLogger");
      sessionStorage.removeItem("explicit_logout");
      Cookies.remove("is_third_party");
      // setLoading(true);
      const response = await BaseAPI.OnLogin(
        credentials.email,
        credentials.password,
        credentials.projectCode,
      );
      if (response && response.data) {
        const token = response.data;
        const jwtToken = await createJWT(token?.userInfo);
        const domain = window.location.hostname;
        if (domain === "nzen") {
          Cookies.set("help_support", jwtToken, {
            path: "/support",
          });
        } else {
          Cookies.set("help_support", jwtToken);
        }
        Cookies.set("isUserLoggedIn", "true", { sameSite: "Lax" });
        localStorage.setItem("app_active_skey", jwtToken);
        localStorage.setItem("auth_mode", "corporate");
        setIsAuthenticated(true);
        setUserRights(token?.userRights);
        if (token?.userRights) {
          sessionStorage.setItem("userRights", JSON.stringify(token.userRights));
        }
        setUser(token?.userInfo);
        setAuthChecked(true);

        // Register account in multi-account session registry
        saveAccountSession({
          userId: token?.userInfo?.userid || credentials.email,
          fullName: token?.userInfo?.firstname
            ? `${token?.userInfo?.firstname} ${token?.userInfo?.lastname || ""}`.trim()
            : credentials.email,
          companyCode: credentials.projectCode,
          token: jwtToken,
          tokenType: "corporate",
          userRights: token?.userRights,
          userInfo: token?.userInfo,
        });
        setAccounts(getSavedAccounts());
        setActiveAccountId(getActiveAccountId());

        return { success: true };
      } else {
        return { success: false, error: response };
      }
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      // setLoading(false);
    }
  };

  const getToken = async (userId, isCorporate = true, isRetry = false) => {
    // setLoading(true);
    try {
      const res = await BaseAPI.getToken(userId, isCorporate);

      let userObj = null;
      let tokenObj = null;

      if (res?.rd?.[0]) {
        tokenObj = res.rd[0];

        if (res?.rd2?.[0]) {
          // Corporate gettoken response supplies identity and token data.
          userObj = {
            ...res.rd2[0],
            fullName: `${res.rd2[0].firstname || ""} ${res.rd2[0].lastname || ""}`.trim() || res.rd2[0].userid,
          };
          SetCompanyInfo({ ...res.rd[0], ...res.rd2[0] });
        } else if (res?.rd1?.[0]) {
          // Non-corporate / normal ERP skey format: rd1 has user details.
          userObj = {
            ...res.rd1[0],
            fullName: `${res.rd1[0].firstname || ""} ${res.rd1[0].lastname || ""}`.trim() || res.rd1[0].userid,
          };
          SetCompanyInfo({ ...res.rd[0], ...res.rd1[0] });
        } else if (res?.rd?.[0]?.userid) {
          // Fallback if user information is directly inside rd[0]
          userObj = {
            ...res.rd[0],
            fullName: `${res.rd[0].firstname || ""} ${res.rd[0].lastname || ""}`.trim() || res.rd[0].userid,
          };
          SetCompanyInfo({ ...res.rd[0] });
        }
      }

      if (userObj && tokenObj) {
        setUser(userObj);
        setToken(tokenObj);

        const isDummySession =
          process.env.NODE_ENV !== "production" &&
          sessionStorage.getItem("isDummyLogger") === "true";

        // Production rights are owned by login(). gettoken only supplies
        // identity/token data and must never write or replace userRights.
        let activeRights = null;
        if (!isDummySession && isCorporate) {
          try {
            const loginData = JSON.parse(sessionStorage.getItem("API_DATA") || "null");
            if (Array.isArray(loginData?.rd1)) activeRights = loginData.rd1;
          } catch (_) {
            // Do not fall back to gettoken rights if the login cache is unavailable.
          }
        } else if (isDummySession) {
          try {
            const storedRights = JSON.parse(sessionStorage.getItem("userRights") || "null");
            if (Array.isArray(storedRights)) activeRights = storedRights;
          } catch (_) {
            // Dummy sessions may retain their explicitly selected mock rights.
          }
        }

        // Keep multi-account registry synchronized
        const activeToken = Cookies.get("help_support") || Cookies.get("skey");
        const tokenType = Cookies.get("help_support") ? "corporate" : "normal";
        if (activeToken && Array.isArray(activeRights)) {
          saveAccountSession({
            userId: userObj.userid || userObj.email || userId,
            fullName: userObj.fullName,
            companyCode: CompanyInfo?.companycode || userObj.companycode || "",
            token: activeToken,
            tokenType,
            userRights: activeRights,
            companyInfo: CompanyInfo,
            userInfo: userObj,
          });
          setAccounts(getSavedAccounts());
          setActiveAccountId(getActiveAccountId());
        }

        setIsAuthenticated(true);
        setAuthChecked(true);

        return res;
      }
      throw new Error("Invalid token response");
    } catch (error) {
      console.error(
        "Error getting token (corporate=" + isCorporate + "):",
        error,
      );

      // Bi-directional retry: if corporate=true fails, try corporate=false, and vice versa
      if (!isRetry) {
        console.log(`Retrying getToken with corporate=${!isCorporate}`);
        return await getToken(userId, !isCorporate, true);
      }

      // DEVELOPMENT/DUMMY LOGGER FLOW:
      // If we are local and have mock rights, construct user from cookie info rather than logging out!
      const isDummySession =
        process.env.NODE_ENV !== "production" &&
        sessionStorage.getItem("isDummyLogger") === "true";
      const mockRightsStr = sessionStorage.getItem("userRights");
      if (isDummySession && mockRightsStr) {
        console.log(
          "Local development/dummy logger detected. Using mock rights and fallback user.",
        );
        try {
          const parsedRights = JSON.parse(mockRightsStr);
          const fallbackUser = {
            userid: userId,
            firstname: userId.split("@")[0] || "User",
            lastname: "Local",
            fullName: userId.split("@")[0] || "User Local",
            role: "admin",
          };
          setUser(fallbackUser);
          setUserRights(parsedRights);
          setIsAuthenticated(true);
          setAuthChecked(true);
          return { success: true, mock: true };
        } catch (e) {
          console.error("Failed to parse mock rights:", e);
        }
      }

      setIsAuthenticated(false);
      setAuthChecked(true);
      return null;
    } finally {
      // setLoading(false);
    }
  };

  const switchAccount = (accountId) => {
    const switched = switchAccountSession(accountId);
    if (switched) {
      if (switched.isExpired) {
        window.location.href = `/login?addAccount=true&userId=${encodeURIComponent(switched.userId)}&companyCode=${encodeURIComponent(switched.companyCode || "")}`;
        return;
      }
      window.location.reload();
    }
  };

  const removeAccount = (accountId) => {
    const remaining = removeAccountSession(accountId);
    setAccounts(remaining);
    const activeId = activeAccountId || getActiveAccountId();
    if (activeId === accountId) {
      if (remaining.length > 0) {
        window.location.reload();
      } else {
        Logout();
      }
    }
  };

  const logoutAll = () => {
    clearAllAccountSessions();
    Logout(false);
  };

  const Logout = (switchNext = true) => {
    const currentId = activeAccountId || getActiveAccountId();
    if (currentId) {
      const remaining = removeAccountSession(currentId);
      setAccounts(remaining);
      if (switchNext && remaining.length > 0) {
        const nextAcc = remaining.find((acc) => !acc.isExpired) || remaining[0];
        switchAccountSession(nextAcc.accountId);
        window.location.reload();
        return;
      }
    }

    // 1. Remove cookies — domain-aware removal prevents silent failure
    Cookies.remove("help_support");
    Cookies.remove("isUserLoggedIn");
    removeSkeyCookie();

    // 2. Clear localStorage anchor (set during normal login)
    localStorage.removeItem("app_active_skey");
    localStorage.removeItem("auth_mode");
    sessionStorage.removeItem("API_DATA");

    // 3. Clear all session flags and set explicit_logout barrier
    sessionStorage.removeItem("userRights");
    sessionStorage.removeItem("isDummyLogger");
    sessionStorage.removeItem("is_third_party");
    sessionStorage.setItem("explicit_logout", "true");

    // 4. Reset React state synchronously BEFORE navigating,
    //    so the next page load doesn't inherit stale state.
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    setIsThirdParty(false);
    setAuthChecked(false);

    // 5. Hard redirect to login
    window.location.href = "/login";
  };

  const initializeService = (service, credentials) => {
    if (!credentials) return false;

    const config = {
      YEAR_CODE: credentials.yc,
      SV: credentials.sv,
      SP: service.SP,
      APP_USER_ID: credentials.userId,
      VERSION_NO: service.VERSION_NO,
    };

    BaseAPI.initialize(config, service.SERVICE_NAME);
    return true;
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setLoading(true);
        const searchParams = new URLSearchParams(window.location.search);
        if (searchParams.get("thirdparty") === "true") {
          searchParams.delete("thirdparty");
          const newSearch = searchParams.toString();
          const newUrl =
            window.location.pathname +
            (newSearch ? `?${newSearch}` : "") +
            window.location.hash;
          window.history.replaceState({}, document.title, newUrl);
        }

        // If user explicitly logged out and is now visiting /login, don't auto-login via lingering skey
        if (
          process.env.NODE_ENV !== "production" &&
          sessionStorage.getItem("isDummyLogger") === "true"
        ) {
          sessionStorage.removeItem("explicit_logout");
        }
        const isExplicitLogout = sessionStorage.getItem("explicit_logout") === "true";
        if (isExplicitLogout && window.location.pathname === "/login") {
          clearState(false);
          setIsInitialized(true);
          setLoading(false);
          return;
        } else if (isExplicitLogout && window.location.pathname !== "/login") {
          // Navigating away from login clears the explicit logout barrier
          sessionStorage.removeItem("explicit_logout");
        }

        const cookieUser = GetCredentialsFromCookie();
        if (cookieUser && cookieUser.userId) {
          const ticketInitialized = initializeService(
            SERVICE_CONFIG.TICKET,
            cookieUser,
          );
          const callLogInitialized = initializeService(
            SERVICE_CONFIG.CALL_LOG,
            cookieUser,
          );
          setServices({
            ticket: ticketInitialized,
            callLog: callLogInitialized,
          });

          const isCorporate = !cookieUser.isSkeyCookie;
          const tokenRes = await getToken(cookieUser.userId, isCorporate);
          if (!tokenRes) {
            console.warn("Token initialization returned null; clearing state");
            clearState(true);
          }
        } else {
          console.log("No valid user credentials found in cookie");
          clearState(true);
        }
      } catch (error) {
        console.error("Error in initialization:", error);
        clearState(true);
      } finally {
        setIsInitialized(true);
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // useEffect(() => {
  //   if ("serviceWorker" in navigator) {
  //     navigator.serviceWorker.ready
  //       .then((registration) => {
  //         const messageChannel = new MessageChannel();
  //         messageChannel.port1.onmessage = (event) => {
  //           if (event.data === "CHECK_COOKIE") {
  //             console.log("SW received CHECK_COOKIE message rajan");

  //           }
  //         };

  //         window.swChannel = messageChannel;
  //         registration.active.postMessage("START_TIMER", [messageChannel.port2]);
  //       })
  //       .catch((err) => {
  //         console.error("Service worker error:", err);
  //       });

  //     navigator.serviceWorker.addEventListener("message", (event) => {
  //       console.log("Global SW message received:", event.data);
  //     });
  //   }

  //   return () => {
  //     if (window.swChannel?.port1 && typeof window.swChannel.port1.close === "function") {
  //       window.swChannel.port1.close();
  //     }
  //   };
  // }, []);

  const contextData = {
    user,
    token,
    isInitialized,
    services,
    clearState,
    getToken,
    initializeService,
    CompanyInfo,
    Logout,
    logoutAll,
    loading,
    isAuthenticated,
    authChecked,
    login,
    isThirdParty,
    accounts,
    activeAccountId,
    switchAccount,
    removeAccount,
  };

  // Show loading while authentication is being checked
  if (!isInitialized || !authChecked) {
    return <CenteredCircularLoader />;
  }

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
}

// Hook for consuming the Auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

const UnauthorizedPage = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Paper elevation={0} sx={{ p: 4, textAlign: "center" }}>
        <Box sx={{ mb: 2 }}>
          <LockOutlinedIcon color="error" sx={{ fontSize: 60 }} />
        </Box>
        <Typography variant="h5" gutterBottom>
          Unauthorized Access
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          You do not have valid credentials or your session has expired. Please
          ensure you are logged in correctly or refresh the page.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleReload}>
          Reload Page
        </Button>
      </Paper>
    </Container>
  );
};
