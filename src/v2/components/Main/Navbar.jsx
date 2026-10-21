import {
  Box,
  Typography,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Stack,
  Avatar,
  ListItemIcon,
  Divider,
  alpha,
  Tab,
  Chip,
  useTheme,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { blackOptigoRLogo } from "../../assets/index";
import { Link, useLocation, useMatch, useNavigate } from "react-router-dom";
import { useAuth } from "../../modules/context/UseAuth";
import { useState } from "react";
import { stringAvatar } from "./../../utils/utils";
import {
  AccountCircle,
  Settings,
  Logout as LogoutIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { mainTabs } from "../../constants/data";
import {
  StyledTabs,
  StyledMenuItem,
  StyledMenu,
  StyledTypography,
} from "../../constants/styles";
import { useCommon } from "../../providers/CommonProvider";
import Headroom from "react-headroom";
import { useUserRights } from "../../modules/hooks/useUserRights";
import DuoRoundedIcon from "@mui/icons-material/DuoRounded";
import SmartDisplayRoundedIcon from "@mui/icons-material/SmartDisplayRounded";
import OndemandVideoRoundedIcon from "@mui/icons-material/OndemandVideoRounded";
import VideoFloatingPreview from "../Help/VideoFloatingPreview";
import VersionBadge from "../default/VersionBadge";

const VideoIcon = ({ sx, color = "currentColor" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={sx}
      height={sx}
      viewBox="0 0 24 24"
    >
      <path
        fill={color}
        d="m4.713 9.128l-.246.566a.506.506 0 0 1-.934 0l-.246-.566a4.36 4.36 0 0 0-2.22-2.25l-.759-.339a.53.53 0 0 1 0-.963l.717-.319a4.37 4.37 0 0 0 2.251-2.326l.253-.611a.506.506 0 0 1 .942 0l.253.61a4.37 4.37 0 0 0 2.25 2.327l.718.32a.53.53 0 0 1 0 .962l-.76.338a4.36 4.36 0 0 0-2.219 2.251M10 6a6 6 0 0 1-9 5.197V19a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4.2l5.213 3.65a.5.5 0 0 0 .787-.41V5.96a.5.5 0 0 0-.787-.41L17 9.2V5a1 1 0 0 0-1-1H9.659A6 6 0 0 1 10 6"
      ></path>
    </svg>
  );
};

const Navbar = ({ setOpen }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const {
    user,
    Logout,
    logoutAll,
    CompanyInfo,
    isThirdParty,
    accounts = [],
    activeAccountId,
    switchAccount,
    removeAccount,
  } = useAuth();
  const { activeTab, handleTabChange } = useCommon();
  const { pathname } = useLocation();
  const [userRights] = useUserRights();
  const isIframe = window.self !== window.top;
  const [showVideoHelpPreview, setShowVideoHelpPreview] = useState(false);

  const rightsSet = new Set((userRights || []).map((r) => r?.id));
  const visibleTabs = isThirdParty
    ? []
    : mainTabs?.filter((card) =>
      card?.SystemId == null
        ? true
        : Array.isArray(card?.SystemId)
          ? card.SystemId.some((id) => rightsSet.has(id))
          : rightsSet.has(card?.SystemId)
    );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const HandleLogOut = async () => {
    try {
      await Logout();
    } catch (error) {
      return error;
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const match = useMatch("/:tabId/category/:slug");
  const isCategoryPage = !!match;

  return (
    <Headroom>
      <AppBar
        position="static"
        sx={{
          bgcolor: !isCategoryPage
            ? (theme) => theme.palette.optigo.gradient
            : "#ececec",
          boxShadow: "none",
          color: "#3B3B3B",
          position: "relative",
          height: 55, // Fixed height
          minHeight: 55, // Override default minHeight
        }}
      >
        <Toolbar
          sx={{
            height: 52, // Fixed height
            minHeight: "52px !important", // Override default minHeight with !important
            padding: "0 8px !important", // Reduce horizontal padding
            "@media (min-width: 600px)": {
              minHeight: "52px !important", // Override for larger screens too
              padding: "0 16px !important",
            },
          }}
        >
          <IconButton
            onClick={() => setOpen(true)}
            edge="start"
            color="inherit"
            size="small"
            sx={{
              mr: 1,
              display: { xs: "flex", sm: "flex", md: "none" }, // Show only on xs and sm
              padding: "4px",
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              fontSize: "1rem", // Reduce font size
            }}
          >
            {isIframe ? (
              <IconButton
                onClick={() => window.history.back()}
                color="inherit"
                size="small"
                sx={{
                  bgcolor: "rgba(255,255,255,0.15)",
                  borderRadius: 2,
                  px: 1.5,
                  py: 0.5,
                  gap: 0.5,
                  "&:hover": { bgcolor: "rgba(255,255,255,0.28)" },
                }}
              >
                <ArrowBackIcon fontSize="small" />
                <Typography variant="caption" sx={{ fontWeight: 600, lineHeight: 1 }}>
                  Back
                </Typography>
              </IconButton>
            ) : (
              <Link to={isThirdParty ? "/help" : "/"}>
                <Box
                  component="img"
                  src={blackOptigoRLogo}
                  alt="Optigo Logo"
                  sx={{
                    width: 60,
                    height: "auto",
                  }}
                />
              </Link>
            )}
            {isCategoryPage && (
              <StyledTabs
                sx={{
                  position: "absolute",
                  bottom: "-3px",
                  marginLeft: 15,
                }}
                variant="standard"
                value={activeTab}
                onChange={handleTabChange}
                scrollButtons="auto"
              >
                {visibleTabs?.map((tab, index) => (
                  <Tab
                    key={tab.id}
                    label={tab.label}
                    value={tab.TabId}
                    sx={{
                      minWidth: "144px",
                      height: "45px", // Reduced height
                      minHeight: "45px",
                      fontSize: "0.8rem",
                      padding: "4px 8px",
                    }}
                  />
                ))}
              </StyledTabs>
            )}
          </Typography>

          <Stack
            direction="row"
            spacing={0}
            alignItems="center"
            sx={{ display: { xs: "none", sm: "none", md: "none", lg: "flex" } }}
          >
            {!isThirdParty && (
              <>
                <Link
                  to={"/"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Button color="inherit" sx={{ px: 1.5, py: 0.3 }}>
                    Home
                  </Button>
                </Link>
              </>
            )}
            <Link
              to={"/whats-new"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button color="inherit" sx={{ px: 1.5, py: 0.3 }}>
                What's New
              </Button>
            </Link>
            <Box
              onMouseEnter={() => setShowVideoHelpPreview(true)}
              onMouseLeave={() => setShowVideoHelpPreview(false)}
              sx={{ position: "relative", overflow: "visible" }}
            >
              {showVideoHelpPreview && (
                <VideoFloatingPreview placement="bottom" />
              )}
              <Link
                to="/help"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Button
                  color="inherit"
                  sx={{
                    px: 1.5,
                    py: 0.3,
                  }}
                  endIcon={<VideoIcon sx={20} color="#3B3B3B" />}
                >
                  Video help
                </Button>
              </Link>
            </Box>

            {/* <VersionBadge sx={{ ml: 1, mr: 0.5 }} /> */}
            {!user ? (
              <>
                {!isThirdParty ? (
                  <Link to={"/login"} style={{ textDecoration: "none" }}>
                    <Button
                      variant="contained"
                      color="inherit"
                      sx={{
                        ml: 2,
                        py: 0.3,
                        borderRadius: 5,
                        bgcolor: "#FFEB3B",
                        "&:hover": { bgcolor: "#FFEB3B" },
                        color: "#3B3B3B",
                      }}
                    >
                      Login
                    </Button>
                  </Link>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <>
                <IconButton
                  aria-describedby={id}
                  onClick={handleClick}
                  size="small"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                >
                  <Avatar
                    sx={{
                      background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      fontSize: { xs: "0.875rem", sm: "1rem" },
                      transition: "all 0.3s ease",
                    }}
                    {...stringAvatar(user?.fullName)}
                  />
                </IconButton>
              </>
            )}

            <StyledMenu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                sx: { minWidth: 260, maxWidth: 320, p: 0.8 },
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              {/* Active Account Header */}
              <StyledMenuItem sx={{ cursor: "default", "&:hover": { bgcolor: "transparent" }, py: 1 }}>
                <ListItemIcon>
                  <AccountCircle fontSize="large" color="primary" />
                </ListItemIcon>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                  sx={{ flex: 1, minWidth: 0 }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 170 }}>
                    {user?.fullName}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={0.5} mt={0.3}>
                    {CompanyInfo?.companycode && (
                      <Chip
                        label={CompanyInfo.companycode}
                        size="small"
                        sx={{
                          height: 18,
                          fontSize: "0.65rem",
                          fontWeight: 600,
                        }}
                      />
                    )}
                    <Chip
                      icon={<CheckCircleRoundedIcon sx={{ fontSize: "12px !important" }} />}
                      label="Active"
                      size="small"
                      color="success"
                      variant="outlined"
                      sx={{ height: 18, fontSize: "0.65rem", fontWeight: 600, px: 0.2 }}
                    />
                  </Box>
                </Box>
              </StyledMenuItem>

              {/* Other Accounts List */}
              {accounts?.filter((acc) => acc.accountId !== activeAccountId).length > 0 && (
                <>
                  <Divider sx={{ my: 0.5 }} />
                  <Typography
                    variant="caption"
                    sx={{ px: 2, pt: 0.8, pb: 0.3, fontWeight: 700, color: "text.secondary", letterSpacing: 0.5, display: "block" }}
                  >
                    SWITCH ACCOUNT
                  </Typography>
                  {accounts
                    .filter((acc) => acc.accountId !== activeAccountId)
                    .map((acc) => (
                      <Box
                        key={acc.accountId}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          px: 1.5,
                          py: 0.8,
                          mx: 0.5,
                          borderRadius: 1.5,
                          "&:hover": { bgcolor: "action.hover" },
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleClose();
                          switchAccount(acc.accountId);
                        }}
                      >
                        <Box display="flex" alignItems="center" gap={1} sx={{ minWidth: 0, flex: 1 }}>
                          <Avatar
                            sx={{ width: 28, height: 28, fontSize: "0.75rem", bgcolor: "secondary.main" }}
                            {...stringAvatar(acc.fullName || acc.userId)}
                          />
                          <Box sx={{ minWidth: 0, flex: 1 }}>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 500, fontSize: "0.825rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                            >
                              {acc.fullName}
                            </Typography>
                            <Box display="flex" alignItems="center" gap={0.5}>
                              {acc.companyCode && (
                                <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.7rem" }}>
                                  {acc.companyCode}
                                </Typography>
                              )}
                              {acc.isExpired && (
                                <Chip label="Expired" size="small" color="error" sx={{ height: 16, fontSize: "0.6rem" }} />
                              )}
                            </Box>
                          </Box>
                        </Box>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeAccount(acc.accountId);
                          }}
                          sx={{ p: 0.5, color: "text.disabled", "&:hover": { color: "error.main" } }}
                          title="Remove account"
                        >
                          <DeleteOutlineRoundedIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Box>
                    ))}
                </>
              )}

              <Divider sx={{ my: 0.5 }} />

              {/* Add Account Option */}
              <StyledMenuItem
                onClick={() => {
                  handleClose();
                  navigate("/login?addAccount=true");
                }}
              >
                <ListItemIcon>
                  <PersonAddAltRoundedIcon fontSize="small" />
                </ListItemIcon>
                <StyledTypography>Add another account</StyledTypography>
              </StyledMenuItem>

              <StyledMenuItem>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                <StyledTypography>Settings</StyledTypography>
              </StyledMenuItem>

              {!isIframe && <Divider sx={{ my: 0.5 }} />}

              {!isIframe && (
                <>
                  <StyledMenuItem
                    onClick={HandleLogOut}
                    sx={{
                      "&:hover": {
                        bgcolor: "error.main",
                        color: "#fff",
                      },
                    }}
                  >
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <StyledTypography>
                      {accounts?.length > 1 ? "Sign out of this account" : "Logout"}
                    </StyledTypography>
                  </StyledMenuItem>

                  {accounts?.length > 1 && (
                    <StyledMenuItem
                      onClick={() => {
                        handleClose();
                        logoutAll();
                      }}
                      sx={{
                        "&:hover": {
                          bgcolor: "error.dark",
                          color: "#fff",
                        },
                      }}
                    >
                      <ListItemIcon>
                        <LogoutIcon fontSize="small" color="error" />
                      </ListItemIcon>
                      <StyledTypography sx={{ color: "error.main" }}>
                        Sign out of all accounts
                      </StyledTypography>
                    </StyledMenuItem>
                  )}
                </>
              )}
            </StyledMenu>
          </Stack>
        </Toolbar>
      </AppBar>
    </Headroom>
  );
};

export default Navbar;