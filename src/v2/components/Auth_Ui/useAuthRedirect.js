import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../modules/context/UseAuth";

export const useAuthRedirect = () => {
  const { isAuthenticated, authChecked, isThirdParty } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only proceed if auth state has been checked
    if (!authChecked) return;

    // If user is authenticated and on login page, redirect to intended page or home
    if (isAuthenticated && location.pathname === "/login") {
      const from = isThirdParty ? "/help" : (location.state?.from?.pathname || "/");
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, authChecked, location, navigate, isThirdParty]);
};