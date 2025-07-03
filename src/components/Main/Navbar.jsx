import { Box, Typography, Button, AppBar, Toolbar, IconButton, Stack, Avatar, Popover, Menu, MenuItem, ListItemIcon, Divider } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { blackOptigoRLogo } from "../../assets";
import { Link } from "react-router-dom";
import { useAuth } from "../../modules/context/UseAuth";
import { useState } from "react";
import { stringAvatar } from "./../../utils/utils";
import { AccountCircle, Settings, Logout as LogoutIcon } from "@mui/icons-material";

const Navbar = ({ setOpen }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, Logout } = useAuth();

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

  return (
    <AppBar position="static" sx={{ bgcolor: (theme) => theme.palette.optigo.gradient, boxShadow: "none", color: "#3B3B3B" }}>
      <Toolbar>
        <IconButton onClick={() => setOpen(true)} edge="start" color="inherit" sx={{ mr: 2, display: { sm: "none" } }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
          <Box
            component="img"
            src={blackOptigoRLogo}
            alt="Optigo Logo"
            sx={{
              width: {
                xs: 80,
                sm: 100,
              },
              height: "auto",
            }}
          />
        </Typography>
        <Stack direction="row" spacing={0} alignItems="center" sx={{ display: { xs: "none", sm: "flex" } }}>
          <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
            <Button color="inherit" sx={{ px: 1.5, py: 0.3 }}>
              Home
            </Button>
          </Link>
          <Link to={"/whats-new"} style={{ textDecoration: "none", color: "inherit" }}>
            <Button color="inherit" sx={{ px: 1.5, py: 0.3 }}>
              What's New
            </Button>
          </Link>
          <Link to={"/help"} style={{ textDecoration: "none", color: "inherit" }}>
            <Button color="inherit" sx={{ px: 1.5, py: 0.3 }}>
              Help Files
            </Button>
          </Link>
          {!user ? (
            <Link to={"/login"} style={{ textDecoration: "none" }}>
              <Button variant="contained" color="inherit" sx={{ ml: 2, py: 0.3, borderRadius: 5, bgcolor: "#FFEB3B", "&:hover": { bgcolor: "#FFEB3B" }, color: "#3B3B3B" }}>
                Login
              </Button>
            </Link>
          ) : (
            <>
              <IconButton aria-describedby={id} onClick={handleClick} size="small" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true">
                <Avatar {...stringAvatar(user?.fullName)} />
              </IconButton>
            </>
          )}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem>
              <ListItemIcon>
                <AccountCircle fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>

            <MenuItem>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>

            <Divider />

            <MenuItem onClick={HandleLogOut}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
