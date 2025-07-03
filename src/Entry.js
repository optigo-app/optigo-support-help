import { Routes, Route, useLocation } from "react-router-dom";
import NotFoundPage from "./components/default/Notfound";
import HelpCenterWebsite from "./components/Main";
import { useEffect } from "react";
import HomePage from "./pages/home";
import CategoryPage from "./pages/category";
import { useCommon } from "./providers/CommonProvider";
import TemporaryDrawer from "./components/Main/MobileSidebar";
import LoginPage from "./pages/login";
import HelpPage from "./pages/helpfile";
import WhatsNew from "./pages/WhatsNew";
import CallLogDashBoard from "./modules/components/CallLogger";
import DeliveryDashboard from "./modules/components/Delivery&Training/components/Delivery/Main";
import TrainingDashboard from "./modules/components/Delivery&Training/components/Training/Main";
import ClientTicketUi from "./modules/components/TicketUi/client";
import Ticket from "./modules/components/TicketUi/components";
import BootstrapTabsExample from "./components/test/tab";
import Mas from "./components/test/M";


const Routing = () => {
    const { Open, setOpen } = useCommon();
    const location = useLocation();


    useEffect(() => {
        window.scrollTo({
            behavior: "smooth",
            left: 0,
            top: 0,
        });
    }, [location.key, location.pathname, location.search]);


    return (
        <>
            <TemporaryDrawer open={Open} setOpen={setOpen} />
            <Routes >
                {/* <Route exact index path="/" element={<ProtectedRoute> <ModernTabsWithCloseButtons /></ProtectedRoute>} /> */}
                <Route exact index path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/category/:slug" element={<CategoryPage />} />
                <Route path="/help/*" element={<HelpPage />} />
                <Route path="/test" element={<Mas />} />
                <Route path="/whats-new" element={<WhatsNew />} />

                {/* Testring */}
                <Route path="/CallLog" element={<CallLogDashBoard />} />
                <Route path="/Ticket" element={<Ticket />} />
                <Route path="/client-ticket" element={<ClientTicketUi />} />
                <Route path="/Delivery" element={<DeliveryDashboard />} />
                <Route path="/Training" element={<TrainingDashboard />} />
                <Route path="/tab" element={<BootstrapTabsExample />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    );
};

export default Routing;
