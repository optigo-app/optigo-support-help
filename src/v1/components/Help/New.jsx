import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";
import ForumIcon from "@mui/icons-material/Forum";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";

// --- Section 1: Custom SVGs for Light Grid Cards ---

const CallLogsIcon = () => (
  <Box
    sx={{
      width: 80,
      height: 80,
      borderRadius: "20px",
      background: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      mb: 3,
      boxShadow: "0 8px 16px rgba(59, 130, 246, 0.08)",
    }}
  >
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
        stroke="#2563EB"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </Box>
);

const TicketsIcon = () => (
  <Box
    sx={{
      width: 80,
      height: 80,
      borderRadius: "20px",
      background: "linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      mb: 3,
      boxShadow: "0 8px 16px rgba(249, 115, 22, 0.08)",
    }}
  >
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 9a3 3 0 010 6v2a2 2 0 002 2h16a2 2 0 002-2v-2a3 3 0 010-6V7a2 2 0 00-2-2H4a2 2 0 00-2 2v2z"
        stroke="#EA580C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 5v14M15 5v14"
        stroke="#EA580C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="2 2"
      />
    </svg>
  </Box>
);

const OrdersIcon = () => (
  <Box
    sx={{
      width: 80,
      height: 80,
      borderRadius: "20px",
      background: "linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      mb: 3,
      boxShadow: "0 8px 16px rgba(16, 185, 129, 0.08)",
    }}
  >
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"
        stroke="#10B981"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"
        stroke="#10B981"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </Box>
);

const TrainingsIcon = () => (
  <Box
    sx={{
      width: 80,
      height: 80,
      borderRadius: "20px",
      background: "linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      mb: 3,
      boxShadow: "0 8px 16px rgba(139, 92, 246, 0.08)",
    }}
  >
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
        stroke="#8B5CF6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </Box>
);

export default function ViDashboardSections() {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#FFFFFF",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* ========================================================
          SECTION 1: "make life easier with Optigo!" (LIGHT GRID)
         ======================================================== */}
      <Box
        sx={{
          bgcolor: "#F8FAFC",
          py: 8,
          px: { xs: 2, md: 0 },
          color: "#0F172A",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            align="center"
            sx={{
              fontWeight: 800,
              mb: 6,
              fontSize: { xs: "2rem", md: "2.5rem" },
              letterSpacing: "-1px",
              color: "#0F172A",
            }}
          >
            make life easier with{" "}
            <Box
              component="span"
              sx={{
                background: "linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 900,
              }}
            >
              Optigo!
            </Box>
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            {/* Card 1: Call Logs */}
            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{
                  bgcolor: "#FFFFFF",
                  borderRadius: "24px",
                  p: 4,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  border: "1px solid rgba(226, 232, 240, 0.8)",
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.02)",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.06)",
                    borderColor: "#3B82F6",
                  },
                }}
              >
                <CallLogsIcon />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                    mb: 1.5,
                    fontSize: "18px",
                    lineHeight: 1.2,
                    color: "#1E293B",
                  }}
                >
                  easy callback &<br />
                  requests
                </Typography>
                <Typography
                  sx={{
                    color: "#64748B",
                    fontSize: "13px",
                    px: 1,
                    lineHeight: 1.5,
                  }}
                >
                  Need help? Leave a callback request and our support team will connect with you.
                </Typography>
              </Box>
            </Grid>

            {/* Card 2: Tickets */}
            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{
                  bgcolor: "#FFFFFF",
                  borderRadius: "24px",
                  p: 4,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  border: "1px solid rgba(226, 232, 240, 0.8)",
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.02)",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.06)",
                    borderColor: "#F97316",
                  },
                }}
              >
                <TicketsIcon />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                    mb: 1.5,
                    fontSize: "18px",
                    lineHeight: 1.2,
                    color: "#1E293B",
                  }}
                >
                  simple ticket
                  <br />
                  tracking
                </Typography>
                <Typography
                  sx={{
                    color: "#64748B",
                    fontSize: "13px",
                    px: 1,
                    lineHeight: 1.5,
                  }}
                >
                  Create, view, and manage your service tickets in one central dashboard.
                </Typography>
              </Box>
            </Grid>

            {/* Card 3: Orders */}
            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{
                  bgcolor: "#FFFFFF",
                  borderRadius: "24px",
                  p: 4,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  border: "1px solid rgba(226, 232, 240, 0.8)",
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.02)",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.06)",
                    borderColor: "#10B981",
                  },
                }}
              >
                <OrdersIcon />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                    mb: 1.5,
                    fontSize: "18px",
                    lineHeight: 1.2,
                    color: "#1E293B",
                  }}
                >
                  real-time order
                  <br />
                  delivery
                </Typography>
                <Typography
                  sx={{
                    color: "#64748B",
                    fontSize: "13px",
                    px: 1,
                    lineHeight: 1.5,
                  }}
                >
                  Track your orders and delivery status instantly without any guesswork.
                </Typography>
              </Box>
            </Grid>

            {/* Card 4: Trainings */}
            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{
                  bgcolor: "#FFFFFF",
                  borderRadius: "24px",
                  p: 4,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  border: "1px solid rgba(226, 232, 240, 0.8)",
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.02)",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.06)",
                    borderColor: "#8B5CF6",
                  },
                }}
              >
                <TrainingsIcon />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                    mb: 1.5,
                    fontSize: "18px",
                    lineHeight: 1.2,
                    color: "#1E293B",
                  }}
                >
                  comprehensive
                  <br />
                  trainings
                </Typography>
                <Typography
                  sx={{
                    color: "#64748B",
                    fontSize: "13px",
                    px: 1,
                    lineHeight: 1.5,
                  }}
                >
                  Stay up-to-date with your training modules and onboarding progress.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ========================================================
          SECTION 2: "Explore Optigo Carely" (LIGHT MODE BACKGROUND)
         ======================================================== */}
      <Box sx={{ bgcolor: "#FFFFFF", py: 8 }}>
        <Container maxWidth="lg">
          {/* Banner: Optigo Carely */}
          <Box
            sx={{
              background: "linear-gradient(135deg, #1E1B4B 0%, #0F172A 100%)",
              borderRadius: "40px",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              overflow: "hidden",
              alignItems: "center",
              justifyContent: "space-between",
              px: { xs: 3, sm: 6, md: 8 },
              py: { xs: 6, md: 6 },
              mb: 8,
              boxShadow: "0px 20px 40px rgba(15, 23, 42, 0.15)",
            }}
          >
            {/* Desktop View Card Stage */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                position: "relative",
                width: "420px",
                height: "320px",
                alignItems: "center",
                justifyContent: "center",
                mr: 4,
              }}
            >
              {/* Left Card */}
              <Box
                sx={{
                  position: "absolute",
                  left: "0px",
                  zIndex: 1,
                  width: "150px",
                  transform: "rotate(-12deg) translateY(10px)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "rotate(-4deg) translateY(-5px) scale(1.05)",
                    zIndex: 3,
                  },
                }}
              >
                <Box
                  component="img"
                  src="https://cdn22.optigoapps.com/lib/jo/28/AppIcon/app1.png"
                  alt="App 1"
                  sx={{
                    width: "100%",
                    borderRadius: "20px",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                  }}
                />
              </Box>

              {/* Center Card */}
              <Box
                sx={{
                  position: "absolute",
                  zIndex: 2,
                  width: "165px",
                  transform: "translateY(-10px)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-20px) scale(1.05)",
                    zIndex: 3,
                  },
                }}
              >
                <Box
                  component="img"
                  src="https://cdn22.optigoapps.com/lib/jo/28/AppIcon/app3.png"
                  alt="App 2"
                  sx={{
                    width: "100%",
                    borderRadius: "20px",
                    boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
                  }}
                />
              </Box>

              {/* Right Card */}
              <Box
                sx={{
                  position: "absolute",
                  right: "0px",
                  zIndex: 1,
                  width: "150px",
                  transform: "rotate(12deg) translateY(10px)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "rotate(4deg) translateY(-5px) scale(1.05)",
                    zIndex: 3,
                  },
                }}
              >
                <Box
                  component="img"
                  src="https://cdn22.optigoapps.com/lib/jo/28/AppIcon/app2.png"
                  alt="App 3"
                  sx={{
                    width: "100%",
                    borderRadius: "20px",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                  }}
                />
              </Box>
            </Box>

            {/* Mobile View Card Stage (Individual / scrollable row) */}
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                flexDirection: "row",
                overflowX: "auto",
                gap: 2,
                width: "100%",
                py: 2,
                px: 1,
                mb: 4,
                scrollSnapType: "x mandatory",
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >
              {[
                { src: "https://cdn22.optigoapps.com/lib/jo/28/AppIcon/app1.png", alt: "App 1" },
                { src: "https://cdn22.optigoapps.com/lib/jo/28/AppIcon/app3.png", alt: "App 2" },
                { src: "https://cdn22.optigoapps.com/lib/jo/28/AppIcon/app2.png", alt: "App 3" },
              ].map((app, index) => (
                <Box
                  key={index}
                  sx={{
                    flexShrink: 0,
                    width: "140px",
                    scrollSnapAlign: "center",
                  }}
                >
                  <Box
                    component="img"
                    src={app.src}
                    alt={app.alt}
                    sx={{
                      width: "100%",
                      borderRadius: "16px",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
                    }}
                  />
                </Box>
              ))}
            </Box>

            {/* Right: Call to action Text & Badges */}
            <Box
              sx={{
                textAlign: { xs: "center", md: "left" },
                maxWidth: "460px",
                flex: 1,
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  color: "white",
                  fontWeight: 800,
                  fontSize: { xs: "28px", sm: "36px", md: "40px" },
                  mb: 1,
                }}
              >
                Optigo Carely
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#94A3B8",
                  fontSize: { xs: "15px", md: "18px" },
                  mb: 4,
                }}
              >
                Your Support, Elevated
              </Typography>

              {/* Badges Container */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent={{ xs: "center", md: "flex-start" }}
              >
                {/* Google Play Button */}
                <Box
                  component="a"
                  href="https://play.google.com/store/apps/details?id=com.optigo.optigocarely&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "8px 16px",
                    background: "#000",
                    color: "#fff",
                    borderRadius: "10px",
                    textDecoration: "none",
                    fontFamily: "sans-serif",
                    border: "1px solid #334155",
                    transition: "all 0.2s",
                    "&:hover": { background: "#1E293B", borderColor: "#475569" },
                    width: { xs: "100%", sm: "fit-content" },
                    justifyContent: "center",
                  }}
                >
                  <Box component="span" sx={{ width: "22px", height: "22px", display: "flex", alignItems: "center" }}>
                    <svg
                      height="22"
                      width="22"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 511.999 511.999"
                      xmlSpace="preserve"
                    >
                      <g>
                        <path style={{ fill: "#32BBFF" }} d="M382.369,175.623C322.891,142.356,227.427,88.937,79.355,6.028 C69.372-0.565,57.886-1.429,47.962,1.93l254.05,254.05L382.369,175.623z" />
                        <path style={{ fill: "#32BBFF" }} d="M47.962,1.93c-1.86,0.63-3.67,1.39-5.401,2.308C31.602,10.166,23.549,21.573,23.549,36v439.96 c0,14.427,8.052,25.834,19.012,31.761c1.728,0.917,3.537,1.68,5.395,2.314L302.012,255.98L47.962,1.93z" />
                        <path style={{ fill: "#32BBFF" }} d="M302.012,255.98L47.956,510.035c9.927,3.384,21.413,2.586,31.399-4.103 c143.598-80.41,237.986-133.196,298.152-166.746c1.675-0.941,3.316-1.861,4.938-2.772L302.012,255.98z" />
                      </g>
                      <path style={{ fill: "#2C9FD9" }} d="M23.549,255.98v219.98c0,14.427,8.052,25.834,19.012,31.761c1.728,0.917,3.537,1.68,5.395,2.314 L302.012,255.98H23.549z" />
                      <path style={{ fill: "#29CC5E" }} d="M79.355,6.028C67.5-1.8,53.52-1.577,42.561,4.239l255.595,255.596l84.212-84.212 C322.891,142.356,227.427,88.937,79.355,6.028z" />
                      <path style={{ fill: "#D93F21" }} d="M298.158,252.126L42.561,507.721c10.96,5.815,24.939,6.151,36.794-1.789 c143.598-80.41,237.986-133.196,298.152-166.746c1.675-0.941,3.316-1.861,4.938-2.772L298.158,252.126z" />
                      <path style={{ fill: "#FFD500" }} d="M488.45,255.98c0-12.19-6.151-24.492-18.342-31.314c0,0-22.799-12.721-92.682-51.809l-83.123,83.123 l83.204,83.205c69.116-38.807,92.6-51.892,92.6-51.892C482.299,280.472,488.45,268.17,488.45,255.98z" />
                      <path style={{ fill: "#FFAA00" }} d="M470.108,287.294c12.191-6.822,18.342-19.124,18.342-31.314H294.303l83.204,83.205 C446.624,300.379,470.108,287.294,470.108,287.294z" />
                    </svg>
                  </Box>
                  <Box sx={{ textAlign: "left" }}>
                    <Typography sx={{ fontSize: "8px", opacity: 0.7, lineHeight: 1 }}>GET IT ON</Typography>
                    <Typography sx={{ fontSize: "13px", fontWeight: "600", lineHeight: 1.2 }}>Google Play</Typography>
                  </Box>
                </Box>

                {/* App Store Button */}
                <Box
                  component="a"
                  href="https://apps.apple.com/in/app/optigo-carely/id6757185516"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "8px 16px",
                    background: "#000",
                    color: "#fff",
                    borderRadius: "10px",
                    textDecoration: "none",
                    fontFamily: "sans-serif",
                    border: "1px solid #334155",
                    transition: "all 0.2s",
                    "&:hover": { background: "#1E293B", borderColor: "#475569" },
                    width: { xs: "100%", sm: "fit-content" },
                    justifyContent: "center",
                  }}
                >
                  <Box component="span" sx={{ width: "22px", height: "22px", display: "flex", alignItems: "center" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                      <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m.5 11H6.3a1 1 0 1 0 0 2h.514l-.287.511a1 1 0 1 0 1.746.978L9.106 15H12.5a1 1 0 0 0 0-2m1.893-2.988a1 1 0 0 0-1.797.872l.052.105l3.08 5.5a1 1 0 0 0 1.796-.872l-.052-.106l-.286-.51h.514a1 1 0 0 0 .117-1.994L17.7 13h-1.634zm-2.52-4.5a1 1 0 0 0-1.797.872l.051.105l.727 1.297l-1.807 3.226a1 1 0 0 0 1.683 1.075l.063-.098l3.08-5.5a1 1 0 0 0-1.683-1.076l-.062.098L12 5.74l-.127-.227Z" />
                    </svg>
                  </Box>
                  <Box sx={{ textAlign: "left" }}>
                    <Typography sx={{ fontSize: "8px", opacity: 0.7, lineHeight: 1 }}>Download on the</Typography>
                    <Typography sx={{ fontSize: "13px", fontWeight: "600", lineHeight: 1.2 }}>App Store</Typography>
                  </Box>
                </Box>
              </Stack>
            </Box>
          </Box>

          {/* Subsection: Support / Help */}
          <Box sx={{ textAlign: "center", maxWidth: "640px", mx: "auto", mt: 6 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: "#1E293B",
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
                  startIcon={<PhoneCallbackIcon sx={{ color: "#3B82F6" }} />}
                  endIcon={<KeyboardArrowRightIcon sx={{ color: "#475569" }} />}
                  sx={{
                    bgcolor: "#EFF6FF", // Light blue background
                    color: "#1E293B",
                    borderRadius: "16px",
                    py: 2.5,
                    px: 3,
                    justifyContent: "space-between",
                    textTransform: "none",
                    fontWeight: 700,
                    boxShadow: "none",
                    fontSize: "15px",
                    border: "1px solid rgba(59, 130, 246, 0.15)",
                    "&:hover": { bgcolor: "#DBEAFE", boxShadow: "none" },
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
                  startIcon={<ForumIcon sx={{ color: "#10B981" }} />}
                  endIcon={<KeyboardArrowRightIcon sx={{ color: "#475569" }} />}
                  sx={{
                    bgcolor: "#ECFDF5", // Light green background
                    color: "#1E293B",
                    borderRadius: "16px",
                    py: 2.5,
                    px: 3,
                    justifyContent: "space-between",
                    textTransform: "none",
                    fontWeight: 700,
                    boxShadow: "none",
                    fontSize: "15px",
                    border: "1px solid rgba(16, 185, 129, 0.15)",
                    "&:hover": { bgcolor: "#D1FAE5", boxShadow: "none" },
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
                  startIcon={<PlayCircleFilledIcon sx={{ color: "#8B5CF6" }} />}
                  endIcon={<KeyboardArrowRightIcon sx={{ color: "#475569" }} />}
                  sx={{
                    bgcolor: "#F5F3FF", // Light purple background
                    color: "#1E293B",
                    borderRadius: "16px",
                    py: 2.5,
                    px: 3,
                    justifyContent: "space-between",
                    textTransform: "none",
                    fontWeight: 700,
                    boxShadow: "none",
                    fontSize: "15px",
                    border: "1px solid rgba(139, 92, 246, 0.15)",
                    "&:hover": { bgcolor: "#EDE9FE", boxShadow: "none" },
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
