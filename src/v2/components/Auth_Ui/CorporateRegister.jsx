import { useState } from "react";
import {
  Alert,
  AppBar,
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Toolbar,
  Typography,
  alpha,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import PhoneIphoneRoundedIcon from "@mui/icons-material/PhoneIphoneRounded";
import { useNavigate } from "react-router-dom";
import AuthController from "../../apis/AuthController";
import useBrowserDetails from "../../modules/hooks/useBrowserDetails";
import { whiteOptigoRLogo } from "../../assets";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

const initialFormState = {
  companycode: "",
  firstname: "",
  lastname: "",
  userid: "",
  usercode: "",
  mobile: "",
  Emailid: "",
};

const auth = new AuthController();


const fieldConfig = [
  {
    name: "companycode",
    label: "Company Code",
    icon: <BusinessRoundedIcon />,
    autoFocus: true,
  },
  {
    name: "firstname",
    label: "First Name",
    icon: <PersonRoundedIcon />,
    autoComplete: "given-name",
  },
  {
    name: "lastname",
    label: "Last Name",
    icon: <PersonRoundedIcon />,
    autoComplete: "family-name",
  },
  {
    name: "userid",
    label: "User ID",
    icon: <AlternateEmailRoundedIcon />,
  },
  {
    name: "usercode",
    label: "User Code",
    icon: <BadgeRoundedIcon />,
  },
  {
    name: "mobile",
    label: "Mobile Number",
    icon: <PhoneIphoneRoundedIcon />,
    type: "tel",
    autoComplete: "tel",
    inputMode: "numeric",
  },
  {
    name: "Emailid",
    label: "Email ID",
    icon: <MailOutlineRoundedIcon />,
    type: "email",
    autoComplete: "email",
    sm: 12,
  },
];

const requiredFieldLabels = {
  companycode: "Company Code",
  firstname: "First Name",
  lastname: "Last Name",
  userid: "User ID",
  usercode: "User Code",
  mobile: "Mobile Number",
  Emailid: "Email ID",
};

const CorporateRegister = () => {
  const navigate = useNavigate();
  const { isIpLoading, ...browserDetails } = useBrowserDetails();
  const [formValues, setFormValues] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((previous) => ({
      ...previous,
      [name]: name === "mobile" ? value.replace(/\D/g, "") : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = Object.keys(initialFormState).reduce((accumulator, key) => {
      accumulator[key] = formValues[key].trim();
      return accumulator;
    }, {});

    const missingFields = Object.entries(requiredFieldLabels)
      .filter(([key]) => !payload[key])
      .map(([, label]) => label);

    if (missingFields.length > 0) {
      setMessage({
        text: `${missingFields.join(", ")} ${missingFields.length === 1 ? "is" : "are"} required.`,
        type: "error",
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.Emailid)) {
      setMessage({ text: "Please enter a valid Email ID.", type: "error" });
      return;
    }

    if (!/^\d{10,15}$/.test(payload.mobile)) {
      setMessage({ text: "Please enter a valid mobile number with 10 to 15 digits.", type: "error" });
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const response = await auth.corpRegister({
        ...payload,
        ...browserDetails,
      });
      const rd = response?.Data?.rd?.[0] || response?.Data?.rd1?.[0] || {};
      const apiMessage = rd?.stat_msg || rd?.Message || response?.Message || "";
      const normalizedMessage = String(apiMessage).toLowerCase();
      const hasFailureMessage =
        normalizedMessage.includes("already exists") ||
        normalizedMessage.includes("fail") ||
        normalizedMessage.includes("error") ||
        normalizedMessage.includes("invalid");
      const isSuccess =
        !hasFailureMessage &&
        (rd?.stat === 1 ||
          rd?.stat === "1" ||
          rd?.stat === true ||
          normalizedMessage.includes("success"));

      if (isSuccess) {
        setMessage({
          text: apiMessage || "Corporate registration request submitted successfully.",
          type: "success",
        });
        setFormValues(initialFormState);
      } else {
        setMessage({
          text: apiMessage || "Unable to submit the registration request. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Corporate registration error:", error);
      setMessage({
        text: "Failed to submit the registration request. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
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
        <AppBar
          position="static"
          sx={{
            background: "linear-gradient(135deg, #b2069b 0%, #3909c2 100%)",
            boxShadow: `0 8px 32px ${alpha("#3909c2", 0.3)}`,
          }}
        >
          <Toolbar>
            <Typography variant="h6">Help Center</Typography>
            <Box flexGrow={1} />
            <IconButton color="inherit">
              <img src={whiteOptigoRLogo} alt="Optigo" style={{ width: "80px" }} />
            </IconButton>
          </Toolbar>
        </AppBar>

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

        <Container
          maxWidth="md"
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
              Register New Corporate
            </Typography>
            <Typography variant="body2" align="center" color="textSecondary" sx={{ mb: 3 }}>
              Submit your corporate registration request to the Optigo support team.
            </Typography>

            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2}>
                {fieldConfig.map((field) => (
                  <Grid item xs={12} sm={field.sm || 6} key={field.name}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id={field.name}
                      name={field.name}
                      label={field.label}
                      type={field.type || "text"}
                      autoComplete={field.autoComplete || "off"}
                      autoFocus={Boolean(field.autoFocus)}
                      value={formValues[field.name]}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">{field.icon}</InputAdornment>,
                      }}
                      inputProps={field.inputMode ? { inputMode: field.inputMode } : undefined}
                    />
                  </Grid>
                ))}
              </Grid>

              {message.text && (
                <Alert severity={message.type === "success" ? "success" : "error"} sx={{ mt: 2 }}>
                  {message.text}
                </Alert>
              )}

              <Button
                variant="contained"
                fullWidth
                size="large"
                disabled={loading || isIpLoading}
                type="submit"
                sx={{
                  mt: 3,
                  color: "white !important",
                  fontWeight: 500,
                  borderRadius: 1,
                  background: "linear-gradient(135deg, #b2069b 0%, #3909c2 100%)",
                  boxShadow: `0 8px 32px ${alpha("#3909c2", 0.3)}`,
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                  "&:hover": {
                    boxShadow: `0 12px 40px ${alpha("#3909c2", 0.4)}`,
                  },
                  transition: "all 0.3s ease",
                }}
              >
                {loading ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    Submitting...
                    <CircularProgress size={20} sx={{ color: "white" }} />
                  </Box>
                ) : isIpLoading ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    Detecting details...
                    <CircularProgress size={20} sx={{ color: "white" }} />
                  </Box>
                ) : (
                  "Submit Registration Request"
                )}
              </Button>

              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Button variant="text" onClick={() => navigate("/login")} sx={{ color: "#b2069b", textTransform: "none", fontWeight: 600 }}>
                  Back to Login
                </Button>
              </Box>
            </form>
          </Paper>
        </Container>

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
    </ThemeProvider>
  );
};

export default CorporateRegister;
