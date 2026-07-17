import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  InputAdornment,
  useTheme,
  alpha,
  Grid,
  Stack,
  IconButton,
} from "@mui/material";
import {
  Search as SearchIcon,
  Play,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import { motion, AnimatePresence } from "framer-motion";

const VIDEOS = [
  {
    id: 1,
    title: "Help Center Tour",
    subtitle: "Quick guide to FAQs & tickets",
    youtubeId: "ScMzIvxBSi4",
    role: "retailer",
    slug: "retailer-dashboard",
    tag: "Help Video",
    color: "#8B5CF6",
  },
  {
    id: 2,
    title: "ERP Training Path",
    subtitle: "Master Wholesale & Retail",
    youtubeId: "vjVkiyKr3Dg",
    role: "retailer",
    slug: "staff-role-management",
    tag: "Training Video",
    color: "#EC4899",
  },
];

const HelpHero = ({ setSearchQuery, searchQuery }) => {
  const [searchTerm, setSearchTerm] = useState(searchQuery || "");
  const [videoIndex, setVideoIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  // Search logic
  const debouncedSearch = useMemo(
    () =>
      debounce((term) => {
        setSearchQuery(term);
        const Parsed = encodeURIComponent(term.trim());
        navigate(Parsed ? `?query=${Parsed}` : "/");
      }, 300),
    [setSearchQuery, navigate],
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => debouncedSearch.cancel();
  }, [searchTerm, debouncedSearch]);

  useEffect(() => {
    setSearchTerm(searchQuery || "");
  }, [searchQuery]);

  const handleImmediateSearch = () => {
    debouncedSearch.flush();
  };

  // Video rotation logic
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setVideoIndex((prev) => (prev + 1) % VIDEOS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const currentVideo = VIDEOS[videoIndex];

  const handleNextVideo = (e) => {
    e.stopPropagation();
    setVideoIndex((prev) => (prev + 1) % VIDEOS.length);
  };

  const handlePrevVideo = (e) => {
    e.stopPropagation();
    setVideoIndex((prev) => (prev - 1 + VIDEOS.length) % VIDEOS.length);
  };

  const handleVideoCardClick = () => {
    navigate(`/help?role=${currentVideo.role}&video=${currentVideo.slug}`);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        py: { xs: 8, md: 11 },
        px: { xs: 2, md: 0 },
        overflow: "hidden",
      }}
    >
      {/* Background ambient light effects */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          right: "5%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, rgba(99, 102, 241, 0) 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          left: "10%",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(6, 182, 212, 0.04) 0%, rgba(6, 182, 212, 0) 70%)",
          filter: "blur(50px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Grid container spacing={6} alignItems="center">
          {/* Left Column: Heading, Search & Quick Links */}
          <Grid item xs={12} md={7}>
            <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  color: "#6366F1",
                  textTransform: "uppercase",
                  mb: 2,
                }}
              >
                Optigo Support Hub
              </Typography>

              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: "32px", sm: "42px", md: "52px" },
                  letterSpacing: "-0.03em",
                  color: "#0F172A",
                  lineHeight: 1.15,
                  mb: 3,
                }}
              >
                How can we{" "}
                <Box
                  component="span"
                  sx={{
                    background:
                      "linear-gradient(135deg, #6366F1 0%, #06B6D4 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  help you
                </Box>{" "}
                today?
              </Typography>

              <Typography
                sx={{
                  color: "#475569",
                  fontSize: { xs: "15px", md: "17px" },
                  lineHeight: 1.6,
                  maxWidth: "540px",
                  mx: { xs: "auto", md: "0" },
                  mb: 5,
                }}
              >
                Search our knowledge base for instant answers, or explore our
                interactive training Video and video tutorials.
              </Typography>

              {/* Search Bar */}
              <Box
                sx={{ maxWidth: "600px", mx: { xs: "auto", md: "0" }, mb: 4 }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search questions, topics, articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleImmediateSearch()
                  }
                  InputProps={{
                    sx: {
                      borderRadius: "100px",
                      bgcolor: "#FFFFFF",
                      height: "58px",
                      boxShadow: "0 10px 30px -10px rgba(15, 23, 42, 0.08)",
                      border: "1px solid rgba(226, 232, 240, 0.8)",
                      "& fieldset": {
                        border: "none",
                      },
                      "&:hover": {
                        boxShadow: "0 12px 36px -8px rgba(99, 102, 241, 0.12)",
                      },
                      "&.Mui-focused": {
                        boxShadow: "0 12px 36px -8px rgba(99, 102, 241, 0.15)",
                        border: "1px solid rgba(99, 102, 241, 0.5)",
                      },
                      px: 2,
                      pr: "5px !important",
                    },
                    startAdornment: (
                      <InputAdornment position="start" sx={{ mr: 1.5 }}>
                        <SearchIcon size={20} style={{ color: "#64748B" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          onClick={handleImmediateSearch}
                          variant="contained"
                          sx={{
                            height: "46px",
                            borderRadius: "100px",
                            background:
                              "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
                            boxShadow: "0 4px 14px rgba(99, 102, 241, 0.3)",
                            fontSize: "14px",
                            fontWeight: 600,
                            textTransform: "none",

                            "&:hover": {
                              background:
                                "linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)",
                              boxShadow: "0 6px 20px rgba(99, 102, 241, 0.4)",
                            },
                            transition: "all 0.2s ease",
                          }}
                        >
                          Search
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              {/* Quick Navigation Tags */}
              <Stack
                direction="row"
                spacing={1.5}
                justifyContent={{ xs: "center", md: "flex-start" }}
                alignItems="center"
                useFlexGap
                flexWrap="wrap"
              >
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#64748B",
                    mr: 1,
                  }}
                >
                  Quick Actions:
                </Typography>
                {[
                  {
                    label: "Callbacks",
                    path: "/0/category/Calllogs%20&%20Request",
                  },
                  { label: "Tickets", path: "/1/category/Tickets" },
                  { label: "Orders", path: "/2/category/Orders" },
                  { label: "Trainings", path: "/3/category/Trainings" },
                ].map((tag, idx) => (
                  <Box
                    key={idx}
                    component={Link}
                    to={tag.path}
                    sx={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#475569",
                      bgcolor: "#F1F5F9",
                      borderRadius: "100px",
                      px: 2,
                      py: 0.75,
                      textDecoration: "none",
                      transition: "all 0.2s",
                      border: "1px solid transparent",
                      "&:hover": {
                        bgcolor: "#E2E8F0",
                        color: "#0F172A",
                        transform: "translateY(-1px)",
                      },
                    }}
                  >
                    {tag.label}
                  </Box>
                ))}
              </Stack>
            </Box>
          </Grid>

          {/* Right Column: Dynamic Video Showcase Console */}
          <Grid
            item
            xs={12}
            md={5}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleVideoCardClick}
              sx={{
                width: "100%",
                maxWidth: "420px",
                height: "310px",
                background: "#000000",
                borderRadius: "24px",
                border: "1px solid rgba(226, 232, 240, 0.8)",
                boxShadow:
                  "0 20px 40px -10px rgba(15, 23, 42, 0.08), 0 1px 3px rgba(15, 23, 42, 0.02)",
                overflow: "hidden",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                position: "relative",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow:
                    "0 30px 60px -15px rgba(99, 102, 241, 0.15), 0 4px 20px -5px rgba(99, 102, 241, 0.05)",
                },
              }}
            >
              {/* Full Width & Full Height Viewport */}
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 1,
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={videoIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "relative",
                    }}
                  >
                    {isHovered ? (
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${currentVideo.youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${currentVideo.youtubeId}&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1`}
                        title={currentVideo.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          pointerEvents: "none",
                        }}
                      />
                    ) : (
                      <>
                        <Box
                          component="img"
                          src={`https://img.youtube.com/vi/${currentVideo.youtubeId}/mqdefault.jpg`}
                          alt={currentVideo.title}
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            opacity: 0.75,
                          }}
                        />
                        {/* Glassmorphism Play Button Overlay */}
                        <Box
                          sx={{
                            position: "absolute",
                            top: "40%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "56px",
                            height: "56px",
                            borderRadius: "50%",
                            background: "rgba(255, 255, 255, 0.25)",
                            backdropFilter: "blur(12px)",
                            border: "1px solid rgba(255, 255, 255, 0.4)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
                            transition: "all 0.2s",
                            "&:hover": {
                              transform: "translate(-50%, -50%) scale(1.08)",
                              background: "rgba(255, 255, 255, 0.35)",
                            },
                          }}
                        >
                          <Play
                            size={22}
                            fill="white"
                            color="white"
                            style={{ marginLeft: 2 }}
                          />
                        </Box>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </Box>

              {/* Top-Left Badge Tag */}
              <Box
                sx={{
                  position: "absolute",
                  top: "16px",
                  left: "16px",
                  bgcolor: currentVideo.color,
                  color: "#FFFFFF",
                  fontSize: "11px",
                  fontWeight: 700,
                  px: 1.5,
                  py: 0.5,
                  borderRadius: "100px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  zIndex: 5,
                }}
              >
                {currentVideo.tag}
              </Box>

              {/* Bottom Gradient Details Overlay */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  pt: 8,
                  pb: 3,
                  px: 3,
                  background:
                    "linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.6) 60%, rgba(15, 23, 42, 0) 100%)",
                  zIndex: 6,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: "18px",
                    color: "#FFFFFF",
                    lineHeight: 1.3,
                    mb: 0.5,
                  }}
                >
                  {currentVideo.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "13px",
                    color: "#E2E8F0",
                    lineHeight: 1.5,
                    mb: 2.5,
                  }}
                >
                  {currentVideo.subtitle}
                </Typography>

                {/* Bottom Row controls */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Stack direction="row" spacing={0.75}>
                    {VIDEOS.map((_, idx) => (
                      <Box
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setVideoIndex(idx);
                        }}
                        sx={{
                          width: idx === videoIndex ? "18px" : "6px",
                          height: "6px",
                          borderRadius: "100px",
                          bgcolor:
                            idx === videoIndex
                              ? currentVideo.color
                              : "rgba(255, 255, 255, 0.4)",
                          transition: "all 0.3s ease",
                          cursor: "pointer",
                        }}
                      />
                    ))}
                  </Stack>

                  <Stack direction="row" spacing={1}>
                    <IconButton
                      size="small"
                      onClick={handlePrevVideo}
                      sx={{
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                        color: "#FFFFFF",
                        bgcolor: "rgba(255, 255, 255, 0.1)",
                        backdropFilter: "blur(4px)",
                        "&:hover": { bgcolor: "rgba(255, 255, 255, 0.2)" },
                      }}
                    >
                      <ChevronLeft size={16} />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={handleNextVideo}
                      sx={{
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                        color: "#FFFFFF",
                        bgcolor: "rgba(255, 255, 255, 0.1)",
                        backdropFilter: "blur(4px)",
                        "&:hover": { bgcolor: "rgba(255, 255, 255, 0.2)" },
                      }}
                    >
                      <ChevronRight size={16} />
                    </IconButton>
                  </Stack>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HelpHero;
