import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Chip,
  Collapse,
  CircularProgress,
  IconButton,
} from "@mui/material";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import ThumbDownAltRoundedIcon from "@mui/icons-material/ThumbDownAltRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import HelpVideoFeedbackAPI from "../../apis/HelpVideoFeedbackController";
import { useAuth } from "../../modules/context/UseAuth";

const POSITIVE_TAGS = [
  "Clear explanation",
  "Easy to follow",
  "Great pacing",
  "Solved my question",
  "Concise & practical",
];

const NEGATIVE_TAGS = [
  "Too fast",
  "Missing steps",
  "Audio not clear",
  "Outdated UI shown",
  "Need more examples",
];

export default function VideoFeedbackSection({
  videoName,
  sectionName,
  videoLang = 1,
  slug,
}) {
  const auth = useAuth();
  const authUser = auth?.user || null;

  const [feedbackType, setFeedbackType] = useState(null); // 1 = positive, 0 = negative
  const [selectedTags, setSelectedTags] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const storageKey = `help_feedback_${slug || videoName}`;

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setSubmitted(true);
    }
  }, [storageKey]);

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  const handleSelectFeedback = (type) => {
    if (submitted) return;
    if (feedbackType === type) {
      setFeedbackType(null);
      setSelectedTags([]);
      return;
    }
    setFeedbackType(type);
    setSelectedTags([]);
  };

  const handleToggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const handleSubmit = async () => {
    if (feedbackType === null) return;
    setLoading(true);
    setErrorMessage("");

    try {
      let fullComment = "";
      if (selectedTags.length > 0) {
        fullComment += `[${selectedTags.join(", ")}] `;
      }
      if (comment.trim()) {
        fullComment += comment.trim();
      }

      const resolvedUserId =
        authUser?.id || authUser?.custid || authUser?.userid || 0;
      const resolvedUserName =
        authUser?.fullName ||
        (authUser?.firstname
          ? `${authUser.firstname} ${authUser.lastname || ""}`.trim()
          : "") ||
        authUser?.customercode ||
        authUser?.usercode ||
        authUser?.userid ||
        "";

      await HelpVideoFeedbackAPI.saveFeedback({
        userId: resolvedUserId,
        userName: resolvedUserName,
        videoName: videoName || "Optigo Help Video",
        sectionName: sectionName || "General",
        videoLang: videoLang || 1,
        feedback: feedbackType,
        comment: fullComment.trim(),
      });

      setSubmitted(true);
      localStorage.setItem(
        storageKey,
        JSON.stringify({ feedback: feedbackType, date: Date.now() }),
      );
    } catch (err) {
      console.error("Failed to submit feedback:", err);
      setErrorMessage("Unable to save feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFeedbackType(null);
    setSelectedTags([]);
    setComment("");
    localStorage.removeItem(storageKey);
  };

  if (submitted) {
    return (
      <Box
        sx={{
          my: 3,
          p: 2,
          px: 2.5,
          borderRadius: "16px",
          bgcolor: "rgba(240, 253, 244, 0.7)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(187, 247, 208, 0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              bgcolor: "#10B981",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 2px 8px rgba(16, 185, 129, 0.25)",
            }}
          >
            <CheckCircleRoundedIcon sx={{ fontSize: 18 }} />
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "0.88rem",
                fontWeight: 600,
                color: "#065F46",
                letterSpacing: "-0.01em",
              }}
            >
              Feedback received
            </Typography>
            <Typography
              sx={{ fontSize: "0.78rem", color: "#047857", opacity: 0.9 }}
            >
              Thank you for helping us improve this tutorial.
            </Typography>
          </Box>
        </Box>

        <Button
          onClick={handleReset}
          size="small"
          sx={{
            textTransform: "none",
            fontSize: "0.78rem",
            fontWeight: 600,
            color: "#059669",
            borderRadius: "9999px",
            px: 1.5,
            py: 0.4,
            bgcolor: "rgba(255, 255, 255, 0.8)",
            "&:hover": { bgcolor: "#ffffff" },
          }}
        >
          Change
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        my: 3,
        p: { xs: 2, sm: 2.5 },
        borderRadius: "20px",
        bgcolor: "#ffffff",
        border: "1px solid rgba(0, 0, 0, 0.07)",
        boxShadow:
          "0 1px 3px rgba(0, 0, 0, 0.02), 0 8px 24px rgba(0, 0, 0, 0.03)",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Top Row: Question + Apple-style Segmented Capsule */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: "0.94rem",
              fontWeight: 700,
              color: "#1C1C1E",
              letterSpacing: "-0.015em",
            }}
          >
            Was this video helpful?
          </Typography>
          <Typography
            sx={{
              fontSize: "0.8rem",
              color: "#8E8E93",
              letterSpacing: "-0.01em",
              mt: 0.2,
            }}
          >
            Your feedback guides our next updates.
          </Typography>
        </Box>

        {/* Apple Segmented Control */}
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            bgcolor: "#F2F2F7",
            p: "4px",
            borderRadius: "9999px",
            border: "1px solid rgba(0, 0, 0, 0.04)",
          }}
        >
          <Button
            onClick={() => handleSelectFeedback(1)}
            disableElevation
            startIcon={
              feedbackType === 1 ? (
                <ThumbUpAltRoundedIcon sx={{ fontSize: 16 }} />
              ) : (
                <ThumbUpAltOutlinedIcon sx={{ fontSize: 16 }} />
              )
            }
            sx={{
              borderRadius: "9999px",
              px: 2,
              py: 0.6,
              minHeight: 32,
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.82rem",
              letterSpacing: "-0.01em",
              color: feedbackType === 1 ? "#065F46" : "#3A3A3C",
              bgcolor: feedbackType === 1 ? "#ffffff" : "transparent",
              boxShadow:
                feedbackType === 1
                  ? "0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)"
                  : "none",
              transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
              "&:hover": {
                bgcolor: feedbackType === 1 ? "#ffffff" : "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            Helpful
          </Button>

          <Button
            onClick={() => handleSelectFeedback(0)}
            disableElevation
            startIcon={
              feedbackType === 0 ? (
                <ThumbDownAltRoundedIcon sx={{ fontSize: 16 }} />
              ) : (
                <ThumbDownAltOutlinedIcon sx={{ fontSize: 16 }} />
              )
            }
            sx={{
              borderRadius: "9999px",
              px: 2,
              py: 0.6,
              minHeight: 32,
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.82rem",
              letterSpacing: "-0.01em",
              color: feedbackType === 0 ? "#991B1B" : "#3A3A3C",
              bgcolor: feedbackType === 0 ? "#ffffff" : "transparent",
              boxShadow:
                feedbackType === 0
                  ? "0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)"
                  : "none",
              transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
              "&:hover": {
                bgcolor: feedbackType === 0 ? "#ffffff" : "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            Not really
          </Button>
        </Box>
      </Box>

      {/* Expandable Feedback Details */}
      <Collapse in={feedbackType !== null} timeout={280}>
        <Box
          sx={{
            mt: 2.5,
            pt: 2.5,
            borderTop: "1px solid rgba(0, 0, 0, 0.06)",
          }}
        >
          <Typography
            sx={{
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "#636366",
              mb: 1.2,
              letterSpacing: "-0.01em",
            }}
          >
            {feedbackType === 1
              ? "What did you like most? (Optional)"
              : "What could be improved? (Optional)"}
          </Typography>

          {/* Quick Tag Pills */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.9, mb: 2 }}>
            {(feedbackType === 1 ? POSITIVE_TAGS : NEGATIVE_TAGS).map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  onClick={() => handleToggleTag(tag)}
                  sx={{
                    borderRadius: "9999px",
                    px: 0.6,
                    py: 1.8,
                    fontSize: "0.78rem",
                    fontWeight: isSelected ? 600 : 500,
                    cursor: "pointer",
                    bgcolor: isSelected
                      ? feedbackType === 1
                        ? "rgba(16, 185, 129, 0.12)"
                        : "rgba(239, 68, 68, 0.12)"
                      : "#F2F2F7",
                    color: isSelected
                      ? feedbackType === 1
                        ? "#047857"
                        : "#B91C1C"
                      : "#3A3A3C",
                    border: isSelected
                      ? `1px solid ${
                          feedbackType === 1
                            ? "rgba(16, 185, 129, 0.3)"
                            : "rgba(239, 68, 68, 0.3)"
                        }`
                      : "1px solid transparent",
                    transition: "all 0.18s ease-in-out",
                    "&:hover": {
                      bgcolor: isSelected
                        ? feedbackType === 1
                          ? "rgba(16, 185, 129, 0.18)"
                          : "rgba(239, 68, 68, 0.18)"
                        : "#E5E5EA",
                    },
                  }}
                />
              );
            })}
          </Box>

          {/* Clean Input Field */}
          <TextField
            placeholder={
              feedbackType === 1
                ? "Any additional notes or compliments? (Optional)"
                : "Tell us what was missing or how we can make this clearer... (Optional)"
            }
            multiline
            minRows={2}
            maxRows={4}
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "14px",
                fontSize: "0.86rem",
                bgcolor: "#F9F9FB",
                color: "#1C1C1E",
                transition: "all 0.2s ease",
                "& fieldset": {
                  borderColor: "rgba(0, 0, 0, 0.08)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(0, 0, 0, 0.18)",
                },
                "&.Mui-focused": {
                  bgcolor: "#ffffff",
                  "& fieldset": {
                    borderColor: "#7C3AED",
                    borderWidth: "1.5px",
                  },
                },
              },
            }}
          />

          {errorMessage && (
            <Typography
              sx={{ color: "#EF4444", fontSize: "0.8rem", mt: 1, fontWeight: 500 }}
            >
              {errorMessage}
            </Typography>
          )}

          {/* Bottom Actions */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 1.5,
              mt: 2,
            }}
          >
            <Button
              onClick={() => {
                setFeedbackType(null);
                setSelectedTags([]);
                setComment("");
              }}
              size="small"
              sx={{
                color: "#8E8E93",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.82rem",
                borderRadius: "9999px",
                px: 2,
                "&:hover": { bgcolor: "#F2F2F7", color: "#1C1C1E" },
              }}
            >
              Cancel
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={loading}
              variant="contained"
              disableElevation
              sx={{
                bgcolor: "#1C1C1E",
                color: "#ffffff",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.84rem",
                borderRadius: "9999px",
                px: 3,
                py: 0.7,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.12)",
                transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                "&:hover": {
                  bgcolor: "#000000",
                  transform: "translateY(-1px)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.18)",
                },
                "&.Mui-disabled": {
                  bgcolor: "#E5E5EA",
                  color: "#AEAEB2",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={18} sx={{ color: "#ffffff" }} />
              ) : (
                "Submit Feedback"
              )}
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
}
