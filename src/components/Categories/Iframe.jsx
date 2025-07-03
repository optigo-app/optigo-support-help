import { Box, Paper } from "@mui/material";
import CallLogDashBoard from "../../modules/components/CallLogger";
const Iframe = ({ url, title }) => {
  return (
    <Paper key={url} elevation={3} sx={{ borderRadius: 3, position: "relative" }}>
      <Box
        sx={{
          position: "relative",
          height: "100vh",
          border: "1px solid #ddd",
          borderRadius: 2,
          overflow: "hidden",
          backgroundColor: "#f9f9f9",
        }}
      >
        {/* <iframe
        id="myIframe"
          frameBorder="0"
          src={url}
          title={title} width="100%" height="100%" style={{ border: "none" }}  /> */}
          <CallLogDashBoard/>
      </Box>
    </Paper>
  );
};

export default Iframe;
