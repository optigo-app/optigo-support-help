import { Box, Typography, Grid, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./default.css";
import { highlightText } from "../../utils/Filtering";
const QuickGuide = ({ shouldShowOtherComponents, SearchResults, faqData, expanded = null, handleChange = () => {}, attachImageClickHandlers = () => {}, showTitle, queryWords = [] }) => {
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

      <Grid container spacing={2}>
        {faqData?.map((guide, index) => (
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
      </Grid>
    </>
  );
};

export default QuickGuide;
