import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Button,
  Paper,
  Tabs,
  Tab,
  List,
  ListItem,
  Badge,
} from "@mui/material";
import {
  ChevronLeft,
  MoreHoriz,
  ArrowForward,
  BookmarkBorder,
  AddCircle,
  PictureAsPdf,
  TableChart,
  Image,
  VideoCameraBack,
  FolderZip,
  CheckCircleRounded,
  InfoOutlined,
} from "@mui/icons-material";
import { ELVEE_SUPPORT_TEAM } from "./chatData";

const ATTACHMENTS_LIST = [
  {
    id: "att-1",
    name: "System_Architecture_Doc.pdf",
    type: "PDF Document",
    size: "2.4 MB",
    icon: PictureAsPdf,
    iconColor: "#E53935",
    bgColor: "#FFEBEE",
  },
  {
    id: "att-2",
    name: "Account_Telemetry_Q3.xlsx",
    type: "Excel Spreadsheet",
    size: "1.8 MB",
    icon: TableChart,
    iconColor: "#2E7D32",
    bgColor: "#E8F5E9",
  },
  {
    id: "att-3",
    name: "Diagnostic_Screenshot_01.png",
    type: "PNG Image",
    size: "3.2 MB",
    icon: Image,
    iconColor: "#0288D1",
    bgColor: "#E1F5FE",
  },
  {
    id: "att-4",
    name: "Workflow_Demo_Recording.mp4",
    type: "MP4 Video",
    size: "14.5 MB",
    icon: VideoCameraBack,
    iconColor: "#7B1FA2",
    bgColor: "#F3E5F5",
  },
  {
    id: "att-5",
    name: "Logs_Audit_Export.zip",
    type: "ZIP Archive",
    size: "8.1 MB",
    icon: FolderZip,
    iconColor: "#F57C00",
    bgColor: "#FFF3E0",
  },
];

const ElveeSupportDrawer = ({ isOpen, onClose }) => {
  const [tabIndex, setTabIndex] = useState(0); // 0 = Members (by default active), 1 = Attachments, 2 = Media

  if (!isOpen) return null;

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        zIndex: 100,
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        animation: "slideInRight 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        "@keyframes slideInRight": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          height: "100%",
          borderRadius: "0px",
          display: "flex",
          flexDirection: "column",
          bgcolor: "#ffffff",
          position: "relative",
        }}
      >
        {/* Top Header Controls */}
        <Box
          sx={{
            px: 2,
            pt: { xs: "32px", sm: 1.5 },
            pb: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{ bgcolor: "#f6f7f8", width: 38, height: 38 }}
          >
            <ChevronLeft sx={{ color: "#1b3a1e", fontSize: 24 }} />
          </IconButton>
          <IconButton sx={{ bgcolor: "#f6f7f8", width: 38, height: 38 }}>
            <MoreHoriz sx={{ color: "#1b3a1e", fontSize: 24 }} />
          </IconButton>
        </Box>

        {/* Scrollable Content Area */}
        <Box sx={{ flex: 1, overflowY: "auto", px: 2, pt: 1 }}>
          {/* Profile Info Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 2,
            }}
          >
            {/* Avatar with Plus Badge */}
            <Box sx={{ position: "relative" }}>
              <Avatar
                src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=100&auto=format&fit=crop&q=80"
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: "#f4e8c1",
                  border: "2px solid #fff",
                }}
              />
              <AddCircle
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  color: "#a40edfff",
                  bgcolor: "#fff",
                  borderRadius: "50%",
                  fontSize: 24,
                }}
              />
            </Box>
          </Box>

          {/* User Details */}
          <Typography
            sx={{
              fontSize: 28,
              fontWeight: 800,
              color: "#1b3a1e",
              lineHeight: 1.1,
            }}
          >
            Optigo Support
          </Typography>
          <Typography
            sx={{ fontSize: 15, fontWeight: 600, color: "#5c695d", mt: 0.5 }}
          >
            Elvee.in
          </Typography>

          {/* Members Count & Action Button */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 2.5,
              mb: 3,
            }}
          >
            <Box sx={{ display: "flex", gap: 3 }}>
              <Box>
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: 18,
                    color: "#a40edfff",
                    lineHeight: 1,
                  }}
                >
                  {ELVEE_SUPPORT_TEAM.length}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 13,
                    color: "#a40edfff",
                    fontWeight: 500,
                    mt: 0.3,
                  }}
                >
                  Members
                </Typography>
              </Box>
            </Box>

            <Button
              variant="contained"
              disableElevation
              sx={{
                bgcolor: "#8604b9f6",
                color: "#fff",
                borderRadius: 20,
                px: 3.5,
                py: 0.8,
                textTransform: "none",
                fontWeight: 700,
                fontSize: 15,
                "&:hover": { bgcolor: "#6b0296" },
              }}
            >
              Call Us
            </Button>
          </Box>

          {/* Stats Cards: Solved Queries & Saved Items */}
          <Box sx={{ display: "flex", gap: 1.5, mb: 3 }}>
            {/* Card 1: Solved Queries */}
            <Paper
              elevation={0}
              sx={{
                flex: 1,
                bgcolor: "#f5f6f5",
                p: 1.5,
                borderRadius: 2.5,
                display: "flex",
                flexDirection: "column",
                justify: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{ fontWeight: 700, fontSize: 14, color: "#a40edfff" }}
                >
                  Solved Queries
                </Typography>
                <CheckCircleRounded sx={{ fontSize: 18, color: "#10B981" }} />
              </Box>
              <Box sx={{ mt: 1.5 }}>
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: 32,
                    color: "#a40edfff",
                    lineHeight: 1,
                  }}
                >
                  579
                </Typography>
                <Typography
                  sx={{
                    fontSize: 12,
                    color: "#5c695d",
                    fontWeight: 500,
                    mt: 0.5,
                  }}
                >
                  Queries Solved
                </Typography>
              </Box>
            </Paper>

            {/* Card 2: Saved Files */}
            <Paper
              elevation={0}
              sx={{
                flex: 1,
                bgcolor: "#f5f6f5",
                p: 1.5,
                borderRadius: 2.5,
                display: "flex",
                flexDirection: "column",
                justify: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{ fontWeight: 700, fontSize: 14, color: "#a40edfff" }}
                >
                  Saved Files
                </Typography>
                <BookmarkBorder sx={{ fontSize: 18, color: "#a40edfff" }} />
              </Box>
              <Box sx={{ mt: 1.5 }}>
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: 32,
                    color: "#a40edfff",
                    lineHeight: 1,
                  }}
                >
                  36
                </Typography>
                <Typography
                  sx={{
                    fontSize: 12,
                    color: "#5c695d",
                    fontWeight: 500,
                    mt: 0.5,
                  }}
                >
                  Saved Items
                </Typography>
              </Box>
            </Paper>
          </Box>

          {/* Tabs Row */}
          <Box sx={{ borderBottom: 1, borderColor: "#e5e7e5", mb: 2 }}>
            <Tabs
              value={tabIndex}
              onChange={(e, val) => setTabIndex(val)}
              variant="scrollable"
              scrollButtons={false}
              TabIndicatorProps={{
                style: { backgroundColor: "#a40edfff", height: 3 },
              }}
            >
              <Tab
                label="Members"
                sx={{
                  textTransform: "none",
                  fontWeight: tabIndex === 0 ? 700 : 500,
                  fontSize: 15,
                  color: tabIndex === 0 ? "#a40edfff" : "#777",
                }}
              />
              <Tab
                label="Attachments"
                sx={{
                  textTransform: "none",
                  fontWeight: tabIndex === 1 ? 700 : 500,
                  fontSize: 15,
                  color: tabIndex === 1 ? "#a40edfff" : "#777",
                }}
              />
              <Tab
                label="Media"
                sx={{
                  textTransform: "none",
                  fontWeight: tabIndex === 2 ? 700 : 500,
                  fontSize: 15,
                  color: tabIndex === 2 ? "#a40edfff" : "#777",
                }}
              />
            </Tabs>
          </Box>

          {/* TAB 0: MEMBERS LIST (Exact Card UI matching Reference Screenshot) */}
          {tabIndex === 0 && (
            <Box sx={{ pb: 3 }}>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#65676b",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  mb: 1.5,
                }}
              >
                Active Members ({ELVEE_SUPPORT_TEAM.length})
              </Typography>

              <List disablePadding sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {ELVEE_SUPPORT_TEAM.map((agent) => (
                  <ListItem
                    key={agent.id}
                    sx={{
                      bgcolor: "#ffffff",
                        border: "1px solid #f0f2f5",
                        borderRadius: "4px",
                        p: 1.75,
                        px: 2,
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flex: 1 }}>
                      <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        variant="dot"
                        sx={{
                          "& .MuiBadge-badge": {
                            backgroundColor:
                              agent.status === "online"
                                ? "#10B981"
                                : agent.status === "away"
                                ? "#F59E0B"
                                : "#94A3B8",
                            boxShadow: "0 0 0 2px #FFFFFF",
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                          },
                        }}
                      >
                        <Avatar src={agent.avatar} alt={agent.name} sx={{ width: 46, height: 46 }} />
                      </Badge>

                      <Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                          <Typography sx={{ fontWeight: 700, fontSize: "0.98rem", color: "#0F172A" }}>
                            {agent.name}
                          </Typography>
                          <InfoOutlined sx={{ fontSize: 16, color: "#64748B" }} />
                        </Box>
                        <Typography sx={{ fontSize: "0.82rem", color: "#64748B", mt: 0.2 }}>
                          {agent.role}
                        </Typography>
                      </Box>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          {/* TAB 1: ATTACHMENTS LIST (Exact Card UI matching Reference Screenshot) */}
          {tabIndex === 1 && (
            <Box sx={{ pb: 3 }}>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#65676b",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  mb: 1.5,
                }}
              >
                Shared Attachments ({ATTACHMENTS_LIST.length})
              </Typography>

              <List disablePadding sx={{ display: "flex", flexDirection: "column", gap: .5 }}>
                {ATTACHMENTS_LIST.map((att) => {
                  const IconComp = att.icon;
                  return (
                    <ListItem
                      key={att.id}
                      sx={{
                        bgcolor: "#ffffff",
                        border: "1px solid #f0f2f5",
                        borderRadius: "4px",
                        p: 1.75,
                        px: 2,
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flex: 1, overflow: "hidden" }}>
                        <Avatar
                          sx={{
                            bgcolor: att.bgColor,
                            width: 46,
                            height: 46,
                            borderRadius: "50%",
                          }}
                        >
                          <IconComp sx={{ color: att.iconColor, fontSize: 24 }} />
                        </Avatar>

                        <Box sx={{ overflow: "hidden", pr: 1 }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                            <Typography sx={{ fontWeight: 700, fontSize: "0.94rem", color: "#0F172A" }} noWrap>
                              {att.name}
                            </Typography>
                            <InfoOutlined sx={{ fontSize: 16, color: "#64748B", flexShrink: 0 }} />
                          </Box>
                          <Typography sx={{ fontSize: "0.82rem", color: "#64748B", mt: 0.2 }}>
                            {att.type} • {att.size}
                          </Typography>
                        </Box>
                      </Box>

                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => alert(`Downloading ${att.name}...`)}
                        sx={{
                          borderRadius: 20,
                          borderColor: "#0F172A",
                          color: "#0F172A",
                          fontWeight: 700,
                          fontSize: "0.84rem",
                          textTransform: "none",
                          px: 2.5,
                          py: 0.5,
                          minWidth: 70,
                          flexShrink: 0,
                          "&:hover": {
                            borderColor: "#a40edfff",
                            color: "#a40edfff",
                            bgcolor: "rgba(164, 14, 223, 0.04)",
                          },
                        }}
                      >
                        Download
                      </Button>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          )}

          {/* TAB 2: MEDIA */}
          {tabIndex === 2 && (
            <Box sx={{ pb: 3 }}>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#65676b",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  mb: 1.5,
                }}
              >
                Media & Photos (2)
              </Typography>

              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}>
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=80"
                  sx={{ width: "100%", height: 130, objectFit: "cover", borderRadius: 3 }}
                />
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=500&auto=format&fit=crop&q=80"
                  sx={{ width: "100%", height: 130, objectFit: "cover", borderRadius: 3 }}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default ElveeSupportDrawer;
