import React from "react";
import { Box, Typography, Chip, Tooltip } from "@mui/material";

export default function VersionBadge({ collapsed = false, sx = {} }) {
  let currentVer = "v1";
  try {
    // Relative to components/default/
    const versionData = require("../../version.json");
    currentVer = versionData?.version || "v1";
  } catch (_) {
    currentVer = process.env.REACT_APP_VERSION || "v1";
  }

  const isV1 = currentVer.toLowerCase() === "v1";

  const content = (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: collapsed ? "center" : "flex-start",
        px: collapsed ? 0.75 : 1.1,
        py: 0.35,
        mx: 0.5,
        borderRadius: "20px",
        bgcolor: (theme) =>
          theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, 0.08)"
            : "rgba(0, 0, 0, 0.04)",
        border: "1px solid",
        borderColor: (theme) =>
          theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, 0.12)"
            : "rgba(0, 0, 0, 0.08)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "default",
        userSelect: "none",
        ...sx,
      }}
    >
      <Box
        sx={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          bgcolor: isV1 ? "#10b981" : "#3b82f6",
          boxShadow: isV1 ? "0 0 6px #10b981" : "0 0 6px #3b82f6",
          flexShrink: 0,
          mr: collapsed ? 0 : 0.7,
        }}
      />
      {!collapsed && (
        <Typography
          variant="caption"
          sx={{
            fontWeight: 700,
            fontSize: "11px",
            color: "text.secondary",
            letterSpacing: "0.4px",
            textTransform: "uppercase",
            mr: 0.6,
          }}
        >
          Version
        </Typography>
      )}
      {!collapsed && (
        <Chip
          label={currentVer}
          size="small"
          sx={{
            height: 18,
            fontSize: "10px",
            fontWeight: 800,
            background: isV1
              ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
              : "linear-gradient(135deg, #c207ab 0%, #4510d6 100%)",
            color: "#fff",
            borderRadius: "9px",
            px: 0.2,
          }}
        />
      )}
    </Box>
  );

  return (
    <Tooltip title={`Optigo Support System: Active Version ${currentVer}`} arrow>
      {content}
    </Tooltip>
  );
}
