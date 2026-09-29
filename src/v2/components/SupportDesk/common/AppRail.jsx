import React, { useState, useEffect } from 'react';
import {
  Box,
  Avatar,
  Tooltip,
  IconButton,
  Popover,
  Typography,
  Chip,
  Divider,
} from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NightlightIcon from '@mui/icons-material/Nightlight';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { toast } from 'react-toastify';
import { callStreamService } from '../../../services/callStreamService';

export default function AppRail({ activeTab = 'dms', setActiveTab }) {
  const [userProfile, setUserProfile] = useState({
    name: 'Optigo Support Desk',
    email: 'support@optigo.com',
    role: 'Support Lead',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
  });
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const sub = callStreamService.userProfile$.subscribe(setUserProfile);
    return () => sub.unsubscribe();
  }, []);

  const handleOpenProfile = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseProfile = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = (status) => {
    callStreamService.setUserStatus(status);
    toast.success(`Availability Status updated to: ${status.toUpperCase()}`);
    handleCloseProfile();
  };

  const openProfile = Boolean(anchorEl);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return '#10B981';
      case 'away':
        return '#F59E0B';
      case 'dnd':
        return '#EF4444';
      default:
        return '#94A3B8';
    }
  };

  const navItems = [
    { id: 'dms', label: 'Support & DMs', icon: <ChatBubbleOutlineIcon sx={{ fontSize: 20 }} />, badge: 3 },
    { id: 'activity', label: 'Activity & Mentions', icon: <AlternateEmailIcon sx={{ fontSize: 20 }} /> },
    { id: 'saved', label: 'Saved Tickets', icon: <BookmarkBorderIcon sx={{ fontSize: 20 }} /> },
    { id: 'more', label: 'More Workspace Tools', icon: <MoreHorizIcon sx={{ fontSize: 20 }} /> },
  ];

  return (
    <Box
      sx={{
        width: 60,
        minWidth: 60,
        bgcolor: '#350D36',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 1.5,
        justifyContent: 'space-between',
        zIndex: 10,
      }}
    >
      {/* Top Workspace Icon & Main Tabs */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, width: '100%' }}>
        {/* Optigo Workspace Badge */}
        <Tooltip title="Optigo Support Workspace" placement="right">
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: '10px',
              bgcolor: '#522653',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: 16,
              cursor: 'pointer',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              mb: 1,
              transition: 'all 0.15s ease',
              '&:hover': {
                borderColor: '#FFFFFF',
                transform: 'scale(1.05)',
              },
            }}
          >
            O
          </Box>
        </Tooltip>

        {/* Navigation Item Icons */}
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <Tooltip key={item.id} title={item.label} placement="right">
              <Box
                onClick={() => setActiveTab && setActiveTab(item.id)}
                sx={{
                  position: 'relative',
                  width: 38,
                  height: 38,
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
                  bgcolor: isActive ? 'rgba(255, 255, 255, 0.18)' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.12)',
                    color: '#FFFFFF',
                  },
                }}
              >
                {item.icon}
                {item.badge && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 4,
                      right: 4,
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: '#EF4444',
                      border: '1.5px solid #350D36',
                    }}
                  />
                )}
              </Box>
            </Tooltip>
          );
        })}
      </Box>

      {/* Bottom Profile Avatar */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <Tooltip title="Quick Action / Add" placement="right">
          <IconButton
            size="small"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              bgcolor: 'rgba(255, 255, 255, 0.08)',
              width: 34,
              height: 34,
              borderRadius: '50%',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.18)', color: '#FFFFFF' },
            }}
          >
            <AddIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>

        <Tooltip title={`${userProfile.name} (${userProfile.statusText || 'Active'})`} placement="right">
          <Box
            onClick={handleOpenProfile}
            sx={{
              position: 'relative',
              cursor: 'pointer',
              transition: 'transform 0.15s ease',
              '&:hover': { transform: 'scale(1.08)' },
            }}
          >
            <Avatar
              src={userProfile.avatar}
              sx={{
                width: 36,
                height: 36,
                borderRadius: '10px',
                border: '2px solid rgba(255, 255, 255, 0.25)',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: -2,
                right: -2,
                width: 10,
                height: 10,
                borderRadius: '50%',
                bgcolor: getStatusColor(userProfile.status),
                border: '2px solid #350D36',
              }}
            />
          </Box>
        </Tooltip>
      </Box>

      {/* User Profile Popover */}
      <Popover
        open={openProfile}
        anchorEl={anchorEl}
        onClose={handleCloseProfile}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: {
            ml: 1.5,
            mb: -1,
            width: 260,
            borderRadius: '12px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.22)',
            overflow: 'hidden',
            bgcolor: '#FFFFFF',
          },
        }}
      >
        <Box sx={{ p: 2, bgcolor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={userProfile.avatar}
                sx={{ width: 42, height: 42, borderRadius: '8px', border: '1px solid #CBD5E1' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -2,
                  right: -2,
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  bgcolor: getStatusColor(userProfile.status),
                  border: '2px solid #FFFFFF',
                }}
              />
            </Box>
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography variant="subtitle2" noWrap sx={{ fontWeight: 800, color: '#0F172A', fontSize: '0.9rem' }}>
                {userProfile.name}
              </Typography>
              <Typography variant="caption" noWrap sx={{ color: '#64748B', display: 'block', fontSize: '0.74rem' }}>
                {userProfile.email}
              </Typography>
            </Box>
          </Box>

          <Chip
            label={userProfile.role}
            size="small"
            sx={{
              mt: 1.2,
              height: 20,
              fontSize: '0.66rem',
              fontWeight: 700,
              bgcolor: '#EFF6FF',
              color: '#2563EB',
              border: '1px solid #BFDBFE',
              borderRadius: '4px',
            }}
          />
        </Box>

        <Box sx={{ p: 1.5 }}>
          <Typography
            variant="caption"
            sx={{
              fontSize: '0.7rem',
              fontWeight: 750,
              color: '#94A3B8',
              textTransform: 'uppercase',
              px: 0.5,
              display: 'block',
              mb: 0.8,
            }}
          >
            Set Availability Status
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.4 }}>
            <Box
              onClick={() => handleStatusChange('active')}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                px: 1,
                py: 0.6,
                borderRadius: '6px',
                bgcolor: userProfile.status === 'active' ? '#ECFDF5' : 'transparent',
                border: userProfile.status === 'active' ? '1px solid #A7F3D0' : '1px solid transparent',
                cursor: 'pointer',
                '&:hover': { bgcolor: '#F1F5F9' },
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 16, color: '#10B981' }} />
              <Typography variant="body2" sx={{ fontSize: '0.8rem', fontWeight: 650, color: '#0F172A', flex: 1 }}>
                Active & Available
              </Typography>
              {userProfile.status === 'active' && <FiberManualRecordIcon sx={{ fontSize: 8, color: '#10B981' }} />}
            </Box>

            <Box
              onClick={() => handleStatusChange('away')}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                px: 1,
                py: 0.6,
                borderRadius: '6px',
                bgcolor: userProfile.status === 'away' ? '#FEF3C7' : 'transparent',
                border: userProfile.status === 'away' ? '1px solid #FDE68A' : '1px solid transparent',
                cursor: 'pointer',
                '&:hover': { bgcolor: '#F1F5F9' },
              }}
            >
              <NightlightIcon sx={{ fontSize: 16, color: '#F59E0B' }} />
              <Typography variant="body2" sx={{ fontSize: '0.8rem', fontWeight: 650, color: '#0F172A', flex: 1 }}>
                Set as Away
              </Typography>
              {userProfile.status === 'away' && <FiberManualRecordIcon sx={{ fontSize: 8, color: '#F59E0B' }} />}
            </Box>

            <Box
              onClick={() => handleStatusChange('dnd')}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                px: 1,
                py: 0.6,
                borderRadius: '6px',
                bgcolor: userProfile.status === 'dnd' ? '#FEF2F2' : 'transparent',
                border: userProfile.status === 'dnd' ? '1px solid #FCA5A5' : '1px solid transparent',
                cursor: 'pointer',
                '&:hover': { bgcolor: '#F1F5F9' },
              }}
            >
              <DoNotDisturbIcon sx={{ fontSize: 16, color: '#EF4444' }} />
              <Typography variant="body2" sx={{ fontSize: '0.8rem', fontWeight: 650, color: '#0F172A', flex: 1 }}>
                Do Not Disturb
              </Typography>
              {userProfile.status === 'dnd' && <FiberManualRecordIcon sx={{ fontSize: 8, color: '#EF4444' }} />}
            </Box>
          </Box>
        </Box>

        <Divider sx={{ borderBottom: '1px solid #F1F5F9' }} />

        <Box sx={{ p: 1, display: 'flex', flexDirection: 'column', gap: 0.3 }}>
          <Box
            onClick={() => {
              toast.info('Opening User Profile Preferences...');
              handleCloseProfile();
            }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
              px: 1.2,
              py: 0.7,
              borderRadius: '6px',
              cursor: 'pointer',
              color: '#334155',
              '&:hover': { bgcolor: '#F8FAFC', color: '#0F172A' },
            }}
          >
            <SettingsIcon sx={{ fontSize: 16 }} />
            <Typography variant="body2" sx={{ fontSize: '0.8rem', fontWeight: 550 }}>
              Profile & Account Settings
            </Typography>
          </Box>

          <Box
            onClick={() => {
              toast.info('Opening Alert Settings...');
              handleCloseProfile();
            }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
              px: 1.2,
              py: 0.7,
              borderRadius: '6px',
              cursor: 'pointer',
              color: '#334155',
              '&:hover': { bgcolor: '#F8FAFC', color: '#0F172A' },
            }}
          >
            <NotificationsIcon sx={{ fontSize: 16 }} />
            <Typography variant="body2" sx={{ fontSize: '0.8rem', fontWeight: 550 }}>
              Notification Preferences
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderBottom: '1px solid #F1F5F9' }} />

        <Box sx={{ p: 1 }}>
          <Box
            onClick={() => {
              toast.warn('Signing out of Support Desk...');
              handleCloseProfile();
            }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
              px: 1.2,
              py: 0.7,
              borderRadius: '6px',
              cursor: 'pointer',
              color: '#DC2626',
              '&:hover': { bgcolor: '#FEF2F2' },
            }}
          >
            <LogoutIcon sx={{ fontSize: 16 }} />
            <Typography variant="body2" sx={{ fontSize: '0.8rem', fontWeight: 700 }}>
              Sign Out
            </Typography>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
}
