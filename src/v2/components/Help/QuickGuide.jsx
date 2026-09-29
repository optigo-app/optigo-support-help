import { Box, Typography, Grid, Accordion, AccordionSummary, AccordionDetails, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./default.css";
import { highlightText } from "../../utils/Filtering";
import { useState } from "react";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const QuickGuide = ({ shouldShowOtherComponents, SearchResults, faqData, expanded = null, handleChange = () => {}, attachImageClickHandlers = () => {}, showTitle, queryWords = [] }) => {
  const MAX_VISIBLE = 12;
  const [showAll, setShowAll] = useState(false);
  const visibleFaqs = showAll ? faqData : faqData?.slice(0, MAX_VISIBLE);

  return (
    <>
      {showTitle && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: shouldShowOtherComponents ? 0 : 1 }}>
            Quick Guides
          </Typography>

          {!shouldShowOtherComponents && (
            <Typography variant="body2" color="text.secondary">
              Total {SearchResults?.totalResults || 0} results found.
            </Typography>
          )}
        </Box>
      )}

      <Grid container spacing={2} >
        {visibleFaqs?.map((guide, index) => (
          <Grid item xs={12} key={index}>
            <Accordion
              key={index}
              expanded={expanded === index}
              onChange={handleChange(index)}
              sx={{
                boxShadow: "none",
                border: "none",
                borderBottom: "1px solid #e5e5e5",
                borderRadius: "0 !important",
                "&:before": {
                  display: "none",
                },
                "&.Mui-expanded": {
                  margin: 0,
                },
                py: 1,
              }}
            >
              <AccordionSummary
                expandIcon={
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      backgroundColor: "lightgray",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                    }}
                  >
                    {expanded === index ? <RemoveIcon sx={{ fontSize: 16 }} /> : <AddIcon sx={{ fontSize: 16 }} />}
                  </Box>
                }
                sx={{
                  minHeight: "auto",
                  "& .MuiAccordionSummary-content": {
                    margin: "0px 0",
                    "&.Mui-expanded": {
                      margin: "16px 0",
                    },
                  },
                  "& .MuiAccordionSummary-expandIconWrapper": {
                    "&.Mui-expanded": {
                      transform: "none",
                    },
                  },
                  px: 0,
                }}
              >
                <Typography
                  sx={{ fontWeight: 500 }}
                  dangerouslySetInnerHTML={{
                    __html: highlightText(guide.question, queryWords),
                  }}
                ></Typography>
              </AccordionSummary>
              {guide.answer && (
                <AccordionDetails
                  sx={{
                    px: 0,
                    pt: 0,
                    pb: 2,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#878787",
                      lineHeight: 1.6,
                      fontSize: {
                        xs: 15,
                        md: 18,
                      },
                    }}
                    dangerouslySetInnerHTML={attachImageClickHandlers(highlightText(guide.answer, queryWords))}
                  />
                </AccordionDetails>
              )}
            </Accordion>
          </Grid>
        ))}
        {(!faqData || faqData.length === 0) && (
          <Grid item xs={12}>
            <Box
              sx={{
                py: 25,
                textAlign: "center",
                color: "text.secondary",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: 2,
                backgroundColor: "rgba(249, 249, 249, 0.37)"
              }}
            >
              <Box
                sx={{
                  fontSize: 64,
                }}
              >
                <HelpOutlineIcon sx={{ fontSize: 48, color: "#bdbdbd" }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 500, mb: 0.5 }}>
                No results found
              </Typography>
              <Typography variant="body2">We couldn’t find any guides matching your search.</Typography>
            </Box>
          </Grid>
        )}
      </Grid>
      {faqData?.length > MAX_VISIBLE && (
        <Box mt={2} display="flex" justifyContent="flex-start">
          <Button
            onClick={() => setShowAll((prev) => !prev)}
            variant="outlined"
            color="primary"
            size="small"
            endIcon={showAll ? <RemoveCircleOutline /> : <AddCircleOutline />}
            sx={{
              borderRadius: "20px",
              textTransform: "none",
              fontWeight: 500,
              fontSize: 14,
              px: 2,
              py: 0.5,
              boxShadow: "none",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                backgroundColor: "primary.main",
                color: "#fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              },
            }}
          >
            {showAll ? "Show Less" : "Show More"}
          </Button>
        </Box>
      )}
    </>
  );
};

export default QuickGuide;
