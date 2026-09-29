import { useState } from "react";
import { Box } from "@mui/material";
import Faq from "./Faq";
import ContactUs from "./ContactUs";
import HelpCategories from "./HelpCategories";
import HeroSection from "./HeroSection";
import { helpCategories } from "../../constants/data";
import Wrapper from "../default/Wrapper";
import { useNavigate } from "react-router-dom";
const HelpCenterWebsite = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const onSearchEnter = (e) => {
    if (searchQuery.length > 3) {
      if (e.key === "Enter") {
        const Parsed = encodeURIComponent(searchQuery);
        navigate(`/help?query=${Parsed}`);
      }
    }
  };

  const handleClick = (id) => {
    localStorage.setItem(`currentCategory_id`, id);
  };

  return (
    <>
      <Box sx={{ minHeight: "100vh" }}>
        <Wrapper>
          <HeroSection onSearchEnter={onSearchEnter} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <HelpCategories handleClick={handleClick} helpCategories={helpCategories} />
          <ContactUs />
          <Faq expanded={expanded} handleChange={handleChange} />
        </Wrapper>
      </Box>
    </>
  );
};

export default HelpCenterWebsite;
