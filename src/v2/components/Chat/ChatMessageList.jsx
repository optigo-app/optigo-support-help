import React, { useEffect, useRef } from 'react';
import { Box, Avatar, Typography, Chip } from '@mui/material';
import { PushPinRounded, CheckCircleOutlineRounded, DoneAll } from '@mui/icons-material';

const ChatMessageList = ({ messages, isTyping }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);


  return (
    <Box 
      sx={{ 
        flex: 1, 
        overflowY: 'auto', 
        p: 2, 
        pb: { xs: 5, sm: 6 }, 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 2.5,
        backgroundColor: '#FFFFFF',
        '&::-webkit-scrollbar': { width: 4 },
        '&::-webkit-scrollbar-track': { background: 'transparent' },
        '&::-webkit-scrollbar-thumb': { background: '#CBD5E1', borderRadius: 3 },
      }}
    >
      {messages.map((msg) => (
        <React.Fragment key={msg.id}>
          {/* Centered Date / Time Divider Pill */}
          {msg.dateDivider && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 0.4 }}>
              <Chip
                label={msg.dateDivider}
                size="small"
                sx={{
                  backgroundColor: '#F1F5F9',
                  border: 'none',
                  color: '#475569',
                  fontSize: '0.78rem',
                  fontWeight: 500,
                  height: 24,
                  px: 1.5,
                  borderRadius: '12px'
                }}
              />
            </Box>
          )}


          {/* Message Row */}
          <Box
            key={msg.id}
            sx={{
              display: 'flex',
              gap: 1.25,
              alignItems: 'flex-start',
              position: 'relative',
              flexDirection: (msg.senderName === 'Sam Lee' || msg.senderName === 'You') ? 'row-reverse' : 'row',
            }}
          >
            {/* Leftmost/Rightmost Blue Accent Bar Indicator */}
            {msg.hasLeftAccent && (
              <Box 
                sx={{ 
                  position: 'absolute',
                  left: (msg.senderName === 'Sam Lee' || msg.senderName === 'You') ? 'auto' : -16,
                  right: (msg.senderName === 'Sam Lee' || msg.senderName === 'You') ? -16 : 'auto',
                  top: 8,
                  width: 3.5,
                  height: 28,
                  backgroundColor: '#ac06dfff',
                  borderRadius: '5px',
                }} 
              />
            )}

            {/* User Avatar */}
            <Avatar
              src={msg.avatar}
              alt={msg.senderName}
              sx={{ 
                width: 35, 
                height: 35,
                mt: 0.25,
              }}
            />

            {/* Message Body Content */}
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                flex: 1,
                alignItems: (msg.senderName === 'Sam Lee' || msg.senderName === 'You') ? 'flex-end' : 'flex-start',
              }}
            >
              {/* Sender Name */}
              <Typography 
                sx={{ 
                  fontWeight: 700, 
                  color: '#0F172A', 
                  fontSize: '0.82rem',
                  lineHeight: 1.3,
                  mb: 0.5,
                  px: 0.5,
                  textAlign: (msg.senderName === 'Sam Lee' || msg.senderName === 'You') ? 'right' : 'left',
                }}
              >
                {msg.senderName}
              </Typography>

              {/* Chat Bubble Box */}
              <Box
                sx={{
                  bgcolor: (msg.senderName === 'Sam Lee' || msg.senderName === 'You') ? 'rgba(172, 6, 223, 0.08)' : '#F1F5F9',
                  borderRadius: (msg.senderName === 'Sam Lee' || msg.senderName === 'You') ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
                  p: 1.5,
                  pb: 1, // slightly reduced padding for timestamp alignment
                  maxWidth: { xs: '85%', sm: '75%' },
                  boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                {/* Quoted Message Card */}
                {msg.replyQuote && (
                  <Box
                    sx={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '8px',
                      p: 1.25,
                      borderLeft: '3px solid #ac06dfff',
                      mb: 0.5,
                      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.25 }}>
                      <Typography sx={{ fontWeight: 700, color: '#ac06dfff', fontSize: '0.82rem' }}>
                        {msg.replyQuote.author}
                      </Typography>
                      <Typography sx={{ color: '#94A3B8', fontSize: '0.74rem' }}>
                        {msg.replyQuote.time}
                      </Typography>
                    </Box>
                    <Typography sx={{ color: '#334155', fontSize: '0.875rem' }}>
                      {msg.replyQuote.text}
                    </Typography>
                  </Box>
                )}

                {/* Main Message Text */}
                {msg.text && (
                  <Typography 
                    sx={{ 
                      lineHeight: 1.45, 
                      fontSize: '0.92rem', 
                      fontWeight: 400,
                      color: '#1E293B',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {msg.text}
                  </Typography>
                )}

                {/* Image Attachment */}
                {msg.attachments && msg.attachments.length > 0 && (
                  <Box sx={{ mt: 0.5, position: 'relative' }}>
                    {msg.attachments.map((att, idx) => (
                      <Box
                        key={idx}
                        component="img"
                        src={att.url}
                        alt={att.name}
                        sx={{
                          width: '100%',
                          maxHeight: 240,
                          objectFit: 'cover',
                          borderRadius: '8px',
                          display: 'block',
                        }}
                      />
                    ))}
                  </Box>
                )}

                {/* Time & Read Status (WhatsApp style at bottom right of bubble) */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: 0.5,
                    mt: 0.4,
                    alignSelf: 'flex-end',
                  }}
                >
                  <Typography sx={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 500 }}>
                    {msg.timestamp}
                  </Typography>
                  {(msg.senderName === 'Sam Lee' || msg.senderName === 'You') && (
                    <DoneAll sx={{ fontSize: 14, color: '#ac06dfff' }} />
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </React.Fragment>
      ))}

      {/* Typing Indicator */}
      {isTyping && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pl: 0.5, mt: 1 }}>
          <Avatar
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
            sx={{ width: 34, height: 34 }}
          />
          <Typography sx={{ color: '#64748B', fontSize: '0.86rem', fontStyle: 'italic' }}>
            Optigo Support is typing...
          </Typography>
        </Box>
      )}

      <div ref={bottomRef} />
    </Box>
  );
};

export default ChatMessageList;
