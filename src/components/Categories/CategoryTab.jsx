import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Typography, Tab, Paper, Avatar } from "@mui/material";
import { StyledSubTabs, StyledTabs, SubTabButton } from "../../constants/styles";
import { mainTabs, subTabs } from "../../constants/data";
import { getTabContent } from "../../utils/getTabContent";

export default function CategoryTab() {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let initialTab = 0;
    const storedTab = localStorage.getItem("currentCategory_id");

    if (storedTab !== null) {
      initialTab = parseInt(storedTab);
      console.log("🚀 ~ useEffect ~ loaded from localStorage:", initialTab);
    } else {
      console.log("🚀 ~ useEffect ~ defaulting to tab 0");
    }

    setActiveTab(initialTab);
  }, []);
  const handleTabChange = (event, newValue) => {
    const category = mainTabs[newValue];
    setActiveTab(newValue);
    localStorage.setItem("currentCategory_id", newValue);
    navigate(`/category/${encodeURI(category?.label)}`, { replace: true });
  };

  return (
    <Box sx={{
      minHeight: "100vh", bgcolor: "#fff", px: 5, py: 4,
      width: '100%'
    }}>
      
      <Paper
        sx={{
          mb: 0.1,
          overflow: "hidden",
          boxShadow: "none",

        }}
        elevation={0}
      >
        <StyledTabs variant="standard" value={activeTab} onChange={handleTabChange} scrollButtons="auto">
          {mainTabs.map((tab, index) => (
            <Tab
              key={tab.id}
              label={tab.label}
              sx={{
                width: "150px",
              }}
            />
          ))}
        </StyledTabs>
      </Paper>
      <Box sx={{ transition: "all 0.3s ease-in-out" }}>{getTabContent(activeTab)}</Box>
    </Box>
  );
}
