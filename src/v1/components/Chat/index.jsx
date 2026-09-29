import React, { useState } from 'react';
import { 
  IconButton, 
  Typography, 
  Badge, 
  Box, 
  useMediaQuery, 
  useTheme 
} from '@mui/material';
import { ChatBubble, SupportAgent } from '@mui/icons-material';
import ChatContainer from './ChatContainer';

export const MobileChatButton = ({ onClick, unreadCount = 1 }) => (
  <IconButton
    onClick={onClick}
    sx={{
      pointerEvents: 'auto',
      backgroundColor: '#2563EB',
      color: '#FFFFFF',
      border: '1px solid rgba(59, 130, 246, 0.4)',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
      width: { xs: 54, sm: 58 },
      height: { xs: 54, sm: 58 },
      borderRadius: '50%',
      p: 0,
      '&:hover': {
        backgroundColor: '#2563EB',
        color: '#FFFFFF',
      }
    }}
    title="Open Support Chat"
  >
    <Badge 
      badgeContent={unreadCount} 
      color="error"
      sx={{
        '& .MuiBadge-badge': {
          fontSize: '0.74rem',
          fontWeight: 700,
          height: 18,
          minWidth: 18,
          borderRadius: '50%',
        }
      }}
    >
      <ChatBubble sx={{ fontSize: 24 }} />
    </Badge>
  </IconButton>
);

const Chat = ({ defaultOpen = true, defaultFullscreen = false, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isFullscreen, setIsFullscreen] = useState(defaultFullscreen);

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  return (
    <Box>
      {/* Mobile & Desktop Responsive Floating Action Button */}
      {!isOpen && (
        <Box
          onClick={() => setIsOpen(true)}
          sx={{
            position: 'fixed',
            bottom: 34,
            right:86,
            zIndex: 1200,
            display: 'flex',
            alignItems: 'center',
            height: { xs: 44, sm: 48 },
            bgcolor: '#FFFFFF',
            borderRadius: '50px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04)',
            pl: '5px',
            pr: { xs: '14px', sm: '16px' },
            cursor: 'pointer',
            userSelect: 'none',
            border: '1px solid rgba(0, 0, 0, 0.06)',
            animation: 'fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            transition: 'all 0.2s ease-in-out',
            '@keyframes fadeInUp': {
              '0%': {
                opacity: 0,
                transform: 'translateY(12px)',
              },
              '100%': {
                opacity: 1,
                transform: 'translateY(0)',
              }
            },
            '&:hover': {
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.12), 0 3px 8px rgba(0, 0, 0, 0.06)',
              bgcolor: '#FAFAFA',
            },
            '&:active': {
              bgcolor: '#F3F4F6',
            }
          }}
        >
          {/* Blue circle container for the support agent icon */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: { xs: 34, sm: 38 },
              height: { xs: 34, sm: 38 },
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
              color: '#FFFFFF',
              mr: '8px',
            }}
          >
            <SupportAgent sx={{ fontSize: { xs: 20, sm: 22 } }} />
          </Box>
          <Typography
            sx={{
              color: '#1E293B',
              fontWeight: 700,
              fontSize: { xs: '14px', sm: '15px' },
              fontFamily: 'Poppins, sans-serif',
              letterSpacing: '-0.01em',
            }}
          >
            ChatBot
          </Typography>
        </Box>
      )}

      {/* Main Chat Container Component */}
      {isOpen && (
        <ChatContainer 
          isFullscreen={isFullscreen || isMobile}
          onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
          onCloseChat={handleClose}
        />
      )}
    </Box>
  );
};

export default Chat;
