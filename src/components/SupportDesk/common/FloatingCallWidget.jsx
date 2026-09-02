import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
  Avatar,
  Tooltip,
} from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { toast } from 'react-toastify';
import { callStreamService } from '../../../services/callStreamService';

export default function FloatingCallWidget() {
  const [activeCall, setActiveCall] = useState(null);
  const [durationStr, setDurationStr] = useState('00:00');
  const [position, setPosition] = useState({ x: 420, y: 80 });
  const [isDragging, setIsDragging] = useState(false);
  const dragOffsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const sub = callStreamService.activeCall$.subscribe(setActiveCall);
    return () => sub.unsubscribe();
  }, []);

  // Timer Tick
  useEffect(() => {
    if (!activeCall) return;

    const interval = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - activeCall.startTime) / 1000);
      setDurationStr(callStreamService.formatDuration(elapsedSeconds));
      callStreamService.updateActiveCall({ durationSeconds: elapsedSeconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeCall]);

  // Dragging logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      setPosition({
        x: Math.max(10, Math.min(window.innerWidth - 340, e.clientX - dragOffsetRef.current.x)),
        y: Math.max(10, Math.min(window.innerHeight - 200, e.clientY - dragOffsetRef.current.y)),
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  if (!activeCall) return null;

  const handleMouseDown = (e) => {
    if (e.target.closest('button')) return;
    setIsDragging(true);
    dragOffsetRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleToggleMute = () => {
    const newMuted = !activeCall.isMuted;
    callStreamService.updateActiveCall({ isMuted: newMuted });
    toast.info(newMuted ? 'Microphone Muted' : 'Microphone Unmuted');
  };

  const handleAddParticipant = () => {
    toast.info('Opening team call invite panel...');
  };

  const handleEndCall = () => {
    const finalDuration = callStreamService.endCall();
    toast.success(`Call with ${activeCall.callerName} ended. Duration: ${finalDuration || durationStr}`);
  };

  return (
    <Box
      onMouseDown={handleMouseDown}
      sx={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        zIndex: 9999,
        width: 320,
        borderRadius: '18px',
        bgcolor: '#0D1914',
        color: '#FFFFFF',
        p: 2,
        boxShadow: isDragging
          ? '0 24px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(16, 185, 129, 0.25)'
          : '0 16px 40px rgba(0, 0, 0, 0.45), 0 0 20px rgba(0, 0, 0, 0.2)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
      }}
    >
      {/* Top Bar */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
          <Box
            sx={{
              width: 14,
              height: 14,
              borderRadius: '4px',
              background: 'linear-gradient(135deg, #3B82F6 0%, #10B981 50%, #F59E0B 100%)',
              flexShrink: 0,
            }}
          />
          <Typography sx={{ fontSize: '0.78rem', fontWeight: 650, color: 'rgba(255, 255, 255, 0.8)' }}>
            Inbound
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            sx={{
              fontSize: '0.82rem',
              fontWeight: 700,
              color: 'rgba(255, 255, 255, 0.9)',
              fontFamily: 'monospace',
            }}
          >
            {durationStr}
          </Typography>

          <Tooltip title="Click & Drag Anywhere">
            <Box sx={{ cursor: 'grab', display: 'flex', opacity: 0.6, '&:hover': { opacity: 1 } }}>
              <DragIndicatorIcon sx={{ fontSize: 16, color: '#FFFFFF' }} />
            </Box>
          </Tooltip>
        </Box>
      </Box>

      {/* Participants */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2, px: 0.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
          <Avatar
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
            sx={{ width: 26, height: 26, borderRadius: '50%' }}
          />
          <Typography sx={{ fontSize: '0.84rem', fontWeight: 700, color: '#FFFFFF' }}>
            Optigo Support Head
          </Typography>
          <Chip
            label="You"
            size="small"
            sx={{
              height: 18,
              fontSize: '0.65rem',
              fontWeight: 700,
              bgcolor: 'rgba(255, 255, 255, 0.15)',
              color: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '4px',
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
          <Avatar
            sx={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              bgcolor: '#10B981',
              color: '#FFFFFF',
              fontSize: '0.78rem',
              fontWeight: 800,
            }}
          >
            {(activeCall.callerName || 'R').charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography noWrap sx={{ fontSize: '0.86rem', fontWeight: 750, color: '#FFFFFF' }}>
              {activeCall.callerName || 'Client Caller'}
            </Typography>
          </Box>
          <Typography sx={{ fontSize: '0.74rem', color: 'rgba(255, 255, 255, 0.65)', fontWeight: 500 }}>
            Inbound Line
          </Typography>
        </Box>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Button
          variant="contained"
          onClick={handleEndCall}
          sx={{
            flex: 1,
            bgcolor: '#E11D48',
            color: '#FFFFFF',
            fontWeight: 800,
            fontSize: '0.82rem',
            textTransform: 'none',
            height: 38,
            borderRadius: '20px',
            '&:hover': {
              bgcolor: '#BE123C',
            },
          }}
        >
          End
        </Button>

        <Tooltip title={activeCall.isMuted ? 'Unmute' : 'Mute'}>
          <IconButton
            size="small"
            onClick={handleToggleMute}
            sx={{
              width: 38,
              height: 38,
              bgcolor: activeCall.isMuted ? '#EF4444' : 'rgba(255, 255, 255, 0.14)',
              color: '#FFFFFF',
              borderRadius: '50%',
              '&:hover': { bgcolor: activeCall.isMuted ? '#DC2626' : 'rgba(255, 255, 255, 0.24)' },
            }}
          >
            {activeCall.isMuted ? <MicOffIcon sx={{ fontSize: 18 }} /> : <MicIcon sx={{ fontSize: 18 }} />}
          </IconButton>
        </Tooltip>

        <Tooltip title="Add Participant">
          <IconButton
            size="small"
            onClick={handleAddParticipant}
            sx={{
              width: 38,
              height: 38,
              bgcolor: 'rgba(255, 255, 255, 0.14)',
              color: '#FFFFFF',
              borderRadius: '50%',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.24)' },
            }}
          >
            <PersonAddIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>

        <Tooltip title="More Call Options">
          <IconButton
            size="small"
            onClick={() => toast.info('Transfer, Record, Hold settings...')}
            sx={{
              width: 38,
              height: 38,
              bgcolor: 'rgba(255, 255, 255, 0.14)',
              color: '#FFFFFF',
              borderRadius: '50%',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.24)' },
            }}
          >
            <MoreHorizIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
