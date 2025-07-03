import { Box, Typography, Grid, Card, CardContent, IconButton } from "@mui/material";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { Category } from "../../constants/faqData";

const HelpTopicGrid = ({ handleCategoryClick }) => {
  return (
    <>
      {/* Help by Topic */}
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
        Help by Topic
      </Typography>

      <Grid container spacing={3} sx={{ mb: 8 }}>
        {Object.keys(Category)?.map((topic, index) => {
          const faqs = Category[topic];
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
    </>
  );
};

export default HelpTopicGrid;
