import React from "react";
import { Box, Typography, Avatar, Paper, Chip } from "@mui/material";
import PhoneInTalkRoundedIcon from "@mui/icons-material/PhoneInTalkRounded";
import PhoneMissedRoundedIcon from "@mui/icons-material/PhoneMissedRounded";
import PhoneDisabledRoundedIcon from "@mui/icons-material/PhoneDisabledRounded";
import PhoneForwardedRoundedIcon from "@mui/icons-material/PhoneForwardedRounded";
import AttachmentPill from "./common/AttachmentPill";

// Modern Call Status Pill matching the compact call design
function CallStatusPill({
  type = "completed", // "completed" | "missed" | "failed" | "in_progress" | "forwarded"
  title = "Voice Call",
  subtitle = "You answered",
  duration,
}) {
  let iconBg = "#22C55E";
  let iconColor = "#FFFFFF";
  let IconComponent = PhoneInTalkRoundedIcon;

  if (type === "forwarded") {
    iconBg = "#3B82F6";
    IconComponent = PhoneForwardedRoundedIcon;
  } else if (type === "missed") {
    iconBg = "#EF4444";
    IconComponent = PhoneMissedRoundedIcon;
  } else if (type === "failed") {
    iconBg = "#64748B";
    IconComponent = PhoneDisabledRoundedIcon;
  } else if (type === "completed" || type === "in_progress") {
    iconBg = "#10B981";
    IconComponent = PhoneInTalkRoundedIcon;
  }

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1.2,
        bgcolor: "#E9EFF4",
        borderRadius: "14px",
        p: 1,
        px: 1.6,
        minWidth: 190,
        maxWidth: 340,
      }}
    >
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          bgcolor: iconBg,
          color: iconColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        }}
      >
        <IconComponent sx={{ fontSize: 17 }} />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 750,
            color: "#1E293B",
            lineHeight: 1.2,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: 11,
            color: "#64748B",
            fontWeight: 550,
            mt: 0.2,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {subtitle}
          {duration && duration !== "00:00:00" ? ` • ${duration}` : ""}
        </Typography>
      </Box>
    </Box>
  );
}

const getInitials = (name, fallback = "U") => {
  if (!name || typeof name !== "string") return fallback;
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

const SupportMessageItem = React.memo(function SupportMessageItem({ message }) {
  if (!message) return null;

  const rec = message.record || message.followup || {};
  const callerName =
    rec.callBy || rec.Caller || rec.company || message.callerName || "optigo carely";
  const agentName =
    rec.receivedBy ||
    rec.received_by ||
    rec.agent ||
    rec.handledBy ||
    rec.AssignedEmpName ||
    "Support Agent";
  const isSolved =
    (rec.status || message.status || "").toLowerCase() === "solved" ||
    (rec.Estatus || "").toLowerCase() === "completed";

  const agentInitials = getInitials(agentName, "SA");

  // 1. Primary Call Log Record -> Pill Card with Description Underneath
  if (message.isCallRecord || message.record) {
    const formatTimeStr = (raw) => {
      if (!raw || typeof raw !== "string" || raw.startsWith("1900")) return null;
      const timePart = raw.includes(" ") ? raw.split(" ")[1] : raw;
      if (!timePart || !timePart.includes(":")) return null;
      const parts = timePart.split(":");
      const h = parseInt(parts[0], 10);
      const m = parts[1] || "00";
      if (isNaN(h)) return timePart;
      const ampm = h >= 12 ? "PM" : "AM";
      const h12 = h % 12 || 12;
      return `${h12}:${m} ${ampm}`;
    };

    const startedTime =
      formatTimeStr(rec.callStart) || formatTimeStr(rec.time) || rec.time;
    const descText =
      rec.description || rec.topicRaisedBy || rec.RequirementRaised || "";
    const duration = rec.CallDuration || '';
    const hasNoDuration = !duration || duration === '00:00:00' || duration === '0:00';
    const hasDuration = !hasNoDuration;
    const callType = hasDuration ? 'completed' : 'missed';
    const subText = hasDuration
      ? `Duration: ${duration}`
      : rec.callStart && !rec.callStart.startsWith('1900')
      ? 'No one answered'
      : 'Support initiated';

    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 1.2,
          px: 3,
          my: 1.2,
        }}
      >
        <Avatar
          sx={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            bgcolor: "#0284C7",
            color: "#FFFFFF",
            fontSize: 11.5,
            fontWeight: 800,
            flexShrink: 0,
            mt: 0.2,
          }}
        >
          {agentInitials}
        </Avatar>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            maxWidth: "75%",
          }}
        >
          {/* Header Row */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 0.6 }}>
            <Typography sx={{ fontSize: 12, fontWeight: 800, color: "#0F172A" }}>
              {agentName}
            </Typography>
            <Chip
              label={`Primary Call #${rec.sr || rec.id || "1"}`}
              size="small"
              sx={{
                height: 18,
                fontSize: 9.5,
                fontWeight: 800,
                bgcolor: isSolved ? "#DCFCE7" : "#FEF3C7",
                color: isSolved ? "#166534" : "#D97706",
                border: isSolved ? "1px solid #BBF7D0" : "1px solid #FDE68A",
              }}
            />
            <Typography sx={{ fontSize: 10.5, color: "#94A3B8" }}>
              {message.time || startedTime}
            </Typography>
          </Box>

          {/* Call Status Pill */}
          <CallStatusPill
            type={callType}
            title={isSolved ? "Call Completed" : "Primary Call"}
            subtitle={subText}
          />

          {/* Description shown under the call pill */}
          {descText && descText !== "Primary Call" && (
            <Typography
              sx={{
                fontSize: 13,
                color: "#1E293B",
                fontWeight: 550,
                lineHeight: 1.45,
                mt: 0.8,
                px: 0.5,
              }}
            >
              {descText}
            </Typography>
          )}
        </Box>
      </Box>
    );
  }

  // 2. Follow-Up OR Forwarded Call Record Entry
  if (message.isFollowUp || message.isForwardCall || message.followup) {
    const fu = message.followup || {};
    const agent =
      fu.CreatedBy ||
      fu.ReceivedBy ||
      fu.receivedBy ||
      fu.handledBy ||
      rec.receivedBy ||
      "Support Agent";
    const fuInitials = getInitials(agent, "SA");
    const remarks =
      fu.remarks || fu.Description || fu.description || fu.FollowUpRemarks || "";
    const duration = fu.CallDuration || "";
    const isZeroDuration = duration === "00:00:00" || duration === "0:00";
    const isForward = Boolean(
      message.isForwardCall ||
      fu.IsForwardFollowup === 1 ||
      fu.IsForwardFollowup === "1" ||
      fu.isForwardFollowup === 1 ||
      fu.isForwardFollowup === true
    );

    let callType = "completed";
    let chipLabel = `Follow-Up #${fu.Id || "1"}`;
    let chipBg = "#CCFBF1";
    let chipColor = "#0F766E";
    let chipBorder = "1px solid #99F6E4";
    let pillTitle = `Follow-Up #${fu.Id || "1"}`;
    let subText = "Follow-up call";

    if (isForward) {
      callType = "forwarded";
      chipLabel = `Forwarded Call #${fu.Id || "1"}`;
      chipBg = "#EFF6FF";
      chipColor = "#1D4ED8";
      chipBorder = "1px solid #BFDBFE";
      pillTitle = fu.Reason || "Forwarded Call";
      subText = fu.ForwardedEmp ? `Forwarded to ${fu.ForwardedEmp}` : "Forwarded Call";
    } else if (isZeroDuration) {
      callType = "missed";
      subText = fu.InternalStatus || "No one answered";
    } else if (duration) {
      subText = `Duration: ${duration}`;
    } else if (fu.InternalStatus) {
      subText = fu.InternalStatus;
    }

    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 1.2,
          px: 3,
          my: 1.2,
        }}
      >
        <Avatar
          sx={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            bgcolor: isForward ? "#3B82F6" : "#0D9488",
            color: "#FFFFFF",
            fontSize: 11,
            fontWeight: 800,
            flexShrink: 0,
            mt: 0.2,
          }}
        >
          {fuInitials}
        </Avatar>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            maxWidth: "75%",
          }}
        >
          {/* Header Row */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 0.5 }}>
            <Typography sx={{ fontSize: 12, fontWeight: 800, color: "#0F172A" }}>
              {agent}
            </Typography>
            <Chip
              label={chipLabel}
              size="small"
              sx={{
                height: 18,
                fontSize: 9.5,
                fontWeight: 800,
                bgcolor: chipBg,
                color: chipColor,
                border: chipBorder,
              }}
            />
            <Typography sx={{ fontSize: 10.5, color: "#94A3B8" }}>
              {message.time || fu.CallStart || "12:00 PM"}
            </Typography>
          </Box>

          {/* Follow-up / Forwarded Call Status Pill */}
          <CallStatusPill
            type={callType}
            title={pillTitle}
            subtitle={subText}
            duration={duration}
          />

          {/* Remarks/Description shown under the pill */}
          {remarks && (
            <Typography
              sx={{
                fontSize: 13,
                color: "#1E293B",
                fontWeight: 550,
                lineHeight: 1.45,
                mt: 0.8,
                px: 0.5,
              }}
            >
              {remarks}
            </Typography>
          )}
        </Box>
      </Box>
    );
  }

  // 3. Comments & Notes -> Client on RIGHT (callerName) vs Agent on LEFT
  if (message.isComment || message.isOutgoing) {
    const isClient = Boolean(message.isClientComment || message.isOutgoing);
    const authorName = isClient
      ? (callerName || "optigo carely")
      : (message.sender || agentName || "Support Agent");
    const initials = getInitials(authorName, isClient ? "OC" : "SA");

    // Client Comment -> RIGHT Side (Always shows the person / client name e.g. optigo carely)
    if (isClient) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-start",
            gap: 1.2,
            px: 3,
            py: 0.8,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              maxWidth: "75%",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 0.4 }}>
              <Typography sx={{ fontSize: 10.5, color: "#94A3B8" }}>
                {message.time}
              </Typography>
              <Typography sx={{ fontSize: 12, fontWeight: 800, color: "#0F172A" }}>
                {authorName}
              </Typography>
            </Box>

            <Paper
              elevation={0}
              sx={{
                p: 1.6,
                px: 2,
                bgcolor: "#FFFFFF",
                color: "#0F172A",
                border: "1px solid #E2E8F0",
                borderRadius: "20px 20px 4px 20px",
                boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)",
              }}
            >
              <Typography
                sx={{
                  fontSize: 13,
                  color: "#0F172A",
                  lineHeight: 1.45,
                  whiteSpace: "pre-wrap",
                }}
              >
                {message.content}
              </Typography>
              {message.attachment && (
                <Box sx={{ mt: 1 }}>
                  <AttachmentPill attachment={message.attachment} />
                </Box>
              )}
            </Paper>
          </Box>

          <Avatar
            sx={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              bgcolor: "#4F46E5",
              color: "#FFFFFF",
              fontSize: 11,
              fontWeight: 800,
              flexShrink: 0,
              mt: 0.2,
            }}
          >
            {initials}
          </Avatar>
        </Box>
      );
    }

    // Agent Comment -> LEFT Side
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 1.2,
          px: 3,
          py: 0.8,
        }}
      >
        <Avatar
          sx={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            bgcolor: "#0284C7",
            color: "#FFFFFF",
            fontSize: 11,
            fontWeight: 800,
            flexShrink: 0,
            mt: 0.2,
          }}
        >
          {initials}
        </Avatar>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            maxWidth: "75%",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 0.4 }}>
            <Typography sx={{ fontSize: 12, fontWeight: 800, color: "#0F172A" }}>
              {authorName}
            </Typography>
            <Typography sx={{ fontSize: 10.5, color: "#94A3B8" }}>
              {message.time}
            </Typography>
          </Box>

          <Paper
            elevation={0}
            sx={{
              p: 1.6,
              px: 2,
              bgcolor: "#FFFFFF",
              color: "#0F172A",
              border: "1px solid #E2E8F0",
              borderRadius: "4px 20px 20px 20px",
              boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)",
            }}
          >
            <Typography
              sx={{
                fontSize: 13,
                color: "#0F172A",
                lineHeight: 1.45,
                whiteSpace: "pre-wrap",
              }}
            >
              {message.content}
            </Typography>
            {message.attachment && (
              <Box sx={{ mt: 1 }}>
                <AttachmentPill attachment={message.attachment} />
              </Box>
            )}
          </Paper>
        </Box>
      </Box>
    );
  }

  return null;
});

export default SupportMessageItem;
