import { Box, Typography, IconButton, Dialog, DialogTitle, DialogContent } from "@mui/material";
import NotListedLocationRoundedIcon from "@mui/icons-material/NotListedLocationRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useEffect, useState } from "react";

const HelpFaqmModal = ({ open, onClose, category, faqs, attachImageClickHandlers, handleImageClick }) => {
  const [processedFaqs, setProcessedFaqs] = useState([]);

  useEffect(() => {
    const processed = faqs.map((faq) => ({
      ...faq,
      processedAnswer: attachImageClickHandlers(faq.answer),
    }));
    setProcessedFaqs(processed);
  }, [faqs, attachImageClickHandlers]);

  // Add event delegation for image clicks
  useEffect(() => {
    const handleClick = (e) => {
      if (e.target.tagName === "IMG") {
        e.preventDefault();
        handleImageClick(e.target.src);
      }
    };

    const modalContent = document.querySelector('[data-modal-content="true"]');
    if (modalContent) {
      modalContent.addEventListener("click", handleClick);
      return () => modalContent.removeEventListener("click", handleClick);
    }
  }, [handleImageClick, processedFaqs]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { maxHeight: "80vh" },
      }}
      data-lenis-prevent
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: "primary.main",
          color: "white",
          py: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <NotListedLocationRoundedIcon />
          <Typography variant="h6" component="div">
            {category}
          </Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: "white" }}>
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0, overflowY: "scroll" }}>
        <Box sx={{ py: 1.7, px: 2, bgcolor: "grey.50" }}>
          <Typography variant="body2" color="text.secondary">
            Found {faqs.length} question{faqs.length !== 1 ? "s" : ""} in this category
          </Typography>
        </Box>

        <Box sx={{ p: 2 }} data-modal-content="true">
          {processedFaqs.map((faq, index) => (
            <Box key={faq.id} sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
                #{index + 1} {faq.question}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mb: 1,
                  color: "#878787",
                  "& img": {
                    cursor: "zoom-in",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "scale(1.02)",
                    },
                  },
                }}
                dangerouslySetInnerHTML={processedFaqs[index]?.processedAnswer || { __html: faq.answer }}
              />
            </Box>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default HelpFaqmModal;
