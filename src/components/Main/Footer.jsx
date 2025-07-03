import { Box, Container, Typography, Grid, IconButton, Divider,  Link } from "@mui/material";
import {  Facebook, Twitter, Instagram, LinkedIn, YouTube } from "@mui/icons-material";

const Footer = () => {
  return (
    <>
      <Box sx={{bgcolor: (theme) => theme.palette.optigo.gradient, boxShadow: "none" ,color:"#3B3B3B" ,pb: 3, mt: 4 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* 1. Company Info */}
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography variant="h6" sx={{ fontWeight: 700 }} gutterBottom> 
                About Orail
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
                  We have successfully computerized jewellery and diamond firms since 2002. The companies that started using our products then, are still using our products today, all these years later.
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  +91 90998 87762
                </Typography>
              </Box>
            </Grid>

            {/* 2. Resources */}
            <Grid item xs={12} sm={6} md={4} lg={3}>
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
                  href="#"
                  color="inherit"
                  underline="none"
                  sx={{
                    opacity: 0.8,
                    fontSize: {
                      sm: 14,
                      md: 16,
                      xs: 14,
                    },
                  }}
                >
                  Help Center
                </Link>
                <Link
                  href="#"
                  color="inherit"
                  underline="none"
                  sx={{
                    opacity: 0.8,
                    fontSize: {
                      sm: 14,
                      md: 16,
                      xs: 14,
                    },
                  }}
                >
                  Support
                </Link>
                <Link
                  href="#"
                  color="inherit"
                  underline="none"
                  sx={{
                    opacity: 0.8,
                    fontSize: {
                      sm: 14,
                      md: 16,
                      xs: 14,
                    },
                  }}
                >
                  FAQs
                </Link>
              </Box>
            </Grid>

            {/* 3. Company */}
            <Grid item xs={12} sm={6} md={4} lg={3}>
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
                  href="#"
                  color="inherit"
                  underline="none"
                  sx={{
                    opacity: 0.8,
                    fontSize: {
                      sm: 14,
                      md: 16,
                      xs: 14,
                    },
                  }}
                >
                  About Us
                </Link>
                <Link
                  href="#"
                  color="inherit"
                  underline="none"
                  sx={{
                    opacity: 0.8,
                    fontSize: {
                      sm: 14,
                      md: 16,
                      xs: 14,
                    },
                  }}
                >
                  Careers
                </Link>
                <Link
                  href="#"
                  color="inherit"
                  underline="none"
                  sx={{
                    opacity: 0.8,
                    fontSize: {
                      sm: 14,
                      md: 16,
                      xs: 14,
                    },
                  }}
                >
                  Blog
                </Link>
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
                <IconButton color="inherit" size="small" href="#">
                  <Facebook />
                </IconButton>
                <IconButton color="inherit" size="small" href="#">
                  <Twitter />
                </IconButton>
                <IconButton color="inherit" size="small" href="#">
                  <Instagram />
                </IconButton>
                <IconButton color="inherit" size="small" href="#">
                  <LinkedIn />
                </IconButton>
                <IconButton color="inherit" size="small" href="#">
                  <YouTube />
                </IconButton>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.2)" }} />

          <Typography variant="body2" align="center" sx={{ opacity: 0.7 }}>
            2022 Optigo | Cloud ERP for Jewellery Industry All Rights Reserved, ORAIL SERVICES.
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
