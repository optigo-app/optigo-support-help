import { useContext, createContext, useState, useEffect } from "react";
import { GetCredentialsFromCookie } from "../utils/AuthUtils";
import { BaseAPI } from "../../apis/BaseAPI";
import CenteredCircularLoader from "../components/CallLogger/Loading";
import { Box, Typography, Button, Container, Paper } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Cookies from "js-cookie";
import { createJWT } from "../../utils/AuthUtils";
import { useUserRights } from "../hooks/useUserRights";
import { useSocketEvent } from "../hooks/useSocketListener";
import useSWVersionChecker from "../hooks/useSWVersionChecker";

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
  const [isThirdParty, setIsThirdParty] = useState(() => {
    if (Cookies.get("skey")) {
      return false;
    }
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("thirdparty") === "true") {
      sessionStorage.setItem("is_third_party", "true");
      return true;
    }
    return sessionStorage.getItem("is_third_party") === "true";
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
        setIsAuthenticated(true);
        setUserRights(token?.userRights);
        setUser(token?.userInfo);
        setAuthChecked(true);
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

  const getToken = async (userId, isCorporate = true) => {
    // setLoading(true);
    try {
      const res = await BaseAPI.getToken(userId, isCorporate);

      let userObj = null;
      let tokenObj = null;
      let userRights = [];

      if (res?.rd?.[0]) {
        tokenObj = res.rd[0];

        if (res?.rd2?.[0] && res?.rd1?.[0]) {
          // Corporate format
          userObj = {
            ...res.rd2[0],
            fullName: `${res.rd2[0].firstname} ${res.rd2[0].lastname}`,
          };
          SetCompanyInfo({ ...res.rd[0], ...res.rd2[0], ...res.rd1[0] });
          userRights = res.rd1 || [];
        } else if (res?.rd1?.[0]) {
          // Non-corporate/skey format
          userObj = {
            ...res.rd1[0],
            fullName: `${res.rd1[0].firstname} ${res.rd1[0].lastname}`,
          };
          SetCompanyInfo({ ...res.rd[0], ...res.rd1[0] });
          userRights = res.rd3 || [];
        }
      }

      if (userObj && tokenObj) {
        setUser(userObj);
        setToken(tokenObj);
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
      // Fallback retrying: if corporate=true fails, try corporate=false
      if (isCorporate) {
        console.log("Retrying getToken with corporate=false");
        return await getToken(userId, false);
      }

      // DEVELOPMENT/DUMMY LOGGER FLOW:
      // If we are local and have mock rights, construct user from cookie info rather than logging out!
      const isLocal =
        typeof window !== "undefined" &&
        (window.location.hostname === "localhost" ||
          window.location.hostname.endsWith(".local") ||
          window.location.hostname === "nzen");
      const mockRightsStr = sessionStorage.getItem("userRights");
      if (isLocal && mockRightsStr) {
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

  const Logout = () => {
    Cookies.remove("help_support");
    Cookies.remove("isUserLoggedIn");
    Cookies.remove("skey");
    sessionStorage?.removeItem("userRights");
    sessionStorage?.removeItem("isDummyLogger");
    window.location.href = "/login";
    clearState();
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

        const isLoggedIn =
          Cookies.get("isUserLoggedIn") === "true" || !!Cookies.get("skey");

        if (isLoggedIn) {
          const cookieUser = GetCredentialsFromCookie();
          if (cookieUser) {
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

            await getToken(cookieUser.userId, !cookieUser.isSkeyCookie);
          } else {
            console.log("No user credentials found in cookie");
            clearState(true);
          }
        } else {
          console.log("User not logged in");
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
    loading,
    isAuthenticated,
    authChecked,
    login,
    isThirdParty,
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
