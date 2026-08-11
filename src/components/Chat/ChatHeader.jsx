import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import { ChevronRight, Search } from "@mui/icons-material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const ChatHeader = ({
  isFullscreen,
  onToggleFullscreen,
  isDrawerOpen,
  onToggleDrawer,
  onCloseChat,
}) => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        color: "#0F172A",
        borderRadius: "0px !important",
        zIndex: 10,
        bgcolor: "#fff",
        borderBottom: "1px solid #f0f0f0",
        px: "6px !important",
      }}
    >
      <Toolbar
        sx={{
          width: "100%",
          px: "6px !important",
          minHeight: "58px !important",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }} onClick={onToggleDrawer}>
            <Avatar
              src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=100&auto=format&fit=crop&q=80"
              sx={{ width: 34, height: 34 }}
            />
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 17,
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              Optigo Support{" "}
              <ChevronRight sx={{ fontSize: 18, color: "#888" }} />
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 0.5 }}>
            <IconButton sx={{ bgcolor: "#f5f5f5" }} size="medium">
              <Search sx={{ color: "#333", fontSize: 22 }} />
            </IconButton>
            <IconButton
              sx={{ bgcolor: "#f5f5f5" }}
              size="medium"
              onClick={onCloseChat}
            >
              <CloseRoundedIcon sx={{ color: "#333", fontSize: 22 }} />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ChatHeader;
