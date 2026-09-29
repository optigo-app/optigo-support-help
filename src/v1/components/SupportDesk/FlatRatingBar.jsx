import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  Collapse,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { toast } from "react-toastify";

const RATING_LABELS = {
  1: "Needs Improvement",
  2: "Fair Resolution",
  3: "Good Support",
  4: "Very Satisfied",
  5: "Excellent Resolution",
};

function RoundedStarIcon({ filled = false, size = 32 }) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: "50%",
        bgcolor: filled ? "#FEF08A" : "#F1F5F9",
        border: filled ? "1.5px solid #FACC15" : "1.5px solid #CBD5E1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)",
        boxShadow: filled
          ? "0 4px 12px rgba(234, 179, 8, 0.35), inset 0 1px 2px rgba(255,255,255,0.8)"
          : "none",
      }}
    >
      {filled ? (
        <StarIcon sx={{ fontSize: size * 0.58, color: "#CA8A04" }} />
      ) : (
        <StarBorderIcon sx={{ fontSize: size * 0.58, color: "#94A3B8" }} />
      )}
    </Box>
  );
}

export default function FlatRatingBar({ open = false, onClose, activeThread, onAddFeedback }) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");

  useEffect(() => {
    if (activeThread) {
      const raw = activeThread.rawRecord || {};
      setRating(Number(raw.rating || raw.ratingByCustomer || activeThread.rating) || 5);
      setFeedbackText("");
    }
  }, [activeThread, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!activeThread) return;
    const callId = activeThread.rawRecord?.id || activeThread.id;

    if (onAddFeedback) {
      onAddFeedback(callId, rating, feedbackText.trim());
    }

    toast.success(`Feedback Submitted: Rated ${rating} Stars. Thank you!`);

    if (onClose) onClose();
  };

  const activeDisplayRating = hoverRating || rating;

  return (
    <Collapse in={open} timeout={250} unmountOnExit>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          bgcolor: "#FFFFFF",
          borderTop: "1.5px solid #FDE68A",
          boxShadow: "0 -4px 20px rgba(245, 158, 11, 0.08)",
          p: 1.5,
          px: 2.5,
          display: "flex",
          flexDirection: "column",
          gap: 1.2,
          position: "relative",
          zIndex: 20,
        }}
      >
        {/* Top Header Row: Status Chip + Rating Star Buttons + Close Button */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 1.5,
          }}
        >
          {/* Left: Star Rating Interactive Controls */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
              {[1, 2, 3, 4, 5].map((starValue) => {
                const isStarActive = starValue <= activeDisplayRating;
                return (
                  <Box
                    key={starValue}
                    onClick={() => setRating(starValue)}
                    onMouseEnter={() => setHoverRating(starValue)}
                    onMouseLeave={() => setHoverRating(0)}
                    sx={{
                      cursor: "pointer",
                      transform: isStarActive ? "scale(1.05)" : "scale(1)",
                      transition: "transform 0.15s ease",
                      "&:hover": { transform: "scale(1.18)" },
                    }}
                  >
                    <RoundedStarIcon filled={isStarActive} size={30} />
                  </Box>
                );
              })}
            </Box>

            {/* Dynamic Emotion Label Pill */}
            <Chip
              label={RATING_LABELS[activeDisplayRating] || "Rate Call"}
              size="small"
              sx={{
                bgcolor: "#FEF3C7",
                color: "#92400E",
                fontWeight: 800,
                fontSize: 11,
                height: 22,
                border: "1px solid #FDE68A",
              }}
            />
          </Box>

          {/* Right: Close Action */}
          <IconButton
            size="small"
            onClick={onClose}
            sx={{
              color: "#94A3B8",
              p: 0.5,
              "&:hover": { bgcolor: "#F1F5F9", color: "#0F172A" },
            }}
          >
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>

        {/* Bottom Row: Text Feedback Input + Action Buttons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Add a client review note or remarks (optional)..."
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            sx={{
              bgcolor: "#F8FAFC",
              borderRadius: "6px",
              "& .MuiOutlinedInput-root": {
                height: 36,
                fontSize: 12.5,
                "& fieldset": { borderColor: "#CBD5E1" },
                "&:hover fieldset": { borderColor: "#94A3B8" },
                "&.Mui-focused fieldset": { borderColor: "#F59E0B" },
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              height: 36,
              px: 2.2,
              bgcolor: "#F59E0B",
              color: "#FFFFFF",
              fontWeight: 750,
              fontSize: 12,
              borderRadius: "6px",
              boxShadow: "none",
              textTransform: "none",
              flexShrink: 0,
              "&:hover": {
                bgcolor: "#D97706",
                boxShadow: "none",
              },
            }}
          >
            Submit Rating
          </Button>
        </Box>
      </Box>
    </Collapse>
  );
}
