import { Box, Container, Typography, Grid, IconButton, Divider } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn, YouTube } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
const Footer = () => {
  return (
    <>
      <Box sx={{ bgcolor: (theme) => theme.palette.optigo.gradient, boxShadow: "none", color: "#3B3B3B", pb: 3, mt: 4 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* 1. Company Info */}
            <Grid item xs={12} sm={6} md={6} lg={5}>
              <Typography variant="h6" sx={{ fontWeight: 700 }} gutterBottom>
              About Optigo Apps
                            </Typography>
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
                Optigo Apps is committed to providing seamless support and innovative solutions for our customers. From ticket management and call logs to training dashboards and order tracking, we ensure that you have all the tools you need to succeed.
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  +91 90998 87762
                </Typography>
              </Box>
            </Grid>

            {/* 2. Resources */}
            {/* <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography variant="h6" gutterBottom>
                Resources
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: {
                    sm: 1,
                    xs: 0,
                  },
                }}
              >
                <Link
                  component={RouterLink}
                  to="/"
                  color="inherit"
                  underline="none"
                  sx={{
                    opacity: 0.8,
                    fontSize: {
                      xs: 14,
                      sm: 14,
                      md: 16,
                    },
                  }}
                >
                  Help Center
                </Link>

                <Link
                  component={RouterLink}
                  to="/3/category/Ticket"
                  color="inherit"
                  underline="none"
                  sx={{
                    opacity: 0.8,
                    fontSize: {
                      xs: 14,
                      sm: 14,
                      md: 16,
                    },
                  }}
                >
                  Support
                </Link>

                <Link
                  component={RouterLink}
                  to="/"
                  color="inherit"
                  underline="none"
                  sx={{
                    opacity: 0.8,
                    fontSize: {
                      xs: 14,
                      sm: 14,
                      md: 16,
                    },
                  }}
                >
                  FAQs
                </Link>
              </Box>
            </Grid> */}

            {/* 3. Company */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Typography variant="h6" gutterBottom>
                Company
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: {
                    sm: 1,
                    xs: 0,
                  },
                }}
              >
                <Link
                  component={RouterLink}
                  to="/about"
                  color="inherit"
                  underline="none"
                  sx={{
                    opacity: 0.8,
                    fontSize: {
                      xs: 14,
                      sm: 14,
                      md: 16,
                    },
                  }}
                >
                  About Us
                </Link>

                {/* <Link
                  component={RouterLink}
                  to="/careers"
                  color="inherit"
                  underline="none"
                  sx={{
                    opacity: 0.8,
                    fontSize: {
                      xs: 14,
                      sm: 14,
                      md: 16,
                    },
                  }}
                >
                  Careers
                </Link> */}
              </Box>
            </Grid>

            {/* 4. Social Media */}
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <Typography variant="h6" gutterBottom>
                Follow Us
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: {
                    sm: 1,
                    xs: 0.5,
                  },
                  mt: 2,
                }}
              >
                <IconButton color="inherit" size="small" href="https://www.facebook.com/OptigoApps/" target="_blank" rel="noopener">
                  <Facebook />
                </IconButton>
                <IconButton color="inherit" size="small" href="https://x.com/optigoapps?lang=ar" target="_blank" rel="noopener">
                  <Twitter />
                </IconButton>
                <IconButton color="inherit" size="small" href="https://www.instagram.com/optigoapps/" target="_blank" rel="noopener">
                  <Instagram />
                </IconButton>
                <IconButton color="inherit" size="small" href="https://in.linkedin.com/company/orail-optigo-apps" target="_blank" rel="noopener">
                  <LinkedIn />
                </IconButton>
                <IconButton color="inherit" size="small" href="https://www.youtube.com/@OptigoApps?app=desktop" target="_blank" rel="noopener">
                  <YouTube />
                </IconButton>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.2)" }} />

          <Typography variant="body2" align="center" sx={{ opacity: 0.7 }}>
            Cloud ERP for Jewellery Industry All Rights Reserved, ORAIL SERVICES.
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
