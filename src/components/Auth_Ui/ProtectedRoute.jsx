import { Navigate, useLocation } from "react-router-dom";
import CenteredCircularLoader from "./../../modules/components/CallLogger/Loading";
import { useAuth } from "../../modules/context/UseAuth";

const ProtectedRoute = ({ children, requireAuth = true }) => {

  const {
    isAuthenticated = false,
    loading = true,
    authChecked = false,
    isThirdParty = false,
  } = useAuth();

  const location = useLocation();

  if (loading || !authChecked) {
    return <CenteredCircularLoader />;
  }


  if (isThirdParty && requireAuth) {
    const isHelpRoute =
      location.pathname === "/help" || location.pathname.startsWith("/help/");
    const isWhatsNewRoute = location.pathname === "/whats-new";
    if (!isHelpRoute && !isWhatsNewRoute) {
      return <Navigate to="/help" replace />;
    }
  }


  if (requireAuth && !isAuthenticated) {
    const isHelpRoute =
      location.pathname === "/help" || location.pathname.startsWith("/help/");
    const isWhatsNewRoute = location.pathname === "/whats-new";
    if (isThirdParty && (isHelpRoute || isWhatsNewRoute)) {
      // Allow bypass
    } else {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }

  // For routes that should redirect authenticated users (like login page)
  if (!requireAuth && isAuthenticated) {
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  return <>{children ?? null}</>;
};

export default ProtectedRoute;
