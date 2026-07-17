import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  CircularProgress,
  alpha,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import AuthController from "../../apis/AuthController";
import { useNavigate } from "react-router-dom";

const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  background: "#f5f5f5",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Card = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[2],
  width: 450,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  textAlign: "center",
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, #b2069b 0%, #3909c2 100%)`,
  color: "#fff",
  fontWeight: 600,
  padding: theme.spacing(1.2, 0),
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    background: `linear-gradient(135deg, #8b1fd6, #2563eb)`,
  },
}));

const auth = new AuthController();

export default function ForgetPassword() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [fields, setFields] = useState({
    companyCode: "",
    userId: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value.trim() }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fields.companyCode || !fields.userId) {
      return setMessage({ text: "Both fields are required.", type: "error" });
    }

    setLoading(true);
    setMessage({ text: "", type: "" });
    try {
      const res = await auth.corpForgotPassword({
        companyCode: fields.companyCode,
        userId: fields.userId,
        appUserId: "admin@eg.com",
      });

      const rd = res?.Data?.rd?.[0];
      const isSuccess = rd?.stat === 1 || (rd?.Message && rd.Message.toLowerCase().includes("success"));
      const displayMessage = rd?.stat_msg || rd?.Message || (isSuccess ? "Reset link sent successfully!" : "Operation failed.");

      if (isSuccess) {
        setMessage({ text: "A reset link has been sent to your registered email.", type: "success" });
        setTimeout(() => navigate("/login"), 3000);
      } else {
        setMessage({ text: displayMessage, type: "error" });
      }
    } catch (err) {
      console.error("Forgot Password error:", err);
      setMessage({ text: "Failed to process request. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <Card>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Forgot Password?
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Enter your Company Code and User ID to receive a reset link.
        </Typography>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <TextField
            name="companyCode"
            label="Company Code"
            variant="outlined"
            fullWidth
            required
            value={fields.companyCode}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BusinessRoundedIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            name="userId"
            label="User ID"
            variant="outlined"
            fullWidth
            required
            value={fields.userId}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonRoundedIcon />
                </InputAdornment>
              ),
            }}
          />

          {message.text && (
            <Typography
              variant="caption"
              sx={{ color: message.type === "success" ? "success.main" : "error.main", mt: 1 }}
            >
              {message.text}
            </Typography>
          )}

          <GradientButton
            fullWidth
            type="submit"
            disabled={loading}
            startIcon={loading && <CircularProgress size={18} color="inherit" />}
            sx={{
              boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.2)}`,
            }}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </GradientButton>

          <Button
            variant="text"
            onClick={() => navigate("/login")}
            sx={{ color: "text.secondary", textTransform: "none" }}
          >
            Back to Login
          </Button>
        </form>
      </Card>
    </PageContainer>
  );
}
