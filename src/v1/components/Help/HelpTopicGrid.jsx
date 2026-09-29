import { Box, Typography, Grid, Card, CardContent, IconButton, Button } from "@mui/material";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { Category } from "../../constants/faqData";
import { useState } from "react";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";

const HelpTopicGrid = ({ handleCategoryClick }) => {
  const MAX_VISIBLE = 12;
  const [showAll, setShowAll] = useState(false);
  const slicedCategory = showAll ? Category : Object?.fromEntries(Object?.entries(Category)?.slice(0, MAX_VISIBLE));
  return (
    <>
      {/* Help by Topic */}
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
        Help by Topic
      </Typography>

      <Grid container spacing={3}>
        {Object?.keys(slicedCategory)?.map((topic, index) => {
          const faqs = slicedCategory[topic];
          return (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 4,
                  },
                }}
                onClick={() => handleCategoryClick(topic)}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                      {topic}
                    </Typography>
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {faqs.length} question{faqs.length !== 1 ? "s" : ""} available
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography variant="body2" color="primary" sx={{ fontWeight: 500 }}>
                      View Details
                    </Typography>
                    <IconButton size="small">
                      <ArrowForwardIosRoundedIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      {Object?.keys(Category)?.length > MAX_VISIBLE && (
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

      <Box sx={{ mb: 8 }}></Box>
    </>
  );
};

export default HelpTopicGrid;
