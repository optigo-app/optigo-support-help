import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, TextField, Button, CircularProgress, alpha, Container, Paper, Grid, InputAdornment } from "@mui/material";
import { styled } from "@mui/material/styles";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import AuthController from "../../apis/AuthController";
import { encrypt, decrypt } from "../../modules/libs/UrlParser";

const Auth = new AuthController();

const ModalBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[24],
  width: "100%",
  maxWidth: 520,
  display: "flex",
  flexDirection: "column",
  outline: "none !important",
}));

const ForgetPasswordModal = ({ open, setOpen }) => {
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setUserId("");
    setError(null);
    setSuccess(false);
  };

  const VerifMail = async (appUserId, userId) => {
    try {
      const res = Auth.verifyMailUser({
        appUserId: appUserId,
        userId: userId,
      });
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const SendMail = async (link) => {
    try {
      const res = Auth.SendMail({
        link: link,
        mails: userId,
        user: userId?.split("@")[0],
      });
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await VerifMail("rajan@eg.com", userId);
      if (res?.rd1[0]?.Message === "Verify successfully") {
        const CustomerId = res?.rd[0]?.custid;
        setSuccess(true);
        const encCustId = encrypt(CustomerId);
        const encUserId = encrypt(userId);
        const domain = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://help.optigoapps.com";
        const ForgetPasswordLink = `${domain}/forget-password/??cust=${encCustId}&uid=${encUserId}`;
        await SendMail(ForgetPasswordLink);
      } else {
        setError("User not found");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalBox>
        <Container
          maxWidth="sm"
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 !important",
            outline: "none !important",
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
              outline: "none !important",
            }}
          >
            {!success ? (
              <>
                <Typography variant="h5" align="center" gutterBottom>
                  Forgot Password
                </Typography>
                <Typography variant="body2" align="center" color="textSecondary" sx={{ mb: 3 }}>
                  Enter your User ID and we’ll send you a reset link.
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="userId"
                        label="User Id"
                        name="userId"
                        autoComplete="off"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        autoFocus
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <BusinessRoundedIcon />
                            </InputAdornment>
                          ),
                        }}
                      />

                      {error && (
                        <Typography variant="body2" color="error" sx={{ mt: 0 }}>
                          {error}
                        </Typography>
                      )}
                      {success && (
                        <Typography variant="body2" color="success.main" sx={{ mt: 0 }}>
                          <CheckCircleRoundedIcon fontSize="small" /> {`verified successfully. Reset link sent!`}
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
                      fontWeight: 500,
                      borderRadius: 1.5,
                      background: `linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)`, // blue/purple
                      color: "#fff !important",
                      boxShadow: (theme) => `0 8px 24px ${alpha(theme.palette.primary.main, 0.25)}`,
                      "&:hover": {
                        background: `linear-gradient(135deg, #1d4ed8 0%, #4338ca 100%)`,
                        boxShadow: (theme) => `0 12px 32px ${alpha(theme.palette.primary.main, 0.35)}`,
                      },
                      transition: "all 0.25s ease",
                    }}
                  >
                    {loading ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        Sending...
                        <CircularProgress size={18} sx={{ color: "white" }} />
                      </div>
                    ) : (
                      "Send Reset Link"
                    )}
                  </Button>
                </form>
              </>
            ) : (
              <Box textAlign="center" py={3}>
                <CheckCircleRoundedIcon sx={{ fontSize: 60, color: "success.main", mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Mail Sent Successfully 🎉
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  We’ve sent a password reset link to your registered email. Please check your inbox (and spam folder).
                </Typography>
                <Button
                  onClick={handleClose}
                  variant="contained"
                  sx={{
                    borderRadius: 1.5,
                    textTransform: "none",
                  }}
                  color="info"
                >
                  Close
                </Button>
              </Box>
            )}
          </Paper>
        </Container>
      </ModalBox>
    </Modal>
  );
};

export default ForgetPasswordModal;
