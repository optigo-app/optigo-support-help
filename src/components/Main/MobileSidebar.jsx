import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { navItems } from '../../constants/data';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useAuth } from '../../modules/context/UseAuth';
import { Link } from 'react-router-dom';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { Avatar } from '@mui/material';
import { stringAvatar } from '../../utils/utils';

export default function TemporaryDrawer({ open, setOpen }) {
  const { user, Logout } = useAuth();

  const HandleLogOut = async () => {
    try {
      await Logout();
    } catch (error) {
      return error;
    }
  };
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 280 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {user && <ListItem onClick={(e)=>e.stopPropagation()} key={'user'} disablePadding  >
          <ListItemButton  >
            <ListItemIcon>
              <Avatar
                sx={{ height: 10, width: 10 }}
                {...stringAvatar(user?.fullName)} />
            </ListItemIcon>
            <ListItemText primary={user?.fullName} />
          </ListItemButton>
        </ListItem>}
        {navItems?.map((data, index) => (
          <ListItem key={data?.label} disablePadding components={Link}>
            <ListItemButton href={data?.path} >
              <ListItemIcon>
                {data?.icon}
              </ListItemIcon>
              <ListItemText primary={data?.label} />
            </ListItemButton>
          </ListItem>
        ))}

        {!user ? <ListItem key={'login'} disablePadding components={Link} >
          <ListItemButton href='/login'  >
            <ListItemIcon>
              <AccountCircleRoundedIcon />
            </ListItemIcon>
            <ListItemText primary='Login' />
          </ListItemButton>
        </ListItem> : <ListItem key={'logout'} onClick={HandleLogOut} disablePadding  >
          <ListItemButton  >
            <ListItemIcon>
              <LogoutRoundedIcon />
            </ListItemIcon>
            <ListItemText primary='Logout' />
          </ListItemButton>
        </ListItem>
        }
      </List>
    </Box>
  );

  return (
    <>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
}
