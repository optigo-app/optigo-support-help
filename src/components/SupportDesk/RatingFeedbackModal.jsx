import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  Rating,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { callStreamService } from "../../services/callStreamService";

const RATING_LABELS = {
  1: "Needs Immediate Improvement",
  2: "Fair, but has issues",
  3: "Good / Standard Support",
  4: "Very Satisfied",
  5: "Excellent Resolution",
};

export default function RatingFeedbackModal({
  open,
  onClose,
  activeThread,
  callRecord,
}) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");

  useEffect(() => {
    if (callRecord) {
      setRating(callRecord.rating || 5);
    } else if (activeThread) {
      const raw = activeThread.rawRecord || {};
      setRating(raw.rating || activeThread.rating || 5);
    }
  }, [callRecord, activeThread, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const threadId = activeThread?.id || callRecord?.threadId;
    if (!threadId) return;

    callStreamService.updateCallStatus(threadId, {
      rating,
      feedbackNote: feedbackText.trim(),
    });

    if (feedbackText.trim()) {
      const newCommentMsg = {
        id: `feedback-note-${Date.now()}`,
        dateGroup: "Today",
        sender: "Client Feedback",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        content: `⭐ Rated ${rating}/5 Stars: "${feedbackText.trim()}"`,
        isComment: true,
      };
      callStreamService.addCustomMessage(threadId, newCommentMsg);
    }

    toast.success(`Feedback Submitted: Rated ${rating} Stars. Thank you!`);

    if (onClose) onClose();
  };

  const activeDisplayRating = hoverRating || rating;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.3)",
          overflow: "hidden",
          bgcolor: "#F8FAFC",
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          bgcolor: "#475569",
          color: "#FFFFFF",
          px: 2.5,
          py: 1.4,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          userSelect: "none",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <EditIcon sx={{ fontSize: 18, color: "#FFFFFF" }} />
          <Typography sx={{ fontSize: 13.5, fontWeight: 750, color: "#FFFFFF", letterSpacing: "0.01em" }}>
            Call Resolution & Client Feedback
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 800,
              color: "rgba(255, 255, 255, 0.85)",
              letterSpacing: "0.04em",
              cursor: "pointer",
              "&:hover": { color: "#FFFFFF" },
            }}
          >
            SHARE DRAFT
          </Typography>
          <NorthEastIcon sx={{ fontSize: 15, color: "rgba(255, 255, 255, 0.85)", cursor: "pointer" }} />
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              p: 0.3,
              color: "rgba(255, 255, 255, 0.85)",
              "&:hover": { color: "#FFFFFF", bgcolor: "rgba(255,255,255,0.15)" },
            }}
          >
            <CloseIcon sx={{ fontSize: 17 }} />
          </IconButton>
        </Box>
      </Box>

      {/* Main Body */}
      <DialogContent sx={{ p: 3, bgcolor: "#F8FAFC" }}>
        <form onSubmit={handleSubmit}>
          {/* Section 1: Rating */}
          <Box
            sx={{
              bgcolor: "#FFFFFF",
              borderRadius: "16px",
              p: 2.5,
              mb: 2.5,
              border: "1px solid #E2E8F0",
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 1.5 }}>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  bgcolor: "#4F46E5",
                  color: "#FFFFFF",
                  fontSize: 12,
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                1
              </Box>

              <Typography sx={{ fontSize: 13.5, fontWeight: 800, color: "#0F172A" }}>
                Call Satisfaction & Score
              </Typography>
            </Box>

            <Typography sx={{ fontSize: 12, color: "#64748B", mb: 2, ml: 4 }}>
              How was your overall call resolution experience today?
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", my: 1, gap: 1 }}>
              <Rating
                name="feedback-modal-rating"
                value={rating}
                onChange={(_, newValue) => setRating(newValue || 1)}
                onChangeActive={(_, newHover) => setHoverRating(newHover < 0 ? 0 : newHover)}
                size="large"
                sx={{
                  fontSize: "2.6rem",
                  gap: "8px",
                  "& .MuiRating-iconFilled": { color: "#4F46E5" },
                  "& .MuiRating-iconHover": { color: "#6366F1", transform: "scale(1.15)" },
                  "& .MuiRating-iconEmpty": { color: "#CBD5E1" },
                }}
              />

              <Typography sx={{ fontSize: 12, fontWeight: 750, color: "#4F46E5" }}>
                {RATING_LABELS[activeDisplayRating] || "Excellent Resolution"}
              </Typography>
            </Box>
          </Box>

          {/* Section 2: Feedback Notes */}
          <Box
            sx={{
              bgcolor: "#FFFFFF",
              borderRadius: "16px",
              p: 2.5,
              mb: 2.5,
              border: "1px solid #E2E8F0",
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 1.5 }}>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  bgcolor: "#4F46E5",
                  color: "#FFFFFF",
                  fontSize: 12,
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                2
              </Box>

              <Typography sx={{ fontSize: 13.5, fontWeight: 800, color: "#0F172A" }}>
                Feedback & Detailed Suggestions
              </Typography>
            </Box>

            <TextField
              multiline
              rows={3.5}
              fullWidth
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Write your feedback or suggestions here..."
              sx={{
                "& .MuiInputBase-input, & textarea": {
                  color: "#0F172A !important",
                  fontSize: "0.88rem",
                  fontWeight: 500,
                },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "14px",
                  bgcolor: "#F8FAFC",
                  fontSize: "0.88rem",
                  p: 1.8,
                  "& fieldset": {
                    borderColor: "#E2E8F0",
                    borderWidth: "1.5px",
                  },
                  "&:hover fieldset": {
                    borderColor: "#CBD5E1",
                  },
                  "&.Mui-focused": {
                    bgcolor: "#FFFFFF",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#4F46E5",
                    borderWidth: "2px",
                  },
                },
              }}
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 0.5 }}>
            <Button
              type="submit"
              variant="contained"
              disableElevation
              sx={{
                bgcolor: "#64748B",
                color: "#FFFFFF",
                fontWeight: 750,
                fontSize: "0.82rem",
                textTransform: "none",
                height: 36,
                px: 3.5,
                borderRadius: "18px",
                "&:hover": {
                  bgcolor: "#475569",
                  boxShadow: "0 4px 12px rgba(71, 85, 105, 0.25)",
                },
              }}
            >
              Send & Archive
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
}
