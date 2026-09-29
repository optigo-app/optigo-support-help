import { useState } from "react";
import { Box, Container, Grid, TextField, Button, Typography, Paper, AppBar, Toolbar, IconButton, Link, InputAdornment, CssBaseline, CircularProgress, useTheme, alpha } from "@mui/material";
import { whiteOptigoRLogo } from "../../assets";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuthRedirect } from "./useAuthRedirect";
import { useAuth } from "../../modules/context/UseAuth";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import DummyLogger from "./DummyLogger";
import { useNavigate } from "react-router-dom";
import ForgetPasswordModal from "./ForgetPasswordModal";

const MainLogin3 = () => {
  const navigate = useNavigate();
  const [projectCode, setProjectCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const Btheme = useTheme();
  const [open, setOpen] = useState(false);

  const theme = createTheme({
    typography: {
      fontFamily: "Poppins, sans-serif",
    },
  });

  const { login } = useAuth();

  useAuthRedirect();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShowPassword(false);
    setLoading(true);

    try {
      const result = await login({
        email: email.trim(),
        password,
        projectCode: projectCode.trim(),
      });
      if (result?.success) {
        window.location.href = "/";
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      setError("An unexpected error occurred");
      console.error("Unexpected login error:", error);
    } finally {
      setLoading(false);
    }
  };
  const isLocal = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname.endsWith(".local") || window.location.hostname === "nzen");

  return (
    <ThemeProvider theme={theme}>
      {isLocal && <DummyLogger />}
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          // bgcolor: "#f5f5f5",
        }}
      >
        {/* Header */}
        <AppBar
          position="static"
          sx={{
            background: `linear-gradient(135deg, #b2069b 0%, #3909c2 100%);`,
            boxShadow: `0 8px 32px ${alpha(Btheme.palette.primary.main, 0.3)}`,
          }}
        >
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
            bgcolor: "#e9e9e99f",
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
            | Support: <Link href="tel:+912613603500">0 261 3603500</Link>
          </Typography>
        </Box>

        {/* Main Content */}
        <Container
          maxWidth="sm"
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            my: 4,
          }}
        >
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
              Welcome to the Optigo Apps Support Center
              <br />
              Your one-stop hub for technical assistance, orders, training resources, and ticket updates.
            </Typography>

            {/* Form Fields */}
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="projectCode"
                    label="Company Code"
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
                    id="password"
                    name="password"
                    label={"Password"}
                    autoComplete="off"
                    type={showPassword ? "text" : "Password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockRoundedIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)}>{!showPassword ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />}</IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {error && (
                    <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                      {error}
                    </Typography>
                  )}
                </Grid>
              </Grid>

              <Button
                variant="contained"
                fullWidth
                size="large"
                disabled={loading}
                type="submit"
                sx={{
                  mt: 2,
                  color: "white !important",
                  fontWeight: "500",
                  borderRadius: 1,
                  background: `linear-gradient(135deg, #b2069b 0%, #3909c2 100%)`,
                  boxShadow: `0 8px 32px ${alpha(Btheme.palette.primary.main, 0.3)}`,
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                  "&:hover": {
                    boxShadow: `0 12px 40px ${alpha(Btheme.palette.primary.main, 0.4)}`,
                  },
                  transition: "all 0.3s ease",
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

              <Box
                sx={{
                  textAlign: "right",
                  mt: 1.5,
                  cursor: "pointer",
                }}
              >
                <Link
                  component="button"
                  type="button"
                  variant="body2"
                  onClick={() => navigate("/forget-password")}
                  sx={{
                    textDecoration: "none",
                    color: "#b2069b",
                    fontWeight: 600,
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Forgot Password?
                </Link>
              </Box>
            </form>
          </Paper>
        </Container>

        {/* Footer */}
        <Box
          sx={{
            bgcolor: "#e9e9e99f",
            py: 1.2,
            textAlign: "center",
            color: "text.secondary",
          }}
        >
          <Typography variant="body2">
            Access to old tickets?{" "}
            <Link href="https://support.optigoapps.com/ticket/v3/app/Customerlogin.aspx" underline="hover">
              click here
            </Link>
          </Typography>
        </Box>
      </Box>
      <ForgetPasswordModal key={open} open={open} setOpen={setOpen} />
    </ThemeProvider>
  );
};

export default MainLogin3;
