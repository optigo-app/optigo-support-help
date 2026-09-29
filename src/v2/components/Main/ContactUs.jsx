import { Box, Container, Typography, Grid, Paper, Link } from "@mui/material";
import DraftsRoundedIcon from "@mui/icons-material/DraftsRounded";
const ContactUs = () => {
  return (
    <Box sx={{ bgcolor: "background.paper", py: 10 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h1"
          align="left"
          sx={{
            fontWeight: 600,
            mb: 1,
            color: "#1a1a1a",
            textTransform: "capitalize",
          }}
        >
          You still Have Question ?
        </Typography>
        <Typography variant="body1" align="left" color="text.secondary" sx={{ mb: 7 }}>
          Can't find what you're looking for? Our support team is here to help you 24/7
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Link href="tel:+919099887762" underline="none">
              <Paper
                className="parent-contact-card"
                sx={{
                  p: 5,
                  textAlign: "center",
                  bgcolor: "#e2e2e229",
                  borderRadius: 2,
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  boxShadow: 0.5,
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 6,
                    cursor: "pointer",
                  },
                }}
              >
                <Grid container spacing={2} justifyContent="center">
                  {/* Sales */}
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" fontWeight="medium">
                      Sales
                    </Typography>
                    <Link href="tel:+919099887762" underline="hover" color="primary">
                      +91 90998 87762
                    </Link>
                  </Grid>

                  {/* Demo */}
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" fontWeight="medium">
                      Demo
                    </Typography>
                    <Link href="tel:+919510213581" underline="hover" color="primary">
                      +91 95102 13581
                    </Link>
                  </Grid>

                  {/* Support */}
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" fontWeight="medium">
                      Support
                    </Typography>
                    <Link href="tel:+2602613603500" underline="hover" color="primary">
                      0261 360 3500
                    </Link>
                  </Grid>

                  {/* Training */}
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" fontWeight="medium">
                      Training
                    </Typography>
                    <Link href="tel:+2602613603511" underline="hover" color="primary">
                      0261 360 3511
                    </Link>
                  </Grid>
                </Grid>
              </Paper>
            </Link>
          </Grid>

          {/* Email Us Card */}
          <Grid item xs={12} sm={6}>
            <Link href="mailto:support@orail.in" underline="none">
              <Paper
                sx={{
                  p: 5,
                  textAlign: "center",
                  bgcolor: "#e2e2e229",
                  borderRadius: 2,
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  boxShadow: 0.5,
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 6,
                    cursor: "pointer",
                  },
                }}
              >
                <DraftsRoundedIcon
                  sx={{
                    fontSize: 50,
                    color: "rgb(9, 132, 227)",
                    mb: 2,
                    transition: "color 0.3s ease",
                  }}
                />
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  support@orail.in
                </Typography>
                <Typography variant="body2" color="text.secondary">

                  
                </Typography>
              </Paper>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactUs;
