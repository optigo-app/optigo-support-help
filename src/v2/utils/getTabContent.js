import { Box, Typography } from "@mui/material";
import { ContentCard } from "../constants/styles";
import SettingsIcon from "@mui/icons-material/Settings";
import { featureCards } from "../components/Help/FeatureSection";
 
export const getTabContent = (activeTab) => {
  const card = featureCards.find((c) => c?.TabId === activeTab);

  if (card) {
    return (
      <Box
        sx={{
          position: "relative",
          height: activeTab === 4 ? "calc(100vh - 55px)" : "100vh",
          overflow: "hidden",
        }}
      >
        {card?.components}
      </Box>
    );
  }

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
