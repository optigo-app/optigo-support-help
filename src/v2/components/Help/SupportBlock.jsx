import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  IconButton,
  Button,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";
import ForumIcon from "@mui/icons-material/Forum";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";

// --- Section 1: Custom SVGs for Dark Grid Cards ---

const EasyRechargeIcon = () => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="20"
      y="6"
      width="24"
      height="48"
      rx="5"
      fill="#312E41"
      stroke="#4B5563"
      strokeWidth="2"
    />
    <circle cx="32" cy="46" r="1.5" fill="#9CA3AF" />
    <circle cx="32" cy="24" r="9" fill="#10B981" />
    <path
      d="M28 24L31 27L36 21"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="42"
      cy="40"
      r="7.5"
      fill="#FBBF24"
      stroke="#D97706"
      strokeWidth="1"
    />
    <text
      x="42"
      y="43"
      fill="#B45309"
      fontSize="10"
      fontWeight="bold"
      textAnchor="middle"
    >
      $
    </text>
  </svg>
);

const Service247Icon = () => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="32" cy="34" r="17" fill="#EF4444" />
    <circle cx="32" cy="34" r="13" fill="#FEE2E2" />
    <path
      d="M32 25V34H39"
      stroke="#EF4444"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M16 18C16 18 18 12 24 14"
      stroke="#EF4444"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M48 18C48 18 46 12 40 14"
      stroke="#EF4444"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <circle
      cx="46"
      cy="42"
      r="9"
      fill="#2563EB"
      stroke="white"
      strokeWidth="1.5"
    />
    <text
      x="46"
      y="45"
      fill="white"
      fontSize="9"
      fontWeight="bold"
      textAnchor="middle"
    >
      24
    </text>
  </svg>
);

const AndroidRobotIcon = () => (
  <svg
    width="72"
    height="72"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="18" y="26" width="28" height="23" rx="4" fill="#A4C639" />
    <path
      d="M18 22C18 14.2 24.2 8 32 8C39.8 8 46 14.2 46 22H18Z"
      fill="#A4C639"
    />
    <circle cx="26" cy="15" r="1.5" fill="white" />
    <circle cx="38" cy="15" r="1.5" fill="white" />
    <line
      x1="24"
      y1="9"
      x2="20"
      y2="3"
      stroke="#A4C639"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <line
      x1="40"
      y1="9"
      x2="44"
      y2="3"
      stroke="#A4C639"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <rect x="12" y="26" width="4" height="18" rx="2" fill="#A4C639" />
    <rect x="48" y="26" width="4" height="18" rx="2" fill="#A4C639" />
    <rect x="23" y="48" width="4" height="8" rx="2" fill="#A4C639" />
    <rect x="37" y="48" width="4" height="8" rx="2" fill="#A4C639" />
  </svg>
);

const AppleLogoIcon = () => (
  <svg
    width="72"
    height="72"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M43.2 32.4C43.2 25.8 48.6 22.5 48.9 22.3C45.8 17.8 41 17.1 39.3 17C35.2 16.6 31.2 19.5 29.1 19.5C27 19.5 23.7 17.1 20.3 17.2C15.9 17.3 11.8 19.8 9.5 23.8C4.9 31.8 8.3 43.6 12.7 49.9C14.9 53 17.4 56.4 20.8 56.3C24.1 56.2 25.3 54.2 29.3 54.2C33.3 54.2 34.5 56.3 37.9 56.2C41.3 56.1 43.5 53.1 45.7 49.9C48.2 46.2 49.2 42.7 49.3 42.5C49.2 42.4 42.7 39.9 43.2 32.4Z"
      fill="#D1D5DB"
    />
    <path
      d="M37.5 11.5C39.3 9.3 40.5 6.3 40.2 3.3C37.6 3.4 34.4 5 32.5 7.2C30.9 9.1 29.5 12.1 29.9 15.1C32.8 15.3 35.7 13.7 37.5 11.5Z"
      fill="#D1D5DB"
    />
  </svg>
);

const PlanBenefitsIcon = () => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform="rotate(-15 32 32)">
      <rect
        x="12"
        y="20"
        width="40"
        height="24"
        rx="4"
        fill="#3B82F6"
        stroke="#60A5FA"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="32" r="4" fill="#1C1D24" />
      <circle cx="52" cy="32" r="4" fill="#1C1D24" />
      <line
        x1="22"
        y1="20"
        x2="22"
        y2="44"
        stroke="#60A5FA"
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />
      <text
        x="36"
        y="36"
        fill="white"
        fontSize="10"
        fontWeight="bold"
        textAnchor="middle"
      >
        VOUCHER
      </text>
    </g>
    <rect x="42" y="38" width="12" height="12" rx="1" fill="#F59E0B" />
    <path d="M42 42H54M48 38V50" stroke="#EF4444" strokeWidth="1.5" />
    <rect x="8" y="12" width="10" height="10" rx="1" fill="#EF4444" />
    <path d="M8 17H18M13 12V22" stroke="#F59E0B" strokeWidth="1.5" />
  </svg>
);

const UsageTrackingIcon = () => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="32"
      cy="32"
      r="22"
      fill="#1F2937"
      stroke="#4B5563"
      strokeWidth="2"
    />
    <path
      d="M16 38C14.5 33.5 15.5 28.5 19 25C22.5 21.5 27.5 20.5 32 22"
      stroke="#2563EB"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M32 22C36.5 20.5 41.5 21.5 45 25C48.5 28.5 49.5 33.5 48 38"
      stroke="#EF4444"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
    <line
      x1="32"
      y1="32"
      x2="42"
      y2="24"
      stroke="#FBBF24"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <circle cx="32" cy="32" r="4" fill="white" />
    <rect x="8" y="38" width="14" height="10" rx="2" fill="#2563EB" />
    <rect x="44" y="38" width="14" height="10" rx="2" fill="#10B981" />
  </svg>
);

// --- Google Play / App Store Badge Placeholders ---

const AppStoreBadge = ({ store }) => (
  <Button
    variant="contained"
    sx={{
      bgcolor: "#000000",
      color: "white",
      border: "1px solid #333333",
      borderRadius: "8px",
      px: 2,
      py: 0.5,
      textTransform: "none",
      display: "flex",
      alignItems: "center",
      gap: 1,
      minWidth: "150px",
      justifyContent: "flex-start",
      "&:hover": { bgcolor: "#111111" },
    }}
  >
    {store === "google" ? (
      <>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M3 20.5V3.5L16.5 12L3 20.5Z" fill="#00E676" />
          <path d="M16.5 12L12 8.5L3 3.5L16.5 12Z" fill="#FFC107" />
          <path d="M3 20.5L12 15.5L16.5 12L3 20.5Z" fill="#FF3D00" />
          <path d="M21 12L16.5 15.5L12 12L16.5 8.5L21 12Z" fill="#1976D2" />
        </svg>
        <Box textAlign="left">
          <Typography sx={{ fontSize: "8px", lineHeight: 1 }}>
            GET IT ON
          </Typography>
          <Typography
            sx={{ fontSize: "13px", fontWeight: "bold", lineHeight: 1 }}
          >
            Google Play
          </Typography>
        </Box>
      </>
    ) : (
      <>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
          <path d="M18.7 18.5C17.8 19.8 16.8 21.1 15.3 21.1C13.8 21.2 13.4 20.2 11.6 20.2C9.9 20.2 9.4 21.1 8 21.1C6.6 21.2 5.5 19.8 4.6 18.5C2.8 15.9 1.4 11.1 3.2 8C4.1 6.4 5.7 5.4 7.5 5.4C8.9 5.4 10.1 6.3 11 6.3C11.8 6.3 13.3 5.3 14.9 5.4C15.6 5.5 17.5 5.7 18.7 7.5C18.6 7.6 16.5 8.8 16.5 11.3C16.5 14.3 19 15.3 19.1 15.4C19.1 15.5 18.7 16.8 18.7 18.5ZM15.8 3.5C16.6 2.5 17.1 1.2 16.9 0C15.8 0.1 14.5 0.8 13.7 1.7C13 2.5 12.4 3.8 12.6 5C13.8 5.1 15 4.4 15.8 3.5Z" />
        </svg>
        <Box textAlign="left">
          <Typography sx={{ fontSize: "8px", lineHeight: 1 }}>
            Download on the
          </Typography>
          <Typography
            sx={{ fontSize: "13px", fontWeight: "bold", lineHeight: 1 }}
          >
            App Store
          </Typography>
        </Box>
      </>
    )}
  </Button>
);

export default function ViDashboardSections() {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#FFFFFF",
      }}
    >
      {/* ========================================================
          SECTION 1: "make life easier with Vi!" (DARK GRID)
         ======================================================== */}
      {/* <Box
        sx={{
          bgcolor: "#12131A",
          py: 10,
          px: { xs: 2, md: 0 },
          color: "white",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            align="center"
            sx={{
              fontWeight: 800,
              mb: 8,
              fontSize: { xs: "2rem", md: "2.8rem" },
              letterSpacing: "-1px",
            }}
          >
            make life easier with{" "}
            <Box
              component="span"
              sx={{ position: "relative", display: "inline-block" }}
            >
              <span style={{ color: "#E10B24" }}>V</span>
              <span style={{ color: "#E10B24" }}>i</span>
              <Box
                component="span"
                sx={{
                  position: "absolute",
                  right: "-12px",
                  top: "10%",
                  width: "6px",
                  height: "24px",
                  bgcolor: "#FBBF24",
                  borderRadius: "2px",
                  transform: "rotate(15deg)",
                }}
              />
              <Box
                component="span"
                sx={{
                  position: "absolute",
                  right: "-16px",
                  bottom: "4px",
                  width: "6px",
                  height: "6px",
                  bgcolor: "#FBBF24",
                  borderRadius: "50%",
                }}
              />
            </Box>
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{
                  bgcolor: "#1C1D24",
                  borderRadius: "24px",
                  p: 4,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "translateY(-4px)" },
                }}
              >
                <EasyRechargeIcon />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                    mt: 3,
                    mb: 1,
                    fontSize: "18px",
                    lineHeight: 1.2,
                  }}
                >
                  easy recharge &<br />
                  payment option
                </Typography>
                <Typography
                  sx={{
                    color: "#9CA3AF",
                    fontSize: "13px",
                    px: 1,
                    lineHeight: 1.4,
                  }}
                >
                  recharge & pay bill for your friends & relatives
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{
                  bgcolor: "#1C1D24",
                  borderRadius: "24px",
                  p: 4,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "translateY(-4px)" },
                }}
              >
                <Service247Icon />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                    mt: 3,
                    mb: 1,
                    fontSize: "18px",
                    lineHeight: 1.2,
                  }}
                >
                  24/7 service at
                  <br />
                  your fingertips
                </Typography>
                <Typography
                  sx={{
                    color: "#9CA3AF",
                    fontSize: "13px",
                    px: 1,
                    lineHeight: 1.4,
                  }}
                >
                  raise service requests anytime, anywhere
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  bgcolor: "#1C1D24",
                  borderRadius: "24px",
                  p: 4,
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  transition: "transform 0.2s",
                  "&:hover": { transform: "translateY(-4px)" },
                }}
              >
                <Box sx={{ flexShrink: 0 }}>
                  <AndroidRobotIcon />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 800, color: "white", lineHeight: 1 }}
                    >
                      36.2mn+
                    </Typography>
                    <Typography sx={{ color: "#9CA3AF", fontSize: "13px" }}>
                      android downloads
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      height: "1px",
                      bgcolor: "#2D2E38",
                      mb: 2,
                    }}
                  />
                  <Box>
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 800, color: "white", lineHeight: 1 }}
                    >
                      4.4
                    </Typography>
                    <Typography sx={{ color: "#9CA3AF", fontSize: "13px" }}>
                      android app rating
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  bgcolor: "#1C1D24",
                  borderRadius: "24px",
                  p: 4,
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  transition: "transform 0.2s",
                  "&:hover": { transform: "translateY(-4px)" },
                }}
              >
                <Box sx={{ flexShrink: 0 }}>
                  <AppleLogoIcon />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 800, color: "white", lineHeight: 1 }}
                    >
                      9.8mn+
                    </Typography>
                    <Typography sx={{ color: "#9CA3AF", fontSize: "13px" }}>
                      ios downloads
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      height: "1px",
                      bgcolor: "#2D2E38",
                      mb: 2,
                    }}
                  />
                  <Box>
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 800, color: "white", lineHeight: 1 }}
                    >
                      4.5
                    </Typography>
                    <Typography sx={{ color: "#9CA3AF", fontSize: "13px" }}>
                      ios app rating
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{
                  bgcolor: "#1C1D24",
                  borderRadius: "24px",
                  p: 4,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "translateY(-4px)" },
                }}
              >
                <PlanBenefitsIcon />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                    mt: 3,
                    mb: 1,
                    fontSize: "18px",
                    lineHeight: 1.2,
                  }}
                >
                  claim exclusive
                  <br />
                  plan benefits
                </Typography>
                <Typography
                  sx={{
                    color: "#9CA3AF",
                    fontSize: "13px",
                    px: 1,
                    lineHeight: 1.4,
                  }}
                >
                  get additional data benefits every month
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{
                  bgcolor: "#1C1D24",
                  borderRadius: "24px",
                  p: 4,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "translateY(-4px)" },
                }}
              >
                <UsageTrackingIcon />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                    mt: 3,
                    mb: 1,
                    fontSize: "18px",
                    lineHeight: 1.2,
                  }}
                >
                  real time usage
                  <br />
                  tracking
                </Typography>
                <Typography
                  sx={{
                    color: "#9CA3AF",
                    fontSize: "13px",
                    px: 1,
                    lineHeight: 1.4,
                  }}
                >
                  manage multiple accounts in single login
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box> */}

      {/* ========================================================
          SECTION 2: "Explore Vi app" & "need help?" (LIGHT MODE)
         ======================================================== */}
      <Box sx={{ bgcolor: "#FFFFFF", py: 10 }}>
        <Container maxWidth="lg">
          {/* Banner: Explore Vi App */}
          <Box
            sx={{
              background:
                "linear-gradient(90deg, #601415 0%, #111111 50%, #000000 100%)",
              borderRadius: "40px",
              height: { xs: "auto", md: "360px" },
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              overflow: "hidden",
              alignItems: "center",
              justifyContent: "space-between",
              px: { xs: 4, md: 8 },
              py: { xs: 6, md: 0 },
              mb: 10,
              boxShadow: "0px 20px 40px rgba(0,0,0,0.1)",
            }}
          >
            {/* Left: Tilted Smartphone Mockup visual */}
            <Box
              sx={{
                width: { xs: "200px", md: "240px" },
                height: "300px",
                bgcolor: "#212121",
                borderRadius: "30px",
                border: "6px solid #444444",
                transform: {
                  xs: "none",
                  md: "rotate(-10deg) translateY(20px)",
                },
                boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
                overflow: "hidden",
                position: "relative",
                flexShrink: 0,
                mb: { xs: 4, md: 0 },
              }}
            >
              {/* Dynamic Gradient screen interior */}
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  background: "linear-gradient(135deg, #FF7E5F, #FEB47B)",
                  p: 2,
                }}
              >
                <Box
                  sx={{
                    width: "40%",
                    height: "12px",
                    bgcolor: "rgba(255,255,255,0.4)",
                    borderRadius: "10px",
                    mb: 2,
                  }}
                />
                <Box
                  sx={{
                    bgcolor: "white",
                    borderRadius: "12px",
                    p: 1.5,
                    mb: 1.5,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "9px",
                      fontWeight: "bold",
                      color: "#601415",
                    }}
                  >
                    play daily and win
                  </Typography>
                  <Typography sx={{ fontSize: "7px", color: "#666" }}>
                    flash amazon vouchers and gold
                  </Typography>
                </Box>
                <Box
                  sx={{
                    bgcolor: "white",
                    borderRadius: "12px",
                    p: 1.5,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                  }}
                >
                  <Typography
                    sx={{ fontSize: "9px", fontWeight: "bold", color: "#111" }}
                  >
                    recharge
                  </Typography>
                  <Typography sx={{ fontSize: "7px", color: "#666" }}>
                    view plans & bills
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Right: Call to action Text & Badges */}
            <Box
              sx={{
                textAlign: { xs: "center", md: "left" },
                maxWidth: "400px",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: "white",
                  fontWeight: 800,
                  fontSize: { xs: "28px", md: "36px" },
                  mb: 4,
                }}
              >
                Explore Vi app
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent={{ xs: "center", md: "flex-start" }}
              >
                <AppStoreBadge store="google" />
                <AppStoreBadge store="apple" />
              </Stack>
            </Box>
          </Box>

          {/* Subsection: Support / Help */}
          <Box sx={{ textAlign: "center", maxWidth: "640px", mx: "auto" }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: "#12131A",
                lineHeight: 1.3,
                fontSize: { xs: "24px", md: "32px" },
                mb: 4,
              }}
            >
              need help? we’ve got <br />
              you covered!
            </Typography>

            <Grid container spacing={2}>
              {/* Call Us Button */}
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<PhoneCallbackIcon sx={{ color: "#E10B24" }} />}
                  endIcon={<KeyboardArrowRightIcon sx={{ color: "#111" }} />}
                  sx={{
                    bgcolor: "#FCE7F3", // Light pink background
                    color: "#111111",
                    borderRadius: "16px",
                    py: 2.5,
                    px: 3,
                    justifyContent: "space-between",
                    textTransform: "none",
                    fontWeight: 700,
                    boxShadow: "none",
                    fontSize: "15px",
                    "&:hover": { bgcolor: "#FBCFE8", boxShadow: "none" },
                  }}
                >
                  call us
                </Button>
              </Grid>

              {/* Chat With Us Button */}
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<ForumIcon sx={{ color: "#2563EB" }} />}
                  endIcon={<KeyboardArrowRightIcon sx={{ color: "#111" }} />}
                  sx={{
                    bgcolor: "#E0F2FE", // Light blue background
                    color: "#111111",
                    borderRadius: "16px",
                    py: 2.5,
                    px: 3,
                    justifyContent: "space-between",
                    textTransform: "none",
                    fontWeight: 700,
                    boxShadow: "none",
                    fontSize: "15px",
                    "&:hover": { bgcolor: "#BAE6FD", boxShadow: "none" },
                  }}
                >
                  chat with us
                </Button>
              </Grid>

              {/* Solve Queries with Videos Button (Full width) */}
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<PlayCircleFilledIcon sx={{ color: "#EF4444" }} />}
                  endIcon={<KeyboardArrowRightIcon sx={{ color: "#111" }} />}
                  sx={{
                    bgcolor: "#FEF3C7", // Light orange/yellow background
                    color: "#111111",
                    borderRadius: "16px",
                    py: 2.5,
                    px: 3,
                    justifyContent: "space-between",
                    textTransform: "none",
                    fontWeight: 700,
                    boxShadow: "none",
                    fontSize: "15px",
                    "&:hover": { bgcolor: "#FDE68A", boxShadow: "none" },
                  }}
                >
                  solve queries with videos
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

// import React from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Box,
//   Container,
//   Grid,
//   Stack,
//   Avatar,
//   Chip,
//   IconButton,
// } from "@mui/material";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// import MicIcon from "@mui/icons-material/Mic";
// import ListIcon from "@mui/icons-material/List";
// import FullscreenIcon from "@mui/icons-material/Fullscreen";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// // --- Abstract SVG Shapes ---

// const YellowCross = () => (
//   <svg
//     width="180"
//     height="180"
//     viewBox="0 0 150 200"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//     style={{ opacity: 0.9 }}
//   >
//     <g transform="rotate(-15, 75, 100)">
//       <rect x="55" y="10" width="40" height="180" rx="20" fill="#FBBF24" />
//       <rect x="10" y="80" width="130" height="40" rx="20" fill="#FBBF24" />
//       <circle cx="75" cy="100" r="22" fill="white" />
//     </g>
//   </svg>
// );

// const GreenPlus = () => (
//   <svg
//     width="50"
//     height="50"
//     viewBox="0 0 60 60"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//     style={{ opacity: 0.8 }}
//   >
//     <rect x="24" y="5" width="12" height="50" rx="6" fill="#6EE7B7" />
//     <rect x="5" y="24" width="50" height="12" rx="6" fill="#6EE7B7" />
//   </svg>
// );

// const RightAbstractShape = () => (
//   <svg
//     width="240"
//     height="240"
//     viewBox="0 0 240 240"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     {/* Cyan Triangle */}
//     <polygon points="100,220 220,220 220,100" fill="#22D3EE" opacity="0.85" />
//     {/* Magenta stylized symbol */}
//     <g transform="rotate(-30, 110, 110)">
//       <rect x="90" y="20" width="36" height="160" rx="18" fill="#EC4899" />
//       <rect x="30" y="70" width="140" height="36" rx="18" fill="#EC4899" />
//     </g>
//   </svg>
// );

// export default function VairoLandingPage() {
//   return (
//     <Box
//       sx={{
//         bgcolor: "#F9FAFB",
//         minHeight: "100vh",
//         fontFamily: "Inter, sans-serif",
//         pb: 10,
//       }}
//     >
//       {/* --- Navbar --- */}
//       <AppBar
//         position="static"
//         color="transparent"
//         elevation={0}
//         sx={{ py: 1 }}
//       >
//         <Container maxWidth="lg">
//           <Toolbar sx={{ justifyContent: "space-between", px: { xs: 0 } }}>
//             {/* Logo */}
//             <Stack direction="row" alignItems="center" spacing={1}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   bgcolor: "#111827",
//                   width: 32,
//                   height: 32,
//                   borderRadius: "8px",
//                 }}
//               >
//                 <Typography
//                   variant="h6"
//                   sx={{
//                     color: "white",
//                     fontWeight: 900,
//                     fontSize: "18px",
//                     mt: "-2px",
//                   }}
//                 >
//                   V
//                 </Typography>
//               </Box>
//               <Typography
//                 variant="h6"
//                 sx={{
//                   fontWeight: 800,
//                   color: "#111827",
//                   letterSpacing: "-0.5px",
//                 }}
//               >
//                 vairo
//               </Typography>
//             </Stack>

//             {/* Nav Links */}
//             <Stack
//               direction="row"
//               spacing={3}
//               sx={{ display: { xs: "none", md: "flex" } }}
//             >
//               {["Benefits", "Features"].map((item) => (
//                 <Button
//                   key={item}
//                   sx={{
//                     color: "#4B5563",
//                     textTransform: "none",
//                     fontWeight: 500,
//                   }}
//                 >
//                   {item}
//                 </Button>
//               ))}
//               <Button
//                 endIcon={<KeyboardArrowDownIcon />}
//                 sx={{
//                   color: "#4B5563",
//                   textTransform: "none",
//                   fontWeight: 500,
//                 }}
//               >
//                 Channels
//               </Button>
//               <Button
//                 sx={{
//                   color: "#4B5563",
//                   textTransform: "none",
//                   fontWeight: 500,
//                 }}
//               >
//                 Agent Templates
//               </Button>
//               <Button
//                 endIcon={<KeyboardArrowDownIcon />}
//                 sx={{
//                   color: "#4B5563",
//                   textTransform: "none",
//                   fontWeight: 500,
//                 }}
//               >
//                 Explore
//               </Button>
//               <Button
//                 sx={{
//                   color: "#4B5563",
//                   textTransform: "none",
//                   fontWeight: 500,
//                 }}
//               >
//                 Pricing
//               </Button>
//             </Stack>

//             {/* CTA Button */}
//             <Button
//               variant="contained"
//               sx={{
//                 bgcolor: "#111827",
//                 color: "white",
//                 textTransform: "none",
//                 borderRadius: "50px",
//                 px: 3,
//                 py: 1,
//                 fontWeight: 600,
//                 fontSize: "14px",
//                 "&:hover": { bgcolor: "#1F2937" },
//               }}
//             >
//               Get started now - It's free
//             </Button>
//           </Toolbar>
//         </Container>
//       </AppBar>

//       {/* --- Hero Section --- */}
//       <Container
//         maxWidth="lg"
//         sx={{ position: "relative", pt: 8, pb: 12, textAlign: "center" }}
//       >
//         {/* Abstract Background Shapes */}
//         <Box
//           sx={{
//             position: "absolute",
//             left: -40,
//             top: "10%",
//             display: { xs: "none", md: "block" },
//             zIndex: 1,
//           }}
//         >
//           <YellowCross />
//         </Box>
//         <Box
//           sx={{
//             position: "absolute",
//             left: "20%",
//             top: "5%",
//             display: { xs: "none", md: "block" },
//             zIndex: 1,
//           }}
//         >
//           <GreenPlus />
//         </Box>
//         <Box
//           sx={{
//             position: "absolute",
//             right: -40,
//             top: "15%",
//             display: { xs: "none", md: "block" },
//             zIndex: 1,
//           }}
//         >
//           <RightAbstractShape />
//         </Box>

//         {/* Hero Content */}
//         <Box
//           sx={{ position: "relative", zIndex: 2, maxW: "700px", mx: "auto" }}
//         >
//           <Typography
//             variant="h2"
//             sx={{
//               fontWeight: 800,
//               color: "#111827",
//               fontSize: { xs: "2.5rem", md: "4rem" },
//               lineHeight: 1.15,
//               letterSpacing: "-1.5px",
//               mb: 3,
//             }}
//           >
//             The Future of <br /> Customer Service
//           </Typography>
//           <Typography
//             variant="body1"
//             sx={{
//               color: "#4B5563",
//               fontSize: { xs: "16px", md: "18px" },
//               maxWidth: "540px",
//               mx: "auto",
//               lineHeight: 1.6,
//               mb: 4,
//             }}
//           >
//             Imagine a world where you can respond instantly to any customer,
//             anytime, anywhere.
//           </Typography>
//           <Button
//             variant="contained"
//             sx={{
//               bgcolor: "#111827",
//               color: "white",
//               textTransform: "none",
//               borderRadius: "50px",
//               px: 4,
//               py: 1.8,
//               fontWeight: 600,
//               fontSize: "16px",
//               boxShadow: "0px 10px 25px rgba(0,0,0,0.08)",
//               "&:hover": { bgcolor: "#1F2937" },
//             }}
//           >
//             Create your AI Agent
//           </Button>
//         </Box>
//       </Container>

//       {/* --- Agent Cards Section --- */}
//       <Container maxWidth="lg">
//         <Grid container spacing={4}>
//           {/* Card 1: Chat Agent */}
//           <Grid item xs={12} md={4}>
//             <Box
//               sx={{
//                 bgcolor: "#FCF7F2",
//                 borderRadius: "24px",
//                 p: 4,
//                 height: "100%",
//                 display: "flex",
//                 flexDirection: "column",
//                 boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
//               }}
//             >
//               <Typography
//                 variant="subtitle2"
//                 align="center"
//                 sx={{
//                   fontWeight: 700,
//                   color: "#374151",
//                   letterSpacing: "1px",
//                   mb: 3,
//                 }}
//               >
//                 CHAT AGENT
//               </Typography>

//               {/* Chat Window Mockup */}
//               <Box
//                 sx={{
//                   bgcolor: "white",
//                   borderRadius: "16px",
//                   boxShadow: "0px 10px 30px rgba(0,0,0,0.04)",
//                   overflow: "hidden",
//                   flexGrow: 1,
//                   display: "flex",
//                   flexDirection: "column",
//                   minHeight: "320px",
//                 }}
//               >
//                 {/* Chat Header */}
//                 <Box
//                   sx={{
//                     bgcolor: "#3B82F6",
//                     p: 1.5,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                     color: "white",
//                   }}
//                 >
//                   <Stack direction="row" alignItems="center" spacing={1}>
//                     <Avatar
//                       sx={{ width: 32, height: 32, bgcolor: "#93C5FD" }}
//                       src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"
//                     />
//                     <Box>
//                       <Typography
//                         sx={{
//                           fontSize: "12px",
//                           fontWeight: 700,
//                           lineHeight: 1.2,
//                         }}
//                       >
//                         Jane{" "}
//                         <Box
//                           component="span"
//                           sx={{
//                             fontSize: "9px",
//                             bgcolor: "rgba(255,255,255,0.2)",
//                             px: 0.5,
//                             borderRadius: "3px",
//                           }}
//                         >
//                           AI
//                         </Box>
//                       </Typography>
//                       <Typography sx={{ fontSize: "9px", opacity: 0.9 }}>
//                         Customer Support Agent
//                       </Typography>
//                     </Box>
//                   </Stack>
//                   <Typography
//                     sx={{ fontSize: "12px", cursor: "pointer", pr: 1 }}
//                   >
//                     ✕
//                   </Typography>
//                 </Box>

//                 {/* Chat Body */}
//                 <Box
//                   sx={{
//                     p: 2,
//                     flexGrow: 1,
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "space-between",
//                     gap: 2,
//                   }}
//                 >
//                   {/* Assistant Bubble */}
//                   <Box sx={{ alignSelf: "flex-start", maxWidth: "85%" }}>
//                     <Box
//                       sx={{
//                         bgcolor: "#F3F4F6",
//                         p: 1.5,
//                         borderRadius: "12px",
//                         borderTopLeftRadius: 2,
//                       }}
//                     >
//                       <Typography
//                         sx={{
//                           fontSize: "11px",
//                           color: "#1F2937",
//                           lineHeight: 1.4,
//                         }}
//                       >
//                         Hi, my name is Jane, your{" "}
//                         <strong>AI Support Agent</strong> ready to help you with
//                         forms. How can I help you today?
//                       </Typography>
//                     </Box>
//                     {/* Action Quick Replies */}
//                     <Stack spacing={1} sx={{ mt: 1 }}>
//                       <Chip
//                         label="Report an issue"
//                         variant="outlined"
//                         size="small"
//                         onClick={() => {}}
//                         sx={{
//                           fontSize: "10px",
//                           width: "fit-content",
//                           cursor: "pointer",
//                         }}
//                       />
//                       <Chip
//                         label="Provide feedback"
//                         variant="outlined"
//                         size="small"
//                         onClick={() => {}}
//                         sx={{
//                           fontSize: "10px",
//                           width: "fit-content",
//                           cursor: "pointer",
//                         }}
//                       />
//                     </Stack>
//                   </Box>

//                   {/* User Bubble */}
//                   <Box sx={{ alignSelf: "flex-end", maxWidth: "85%" }}>
//                     <Box
//                       sx={{
//                         bgcolor: "#FEF3C7",
//                         p: 1.5,
//                         borderRadius: "12px",
//                         borderTopRightRadius: 2,
//                       }}
//                     >
//                       <Typography sx={{ fontSize: "11px", color: "#1F2937" }}>
//                         I want to report an issue.
//                       </Typography>
//                     </Box>
//                   </Box>
//                 </Box>

//                 {/* Input Area Mockup */}
//                 <Box
//                   sx={{
//                     p: 1,
//                     borderTop: "1px solid #E5E7EB",
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                   }}
//                 >
//                   <Typography
//                     sx={{ fontSize: "11px", color: "#9CA3AF", pl: 1 }}
//                   >
//                     Message...
//                   </Typography>
//                   <Box
//                     sx={{
//                       width: 8,
//                       height: 8,
//                       bgcolor: "#3B82F6",
//                       borderRadius: "50%",
//                       mr: 1,
//                     }}
//                   />
//                 </Box>
//               </Box>
//             </Box>
//           </Grid>

//           {/* Card 2: Presentation Agent */}
//           <Grid item xs={12} md={4}>
//             <Box
//               sx={{
//                 bgcolor: "#F5F3FF",
//                 borderRadius: "24px",
//                 p: 4,
//                 height: "100%",
//                 display: "flex",
//                 flexDirection: "column",
//                 boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
//               }}
//             >
//               <Typography
//                 variant="subtitle2"
//                 align="center"
//                 sx={{
//                   fontWeight: 700,
//                   color: "#374151",
//                   letterSpacing: "1px",
//                   mb: 3,
//                 }}
//               >
//                 PRESENTATION AGENT
//               </Typography>

//               {/* Presentation Widget Mockup */}
//               <Box
//                 sx={{
//                   bgcolor: "#1E1B4B",
//                   borderRadius: "16px",
//                   boxShadow: "0px 10px 30px rgba(0,0,0,0.04)",
//                   overflow: "hidden",
//                   flexGrow: 1,
//                   display: "flex",
//                   flexDirection: "column",
//                   position: "relative",
//                   minHeight: "320px",
//                 }}
//               >
//                 {/* Slide Area */}
//                 <Box
//                   sx={{
//                     flexGrow: 1,
//                     p: 3,
//                     background:
//                       "linear-gradient(135deg, #311060 0%, #1E1B4B 100%)",
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "space-between",
//                     position: "relative",
//                   }}
//                 >
//                   <Stack
//                     direction="row"
//                     justifyContent="space-between"
//                     sx={{ opacity: 0.6 }}
//                   >
//                     <Typography
//                       sx={{
//                         fontSize: "9px",
//                         color: "white",
//                         fontWeight: 600,
//                         letterSpacing: "0.5px",
//                       }}
//                     >
//                       ACME CORP
//                     </Typography>
//                     <Typography
//                       sx={{ fontSize: "9px", color: "white", fontWeight: 600 }}
//                     >
//                       2025
//                     </Typography>
//                   </Stack>

//                   <Box sx={{ my: "auto" }}>
//                     <Typography
//                       variant="h4"
//                       sx={{
//                         color: "white",
//                         fontWeight: 700,
//                         fontSize: "28px",
//                         lineHeight: 1.2,
//                       }}
//                     >
//                       Sales <br />
//                       Proposal
//                     </Typography>
//                   </Box>

//                   {/* Circle Video Avatar with speaker bars */}
//                   <Box
//                     sx={{
//                       position: "absolute",
//                       bottom: 16,
//                       right: 16,
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <Box sx={{ position: "relative", width: 56, height: 56 }}>
//                       <Avatar
//                         src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100"
//                         sx={{
//                           width: 56,
//                           height: 56,
//                           border: "2px solid #8B5CF6",
//                         }}
//                       />
//                       {/* Simulated Audio Indicator Overlay */}
//                       <Box
//                         sx={{
//                           position: "absolute",
//                           bottom: -2,
//                           right: -2,
//                           bgcolor: "#3B82F6",
//                           borderRadius: "50%",
//                           p: "3px",
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                         }}
//                       >
//                         <MicIcon sx={{ color: "white", fontSize: 12 }} />
//                       </Box>
//                     </Box>
//                   </Box>
//                 </Box>

//                 {/* Presentation Controls */}
//                 <Box
//                   sx={{
//                     bgcolor: "#0F0E26",
//                     px: 1.5,
//                     py: 1,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                     color: "white",
//                   }}
//                 >
//                   <Stack direction="row" alignItems="center" spacing={0.5}>
//                     <IconButton size="small" sx={{ color: "white" }}>
//                       <PlayArrowIcon fontSize="small" />
//                     </IconButton>
//                     <Stack
//                       direction="row"
//                       alignItems="center"
//                       spacing={0.2}
//                       sx={{ opacity: 0.8 }}
//                     >
//                       <IconButton size="small" sx={{ color: "white", p: 0.2 }}>
//                         <KeyboardArrowLeftIcon sx={{ fontSize: 16 }} />
//                       </IconButton>
//                       <Typography sx={{ fontSize: "10px" }}>1/15</Typography>
//                       <IconButton size="small" sx={{ color: "white", p: 0.2 }}>
//                         <KeyboardArrowRightIcon sx={{ fontSize: 16 }} />
//                       </IconButton>
//                     </Stack>
//                   </Stack>

//                   {/* Ask Question Interactive Button */}
//                   <Button
//                     variant="contained"
//                     size="small"
//                     startIcon={<MicIcon sx={{ fontSize: 12 }} />}
//                     sx={{
//                       bgcolor: "#2563EB",
//                       textTransform: "none",
//                       borderRadius: "20px",
//                       fontSize: "9px",
//                       py: 0.4,
//                       px: 1.2,
//                       fontWeight: 600,
//                       "&:hover": { bgcolor: "#1D4ED8" },
//                     }}
//                   >
//                     Ask Question
//                   </Button>

//                   <Stack direction="row" spacing={0.5}>
//                     <IconButton size="small" sx={{ color: "white" }}>
//                       <ListIcon sx={{ fontSize: 16 }} />
//                     </IconButton>
//                     <IconButton size="small" sx={{ color: "white" }}>
//                       <FullscreenIcon sx={{ fontSize: 16 }} />
//                     </IconButton>
//                   </Stack>
//                 </Box>
//               </Box>
//             </Box>
//           </Grid>

//           {/* Card 3: WhatsApp Agent */}
//           <Grid item xs={12} md={4}>
//             <Box
//               sx={{
//                 bgcolor: "#ECFDF5",
//                 borderRadius: "24px",
//                 p: 4,
//                 height: "100%",
//                 display: "flex",
//                 flexDirection: "column",
//                 boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
//               }}
//             >
//               <Typography
//                 variant="subtitle2"
//                 align="center"
//                 sx={{
//                   fontWeight: 700,
//                   color: "#374151",
//                   letterSpacing: "1px",
//                   mb: 3,
//                 }}
//               >
//                 WHATSAPP AGENT
//               </Typography>

//               {/* WhatsApp Interface Mockup inside Phone Frame */}
//               <Box
//                 sx={{
//                   bgcolor: "#E5E7EB",
//                   borderRadius: "24px",
//                   p: 1,
//                   boxShadow: "0px 10px 30px rgba(0,0,0,0.06)",
//                   flexGrow: 1,
//                   display: "flex",
//                   flexDirection: "column",
//                   minHeight: "320px",
//                 }}
//               >
//                 <Box
//                   sx={{
//                     bgcolor: "#F3F4F6",
//                     borderRadius: "18px",
//                     overflow: "hidden",
//                     display: "flex",
//                     flexDirection: "column",
//                     height: "100%",
//                     bgcolor: "#EFEAE2", // WhatsApp typical dynamic beige-grey backdrops
//                   }}
//                 >
//                   {/* WhatsApp Header */}
//                   <Box
//                     sx={{
//                       bgcolor: "#075E54",
//                       p: 1.2,
//                       color: "white",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <Stack direction="row" alignItems="center" spacing={0.8}>
//                       <Typography sx={{ fontSize: "10px" }}>⟨</Typography>
//                       <Avatar
//                         sx={{ width: 24, height: 24 }}
//                         src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"
//                       />
//                       <Box>
//                         <Stack
//                           direction="row"
//                           alignItems="center"
//                           spacing={0.3}
//                         >
//                           <Typography
//                             sx={{
//                               fontSize: "10px",
//                               fontWeight: 700,
//                               lineHeight: 1,
//                             }}
//                           >
//                             Dante: AI Agent
//                           </Typography>
//                           <CheckCircleIcon
//                             sx={{ fontSize: 10, color: "#34D399" }}
//                           />
//                         </Stack>
//                         <Typography
//                           sx={{ fontSize: "7px", opacity: 0.8, lineHeight: 1 }}
//                         >
//                           typing...
//                         </Typography>
//                       </Box>
//                     </Stack>
//                   </Box>

//                   {/* Today Divider */}
//                   <Box sx={{ textAlign: "center", my: 1 }}>
//                     <Typography
//                       sx={{
//                         fontSize: "8px",
//                         bgcolor: "white",
//                         px: 1,
//                         py: 0.2,
//                         borderRadius: "4px",
//                         display: "inline-block",
//                         color: "#6B7280",
//                         boxShadow: "0 1px 1px rgba(0,0,0,0.05)",
//                       }}
//                     >
//                       Today
//                     </Typography>
//                   </Box>

//                   {/* WhatsApp Conversation */}
//                   <Box
//                     sx={{
//                       p: 1.5,
//                       flexGrow: 1,
//                       display: "flex",
//                       flexDirection: "column",
//                       gap: 1,
//                     }}
//                   >
//                     {/* Bot Bubble */}
//                     <Box sx={{ alignSelf: "flex-start", maxWidth: "85%" }}>
//                       <Box
//                         sx={{
//                           bgcolor: "white",
//                           p: 1,
//                           borderRadius: "8px",
//                           borderTopLeftRadius: 0,
//                           boxShadow: "0 1px 1px rgba(0,0,0,0.08)",
//                         }}
//                       >
//                         <Typography
//                           sx={{
//                             fontSize: "9px",
//                             color: "#1F2937",
//                             lineHeight: 1.4,
//                           }}
//                         >
//                           Hi, my name is Dante, your{" "}
//                           <strong>Event Organizer Agent</strong> ready to help
//                           you organize the perfect event. How can I help you
//                           today?
//                         </Typography>
//                       </Box>
//                     </Box>

//                     {/* User Bubble */}
//                     <Box sx={{ alignSelf: "flex-end", maxWidth: "85%" }}>
//                       <Box
//                         sx={{
//                           bgcolor: "#DCF8C6",
//                           p: 1,
//                           borderRadius: "8px",
//                           borderTopRightRadius: 0,
//                           boxShadow: "0 1px 1px rgba(0,0,0,0.08)",
//                         }}
//                       >
//                         <Typography
//                           sx={{
//                             fontSize: "9px",
//                             color: "#1F2937",
//                             lineHeight: 1.4,
//                           }}
//                         >
//                           I'm looking for a rooftop venue for my friend's
//                           birthday party.
//                         </Typography>
//                       </Box>
//                     </Box>

//                     {/* Bot Bubble 2 */}
//                     <Box sx={{ alignSelf: "flex-start", maxWidth: "85%" }}>
//                       <Box
//                         sx={{
//                           bgcolor: "white",
//                           p: 1,
//                           borderRadius: "8px",
//                           borderTopLeftRadius: 0,
//                           boxShadow: "0 1px 1px rgba(0,0,0,0.08)",
//                         }}
//                       >
//                         <Typography
//                           sx={{
//                             fontSize: "9px",
//                             color: "#1F2937",
//                             lineHeight: 1.4,
//                           }}
//                         >
//                           I found some options:
//                           <br />
//                           📍 <strong>Skyview Lounge</strong> - Elegant with
//                           city...
//                         </Typography>
//                       </Box>
//                     </Box>
//                   </Box>
//                 </Box>
//               </Box>
//             </Box>
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   );
// }

// import React from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Box,
//   Container,
//   Grid,
//   Stack,
//   Avatar,
//   Chip,
//   IconButton,
// } from "@mui/material";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// import MicIcon from "@mui/icons-material/Mic";
// import ListIcon from "@mui/icons-material/List";
// import FullscreenIcon from "@mui/icons-material/Fullscreen";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// // --- Abstract SVG Shapes ---

// const YellowCross = () => (
//   <svg
//     width="180"
//     height="180"
//     viewBox="0 0 150 200"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//     style={{ opacity: 0.9 }}
//   >
//     <g transform="rotate(-15, 75, 100)">
//       <rect x="55" y="10" width="40" height="180" rx="20" fill="#FBBF24" />
//       <rect x="10" y="80" width="130" height="40" rx="20" fill="#FBBF24" />
//       <circle cx="75" cy="100" r="22" fill="white" />
//     </g>
//   </svg>
// );

// const GreenPlus = () => (
//   <svg
//     width="50"
//     height="50"
//     viewBox="0 0 60 60"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//     style={{ opacity: 0.8 }}
//   >
//     <rect x="24" y="5" width="12" height="50" rx="6" fill="#6EE7B7" />
//     <rect x="5" y="24" width="50" height="12" rx="6" fill="#6EE7B7" />
//   </svg>
// );

// const RightAbstractShape = () => (
//   <svg
//     width="240"
//     height="240"
//     viewBox="0 0 240 240"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     {/* Cyan Triangle */}
//     <polygon points="100,220 220,220 220,100" fill="#22D3EE" opacity="0.85" />
//     {/* Magenta stylized symbol */}
//     <g transform="rotate(-30, 110, 110)">
//       <rect x="90" y="20" width="36" height="160" rx="18" fill="#EC4899" />
//       <rect x="30" y="70" width="140" height="36" rx="18" fill="#EC4899" />
//     </g>
//   </svg>
// );

// export default function SupportBlock() {
//   return (
//     <Box
//       sx={{
//         bgcolor: "#F9FAFB",
//         minHeight: "100vh",
//         fontFamily: "Inter, sans-serif",
//         pb: 10,
//       }}
//     >
//       {/* --- Navbar --- */}
//       <AppBar
//         position="static"
//         color="transparent"
//         elevation={0}
//         sx={{ py: 1 }}
//       >
//         <Container maxWidth="lg">
//           <Toolbar sx={{ justifyContent: "space-between", px: { xs: 0 } }}>
//             {/* Logo */}
//             <Stack direction="row" alignItems="center" spacing={1}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   bgcolor: "#111827",
//                   width: 32,
//                   height: 32,
//                   borderRadius: "8px",
//                 }}
//               >
//                 <Typography
//                   variant="h6"
//                   sx={{
//                     color: "white",
//                     fontWeight: 900,
//                     fontSize: "18px",
//                     mt: "-2px",
//                   }}
//                 >
//                   V
//                 </Typography>
//               </Box>
//               <Typography
//                 variant="h6"
//                 sx={{
//                   fontWeight: 800,
//                   color: "#111827",
//                   letterSpacing: "-0.5px",
//                 }}
//               >
//                 vairo
//               </Typography>
//             </Stack>

//             {/* Nav Links */}
//             <Stack
//               direction="row"
//               spacing={3}
//               sx={{ display: { xs: "none", md: "flex" } }}
//             >
//               {["Benefits", "Features"].map((item) => (
//                 <Button
//                   key={item}
//                   sx={{
//                     color: "#4B5563",
//                     textTransform: "none",
//                     fontWeight: 500,
//                   }}
//                 >
//                   {item}
//                 </Button>
//               ))}
//               <Button
//                 endIcon={<KeyboardArrowDownIcon />}
//                 sx={{
//                   color: "#4B5563",
//                   textTransform: "none",
//                   fontWeight: 500,
//                 }}
//               >
//                 Channels
//               </Button>
//               <Button
//                 sx={{
//                   color: "#4B5563",
//                   textTransform: "none",
//                   fontWeight: 500,
//                 }}
//               >
//                 Agent Templates
//               </Button>
//               <Button
//                 endIcon={<KeyboardArrowDownIcon />}
//                 sx={{
//                   color: "#4B5563",
//                   textTransform: "none",
//                   fontWeight: 500,
//                 }}
//               >
//                 Explore
//               </Button>
//               <Button
//                 sx={{
//                   color: "#4B5563",
//                   textTransform: "none",
//                   fontWeight: 500,
//                 }}
//               >
//                 Pricing
//               </Button>
//             </Stack>

//             {/* CTA Button */}
//             <Button
//               variant="contained"
//               sx={{
//                 bgcolor: "#111827",
//                 color: "white",
//                 textTransform: "none",
//                 borderRadius: "50px",
//                 px: 3,
//                 py: 1,
//                 fontWeight: 600,
//                 fontSize: "14px",
//                 "&:hover": { bgcolor: "#1F2937" },
//               }}
//             >
//               Get started now - It's free
//             </Button>
//           </Toolbar>
//         </Container>
//       </AppBar>

//       {/* --- Hero Section --- */}
//       <Container
//         maxWidth="lg"
//         sx={{ position: "relative", pt: 8, pb: 12, textAlign: "center" }}
//       >
//         {/* Abstract Background Shapes */}
//         <Box
//           sx={{
//             position: "absolute",
//             left: -40,
//             top: "10%",
//             display: { xs: "none", md: "block" },
//             zIndex: 1,
//           }}
//         >
//           <YellowCross />
//         </Box>
//         <Box
//           sx={{
//             position: "absolute",
//             left: "20%",
//             top: "5%",
//             display: { xs: "none", md: "block" },
//             zIndex: 1,
//           }}
//         >
//           <GreenPlus />
//         </Box>
//         <Box
//           sx={{
//             position: "absolute",
//             right: -40,
//             top: "15%",
//             display: { xs: "none", md: "block" },
//             zIndex: 1,
//           }}
//         >
//           <RightAbstractShape />
//         </Box>

//         {/* Hero Content */}
//         <Box
//           sx={{ position: "relative", zIndex: 2, maxW: "700px", mx: "auto" }}
//         >
//           <Typography
//             variant="h2"
//             sx={{
//               fontWeight: 800,
//               color: "#111827",
//               fontSize: { xs: "2.5rem", md: "4rem" },
//               lineHeight: 1.15,
//               letterSpacing: "-1.5px",
//               mb: 3,
//             }}
//           >
//             The Future of <br /> Customer Service
//           </Typography>
//           <Typography
//             variant="body1"
//             sx={{
//               color: "#4B5563",
//               fontSize: { xs: "16px", md: "18px" },
//               maxWidth: "540px",
//               mx: "auto",
//               lineHeight: 1.6,
//               mb: 4,
//             }}
//           >
//             Imagine a world where you can respond instantly to any customer,
//             anytime, anywhere.
//           </Typography>
//           <Button
//             variant="contained"
//             sx={{
//               bgcolor: "#111827",
//               color: "white",
//               textTransform: "none",
//               borderRadius: "50px",
//               px: 4,
//               py: 1.8,
//               fontWeight: 600,
//               fontSize: "16px",
//               boxShadow: "0px 10px 25px rgba(0,0,0,0.08)",
//               "&:hover": { bgcolor: "#1F2937" },
//             }}
//           >
//             Create your AI Agent
//           </Button>
//         </Box>
//       </Container>

//       {/* --- Agent Cards Section --- */}
//       <Container maxWidth="lg">
//         <Grid container spacing={4}>
//           {/* Card 1: Chat Agent */}
//           <Grid item xs={12} md={4}>
//             <Box
//               sx={{
//                 bgcolor: "#FCF7F2",
//                 borderRadius: "24px",
//                 p: 4,
//                 height: "100%",
//                 display: "flex",
//                 flexDirection: "column",
//                 boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
//               }}
//             >
//               <Typography
//                 variant="subtitle2"
//                 align="center"
//                 sx={{
//                   fontWeight: 700,
//                   color: "#374151",
//                   letterSpacing: "1px",
//                   mb: 3,
//                 }}
//               >
//                 CHAT AGENT
//               </Typography>

//               {/* Chat Window Mockup */}
//               <Box
//                 sx={{
//                   bgcolor: "white",
//                   borderRadius: "16px",
//                   boxShadow: "0px 10px 30px rgba(0,0,0,0.04)",
//                   overflow: "hidden",
//                   flexGrow: 1,
//                   display: "flex",
//                   flexDirection: "column",
//                   minHeight: "320px",
//                 }}
//               >
//                 {/* Chat Header */}
//                 <Box
//                   sx={{
//                     bgcolor: "#3B82F6",
//                     p: 1.5,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                     color: "white",
//                   }}
//                 >
//                   <Stack direction="row" alignItems="center" spacing={1}>
//                     <Avatar
//                       sx={{ width: 32, height: 32, bgcolor: "#93C5FD" }}
//                       src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"
//                     />
//                     <Box>
//                       <Typography
//                         sx={{
//                           fontSize: "12px",
//                           fontWeight: 700,
//                           lineHeight: 1.2,
//                         }}
//                       >
//                         Jane{" "}
//                         <Box
//                           component="span"
//                           sx={{
//                             fontSize: "9px",
//                             bgcolor: "rgba(255,255,255,0.2)",
//                             px: 0.5,
//                             borderRadius: "3px",
//                           }}
//                         >
//                           AI
//                         </Box>
//                       </Typography>
//                       <Typography sx={{ fontSize: "9px", opacity: 0.9 }}>
//                         Customer Support Agent
//                       </Typography>
//                     </Box>
//                   </Stack>
//                   <Typography
//                     sx={{ fontSize: "12px", cursor: "pointer", pr: 1 }}
//                   >
//                     ✕
//                   </Typography>
//                 </Box>

//                 {/* Chat Body */}
//                 <Box
//                   sx={{
//                     p: 2,
//                     flexGrow: 1,
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "space-between",
//                     gap: 2,
//                   }}
//                 >
//                   {/* Assistant Bubble */}
//                   <Box sx={{ alignSelf: "flex-start", maxWidth: "85%" }}>
//                     <Box
//                       sx={{
//                         bgcolor: "#F3F4F6",
//                         p: 1.5,
//                         borderRadius: "12px",
//                         borderTopLeftRadius: 2,
//                       }}
//                     >
//                       <Typography
//                         sx={{
//                           fontSize: "11px",
//                           color: "#1F2937",
//                           lineHeight: 1.4,
//                         }}
//                       >
//                         Hi, my name is Jane, your{" "}
//                         <strong>AI Support Agent</strong> ready to help you with
//                         forms. How can I help you today?
//                       </Typography>
//                     </Box>
//                     {/* Action Quick Replies */}
//                     <Stack spacing={1} sx={{ mt: 1 }}>
//                       <Chip
//                         label="Report an issue"
//                         variant="outlined"
//                         size="small"
//                         onClick={() => {}}
//                         sx={{
//                           fontSize: "10px",
//                           width: "fit-content",
//                           cursor: "pointer",
//                         }}
//                       />
//                       <Chip
//                         label="Provide feedback"
//                         variant="outlined"
//                         size="small"
//                         onClick={() => {}}
//                         sx={{
//                           fontSize: "10px",
//                           width: "fit-content",
//                           cursor: "pointer",
//                         }}
//                       />
//                     </Stack>
//                   </Box>

//                   {/* User Bubble */}
//                   <Box sx={{ alignSelf: "flex-end", maxWidth: "85%" }}>
//                     <Box
//                       sx={{
//                         bgcolor: "#FEF3C7",
//                         p: 1.5,
//                         borderRadius: "12px",
//                         borderTopRightRadius: 2,
//                       }}
//                     >
//                       <Typography sx={{ fontSize: "11px", color: "#1F2937" }}>
//                         I want to report an issue.
//                       </Typography>
//                     </Box>
//                   </Box>
//                 </Box>

//                 {/* Input Area Mockup */}
//                 <Box
//                   sx={{
//                     p: 1,
//                     borderTop: "1px solid #E5E7EB",
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                   }}
//                 >
//                   <Typography
//                     sx={{ fontSize: "11px", color: "#9CA3AF", pl: 1 }}
//                   >
//                     Message...
//                   </Typography>
//                   <Box
//                     sx={{
//                       width: 8,
//                       height: 8,
//                       bgcolor: "#3B82F6",
//                       borderRadius: "50%",
//                       mr: 1,
//                     }}
//                   />
//                 </Box>
//               </Box>
//             </Box>
//           </Grid>

//           {/* Card 2: Presentation Agent */}
//           <Grid item xs={12} md={4}>
//             <Box
//               sx={{
//                 bgcolor: "#F5F3FF",
//                 borderRadius: "24px",
//                 p: 4,
//                 height: "100%",
//                 display: "flex",
//                 flexDirection: "column",
//                 boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
//               }}
//             >
//               <Typography
//                 variant="subtitle2"
//                 align="center"
//                 sx={{
//                   fontWeight: 700,
//                   color: "#374151",
//                   letterSpacing: "1px",
//                   mb: 3,
//                 }}
//               >
//                 PRESENTATION AGENT
//               </Typography>

//               {/* Presentation Widget Mockup */}
//               <Box
//                 sx={{
//                   bgcolor: "#1E1B4B",
//                   borderRadius: "16px",
//                   boxShadow: "0px 10px 30px rgba(0,0,0,0.04)",
//                   overflow: "hidden",
//                   flexGrow: 1,
//                   display: "flex",
//                   flexDirection: "column",
//                   position: "relative",
//                   minHeight: "320px",
//                 }}
//               >
//                 {/* Slide Area */}
//                 <Box
//                   sx={{
//                     flexGrow: 1,
//                     p: 3,
//                     background:
//                       "linear-gradient(135deg, #311060 0%, #1E1B4B 100%)",
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "space-between",
//                     position: "relative",
//                   }}
//                 >
//                   <Stack
//                     direction="row"
//                     justifyContent="space-between"
//                     sx={{ opacity: 0.6 }}
//                   >
//                     <Typography
//                       sx={{
//                         fontSize: "9px",
//                         color: "white",
//                         fontWeight: 600,
//                         letterSpacing: "0.5px",
//                       }}
//                     >
//                       ACME CORP
//                     </Typography>
//                     <Typography
//                       sx={{ fontSize: "9px", color: "white", fontWeight: 600 }}
//                     >
//                       2025
//                     </Typography>
//                   </Stack>

//                   <Box sx={{ my: "auto" }}>
//                     <Typography
//                       variant="h4"
//                       sx={{
//                         color: "white",
//                         fontWeight: 700,
//                         fontSize: "28px",
//                         lineHeight: 1.2,
//                       }}
//                     >
//                       Sales <br />
//                       Proposal
//                     </Typography>
//                   </Box>

//                   {/* Circle Video Avatar with speaker bars */}
//                   <Box
//                     sx={{
//                       position: "absolute",
//                       bottom: 16,
//                       right: 16,
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <Box sx={{ position: "relative", width: 56, height: 56 }}>
//                       <Avatar
//                         src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100"
//                         sx={{
//                           width: 56,
//                           height: 56,
//                           border: "2px solid #8B5CF6",
//                         }}
//                       />
//                       {/* Simulated Audio Indicator Overlay */}
//                       <Box
//                         sx={{
//                           position: "absolute",
//                           bottom: -2,
//                           right: -2,
//                           bgcolor: "#3B82F6",
//                           borderRadius: "50%",
//                           p: "3px",
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                         }}
//                       >
//                         <MicIcon sx={{ color: "white", fontSize: 12 }} />
//                       </Box>
//                     </Box>
//                   </Box>
//                 </Box>

//                 {/* Presentation Controls */}
//                 <Box
//                   sx={{
//                     bgcolor: "#0F0E26",
//                     px: 1.5,
//                     py: 1,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                     color: "white",
//                   }}
//                 >
//                   <Stack direction="row" alignItems="center" spacing={0.5}>
//                     <IconButton size="small" sx={{ color: "white" }}>
//                       <PlayArrowIcon fontSize="small" />
//                     </IconButton>
//                     <Stack
//                       direction="row"
//                       alignItems="center"
//                       spacing={0.2}
//                       sx={{ opacity: 0.8 }}
//                     >
//                       <IconButton size="small" sx={{ color: "white", p: 0.2 }}>
//                         <KeyboardArrowLeftIcon sx={{ fontSize: 16 }} />
//                       </IconButton>
//                       <Typography sx={{ fontSize: "10px" }}>1/15</Typography>
//                       <IconButton size="small" sx={{ color: "white", p: 0.2 }}>
//                         <KeyboardArrowRightIcon sx={{ fontSize: 16 }} />
//                       </IconButton>
//                     </Stack>
//                   </Stack>

//                   {/* Ask Question Interactive Button */}
//                   <Button
//                     variant="contained"
//                     size="small"
//                     startIcon={<MicIcon sx={{ fontSize: 12 }} />}
//                     sx={{
//                       bgcolor: "#2563EB",
//                       textTransform: "none",
//                       borderRadius: "20px",
//                       fontSize: "9px",
//                       py: 0.4,
//                       px: 1.2,
//                       fontWeight: 600,
//                       "&:hover": { bgcolor: "#1D4ED8" },
//                     }}
//                   >
//                     Ask Question
//                   </Button>

//                   <Stack direction="row" spacing={0.5}>
//                     <IconButton size="small" sx={{ color: "white" }}>
//                       <ListIcon sx={{ fontSize: 16 }} />
//                     </IconButton>
//                     <IconButton size="small" sx={{ color: "white" }}>
//                       <FullscreenIcon sx={{ fontSize: 16 }} />
//                     </IconButton>
//                   </Stack>
//                 </Box>
//               </Box>
//             </Box>
//           </Grid>

//           {/* Card 3: WhatsApp Agent */}
//           <Grid item xs={12} md={4}>
//             <Box
//               sx={{
//                 bgcolor: "#ECFDF5",
//                 borderRadius: "24px",
//                 p: 4,
//                 height: "100%",
//                 display: "flex",
//                 flexDirection: "column",
//                 boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
//               }}
//             >
//               <Typography
//                 variant="subtitle2"
//                 align="center"
//                 sx={{
//                   fontWeight: 700,
//                   color: "#374151",
//                   letterSpacing: "1px",
//                   mb: 3,
//                 }}
//               >
//                 WHATSAPP AGENT
//               </Typography>

//               {/* WhatsApp Interface Mockup inside Phone Frame */}
//               <Box
//                 sx={{
//                   bgcolor: "#E5E7EB",
//                   borderRadius: "24px",
//                   p: 1,
//                   boxShadow: "0px 10px 30px rgba(0,0,0,0.06)",
//                   flexGrow: 1,
//                   display: "flex",
//                   flexDirection: "column",
//                   minHeight: "320px",
//                 }}
//               >
//                 <Box
//                   sx={{
//                     bgcolor: "#F3F4F6",
//                     borderRadius: "18px",
//                     overflow: "hidden",
//                     display: "flex",
//                     flexDirection: "column",
//                     height: "100%",
//                     bgcolor: "#EFEAE2", // WhatsApp typical dynamic beige-grey backdrops
//                   }}
//                 >
//                   {/* WhatsApp Header */}
//                   <Box
//                     sx={{
//                       bgcolor: "#075E54",
//                       p: 1.2,
//                       color: "white",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <Stack direction="row" alignItems="center" spacing={0.8}>
//                       <Typography sx={{ fontSize: "10px" }}>⟨</Typography>
//                       <Avatar
//                         sx={{ width: 24, height: 24 }}
//                         src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"
//                       />
//                       <Box>
//                         <Stack
//                           direction="row"
//                           alignItems="center"
//                           spacing={0.3}
//                         >
//                           <Typography
//                             sx={{
//                               fontSize: "10px",
//                               fontWeight: 700,
//                               lineHeight: 1,
//                             }}
//                           >
//                             Dante: AI Agent
//                           </Typography>
//                           <CheckCircleIcon
//                             sx={{ fontSize: 10, color: "#34D399" }}
//                           />
//                         </Stack>
//                         <Typography
//                           sx={{ fontSize: "7px", opacity: 0.8, lineHeight: 1 }}
//                         >
//                           typing...
//                         </Typography>
//                       </Box>
//                     </Stack>
//                   </Box>

//                   {/* Today Divider */}
//                   <Box sx={{ textAlign: "center", my: 1 }}>
//                     <Typography
//                       sx={{
//                         fontSize: "8px",
//                         bgcolor: "white",
//                         px: 1,
//                         py: 0.2,
//                         borderRadius: "4px",
//                         display: "inline-block",
//                         color: "#6B7280",
//                         boxShadow: "0 1px 1px rgba(0,0,0,0.05)",
//                       }}
//                     >
//                       Today
//                     </Typography>
//                   </Box>

//                   {/* WhatsApp Conversation */}
//                   <Box
//                     sx={{
//                       p: 1.5,
//                       flexGrow: 1,
//                       display: "flex",
//                       flexDirection: "column",
//                       gap: 1,
//                     }}
//                   >
//                     {/* Bot Bubble */}
//                     <Box sx={{ alignSelf: "flex-start", maxWidth: "85%" }}>
//                       <Box
//                         sx={{
//                           bgcolor: "white",
//                           p: 1,
//                           borderRadius: "8px",
//                           borderTopLeftRadius: 0,
//                           boxShadow: "0 1px 1px rgba(0,0,0,0.08)",
//                         }}
//                       >
//                         <Typography
//                           sx={{
//                             fontSize: "9px",
//                             color: "#1F2937",
//                             lineHeight: 1.4,
//                           }}
//                         >
//                           Hi, my name is Dante, your{" "}
//                           <strong>Event Organizer Agent</strong> ready to help
//                           you organize the perfect event. How can I help you
//                           today?
//                         </Typography>
//                       </Box>
//                     </Box>

//                     {/* User Bubble */}
//                     <Box sx={{ alignSelf: "flex-end", maxWidth: "85%" }}>
//                       <Box
//                         sx={{
//                           bgcolor: "#DCF8C6",
//                           p: 1,
//                           borderRadius: "8px",
//                           borderTopRightRadius: 0,
//                           boxShadow: "0 1px 1px rgba(0,0,0,0.08)",
//                         }}
//                       >
//                         <Typography
//                           sx={{
//                             fontSize: "9px",
//                             color: "#1F2937",
//                             lineHeight: 1.4,
//                           }}
//                         >
//                           I'm looking for a rooftop venue for my friend's
//                           birthday party.
//                         </Typography>
//                       </Box>
//                     </Box>

//                     {/* Bot Bubble 2 */}
//                     <Box sx={{ alignSelf: "flex-start", maxWidth: "85%" }}>
//                       <Box
//                         sx={{
//                           bgcolor: "white",
//                           p: 1,
//                           borderRadius: "8px",
//                           borderTopLeftRadius: 0,
//                           boxShadow: "0 1px 1px rgba(0,0,0,0.08)",
//                         }}
//                       >
//                         <Typography
//                           sx={{
//                             fontSize: "9px",
//                             color: "#1F2937",
//                             lineHeight: 1.4,
//                           }}
//                         >
//                           I found some options:
//                           <br />
//                           📍 <strong>Skyview Lounge</strong> - Elegant with
//                           city...
//                         </Typography>
//                       </Box>
//                     </Box>
//                   </Box>
//                 </Box>
//               </Box>
//             </Box>
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   );
// }
