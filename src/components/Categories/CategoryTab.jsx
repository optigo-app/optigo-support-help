import { Box, Paper } from "@mui/material";
import { getTabContent } from "../../utils/getTabContent";
import { useParams } from "react-router-dom";
import ScrollTopButton from "./ScrollTopButton";
// import MetaWrapper from "../../meta/MetaWrapper";

export default function CategoryTab() {
  const { tabId } = useParams();
  const TabQuery = Number(tabId);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#fff",
        px: TabQuery === 1 ? 0 : 5,
        py: TabQuery === 1 ? 5 : 0,
        pb: TabQuery === 1 ? 0 : 2,
        width: "100%",
        overflow: "scroll",
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
      <ScrollTopButton />
    </Box>
  );
}
