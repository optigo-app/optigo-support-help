import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import { Phone as PhoneIcon, PersonAdd as PersonAddIcon, Assignment as AssignmentIcon, Chat as ChatIcon } from "@mui/icons-material";

const featureCards = [
  {
    icon: <PhoneIcon sx={{ fontSize: 40, color: "#2196F3" }} />,
    title: "Call Tracking",
    description: "Getting started with Call Tracking",
  },
  {
    icon: <PersonAddIcon sx={{ fontSize: 40, color: "#4CAF50" }} />,
    title: "Lead Center",
    description: "Getting started with Lead Center",
  },
  {
    icon: <AssignmentIcon sx={{ fontSize: 40, color: "#FF9800" }} />,
    title: "Form Tracking",
    description: "Getting started with Form Tracking",
  },
  {
    icon: <ChatIcon sx={{ fontSize: 40, color: "#9C27B0" }} />,
    title: "Conversation Intelligence",
    description: "Getting started with Conversation Intelligence",
  },
];

const FeatureSection = ({}) => {
  return (
    <>
      <Grid container spacing={4} sx={{ mb: 8 }}>
        {featureCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                height: "100%",
                textAlign: "center",
                p: 2,
                cursor: "pointer",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 3,
                },
              }}
            >
              <CardContent>
                <Box sx={{ mb: 2 }}>{card.icon}</Box>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default FeatureSection;
