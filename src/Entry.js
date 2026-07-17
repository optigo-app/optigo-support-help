import { Routes, Route, useLocation } from "react-router-dom";
import NotFoundPage from "./components/default/Notfound";
import { useEffect, useState } from "react";
import CategoryPage from "./pages/category";
import { useCommon } from "./providers/CommonProvider";
import TemporaryDrawer from "./components/Main/MobileSidebar";
import LoginPage from "./pages/login";
import HelpPage from "./pages/helpfile";
import WhatsNew from "./pages/WhatsNew";
import ProtectedRoute from "./components/Auth_Ui/ProtectedRoute";
import AboutUs from "./pages/About";
import ChangePassword from "./components/Auth_Ui/ChangePassword";
import ForgetPassword from "./components/Auth_Ui/ForgetPassword";
import MetaWrapper from "./meta/MetaWrapper";
import UpdateNotification from "./modules/components/_ui/UpdateNotification";
import { useSocketEvent } from "./modules/hooks/useSocketListener";
import useSWVersionChecker from "./modules/hooks/useSWVersionChecker";
import ResetPassword from "./components/Auth_Ui/ResetPassword";
import HelpCenter from "./components/video help";
import Wrapper from "./components/default/Wrapper";
import HelpArticle from "./components/video help/HelpArticle";
import ParseExcelPage from "./components/test";
import SupasteLanding from "./components/test/inde";

const Routing = () => {
  const { Open, setOpen } = useCommon();
  const location = useLocation();
  const [currentLocation, setCurrentLocation] = useState(location);
  const [version, setVersion] = useState(null);

  useSWVersionChecker();

  useEffect(() => {
    window.scrollTo({
      left: 0,
      top: 0,
    });
  }, [location.key, location.pathname, location.search]);

  // useEffect(() => {
  //   setCurrentLocation(location);
  // }, [location]);

  //   // Add Call Events
  // useSocketEvent("versionupdate", (data) => {
  //   // updateVersion(data.version);
  //   console.log(data);
  //   setVersion(data.version);
  // });

  return (
    <>
      {/* <UpdateNotification  /> */}
      <TemporaryDrawer open={Open} setOpen={setOpen} />
      <Routes>
        <Route
          path="/login"
          element={
            <ProtectedRoute requireAuth={false}>
              <MetaWrapper page="Login" />
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/change-password"
          element={
            <ProtectedRoute requireAuth={false}>
              <MetaWrapper page="Change Password" />
              <ChangePassword />
            </ProtectedRoute>
          }
        />

        <Route path="/test" element={<ParseExcelPage />} />

        <Route
          path="/reset-password"
          element={
            <ProtectedRoute requireAuth={false}>
              <MetaWrapper page="Reset Password" />
              <ResetPassword />
            </ProtectedRoute>
          }
        />

        <Route
          path="/forget-password"
          element={
            <ProtectedRoute requireAuth={false}>
              <MetaWrapper page="Forget Password" />
              <ForgetPassword />
            </ProtectedRoute>
          }
        />

        {/* Protected routes */}
        <Route
          path="/:tabId/category/:slug"
          element={
            <ProtectedRoute>
              <CategoryPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MetaWrapper page="Home" />
              <HelpPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/whats-new"
          element={
            <ProtectedRoute>
              <MetaWrapper page="WhatsNew" />
              <WhatsNew />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <MetaWrapper page="About" />
              <AboutUs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/help"
          element={
            <ProtectedRoute>
              <Wrapper>
                <HelpCenter />
              </Wrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/test12"
          element={
            <>
              <MetaWrapper page="Help" />
              <Wrapper>
                <SupasteLanding />
              </Wrapper>
            </>
          }
        />
        <Route
          path="/help/:slug"
          element={
            <ProtectedRoute>
              <MetaWrapper page="Help Article" />
              <Wrapper>
                <HelpArticle />
              </Wrapper>
            </ProtectedRoute>
          }
        />

        {/* Catch all */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default Routing;
