import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Box,
  Paper,
  Chip,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

// Assumes followUpDialogOpen, setFollowUpDialogOpen, and CurrentCall are provided via props or state.
export default function FollowUpHistoryDialog({
  followUpDialogOpen,
  setFollowUpDialogOpen,
  CurrentCall,
}) {
  const followUps = CurrentCall?.followUpsList || [];

  return (
    <Dialog
      open={followUpDialogOpen}
      onClose={() => setFollowUpDialogOpen(false)}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.08)",
        },
      }}
    >
      {/* Dialog Header */}
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 1.5,
          py: 2,
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Typography
            variant="h6"
            component="span"
            sx={{ fontWeight: 600, fontSize: "1.1rem", color: "text.primary" }}
          >
            Follow-up History
          </Typography>
          <Chip
            label={followUps.length}
            size="small"
            color="primary"
            variant="light" // Custom or standard styling depending on your theme
            sx={{
              fontWeight: 600,
              fontSize: "0.75rem",
              height: 20,
              bgcolor: "action.selected",
              color: "primary.main",
            }}
          />
        </Stack>
        <IconButton
          size="small"
          onClick={() => setFollowUpDialogOpen(false)}
          sx={{
            color: "text.secondary",
            "&:hover": { bgcolor: "action.hover" },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <Divider />

      {/* Dialog Body */}
      <DialogContent sx={{ px: 1.5, py: 2.5, bgcolor: "background.default" }}>
        <Box
          sx={{
            maxHeight: "55vh",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 2,
               // Hide scrollbar
    scrollbarWidth: "none", // Firefox
    msOverflowStyle: "none", // IE & Edge

    "&::-webkit-scrollbar": {
      display: "none", // Chrome, Safari
    },
          }}
        >
          {followUps.length > 0 ? (
            followUps.map((fp, index) => (
              <Paper
                key={fp.Id || index}
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "background.paper",
                  transition: "box-shadow 0.2s ease",
                  "&:hover": {
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.03)",
                  },
                }}
              >
                {/* Card Header */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1.5,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      color: "text.primary",
                    }}
                  >
                    Follow-up #{fp.Id || index + 1}
                  </Typography>
                  {fp.CallDuration && fp.CallDuration !== "00:00:00" && (
                    <Chip
                      label={fp.CallDuration}
                      size="small"
                      variant="outlined"
                      icon={
                        <HourglassEmptyIcon
                          style={{ fontSize: "0.75rem", marginLeft: 4 }}
                        />
                      }
                      sx={{
                        height: 22,
                        fontSize: "0.725rem",
                        fontWeight: 500,
                        borderColor: "divider",
                        "& .MuiChip-icon": { color: "text.secondary" },
                      }}
                    />
                  )}
                </Box>

                {/* Description Text */}
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    mb: 2,
                    fontSize: "0.825rem",
                    lineHeight: 1.5,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {fp.Description || "No description provided."}
                </Typography>

                <Divider sx={{ my: 1.5, borderStyle: "dashed" }} />

                {/* Metadata Grid (Flex/Stack approach for cleaner spacing) */}
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                    gap: 1.5,
                  }}
                >
                  {/* Created By */}
                  <Box>
                    <Stack direction="row" spacing={0.5} alignItems="center" mb={0.25}>
                      <PersonOutlineIcon sx={{ fontSize: "0.85rem", color: "text.secondary" }} />
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem", fontWeight: 500 }}>
                        Created By
                      </Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ fontWeight: 500, fontSize: "0.75rem", color: "text.primary" }}>
                      {fp.CreatedBy || "N/A"}
                    </Typography>
                  </Box>

                  {/* Attended By */}
                  {fp.ReceivedBy && (
                    <Box>
                      <Stack direction="row" spacing={0.5} alignItems="center" mb={0.25}>
                        <PersonOutlineIcon sx={{ fontSize: "0.85rem", color: "text.secondary" }} />
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem", fontWeight: 500 }}>
                          Attended By
                        </Typography>
                      </Stack>
                      <Typography variant="body2" sx={{ fontWeight: 500, fontSize: "0.75rem", color: "text.primary" }}>
                        {fp.ReceivedBy}
                      </Typography>
                    </Box>
                  )}

                  {/* Date & Time */}
                  {fp.CallStart && fp.CallStart !== "1900-01-01T00:00:00" && (
                    <Box sx={{ gridColumn: { xs: "span 1", sm: "span 2" } }}>
                      <Stack direction="row" spacing={0.5} alignItems="center" mb={0.25}>
                        <CalendarTodayIcon sx={{ fontSize: "0.85rem", color: "text.secondary" }} />
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem", fontWeight: 500 }}>
                          Date & Time
                        </Typography>
                      </Stack>
                      <Typography variant="body2" sx={{ fontSize: "0.75rem", color: "text.primary" }}>
                        {new Date(fp.CallStart).toLocaleString("en-GB", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Paper>
            ))
          ) : (
            /* Styled Empty State */
            <Box
              sx={{
                py: 6,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                gap: 1.5,
              }}
            >
              <AssignmentTurnedInIcon sx={{ fontSize: "2.5rem", color: "text.disabled" }} />
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                No follow-up calls recorded.
              </Typography>
            </Box>
          )}
        </Box>
      </DialogContent>

      <Divider />

      {/* Dialog Actions */}
      <DialogActions sx={{ px: 3, py: 1.5 }}>
        <Button
          onClick={() => setFollowUpDialogOpen(false)}
          size="medium"
          variant="outlined"
          color="inherit"
          sx={{
            borderRadius: 1.5,
            px: 2.5,
            fontSize: "0.8rem",
            textTransform: "none",
            borderColor: "divider",
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}