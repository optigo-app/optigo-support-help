import { useLocation } from "react-router-dom";
import HelpMain from "../../components/Help";
import Wrapper from "../../components/default/Wrapper";
import { Box } from "@mui/material";
import { parseHelpUrl } from "../../utils/UrlParser";
import { useAuth } from "../../modules/context/UseAuth";
import Chat from "../../components/Chat";

const HelpPage = () => {
  const location = useLocation();
  const faqPathInfo = parseHelpUrl(location.pathname, location.search);
  const { isThirdParty } = useAuth();

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Wrapper>
        <HelpMain faqPathInfo={faqPathInfo} />
      </Wrapper>
      {/* {!isThirdParty && <Chat defaultOpen={false} />} */}
    </Box>
  );
};

export default HelpPage;
