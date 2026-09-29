import React, { useEffect, useState } from "react";
import { IconButton, Zoom, useScrollTrigger, Box, useTheme } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ScrollTopButton = () => {
  const [visible, setVisible] = useState(false);
  const theme = useTheme();

  // Show button when scrolled down
  const handleScroll = () => {
    setVisible(window.scrollY > 100); // Adjust as needed
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Zoom in={visible}>
      <Box
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
          zIndex: 1300,
        }}
      >
        <IconButton
          onClick={scrollToTop}
          sx={{
           background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            color: "#fff",
            borderRadius: "50%",
            boxShadow: 3,
            "&:hover": {
              background: `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
            },
            width: theme.spacing(6.3),
            height: theme.spacing(6.3),
          }}
        >
          <KeyboardArrowUpIcon />
        </IconButton>
      </Box>
    </Zoom>
  );
};

export default ScrollTopButton;
