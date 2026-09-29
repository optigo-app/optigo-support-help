import { Box, Paper } from "@mui/material";
import { getTabContent } from "../../utils/getTabContent";
import { useParams } from "react-router-dom";
import ScrollTopButton from "./ScrollTopButton";
// import MetaWrapper from "../../meta/MetaWrapper";

export default function CategoryTab() {
  const { tabId } = useParams();
  const TabQuery = Number(tabId);
  const isFullLayout = TabQuery === 1 || TabQuery === 4;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#fff",
        px: isFullLayout ? 0 : 5,
        py: isFullLayout ? 0 : (TabQuery === 1 ? 5 : 0),
        pb: isFullLayout ? 0 : 2,
        width: "100%",
        overflow: TabQuery === 4 ? "hidden" : "auto",
      }}
    >
      {/* <MetaWrapper page={TabQuery} /> */}
      <Paper
        sx={{
          boxShadow: "none",
        }}
        elevation={0}
      ></Paper>
      <Box sx={{ transition: "all 0.3s ease-in-out" }}>{getTabContent(TabQuery)}</Box>
      {TabQuery !== 4 && <ScrollTopButton />}
    </Box>
  );
}
