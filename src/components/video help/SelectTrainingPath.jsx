import React, { useState, useMemo, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  Container,
  Paper,
  IconButton,
  Checkbox,
  LinearProgress,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import FactoryRoundedIcon from "@mui/icons-material/FactoryRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "@fontsource-variable/manrope";
import { useQueryState } from "nuqs";
import { motion, AnimatePresence } from "framer-motion";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";

const cardsData = [
  {
    title: "Wholesaler",
    roleKey: "wholesaler",
    desc: "Learn how to manage bulk orders, handle supplier pricing, and streamline large-scale distribution workflows efficiently.",
    type: "purple",
    primaryAction: "Start Training",
    icon: <BoltRoundedIcon sx={{ color: "#6941C6" }} />,
    path: "./Wholesaler.json",
  },

  {
    title: "Factory",
    roleKey: "factory",
    desc: "Explore production workflows, material management, order processing, and coordination between manufacturing units.",
    type: "green",
    primaryAction: "Start Training",
    icon: <FactoryRoundedIcon sx={{ color: "#f1b32bff" }} />,
    path: "./factory.json",
  },
  {
    title: "Retailer",
    roleKey: "retailer",
    desc: "Understand day-to-day sales operations, customer handling, billing processes, and inventory tracking for retail stores.",
    type: "grey",
    primaryAction: "Coming Soon",
    icon: <FlashOnIcon sx={{ color: "#667085" }} />,
    path: "",
  },
  {
    title: "iCatalog",
    roleKey: "icatalog",
    desc: "Create and manage digital catalogs, showcase products visually, and share them with customers instantly.",
    type: "blue",
    primaryAction: "Coming Soon",
    icon: <BoltRoundedIcon sx={{ color: "#175CD3" }} />,
    path: "",
  },
  {
    title: "Waba Chat",
    roleKey: "wabachat",
    desc: "Sell directly through WhatsApp by sharing catalogs, handling inquiries, and converting chats into orders.",
    type: "waba",
    primaryAction: "Coming Soon",
    icon: <FlashOnIcon sx={{ color: "#16A34A" }} />,
    path: "",
  },
  {
    title: "Evo App",
    roleKey: "evoapp",
    desc: "Learn how to use Evo app features for business automation, insights, and faster operations.",
    type: "purple",
    primaryAction: "Coming Soon",
    icon: <BoltRoundedIcon sx={{ color: "#7F56D9" }} />,
    path: "",
  },
  {
    title: "ProCatalog",
    roleKey: "procatalog",
    desc: "Build advanced product catalogs with pricing tiers, branding, and professional layouts.",
    type: "orange",
    primaryAction: "Coming Soon",
    icon: <FactoryRoundedIcon sx={{ color: "#EA580C" }} />,
    path: "",
  },
  {
    title: "Sales Rep App",
    roleKey: "salesrep",
    desc: "Empower your sales team with tools for order booking, tracking visits, and managing customer relationships.",
    type: "pink",
    primaryAction: "Coming Soon",
    icon: <FlashOnIcon sx={{ color: "#DB2777" }} />,
    path: "",
  },
];

const cardStyles = {
  purple: {
    border: "1px solid #E9D7FE",
    mainBg: "#FFFFFF",
    footerBg: "#F9F5FF",
    titleColor: "#6941C6",
    iconBg: "#F4EBFF",
  },
  grey: {
    border: "1px solid #EAECF0",
    mainBg: "#FFFFFF",
    footerBg: "#F9FAFB",
    titleColor: "#1D2939",
    iconBg: "#F2F4F7",
  },
  green: {
    border: "2px solid #ffdd9563",
    mainBg: "#FFFFFF",
    footerBg: "#f0d59b48",
    titleColor: "#f1b32bff",
    iconBg: "#f1b22b3f",
  },
  waba: {
    border: "1px solid #D1FADF",
    mainBg: "#FFFFFF",
    footerBg: "#ECFDF3",
    titleColor: "#027A48",
    iconBg: "#D1FADF",
  },
  // 🔥 NEW PASTEL TYPES

  blue: {
    border: "1px solid #D1E9FF",
    mainBg: "#FFFFFF",
    footerBg: "#EFF8FF",
    titleColor: "#175CD3",
    iconBg: "#D1E9FF",
  },

  orange: {
    border: "1px solid #FFEAD5",
    mainBg: "#FFFFFF",
    footerBg: "#FFF6ED",
    titleColor: "#C4320A",
    iconBg: "#FFEAD5",
  },

  pink: {
    border: "1px solid #FADADD",
    mainBg: "#FFFFFF",
    footerBg: "#FFF1F3",
    titleColor: "#C11574",
    iconBg: "#FADADD",
  },
};

const TrainingCard = ({ item, onSelect }) => {
  const styles = cardStyles[item.type];

  return (
    <Paper
      elevation={0}
      onClick={() =>
        item.primaryAction !== "Coming Soon" && onSelect(item.roleKey)
      }
      sx={{
        borderRadius: "12px",
        border: styles.border,
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0px 12px 16px -4px rgba(16, 24, 40, 0.08)",
        },
      }}
    >
      <Box
        sx={{
          p: 3,
          bgcolor: styles.mainBg,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ pr: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: styles.titleColor,
              mb: 1,
              fontSize: "1.1rem",
            }}
          >
            {item.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#667085", lineHeight: 1.5, fontSize: "0.875rem" }}
          >
            {item.desc}
          </Typography>
        </Box>
        <Box
          sx={{
            minWidth: 48,
            height: 48,
            borderRadius: "50%",
            bgcolor: styles.iconBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: "rotate(5deg)",
            flexShrink: 0,
          }}
        >
          {item.icon}
        </Box>
      </Box>
      <Box
        sx={{
          p: "12px 24px",
          bgcolor: styles.footerBg,
          display: "flex",
          alignItems: "center",
          gap: 3,
          borderTop: styles.border,
        }}
      >
        <Button
          variant="contained"
          size="small"
          startIcon={
            item.primaryAction === "Coming Soon" ? (
              <HelpRoundedIcon />
            ) : (
              <ArrowForwardIcon />
            )
          }
          onClick={(e) => {
            e.stopPropagation();
            if (item.primaryAction !== "Coming Soon") {
              onSelect(item.roleKey);
            }
          }}
          sx={{
            bgcolor: "#FFFFFF",
            color: "#344054",
            textTransform: "none",
            fontWeight: 600,
            borderRadius: "8px",
            boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
            border: "1px solid #D0D5DD",
            cursor:
              item.primaryAction === "Coming Soon" ? "not-allowed" : "pointer",
            "&:hover": { bgcolor: "#F9FAFB", boxShadow: "none" },
          }}
        >
          {item.primaryAction}
        </Button>
      </Box>
    </Paper>
  );
};

// ─── Checklist Data & Components ──────────────────────────────────────────────
const checklistData = [
  {
    title: "Opening Stock",
    subItems: ["Diamond", "Color stone", "Gold", "Silver"],
  },
  {
    title: "User Master",
    subItems: ["Customer", "Vendors", "Employees"],
  },
  {
    title: "Design Master",
    subItems: [],
  },
  {
    title: "Opening account Balance",
    subItems: ["Customer", "Vendors", "Employees"],
  },
  {
    title: "Finished Goods",
    subItems: ["On Hand & Pending to Deliver"],
  },
  {
    title: "Stationery & Print formats",
    subItems: [
      "Tag format",
      "Sale Invoice print format",
      "Memovoucher print format",
      "Quotation/Estimate print format",
    ],
  },
  {
    title: "Hardware",
    subItems: ["Label printer (for tag print)", "Bar-code/QR Code Scanners"],
  },
  {
    title: "Price Masters",
    subItems: ["Diamond", "Color Stone", "Labour", "Setting"],
  },
  {
    title: "Bill Prefix (Bill number series)",
    subItems: [],
  },
  {
    title: "Logo Upload",
    subItems: [],
  },
];

const getTotalChecklistItems = () => {
  let total = 0;
  checklistData.forEach((item) => {
    if (item.subItems && item.subItems.length > 0) {
      total += item.subItems.length;
    } else {
      total += 1;
    }
  });
  return total;
};

const emojis = ["🎉", "🔥", "🚀", "✨", "👏", "🥳", "🌟"];

const FloatingEmoji = ({ triggerCount }) => {
  const [show, setShow] = useState(false);
  const [emoji, setEmoji] = useState("✨");
  const prevCount = React.useRef(triggerCount);

  useEffect(() => {
    if (triggerCount > prevCount.current) {
      setEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
      setShow(true);
      const timer = setTimeout(() => setShow(false), 1000);
      prevCount.current = triggerCount;
      return () => clearTimeout(timer);
    } else {
      prevCount.current = triggerCount;
    }
  }, [triggerCount]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], y: -30, scale: [0.5, 1.5, 1] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            position: "absolute",
            zIndex: 10,
            pointerEvents: "none",
            fontSize: "1.5rem",
            right: 20,
            top: 10,
          }}
        >
          {emoji}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ChecklistSidebar = () => {
  const [checkedItems, setCheckedItems] = useState({});
  const [expandedItems, setExpandedItems] = useState({});

  const totalTasks = useMemo(() => getTotalChecklistItems(), []);
  const completedTasks = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((completedTasks / totalTasks) * 100) || 0;

  const handleToggleCheck = (key) => {
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleItem = (key) => {
    setExpandedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Box sx={{ p: 3, position: "relative" }}>
      <FloatingEmoji triggerCount={completedTasks} />
      <Typography
        variant="h6"
        sx={{ fontWeight: 800, mb: 1, color: "#101828" }}
      >
        Setup Progress
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            color: "#344054",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {progressPercent}% Completed
          <AnimatePresence>
            {progressPercent === 100 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                style={{ display: "inline-block" }}
              >
                🏆
              </motion.span>
            )}
          </AnimatePresence>
        </Typography>
        <Typography variant="body2" sx={{ color: "#667085" }}>
          {completedTasks} / {totalTasks}
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={progressPercent}
        sx={{
          mb: 4,
          height: 8,
          borderRadius: 4,
          bgcolor: "#EAECF0",
          "& .MuiLinearProgress-bar": { bgcolor: "#16A34A", borderRadius: 4 },
        }}
      />

      <Box>
        {checklistData.map((item, iIdx) => {
          const itemKey = `i${iIdx}`;
          const hasSub = item.subItems && item.subItems.length > 0;

          const isChecked = hasSub
            ? item.subItems.every(
                (_, subIdx) => checkedItems[`${itemKey}-sub${subIdx}`],
              )
            : !!checkedItems[itemKey];

          return (
            <Box key={iIdx} sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                {!hasSub && (
                  <Checkbox
                    size="small"
                    checked={isChecked}
                    icon={<CheckCircleOutlineIcon fontSize="small" />}
                    checkedIcon={<CheckCircleIcon fontSize="small" />}
                    onChange={() => handleToggleCheck(itemKey)}
                    sx={{
                      p: 0.5,
                      mr: 1,
                      color: "#D0D5DD",
                      "&.Mui-checked": { color: "#16A34A" },
                    }}
                  />
                )}
                <Typography
                  variant="subtitle2"
                  onClick={() =>
                    hasSub ? toggleItem(itemKey) : handleToggleCheck(itemKey)
                  }
                  sx={{
                    fontWeight: 600,
                    color: "#101828",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    mt: hasSub ? 0.5 : 0.5,
                    ml: hasSub ? 0 : 0,
                  }}
                >
                  {hasSub &&
                    (expandedItems[itemKey] ? (
                      <KeyboardArrowUpIcon
                        fontSize="small"
                        sx={{ mr: 0.5, color: "#667085" }}
                      />
                    ) : (
                      <KeyboardArrowDownIcon
                        fontSize="small"
                        sx={{ mr: 0.5, color: "#667085" }}
                      />
                    ))}
                  {`${iIdx + 1}. ${item.title}`}
                </Typography>
              </Box>

              <AnimatePresence>
                {hasSub && expandedItems[itemKey] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ overflow: "hidden" }}
                  >
                    <Box
                      sx={{
                        pl: 3.5,
                        mt: 0.5,
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.5,
                      }}
                    >
                      {item.subItems.map((subItem, subIdx) => {
                        const subKey = `${itemKey}-sub${subIdx}`;
                        return (
                          <Box
                            key={subIdx}
                            sx={{ display: "flex", alignItems: "flex-start" }}
                          >
                            <Checkbox
                              size="small"
                              checked={!!checkedItems[subKey]}
                              icon={<CheckCircleOutlineIcon fontSize="small" />}
                              checkedIcon={<CheckCircleIcon fontSize="small" />}
                              onChange={() => handleToggleCheck(subKey)}
                              sx={{
                                p: 0.5,
                                mr: 1,
                                color: "#D0D5DD",
                                "&.Mui-checked": { color: "#16A34A" },
                              }}
                            />
                            <Typography
                              variant="caption"
                              onClick={() => handleToggleCheck(subKey)}
                              sx={{
                                color: "#475467",
                                cursor: "pointer",
                                fontWeight: 500,
                                mt: 0.5,
                                lineHeight: 1.4,
                              }}
                            >
                              {subItem}
                            </Typography>
                          </Box>
                        );
                      })}
                    </Box>
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

// ─── SelectTrainingPath ───────────────────────────────────────────────────────
const SelectTrainingPath = () => {
  const [, setRole] = useQueryState("role");

  const handleSelect = (roleKey) => {
    setRole(roleKey, { history: "push" });
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        bgcolor: "#f9fafb",
        boxSizing: "border-box",
        p: 1,
      }}
    >
      {/* Left Sticky Sidebar for Checklist */}
      {/* <Box
                sx={{
                    width: 320,
                    position: 'sticky',
                    top: 0,
                    height: '100vh',
                    overflowY: 'auto',
                    border: '1px solid #EAECF0',
                    bgcolor: '#fff',
                    display: { xs: 'none', md: 'block' },
                    flexShrink: 0,
                    '&::-webkit-scrollbar': { width: 4 },
                    '&::-webkit-scrollbar-thumb': { bgcolor: '#E5E7EB', borderRadius: 4 },
                    borderRadius: 4
                }}
            >
                <ChecklistSidebar />
            </Box> */}

      {/* Right Main Content */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Container
          maxWidth="lg"
          sx={{
            py: 8,
            fontFamily: "Manrope Variable, sans-serif",
            minHeight: "70vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ mb: 4, textAlign: "center" }}>
            {/* 🔵 Scribble Label */}
            <Box sx={{ position: "relative", display: "inline-flex" }}>
              <Typography
                sx={{
                  fontSize: 25,
                  fontWeight: 700,
                  letterSpacing: 1.2,
                  color: "#2563eb",
                  textTransform: "uppercase",
                }}
              >
                Getting Started
                <IconButton
                  key={"Quick Start"}
                  size="small"
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    borderColor: "#0c66f5ff",
                    color: "#344054",
                    bgcolor: "#fff",
                    transition: "all 0.2s ease",
                    position: "absolute",
                    transform: "rotate(335deg)",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#0c66f5ff"
                      d="M13.435 2.075a3.33 3.33 0 0 0-2.87 0c-.394.189-.755.497-1.26.928l-.079.066a2.56 2.56 0 0 1-1.58.655l-.102.008c-.662.053-1.135.09-1.547.236a3.33 3.33 0 0 0-2.03 2.029c-.145.412-.182.885-.235 1.547l-.008.102a2.56 2.56 0 0 1-.655 1.58l-.066.078c-.431.506-.74.867-.928 1.261a3.33 3.33 0 0 0 0 2.87c.189.394.497.755.928 1.26l.066.079c.41.48.604.939.655 1.58l.008.102c.053.662.09 1.135.236 1.547a3.33 3.33 0 0 0 2.029 2.03c.412.145.885.182 1.547.235l.102.008c.629.05 1.09.238 1.58.655l.078.066c.506.431.867.74 1.261.928a3.33 3.33 0 0 0 2.87 0c.394-.189.755-.497 1.26-.928l.079-.066c.48-.41.939-.604 1.58-.655l.102-.008c.662-.053 1.135-.09 1.547-.236a3.33 3.33 0 0 0 2.03-2.029c.145-.412.182-.885.235-1.547l.008-.102c.05-.629.238-1.09.655-1.58l.066-.079c.431-.505.74-.866.928-1.26a3.33 3.33 0 0 0 0-2.87c-.189-.394-.497-.755-.928-1.26l-.066-.079a2.56 2.56 0 0 1-.655-1.58l-.008-.102c-.053-.662-.09-1.135-.236-1.547a3.33 3.33 0 0 0-2.029-2.03c-.412-.145-.885-.182-1.547-.235l-.102-.008a2.56 2.56 0 0 1-1.58-.655l-.079-.066c-.505-.431-.866-.74-1.26-.928M9.603 9.338c.183.112.366.229.532.345c.189.133.388.287.581.445l.04.033c.301.245.599.488.811.735c.254.295.433.648.433 1.104s-.18.809-.433 1.104c-.212.247-.51.49-.81.736l-.04.032c-.194.158-.393.312-.582.445a10 10 0 0 1-.532.345l-.048.03c-.292.177-.6.365-.88.465a1.4 1.4 0 0 1-.586.09a1.2 1.2 0 0 1-.632-.24c-.368-.278-.504-.672-.569-1.01c-.061-.314-.084-.711-.109-1.144l-.003-.046A14 14 0 0 1 6.75 12c0-.254.01-.531.026-.807l.003-.046c.025-.433.048-.83.109-1.145c.065-.337.2-.731.57-1.008c.18-.136.392-.223.63-.24a1.4 1.4 0 0 1 .588.09c.278.1.587.287.879.465zm5.702-.03l.048.03c.183.112.366.229.532.345c.189.133.388.287.581.445l.04.033c.301.245.599.488.811.735c.254.295.433.648.433 1.104s-.18.809-.433 1.104c-.212.247-.51.49-.81.736l-.04.032c-.194.158-.393.312-.582.445a10 10 0 0 1-.532.345l-.048.03c-.292.177-.6.365-.88.465a1.4 1.4 0 0 1-.586.09a1.2 1.2 0 0 1-.632-.24c-.368-.278-.504-.672-.569-1.01c-.061-.314-.084-.711-.109-1.144l-.002-.046A14 14 0 0 1 12.5 12c0-.254.01-.531.027-.807l.002-.046c.025-.433.048-.83.109-1.145c.065-.337.2-.731.57-1.008c.18-.136.392-.223.63-.24a1.4 1.4 0 0 1 .588.09c.278.1.587.287.879.465"
                    ></path>
                  </svg>
                </IconButton>
              </Typography>

              {/* SVG Scribble underline */}
              <Box
                component="svg"
                viewBox="0 0 200 40"
                sx={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  bottom: -8,
                  width: 140,
                  pointerEvents: "none",
                }}
              >
                <path
                  d="M10 20 Q 100 5 190 25 Q 100 35 520 100 150"
                  stroke="#2563eb"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </Box>
            </Box>
          </Box>
          <Box sx={{ mb: 5, textAlign: "center" }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, color: "#101828", mb: 1 }}
            >
              Choose Your Training Path
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#667085", maxWidth: 600, mx: "auto" }}
            >
              Select the module you want to learn and get started with
              step-by-step training designed for your workflow.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {cardsData.map((card, index) => (
              <Grid item xs={12} md={4} key={index}>
                <TrainingCard item={card} onSelect={handleSelect} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default SelectTrainingPath;
