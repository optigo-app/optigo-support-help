import { useLocation } from "react-router-dom";
import HelpMain from "../../components/Help";
import Wrapper from "../../components/default/Wrapper";
import { Box } from "@mui/material";
import { parseHelpUrl } from "../../utils/UrlParser";

const HelpPage = () => {
  const location = useLocation();
  const faqPathInfo = parseHelpUrl(location.pathname, location.search);
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Wrapper>
        <HelpMain faqPathInfo={faqPathInfo} />
      </Wrapper>
    </Box>
  );
};

export default HelpPage;
