import { Box, Container, Typography, Button, Chip, Paper, alpha } from "@mui/material";
import { AutoAwesome as SparklesIcon } from "@mui/icons-material";

const HeroW = ({theme , isMobile ,isTablet}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        backdropFilter: "blur(10px)",
        position: "relative",
        overflow: "hidden",
        bgcolor: "#F8F9FA",
        borderRadius: 0,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 1,
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Box textAlign="center" py={{ xs: 6, sm: 8, md: 12 }} sx={{ maxWidth: 800, mx: "auto" }}>
          <Chip
            icon={<SparklesIcon sx={{ fontSize: { xs: 16, sm: 20 } }} />}
            label="Latest Updates"
            color="primary"
            variant="outlined"
            sx={{
              mb: { xs: 2, sm: 3 },
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              borderColor: theme.palette.primary.main,
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
              height: { xs: 28, sm: 32 },
            }}
          />

          <Typography
            variant={isMobile ? "h3" : isTablet ? "h2" : "h1"}
            component="h1"
            gutterBottom
            sx={{
              fontWeight: { xs: 600, sm: 700 },
              background: `linear-gradient(45deg, ${theme.palette.text.primary} 0%, ${alpha(theme.palette.text.primary, 0.7)} 100%)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: { xs: 1.5, sm: 2 },
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
              lineHeight: { xs: 1.2, sm: 1.1 },
            }}
          >
            What's New in Optigo Apps?
          </Typography>

          <Typography
            variant={isMobile ? "body1" : "h5"}
            color="text.secondary"
            sx={{
              mb: { xs: 3, sm: 4 },
              maxWidth: { xs: "100%", sm: 600 },
              mx: "auto",
              fontWeight: 400,
              fontSize: { xs: "1rem", sm: "1.25rem" },
              lineHeight: { xs: 1.5, sm: 1.4 },
              px: { xs: 1, sm: 0 },
            }}
          >
            We're excited to share new Optigo Apps features – check them out and send us your feedback!
          </Typography>

          <Button
            variant="contained"
            size={isMobile ? "medium" : "large"}
            sx={{
              background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              px: { xs: 3, sm: 4 },
              py: { xs: 1, sm: 1.5 },
              borderRadius: 2,
              boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.3)}`,
              fontSize: { xs: "0.875rem", sm: "1rem" },
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.4)}`,
              },
              transition: "all 0.3s ease",
            }}
          >
            Get Started
          </Button>
        </Box>
      </Container>
    </Paper>
  );
};

export default HeroW;
