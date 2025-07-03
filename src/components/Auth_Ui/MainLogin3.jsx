import { useState } from "react";
import { Box, Container, Grid, TextField, Button, Typography, Paper, AppBar, Toolbar, IconButton, Link, InputAdornment, CssBaseline, CircularProgress } from "@mui/material";
import { whiteOptigoRLogo } from "../../assets";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BaseAPI } from "../../apis/BaseAPI";
import Cookies from "js-cookie";

// const AllowedDomains = ["localhost", "http://calllog.web/", "http://calllog.web/","calllog.web"];

// if (process.env.NODE_ENV === "development" || AllowedDomains.some((domain) => window.location.hostname.includes(domain))) {
//     // Cookies.set("skey", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJpdGFzayIsImF1ZCI6ImFtVnVhWE5BWldjdVkyOXQiLCJleHAiOjE3NDYxODg3NDgsInVpZCI6ImFtVnVhWE5BWldjdVkyOXQiLCJ5YyI6ImUzdHVlbVZ1ZlgxN2V6SXdmWDE3ZTI5eVlXbHNNalY5Zlh0N2IzSmhhV3d5TlgxOSIsInN2IjoiMCJ9.Ui_Taj21Fb8oDWvhEc8IwHJZTeFxUos46Jb6H4Iyk8M", { path: "/" });
// Cookies.set("skey", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJpdGFzayIsImF1ZCI6IllXMXlkWFJBWldjdVkyOXQiLCJleHAiOjE3NDcxMzk2ODYsInVpZCI6IllXMXlkWFJBWldjdVkyOXQiLCJ5YyI6ImUzdHVlbVZ1ZlgxN2V6SXdmWDE3ZTI5eVlXbHNNalY5Zlh0N2IzSmhhV3d5TlgxOSIsInN2IjoiMCJ9.m4NonzyJfWdM0frEq1Cn4h1ABThBa1wgosx8Z7Mg5VI", { path: "/" });
// }
// // Amrut Sir Login Cookies
// // if (process.env.NODE_ENV === 'development') {
// //     console.log("AuthUtils.js is running in development mode");
// // }

const MainLogin3 = () => {
  const [projectCode, setProjectCode] = useState("Orail25");
  const [email, setEmail] = useState("rajan.optigo@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const theme = createTheme({
    typography: {
      fontFamily: "Poppins, sans-serif",
    },
  });

  const login = async ({ email, password }) => {
    return BaseAPI.OnLogin(email, password);
  };

  const handleContinue = async () => {
    try {
      const token = await login({ email, password });
      console.log(token, "token");
      Cookies.set("skey", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJpdGFzayIsImF1ZCI6IllXMXlkWFJBWldjdVkyOXQiLCJleHAiOjE3NDcxMzk2ODYsInVpZCI6IllXMXlkWFJBWldjdVkyOXQiLCJ5YyI6ImUzdHVlbVZ1ZlgxN2V6SXdmWDE3ZTI5eVlXbHNNalY5Zlh0N2IzSmhhV3d5TlgxOSIsInN2IjoiMCJ9.m4NonzyJfWdM0frEq1Cn4h1ABThBa1wgosx8Z7Mg5VI");
      window.location.href = "/";
    } catch (error) {
      console.error("Login failed:", error);
    }
  };


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          bgcolor: "#f5f5f5",
        }}
      >
        {/* Header */}
        <AppBar position="static" sx={{ bgcolor: "black" }}>
          <Toolbar>
            <Typography variant="h6">Help Center</Typography>
            <Box flexGrow={1} />
            <IconButton color="inherit">
              <img src={whiteOptigoRLogo} alt="" style={{ width: "80px" }} />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Banner */}
        <Box
          sx={{
            bgcolor: "#ffeb3b",
            py: 1.2,
            px: 4,
            textAlign: "right",
          }}
        >
          <Typography variant="body2">
            Powered by:{" "}
            <Link href="https://optigoapps.com" target="_blank" underline="hover">
              OptigoApps.com
            </Link>{" "}
            | Support: <Link href="tel:+912613603500">+91 261 3603500</Link>
          </Typography>
        </Box>

        {/* Main Content */}
        <Container maxWidth="sm" sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", my: 4 }}>
          <Paper
            elevation={3}
            sx={{
              p: {
                xs: 2,
                sm: 4,
              },
              width: "100%",
            }}
          >
            <Typography variant="h5" align="center" gutterBottom>
              Need Help?
            </Typography>
            <Typography variant="body2" align="center" color="textSecondary" sx={{ mb: 3 }}>
              We will like to create things with fun, open-minded people. Feel free to say hello!
              <br />
              Login with your Project code, User Id and Password.
            </Typography>

            {/* Form Fields */}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="projectCode"
                  label="Project Code"
                  name="projectCode"
                  autoComplete="off"
                  value={projectCode}
                  onChange={(e) => setProjectCode(e.target.value)}
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BusinessRoundedIcon />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="userId"
                  label="User ID"
                  name="userId"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonRoundedIcon />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="Password"
                  label="Password"
                  name="Password"
                  autoComplete="off"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockRoundedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <Button
              variant="contained"
              fullWidth
              onClick={handleContinue}
              size="large"
              sx={{
                mt: 2,
                bgcolor: "#ffeb3b",
                color: "black",
                fontWeight: "500",
                "&:hover": {
                  bgcolor: "#ffeb3b",
                },
              }}
            >
              {loading ? (
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  Processing...
                  <CircularProgress
                    size={20}
                    sx={{
                      color: "white",
                    }}
                  />
                </div>
              ) : (
                "Sign in"
              )}
            </Button>
          </Paper>
        </Container>

        {/* Footer */}
        <Box
          sx={{
            bgcolor: "#e0e0e0",
            py: 1.2,
            textAlign: "center",
            color: "text.secondary",
          }}
        >
          <Typography variant="body2">
            Access to old tickets?{" "}
            <Link href="#" underline="hover">
              click here
            </Link>
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default MainLogin3;
