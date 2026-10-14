import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Chip,
  Button,
  TextField,
  IconButton,
  Avatar,
  Paper,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import HeadsetMicRoundedIcon from '@mui/icons-material/HeadsetMicRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import PhoneInTalkRoundedIcon from '@mui/icons-material/PhoneInTalkRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import { filesUploadApi } from '../../apis/UploadFille';
import { compressImagesToWebP } from '../../utils/ImageCompressor';
import { toast } from 'react-toastify';
import { useAuth } from '../../modules/context/UseAuth';

export default function NewCallConversation({
  call,
  comments = [],
  onSendComment,
  onOpenFeedback,
}) {
  const { user } = useAuth();
  const [inputText, setInputText] = useState('');
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Sort comments chronologically so newest comment is ALWAYS last in the UI (at the bottom)
  const sortedComments = React.useMemo(() => {
    if (!comments || !Array.isArray(comments)) return [];
    return [...comments].sort((a, b) => {
      const timeA = new Date(a.time || a.CreatedDate || 0).getTime() || 0;
      const timeB = new Date(b.time || b.CreatedDate || 0).getTime() || 0;
      if (timeA && timeB && timeA !== timeB) return timeA - timeB;
      return (Number(a.id) || 0) - (Number(b.id) || 0);
    });
  }, [comments]);

  // Auto-scroll to bottom on new comments
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [sortedComments, call?.id]);

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    try {
      setIsCompressing(true);
      const processed = await compressImagesToWebP(files);
      setAttachedFiles((prev) => [...prev, ...processed]);
    } catch (err) {
      console.error('File compression error:', err);
      setAttachedFiles((prev) => [...prev, ...files]);
    } finally {
      setIsCompressing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeAttachedFile = (idx) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSend = async () => {
    if (!inputText.trim() && attachedFiles.length === 0) return;
    if (isSending) return;

    setIsSending(true);
    try {
      let uploadedFilePath = '';
      if (attachedFiles.length > 0) {
        const uploadRes = await filesUploadApi(attachedFiles);
        uploadedFilePath =
          uploadRes?.files?.[0]?.path ||
          uploadRes?.data?.[0]?.path ||
          uploadRes?.data ||
          '';
      }

      await onSendComment(call?.sr || call?.id, inputText.trim(), uploadedFilePath);
      setInputText('');
      setAttachedFiles([]);
    } catch (err) {
      console.error('Failed to send comment:', err);
      toast.error('Could not send comment. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!call) {
    return (
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
          bgcolor: '#F8FAFC',
          color: '#94A3B8',
        }}
      >
        <HeadsetMicRoundedIcon sx={{ fontSize: 56, color: '#CBD5E1', mb: 1.5 }} />
        <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#64748B' }}>
          No Call Selected
        </Typography>
        <Typography sx={{ fontSize: 12.5, color: '#94A3B8', mt: 0.5 }}>
          Select a call from the sidebar or click "+ New Call" to submit a request.
        </Typography>
      </Box>
    );
  }

  const estatus = String(call.Estatus || call.status || '').toLowerCase();
  const isCompleted =
    estatus.includes('completed') || estatus.includes('solved') || estatus.includes('closed');

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: '#FFFFFF',
        overflow: 'hidden',
      }}
    >
      {/* 1. Conversation Header */}
      <Box
        sx={{
          height: 60,
          minHeight: 60,
          px: 3,
          bgcolor: '#FFFFFF',
          borderBottom: '1.5px solid #F1F5F9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Left: App Name, Call Number & Status */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar
            sx={{
              width: 36,
              height: 36,
              bgcolor: '#EEF2FF',
              color: '#4F46E5',
              fontSize: 14,
              fontWeight: 800,
            }}
          >
            {(call.name || call.appname || 'C').charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                sx={{
                  fontSize: 14.5,
                  fontWeight: 800,
                  color: '#0F172A',
                  maxWidth: 450,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
                title={call.description || call.name}
              >
                {call.description || call.name || call.appname || 'Support Request'}
              </Typography>
              <Typography
                sx={{
                  fontSize: 11,
                  fontWeight: 750,
                  color: '#64748B',
                  bgcolor: '#F1F5F9',
                  px: 0.8,
                  py: 0.1,
                  borderRadius: '4px',
                }}
              >
                #{call.sr || call.id}
              </Typography>
            </Box>
            <Typography sx={{ fontSize: 11, color: '#94A3B8' }}>
              {call.name || call.appname || 'Support'} • {call.company || 'Customer'} • Logged on {call.date || 'Recent'}
            </Typography>
          </Box>
        </Box>

        {/* Right: Duration, Status & Rate Button */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
          {call.duration && (
            <Chip
              icon={<AccessTimeRoundedIcon sx={{ fontSize: 13 }} />}
              label={`Duration: ${call.duration}`}
              size="small"
              sx={{ fontSize: 11, height: 24, bgcolor: '#F8FAFC', color: '#475569' }}
            />
          )}

          <Chip
            label={isCompleted ? 'Completed' : estatus.includes('running') ? 'In Progress' : 'Pending'}
            size="small"
            sx={{
              height: 24,
              fontSize: 11,
              fontWeight: 750,
              bgcolor: isCompleted ? '#ECFDF5' : estatus.includes('running') ? '#EFF6FF' : '#FEF3C7',
              color: isCompleted ? '#065F46' : estatus.includes('running') ? '#1E40AF' : '#92400E',
              border: `1px solid ${isCompleted ? '#A7F3D0' : estatus.includes('running') ? '#BFDBFE' : '#FCD34D'}`,
            }}
          />

          {/* If completed, show "Rate this call" button */}
          {isCompleted && (
            <Button
              size="small"
              variant="outlined"
              startIcon={<StarRoundedIcon sx={{ fontSize: 16, color: '#F59E0B' }} />}
              onClick={() => onOpenFeedback(call)}
              sx={{
                height: 28,
                fontSize: 11.5,
                fontWeight: 700,
                textTransform: 'none',
                borderRadius: '8px',
                borderColor: '#FCD34D',
                color: '#B45309',
                bgcolor: '#FFFBEB',
                '&:hover': { bgcolor: '#FEF3C7', borderColor: '#F59E0B' },
              }}
            >
              Rate Call
            </Button>
          )}
        </Box>
      </Box>

      {/* 2. Messages Canvas (Chronological) */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 3,
          bgcolor: '#FAFAFA',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          '&::-webkit-scrollbar': { width: '6px' },
          '&::-webkit-scrollbar-thumb': { bgcolor: '#CBD5E1', borderRadius: '4px' },
        }}
      >
        {/* Initial Call Card (System/Start Banner) */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            bgcolor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PhoneInTalkRoundedIcon sx={{ fontSize: 18, color: '#4F46E5' }} />
              <Typography sx={{ fontSize: 13, fontWeight: 750, color: '#0F172A' }}>
                Call Request Initiated
              </Typography>
            </Box>
            <Typography sx={{ fontSize: 11, color: '#94A3B8' }}>
              {call.time || call.date || 'Initial Request'}
            </Typography>
          </Box>
          <Typography sx={{ fontSize: 12.5, color: '#334155', lineHeight: 1.5 }}>
            {call.description || 'No initial issue description provided.'}
          </Typography>
        </Paper>

        {/* Chronological Comments Stream (Newest is last at the bottom) */}
        {sortedComments.map((msg, idx) => {
          const isOwn =
            Boolean(msg.isOwn) ||
            msg.IsClient === 1 ||
            msg.IsClient === '1' ||
            (user?.id && String(msg.CreatedBy) === String(user.id));

          const text = msg.text || msg.comment || msg.Comments || '';
          const time = msg.time || msg.CreatedDate || '';
          const author = msg.Name || (isOwn ? 'You' : 'Support Team');
          const file = msg.FilePath || msg.img || '';

          return (
            <Box
              key={msg.id || idx}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isOwn ? 'flex-end' : 'flex-start',
                width: '100%',
              }}
            >
              {/* Sender Name & Timestamp */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 0.4, px: 0.5 }}>
                <Typography sx={{ fontSize: 11, fontWeight: 700, color: isOwn ? '#4F46E5' : '#0F172A' }}>
                  {isOwn ? 'You' : author}
                </Typography>
                {!isOwn && (
                  <Chip
                    label="Support"
                    size="small"
                    sx={{
                      height: 16,
                      fontSize: 9.5,
                      fontWeight: 800,
                      bgcolor: '#EEF2FF',
                      color: '#4F46E5',
                    }}
                  />
                )}
                <Typography sx={{ fontSize: 10, color: '#94A3B8' }}>
                  {time}
                </Typography>
              </Box>

              {/* Message Bubble */}
              <Box
                sx={{
                  maxWidth: '75%',
                  p: 1.6,
                  borderRadius: isOwn ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  bgcolor: isOwn ? '#4F46E5' : '#FFFFFF',
                  color: isOwn ? '#FFFFFF' : '#0F172A',
                  border: isOwn ? 'none' : '1px solid #E2E8F0',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                  wordBreak: 'break-word',
                }}
              >
                {text && (
                  <Typography sx={{ fontSize: 13, lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                    {text}
                  </Typography>
                )}

                {/* File Attachment Preview */}
                {file && (
                  <Box sx={{ mt: text ? 1.2 : 0 }}>
                    {file.match(/\.(jpeg|jpg|png|gif|webp)$/i) ? (
                      <Box
                        component="img"
                        src={file}
                        alt="attachment"
                        sx={{
                          maxHeight: 220,
                          maxWidth: '100%',
                          borderRadius: '8px',
                          display: 'block',
                          cursor: 'pointer',
                        }}
                        onClick={() => window.open(file, '_blank')}
                      />
                    ) : (
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<InsertDriveFileRoundedIcon />}
                        onClick={() => window.open(file, '_blank')}
                        sx={{
                          color: isOwn ? '#FFFFFF' : '#4F46E5',
                          borderColor: isOwn ? 'rgba(255,255,255,0.4)' : '#C7D2FE',
                          fontSize: 11.5,
                          textTransform: 'none',
                        }}
                      >
                        View Attachment
                      </Button>
                    )}
                  </Box>
                )}
              </Box>
            </Box>
          );
        })}

        <div ref={messagesEndRef} />
      </Box>

      {/* 3. Input & Attachment Bar */}
      <Box
        sx={{
          p: 2,
          bgcolor: '#FFFFFF',
          borderTop: '1.5px solid #F1F5F9',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        {/* Attached file pills */}
        {attachedFiles.length > 0 && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            {attachedFiles.map((f, i) => (
              <Box
                key={i}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.6,
                  bgcolor: '#EEF2FF',
                  border: '1px solid #C7D2FE',
                  borderRadius: '6px',
                  px: 1,
                  py: 0.3,
                }}
              >
                <Typography sx={{ fontSize: 11, fontWeight: 650, color: '#3730A3', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {f.name}
                </Typography>
                <IconButton size="small" onClick={() => removeAttachedFile(i)} sx={{ p: 0.2 }}>
                  <CloseRoundedIcon sx={{ fontSize: 13, color: '#6366F1' }} />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            multiple
            accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
            style={{ display: 'none' }}
          />

          <Tooltip title="Attach screenshot or document" arrow>
            <IconButton
              size="small"
              onClick={() => fileInputRef.current?.click()}
              disabled={isCompressing || isSending}
              sx={{
                bgcolor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                color: '#64748B',
                p: 1,
                '&:hover': { bgcolor: '#F1F5F9', color: '#4F46E5' },
              }}
            >
              <AttachFileRoundedIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>

          <TextField
            fullWidth
            size="small"
            placeholder="Type your message / comment (Press Enter to send)..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isSending}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
                fontSize: 13,
                bgcolor: '#F8FAFC',
                '& fieldset': { borderColor: '#E2E8F0' },
                '&:hover fieldset': { borderColor: '#CBD5E1' },
                '&.Mui-focused fieldset': { borderColor: '#4F46E5', bgcolor: '#FFFFFF' },
              },
            }}
          />

          <Button
            variant="contained"
            onClick={handleSend}
            disabled={isSending || (!inputText.trim() && attachedFiles.length === 0)}
            sx={{
              minWidth: 42,
              width: 42,
              height: 40,
              p: 0,
              borderRadius: '10px',
              bgcolor: '#4F46E5',
              boxShadow: '0 2px 8px rgba(79, 70, 229, 0.25)',
              '&:hover': { bgcolor: '#4338CA' },
            }}
          >
            {isSending ? (
              <CircularProgress size={18} sx={{ color: '#FFFFFF' }} />
            ) : (
              <SendRoundedIcon sx={{ fontSize: 18, color: '#FFFFFF' }} />
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
