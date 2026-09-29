
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  CircularProgress,
  Grid,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import AuthController from "../../apis/AuthController";
import { useDecodedCustomer } from "../../utils/UrlCodeParser";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";


const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  background: theme.palette.background.default,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

}));

const Card = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  padding: theme.spacing(3.5),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[2],
  width: 500,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  textAlign: "center",
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(90deg, #A020F0, #3B82F6)",
  color: "#fff",
  fontWeight: 600,
  padding: theme.spacing(1.2, 0),
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    background: "linear-gradient(90deg, #8b1fd6, #2563eb)",
  },
}));


export default function ResetPassword() {
  const auth = new AuthController();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const customer = useDecodedCustomer();
  const [fields, setFields] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (field) => (e) => {
    setFields((prev) => ({
      ...prev,
      [field]: e.target.value.trimStart(),
    }));
  };

  const toggleVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const Refresher = (callback) => {
    setTimeout(() => {
      callback({ text: "", type: "" });
    }, 3000);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const { newPassword, confirmPassword } = fields;
    const tt = searchParams.get("tt");

    if (!newPassword || !confirmPassword) {
      return setMessage({ text: "All fields are required.", type: "error" });
    }
    if (!tt) {
      return setMessage({ text: "Valid token is required to reset password.", type: "error" });
    }
    if (newPassword.length < 6) {
      return setMessage({ text: "New password must be at least 6 characters.", type: "error" });
    }
    if (newPassword !== confirmPassword) {
      return setMessage({ text: "New password and confirmation do not match.", type: "error" });
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const res = await auth.corpResetPassword({
        appUserId: "admin@eg.com",
        token: tt,
        password: newPassword,
      });

      const rd = res?.Data?.rd?.[0];
      const isSuccess = rd?.stat === 1 || (rd?.Message && rd.Message.toLowerCase().includes("success"));
      const displayMessage = rd?.stat_msg || rd?.Message || (isSuccess ? "Password updated successfully!" : "Operation failed.");

      if (isSuccess) {
        setMessage({ text: displayMessage, type: "success" });
        setFields({ newPassword: "", confirmPassword: "" });
        Refresher(setMessage);
        setTimeout(() => navigate("/login", { replace: true }), 2000);
      } else {
        setMessage({ text: displayMessage, type: "error" });
        Refresher(setMessage);
      }
    } catch (err) {
      console.log("🚀 ~ handleSubmit ~ err:", err);
      setMessage({ text: "Failed to update password. Please try again.", type: "error" });
      Refresher(setMessage);
    } finally {
      setLoading(false);
    }
  };

  const passwordFields = [
    { key: "newPassword", label: "New Password", iconKey: "new", autoFocus: false },
    { key: "confirmPassword", label: "Confirm New Password", iconKey: "confirm", autoFocus: false },
  ];

  if (!searchParams.get("tt")) {
    return null;
  }

  return (
    <PageContainer>
      <Card>
        <Typography variant="h6" fontWeight={600}>
          Reset Password
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Enter your new password below.
        </Typography>
        <Grid container spacing={0}>

          <form onSubmit={handleSubmit}
            style={{
              width: "100%",
            }}
            autoComplete="off"
          >
            {passwordFields?.map(({ key, label, iconKey, autoFocus }) => (
              <Grid item xs={12}>
                <TextField
                  key={key}
                  margin="normal"
                  required
                  fullWidth
                  name={key}
                  id={key}
                  type={showPassword[iconKey] ? "text" : "password"}
                  label={label}
                  variant="outlined"
                  size="medium"
                  value={fields[key]}
                  onChange={handleChange(key)}
                  autoCapitalize="off"
                  autoComplete="off"
                  autoFocus={autoFocus}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon fontSize="small" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => toggleVisibility(iconKey)}
                          edge="end"
                          size="small"
                        >
                          {showPassword[iconKey] ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            ))}
          </form>
        </Grid>
        {message?.text && (
          <Typography
            variant="body2"
            sx={{ color: message?.type === "success" ? "success.main" : "error.main" }}
          >
            {message?.text}
          </Typography>
        )}

        <GradientButton
          fullWidth
          onClick={handleSubmit}
          disabled={loading}
          startIcon={loading && <CircularProgress size={18} color="inherit" />}
          sx={{
            mt: 2,
            color: "white",
            fontWeight: "500",
            borderRadius: 1,
            background: `linear-gradient(135deg, #b2069b 0%, #3909c2 100%)`,
            boxShadow: (theme) => `0 8px 32px ${alpha(theme.palette.primary.main, 0.3)}`,
            fontSize: { xs: "0.875rem", sm: "1rem" },
            "&:hover": {
              boxShadow: (theme) => `0 12px 40px ${alpha(theme.palette.primary.main, 0.4)}`,
            },
            transition: "all 0.3s ease",
          }}
        >
          {loading ? "Updating..." : "Update Password"}
        </GradientButton>
      </Card>
    </PageContainer>
  );
}
