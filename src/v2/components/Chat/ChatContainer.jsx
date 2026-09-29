import React, { useState } from 'react';
import { Box, Paper, useMediaQuery, useTheme } from '@mui/material';
import ChatHeader from './ChatHeader';
import ChatMessageList from './ChatMessageList';
import ChatInput from './ChatInput';
import ElveeSupportDrawer from './ElveeSupportDrawer';
import { INITIAL_MESSAGES } from './chatData';

const ChatContainer = ({ isFullscreen, onToggleFullscreen, onCloseChat }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const isFullView = isFullscreen || isMobile;

  const handleSendMessage = (text) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase();

    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      senderName: 'You',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      text,
      timestamp: timeStr,
    };

    setMessages((prev) => [...prev, userMsg]);

    // Simulate Agent Response with clean, professional text
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const agentMsg = {
        id: `msg-${Date.now() + 1}`,
        sender: 'agent',
        senderName: 'Optigo Support',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        text: `Thank you for reaching out! Our Elvee Support team has received your query regarding: "${text}". A support specialist is reviewing your account details now.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase(),
      };
      setMessages((prev) => [...prev, agentMsg]);
    }, 1200);
  };

  const handleAttachmentOption = (optionId) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase();

    let textNotice = '';
    let attachments = null;

    if (optionId === 'images') {
      textNotice = 'Shared a diagnostic screenshot.';
      attachments = [{
        type: 'image',
        name: 'screenshot_logs.png',
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
        size: '2.4 MB'
      }];
    } else if (optionId === 'mentions') {
      textNotice = 'Mentioned @Sarah Jenkins (Elvee Lead Specialist)';
    } else if (optionId === 'attachments') {
      textNotice = 'Uploaded support_ticket_audit.pdf';
    } else {
      textNotice = 'Shared code snippet payload.json';
    }

    const attMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      senderName: 'You',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      text: textNotice,
      timestamp: timeStr,
      attachments,
    };

    setMessages((prev) => [...prev, attMsg]);
  };

  return (
    <Paper
      elevation={24}
      sx={
        isFullView
          ? {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 99999,
              borderRadius: 0,
              backgroundColor: '#F8FAFC',
              color: '#0F172A',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }
          : {
              position: 'fixed',
              bottom: 24,
              right: 24,
              width: 400,
              height: 580,
              maxWidth: 'calc(100vw - 32px)',
              maxHeight: 'calc(100vh - 48px)',
              zIndex: 99999,
              borderRadius: 5,
              backgroundColor: '#F8FAFC',
              color: '#0F172A',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              border: '1px solid rgba(15, 23, 42, 0.12)',
              boxShadow: '0 20px 50px rgba(15, 23, 42, 0.22), 0 4px 16px rgba(0, 0, 0, 0.08)',
            }
      }
    >
      {/* Top Header Bar */}
      <ChatHeader 
        isFullscreen={isFullView}
        onToggleFullscreen={onToggleFullscreen}
        isDrawerOpen={isDrawerOpen}
        onToggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
        onCloseChat={onCloseChat}
      />

      {/* Main Body Layout */}
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%', overflow: 'hidden' }}>
          <ChatMessageList 
            messages={messages}
            isTyping={isTyping}
          />
          <ChatInput 
            onSendMessage={handleSendMessage}
            onSelectAttachmentOption={handleAttachmentOption}
          />
        </Box>
      </Box>

      {/* Elvee Support Full Panel Overlay - Covers 100% of Chat Area */}
      <ElveeSupportDrawer 
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </Paper>
  );
};

export default ChatContainer;
