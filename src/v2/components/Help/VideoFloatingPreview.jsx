import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const VIDEOS = [
  {
    id: 1,
    type: "help",
    title: "Help Center Tour",
    subtitle: "Quick guide to FAQs & tickets",
    youtubeId: "ScMzIvxBSi4",
    slug: "retailer-dashboard",
    role: "retailer",
    tag: "Help Video",
    color: "#6D28D9",
  },
  {
    id: 2,
    type: "training",
    title: "ERP Training Path",
    subtitle: "Master Wholesale & Retail",
    youtubeId: "vjVkiyKr3Dg",
    slug: "staff-role-management",
    role: "retailer",
    tag: "Training Video",
    color: "#EC4899",
  },
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 175 : -175,
    opacity: 0,
    scale: 0.98
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 175 : -175,
    opacity: 0,
    scale: 0.98
  })
};

export default function VideoFloatingPreview({ placement = "top" }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isVisible || isHovered) return;
    const interval = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % VIDEOS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isVisible, isHovered]);

  if (!isVisible) return null;

  const currentVideo = VIDEOS[index];

  const handleNext = (e) => {
    e?.stopPropagation();
    setDirection(1);
    setIndex((prev) => (prev + 1) % VIDEOS.length);
  };

  const handlePrev = (e) => {
    e?.stopPropagation();
    setDirection(-1);
    setIndex((prev) => (prev - 1 + VIDEOS.length) % VIDEOS.length);
  };

  const handleDotClick = (idx, e) => {
    e?.stopPropagation();
    if (idx > index) {
      setDirection(1);
    } else if (idx < index) {
      setDirection(-1);
    }
    setIndex(idx);
  };

  const handleCardClick = () => {
    navigate(`/help?role=${currentVideo.role}&video=${currentVideo.slug}`);
  };

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        position: "absolute",
        bottom: placement === "top" ? "100%" : "auto",
        top: placement === "bottom" ? "100%" : "auto",
        left: "50%",
        transform: "translateX(-50%)",
        mb: placement === "top" ? 3.5 : 0,
        mt: placement === "bottom" ? 3.5 : 0,
        zIndex: 99999999,
        width: 175,
        height: 170, // Fixed height for the absolute slider container
        background: "#ffffff",
        borderRadius: "14px",
        border: "1px solid #E5E7EB",
        boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.1), 0 6px 8px -6px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        overflow: "visible",
        // Tooltip tail
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: placement === "top" ? -6 : "auto",
          top: placement === "bottom" ? -6 : "auto",
          left: "50%",
          transform: "translateX(-50%)",
          borderWidth: placement === "top" ? "6px 6px 0" : "0 6px 6px",
          borderStyle: "solid",
          borderColor: placement === "top" ? "#ffffff transparent" : "transparent transparent #ffffff",
          display: "block",
          width: 0,
          zIndex: 10,
        },
        "&::before": {
          content: '""',
          position: "absolute",
          bottom: placement === "top" ? -7 : "auto",
          top: placement === "bottom" ? -7 : "auto",
          left: "50%",
          transform: "translateX(-50%)",
          borderWidth: placement === "top" ? "7px 7px 0" : "0 7px 7px",
          borderStyle: "solid",
          borderColor: placement === "top" ? "#E5E7EB transparent" : "transparent transparent #E5E7EB",
          display: "block",
          width: 0,
          zIndex: 9,
        },
      }}
    >
      {/* Dismiss Button */}
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          setIsVisible(false);
        }}
        sx={{
          position: "absolute",
          top: -8,
          right: -8,
          bgcolor: "#ffffff",
          boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
          border: "1px solid #E5E7EB",
          zIndex: 30,
          p: 0.4,
          "&:hover": {
            bgcolor: "#F3F4F6",
            color: "#EF4444",
          },
        }}
      >
        <X size={12} />
      </IconButton>

      {/* Hover Arrow Controls */}
      <AnimatePresence>
        {isHovered && (
          <>
            <IconButton
              size="small"
              onClick={handlePrev}
              sx={{
                position: "absolute",
                left: -12,
                top: "35%",
                transform: "translateY(-50%)",
                bgcolor: "#ffffff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                border: "1px solid #E5E7EB",
                zIndex: 25,
                width: 22,
                height: 22,
                p: 0,
                color: "#4B5563",
                "&:hover": { bgcolor: "#F3F4F6", color: "#111827" }
              }}
            >
              <ChevronLeft size={14} />
            </IconButton>
            <IconButton
              size="small"
              onClick={handleNext}
              sx={{
                position: "absolute",
                right: -12,
                top: "35%",
                transform: "translateY(-50%)",
                bgcolor: "#ffffff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                border: "1px solid #E5E7EB",
                zIndex: 25,
                width: 22,
                height: 22,
                p: 0,
                color: "#4B5563",
                "&:hover": { bgcolor: "#F3F4F6", color: "#111827" }
              }}
            >
              <ChevronRight size={14} />
            </IconButton>
          </>
        )}
      </AnimatePresence>

      {/* Slide Container (Relative with absolute sliding items inside) */}
      <Box sx={{ width: "100%", height: 146, overflow: "hidden", borderRadius: "14px 14px 0 0", position: "relative" }}>
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 320, damping: 30 },
              opacity: { duration: 0.25 }
            }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column"
            }}
          >
            {/* Card Body & Video Thumbnail / Player */}
            <Box
              onClick={handleCardClick}
              sx={{
                cursor: "pointer",
                position: "relative",
                width: "100%",
                height: 90,
                bgcolor: "#000",
                overflow: "hidden",
                borderRadius: "14px 14px 0 0",
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
                      opacity: 0.8,
                      transition: "transform 0.3s ease",
                      "&:hover": { transform: "scale(1.06)" },
                    }}
                  />
                  {/* Play Overlay */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      bgcolor: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
                      zIndex: 2,
                    }}
                  >
                    <Play size={14} fill={currentVideo.color} color={currentVideo.color} style={{ marginLeft: 1 }} />
                  </Box>
                </>
              )}

              {/* Tag / Badge */}
              <Box
                sx={{
                  position: "absolute",
                  top: 6,
                  left: 6,
                  bgcolor: currentVideo.color,
                  color: "#ffffff",
                  fontSize: "0.58rem",
                  fontWeight: 700,
                  px: 1,
                  py: 0.25,
                  borderRadius: "10px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                  zIndex: 5,
                }}
              >
                {currentVideo.tag}
              </Box>
            </Box>

            {/* Text & Content Info */}
            <Box sx={{ p: 1, pb: 0.5, display: "flex", flexDirection: "column", gap: 0.25 }} onClick={handleCardClick} style={{ cursor: "pointer" }}>
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: "0.75rem",
                  color: "#111827",
                  lineHeight: 1.2,
                  fontFamily: '"Manrope Variable", sans-serif',
                }}
              >
                {currentVideo.title}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.62rem",
                  color: "#6B7280",
                  lineHeight: 1.25,
                  fontFamily: '"Manrope Variable", sans-serif',
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {currentVideo.subtitle}
              </Typography>
            </Box>
          </motion.div>
        </AnimatePresence>
      </Box>

      {/* Carousel indicators dots (Placed outside slide container to remain stationary) */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 0.5,
          pb: 0.75,
          pt: 0.5,
          mt: "auto",
          width: "100%",
          zIndex: 10,
          background: "#ffffff",
          borderRadius: "0 0 14px 14px"
        }}
      >
        {VIDEOS.map((_, idx) => (
          <Box
            key={idx}
            onClick={(e) => handleDotClick(idx, e)}
            sx={{
              width: idx === index ? 12 : 5,
              height: 5,
              borderRadius: "2.5px",
              bgcolor: idx === index ? currentVideo.color : "#D1D5DB",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
