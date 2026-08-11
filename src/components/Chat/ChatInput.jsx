import React, { useState, useRef } from 'react';
import { Box, Paper, InputBase, IconButton, Tooltip } from '@mui/material';
import { Add, SentimentSatisfiedAlt, CameraAltOutlined } from '@mui/icons-material';
import AttachmentMenu from './AttachmentMenu';

const ChatInput = ({ onSendMessage, onSelectAttachmentOption }) => {
  const [text, setText] = useState('');
  const [isAttachmentOpen, setIsAttachmentOpen] = useState(false);
  const plusBtnRef = useRef(null);

  const handleSend = () => {
    if (!text.trim()) return;
    onSendMessage(text.trim());
    setText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box 
      sx={{ 
        p: 1.5,
          borderTop: '1px solid #f0f0f0',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          bgcolor: '#ffffff'
      }}
    >
      {/* Left Circular Plus (+) Button Trigger */}
      <Tooltip title="Add Attachment">
        <IconButton
          ref={plusBtnRef}
          onClick={() => setIsAttachmentOpen(!isAttachmentOpen)}
         sx={{ bgcolor: '#f0f2f5', width: 40, height: 40 }}
        >
         <Add sx={{ color: '#65676b' }} />
        </IconButton>
      </Tooltip>

      {/* Main Rounded Input Pill with Emoji Inside */}
      <Paper
        component="form"
        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
        sx={{
          p: '4px 8px',
          display: 'flex',
          alignItems: 'center',
          flex: 1,
            bgcolor: '#f0f2f5',
            borderRadius: 20,
          boxShadow: 'none',
          transition: 'all 0.2s ease',
        }}
      >
        <InputBase
          sx={{ 
            flex: 1, 
            fontWeight: 400,
          color: '#494949ff', fontSize: 15
          }}
          placeholder="Send a message"
          inputProps={{ 'aria-label': 'Send a message' }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <Tooltip title="Emoji">
          <IconButton 
            size="small" 
            onClick={() => setText(prev => prev + ' 😊')}
            sx={{ color: '#64748B', p: 0.5, '&:hover': { color: '#0F172A' } }}
          >
            <SentimentSatisfiedAlt sx={{ fontSize: 22 }} />
          </IconButton>
        </Tooltip>
      </Paper>

      {/* Right Camera Button */}
      <Tooltip title="Camera / Photos">
        <IconButton
          onClick={() => {
            if (onSelectAttachmentOption) onSelectAttachmentOption('images');
          }}
          sx={{
            color: '#64748B',
            width: 42,
            height: 42,
            borderRadius: '50%',
            p: 0,
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: '#F1F5F9',
              color: '#0F172A',
            }
          }}
        >
          <CameraAltOutlined sx={{ fontSize: 24 }} />
        </IconButton>
      </Tooltip>

      {/* Attachment Popover Menu */}
      <AttachmentMenu
        anchorEl={plusBtnRef.current}
        isOpen={isAttachmentOpen}
        onClose={() => setIsAttachmentOpen(false)}
        onSelectOption={(optionId) => {
          if (onSelectAttachmentOption) {
            onSelectAttachmentOption(optionId);
          }
        }}
      />
    </Box>
  );
};

export default ChatInput;
