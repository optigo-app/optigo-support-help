import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  Chip,
  Fade,
  CircularProgress,
  Collapse,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import ThumbDownAltRoundedIcon from "@mui/icons-material/ThumbDownAltRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
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

export default function VideoFeedbackModal({
  open,
  onClose,
  videoName,
  sectionName,
  videoLang = 1,
  onSuccess,
}) {
  const auth = useAuth();
  const authUser = auth?.user || null;

  const [feedbackType, setFeedbackType] = useState(null); // 1 = Positive, 0 = Negative
  const [selectedTags, setSelectedTags] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  const handleSelectFeedback = (type) => {
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
      if (typeof onSuccess === "function") {
        onSuccess(feedbackType);
      }

      setTimeout(() => {
        handleClose();
      }, 1800);
    } catch (err) {
      console.error("Failed to submit feedback:", err);
      setErrorMessage("Unable to save feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setFeedbackType(null);
      setSelectedTags([]);
      setComment("");
      setSubmitted(false);
      setErrorMessage("");
    }, 300);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "24px",
          p: 0,
          overflow: "hidden",
          boxShadow:
            "0 24px 48px -12px rgba(0, 0, 0, 0.18), 0 0 0 1px rgba(0, 0, 0, 0.06)",
          bgcolor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
        },
      }}
      TransitionComponent={Fade}
      transitionDuration={240}
    >
      {/* Top Header Bar */}
      <Box
        sx={{
          px: 3,
          pt: 3,
          pb: 1,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "12px",
              bgcolor: "#F2F2F7",
              color: "#1C1C1E",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "inset 0 0 0 1px rgba(0, 0, 0, 0.04)",
            }}
          >
            <RateReviewOutlinedIcon sx={{ fontSize: 20 }} />
          </Box>
          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "1.05rem",
                color: "#1C1C1E",
                letterSpacing: "-0.015em",
              }}
            >
              How was this video?
            </Typography>
            <Typography
              sx={{
                fontSize: "0.78rem",
                color: "#8E8E93",
                letterSpacing: "-0.01em",
                maxWidth: 240,
              }}
              noWrap
            >
              {videoName || "Help us improve this tutorial"}
            </Typography>
          </Box>
        </Box>

        <IconButton
          onClick={handleClose}
          size="small"
          sx={{
            color: "#8E8E93",
            bgcolor: "#F2F2F7",
            borderRadius: "50%",
            width: 28,
            height: 28,
            "&:hover": { bgcolor: "#E5E5EA", color: "#1C1C1E" },
          }}
        >
          <CloseRoundedIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>

      <DialogContent sx={{ px: 3, py: 2 }}>
        {submitted ? (
          <Box
            sx={{
              py: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                bgcolor: "#ECFDF5",
                color: "#10B981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1.8,
                boxShadow: "0 4px 16px rgba(16, 185, 129, 0.2)",
              }}
            >
              <CheckCircleRoundedIcon sx={{ fontSize: 32 }} />
            </Box>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "1.1rem",
                color: "#1C1C1E",
                letterSpacing: "-0.015em",
                mb: 0.5,
              }}
            >
              Thank You!
            </Typography>
            <Typography
              sx={{
                fontSize: "0.84rem",
                color: "#8E8E93",
                letterSpacing: "-0.01em",
                maxWidth: 280,
              }}
            >
              Your feedback helps make our guides better for everyone.
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* Apple Segmented Rating Pills */}
            <Box sx={{ textAlign: "center", pt: 0.5 }}>
              <Typography
                sx={{
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "#3A3A3C",
                  mb: 1.5,
                  letterSpacing: "-0.01em",
                }}
              >
                Was this tutorial clear and helpful?
              </Typography>

              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  bgcolor: "#F2F2F7",
                  p: "4px",
                  borderRadius: "9999px",
                  border: "1px solid rgba(0, 0, 0, 0.04)",
                  width: "100%",
                  justifyContent: "center",
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
                    flex: 1,
                    borderRadius: "9999px",
                    py: 0.8,
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    letterSpacing: "-0.01em",
                    color: feedbackType === 1 ? "#065F46" : "#3A3A3C",
                    bgcolor: feedbackType === 1 ? "#ffffff" : "transparent",
                    boxShadow:
                      feedbackType === 1
                        ? "0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)"
                        : "none",
                    transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                    "&:hover": {
                      bgcolor:
                        feedbackType === 1 ? "#ffffff" : "rgba(0, 0, 0, 0.04)",
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
                    flex: 1,
                    borderRadius: "9999px",
                    py: 0.8,
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    letterSpacing: "-0.01em",
                    color: feedbackType === 0 ? "#991B1B" : "#3A3A3C",
                    bgcolor: feedbackType === 0 ? "#ffffff" : "transparent",
                    boxShadow:
                      feedbackType === 0
                        ? "0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)"
                        : "none",
                    transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                    "&:hover": {
                      bgcolor:
                        feedbackType === 0 ? "#ffffff" : "rgba(0, 0, 0, 0.04)",
                    },
                  }}
                >
                  Not really
                </Button>
              </Box>
            </Box>

            {/* Quick Reason Tag Pills */}
            <Collapse in={feedbackType !== null} timeout={220}>
              <Box sx={{ pt: 1 }}>
                <Typography
                  sx={{
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    color: "#636366",
                    mb: 1,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {feedbackType === 1
                    ? "What did you like most?"
                    : "What could be improved?"}
                </Typography>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8, mb: 1.8 }}>
                  {(feedbackType === 1 ? POSITIVE_TAGS : NEGATIVE_TAGS).map(
                    (tag) => {
                      const isSelected = selectedTags.includes(tag);
                      return (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          onClick={() => handleToggleTag(tag)}
                          sx={{
                            borderRadius: "9999px",
                            px: 0.5,
                            py: 1.6,
                            fontSize: "0.76rem",
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
                            transition: "all 0.18s ease",
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
                    },
                  )}
                </Box>

                <TextField
                  placeholder="Optional comment..."
                  multiline
                  minRows={2}
                  maxRows={3}
                  fullWidth
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "14px",
                      fontSize: "0.85rem",
                      bgcolor: "#F9F9FB",
                      color: "#1C1C1E",
                      "& fieldset": { borderColor: "rgba(0, 0, 0, 0.08)" },
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
              </Box>
            </Collapse>

            {errorMessage && (
              <Typography
                sx={{
                  color: "#EF4444",
                  fontSize: "0.8rem",
                  textAlign: "center",
                  fontWeight: 500,
                }}
              >
                {errorMessage}
              </Typography>
            )}

            {/* Apple Actions */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 1.2,
                mt: 1,
                pt: 1,
              }}
            >
              <Button
                onClick={handleClose}
                sx={{
                  color: "#8E8E93",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.84rem",
                  borderRadius: "9999px",
                  px: 2,
                  "&:hover": { bgcolor: "#F2F2F7", color: "#1C1C1E" },
                }}
              >
                Dismiss
              </Button>

              <Button
                onClick={handleSubmit}
                disabled={feedbackType === null || loading}
                variant="contained"
                disableElevation
                sx={{
                  bgcolor: "#1C1C1E",
                  color: "#ffffff",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  borderRadius: "9999px",
                  px: 3,
                  py: 0.7,
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.12)",
                  transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                  "&:hover": {
                    bgcolor: "#000000",
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
        )}
      </DialogContent>
    </Dialog>
  );
}
