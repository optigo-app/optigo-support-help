import { Box, Typography } from "@mui/material";
import Iframe from "../components/Categories/Iframe";
import { ContentCard } from "../constants/styles";
import SettingsIcon from "@mui/icons-material/Settings";
import CallLogDashBoard from "../modules/components/CallLogger";
import ClientTicketUi from "../modules/components/TicketUi/client";
import DeliveryDashboard from "../modules/components/Delivery&Training/components/Delivery/Main";
import TrainingDashboard from "../modules/components/Delivery&Training/components/Training/Main";

export const getTabContent = (activeTab) => {
  const isDev = process.env.NODE_ENV === "development";
  const baseUrl = isDev ? "http://localhost:3001" : "https://csystem.optigoapps.com";

  const tabRoutes = {
    0: { path: "/", title: "Call Log", components: <CallLogDashBoard /> },
    1: { path: "/Training/client", title: "Training", components: <TrainingDashboard /> },
    2: { path: "/Delivery/client", title: "Delivery", components: <DeliveryDashboard /> },
    3: { path: "/Ticket/Client", title: "Ticketing", components: <ClientTicketUi /> },
  };

  const tabData = tabRoutes[activeTab];

  if (tabData) {
    return (
      <Box
        sx={{
          position: "relative",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {tabData?.components}
      </Box>
    );
  }

  // Default content if activeTab does not match any route
  return (
    <ContentCard sx={{ textAlign: "center", py: 8, borderRadius: "none", border: "none", boxShadow: "none", height: "60vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }} elevation={0}>
      <SettingsIcon sx={{ fontSize: 64, color: "#9ca3af", mb: 2 }} />
      <Typography variant="h6" sx={{ fontWeight: 500, color: "#111827", mb: 1 }}>
        Coming Soon
      </Typography>
      <Typography variant="body1" sx={{ color: "#6b7280" }}>
        This section is under development.
      </Typography>
    </ContentCard>
  );
};
