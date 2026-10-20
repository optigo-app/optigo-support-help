import React, { useMemo } from 'react';
import {
  Box,
  Typography,
  Chip,
  Button,
  InputBase,
  Avatar,
  Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import HourglassEmptyRoundedIcon from '@mui/icons-material/HourglassEmptyRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import AppsRoundedIcon from '@mui/icons-material/AppsRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';

const STATUS_FILTERS = [
  { key: 'pending', label: 'Pending', icon: HourglassEmptyRoundedIcon, color: '#F59E0B', bg: '#FEF3C7', text: '#92400E' },
  { key: 'completed', label: 'Solved', icon: CheckCircleRoundedIcon, color: '#10B981', bg: '#ECFDF5', text: '#065F46' },
];

export default function NewCallSidebar({
  calls = [],
  activeCallId,
  onSelectCall,
  onOpenAddCall,
  searchQuery = '',
  setSearchQuery,
  statusFilter = 'all',
  setStatusFilter,
  width = 380,
}) {
  // Filtered calls based on search and status
  const filteredCalls = useMemo(() => {
    return calls.filter((c) => {
      // 1. Status Filter
      if (statusFilter !== 'all') {
        const estatus = String(c.Estatus || c.estatus || c.status || '').trim().toLowerCase();
        if (statusFilter === 'pending' && !estatus.includes('pending')) return false;
        if (statusFilter === 'completed' && !estatus.includes('completed') && !estatus.includes('solved') && !estatus.includes('closed')) return false;
      }

      // 2. Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const app = String(c.name || c.appname || c.AppName || '').toLowerCase();
        const desc = String(c.description || '').toLowerCase();
        const sr = String(c.sr || c.id || '').toLowerCase();
        const lastMsg = String(c.lastMessage || '').toLowerCase();
        const caller = String(c.callBy || '').toLowerCase();
        if (!app.includes(q) && !desc.includes(q) && !sr.includes(q) && !lastMsg.includes(q) && !caller.includes(q)) {
          return false;
        }
      }

      return true;
    });
  }, [calls, statusFilter, searchQuery]);

  const getStatusBadge = (statusStr) => {
    const s = String(statusStr || '').trim().toLowerCase();
    if (s.includes('completed') || s.includes('solved') || s.includes('closed')) {
      return { label: 'Solved', color: '#065F46', bg: '#ECFDF5', border: '#A7F3D0' };
    }
    return { label: 'Pending', color: '#92400E', bg: '#FEF3C7', border: '#FCD34D' };
  };

  return (
    <Box
      sx={{
        width,
        minWidth: width,
        maxWidth: width,
        bgcolor: '#FFFFFF',
        borderRight: '1.5px solid #F1F5F9',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* 1. Header: Title, Total Count & + New Call Button */}
      <Box
        sx={{
          px: 2,
          pt: 1.8,
          pb: 1.2,
          bgcolor: '#FFFFFF',
          borderBottom: '1px solid #F1F5F9',
          display: 'flex',
          flexDirection: 'column',
          gap: 1.2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ fontSize: 15, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.01em' }}>
              My Calls
            </Typography>
            <Chip
              label={calls.length}
              size="small"
              sx={{
                height: 20,
                fontSize: 10.5,
                fontWeight: 800,
                bgcolor: '#EDE9FE',
                color: '#6900C6',
              }}
            />
          </Box>

          {/* + New Call Action */}
          <Button
            variant="contained"
            size="small"
            onClick={onOpenAddCall}
            startIcon={<AddIcon sx={{ fontSize: 16 }} />}
            sx={{
              bgcolor: '#4F46E5',
              color: '#FFFFFF',
              height: 30,
              px: 1.5,
              fontSize: 12,
              fontWeight: 750,
              textTransform: 'none',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(79, 70, 229, 0.25)',
              '&:hover': { bgcolor: '#4338CA' },
            }}
          >
            New Call
          </Button>
        </Box>

        {/* Search Bar */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            px: 1.2,
            height: 32,
            transition: 'all 0.15s ease',
            '&:focus-within': {
              borderColor: '#4F46E5',
              boxShadow: '0 0 0 2px rgba(79, 70, 229, 0.1)',
              bgcolor: '#FFFFFF',
            },
          }}
        >
          <SearchIcon sx={{ fontSize: 16, color: '#94A3B8', mr: 0.8 }} />
          <InputBase
            placeholder="Search by topic, SR#, or comment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ fontSize: 12, width: '100%', color: '#1E293B' }}
          />
        </Box>

        {/* 2. Filter Chips (All, Pending, Running, Completed) without counts */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, flexWrap: 'wrap' }}>
          {STATUS_FILTERS.map((item) => {
            const active = statusFilter === item.key;
            const Icon = item.icon;

            return (
              <Chip
                key={item.key}
                label={item.label}
                size="small"
                icon={
                  <Icon
                    sx={{
                      fontSize: '12px !important',
                      color: active ? `${item.text || '#4F46E5'} !important` : '#94A3B8 !important',
                    }}
                  />
                }
                onClick={() => setStatusFilter(item.key)}
                sx={{
                  height: 24,
                  fontSize: 11,
                  fontWeight: active ? 750 : 600,
                  cursor: 'pointer',
                  bgcolor: active ? item.bg || '#EEF2FF' : '#F8FAFC',
                  color: active ? item.text || '#4338CA' : '#64748B',
                  border: `1px solid ${active ? item.color || '#818CF8' : '#E2E8F0'}`,
                  transition: 'all 0.15s ease',
                  '&:hover': {
                    bgcolor: active ? undefined : '#F1F5F9',
                    borderColor: active ? undefined : '#CBD5E1',
                  },
                }}
              />
            );
          })}
        </Box>
      </Box>

      {/* 3. Calls List Container (Real-Time Shuffled by newest comment) */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 1.2,
          display: 'flex',
          flexDirection: 'column',
          gap: 0.8,
          '&::-webkit-scrollbar': { width: '5px' },
          '&::-webkit-scrollbar-thumb': { bgcolor: '#CBD5E1', borderRadius: '4px' },
        }}
      >
        {filteredCalls.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center', color: '#94A3B8' }}>
            <Typography sx={{ fontSize: 13, fontWeight: 600 }}>No calls found</Typography>
            <Typography sx={{ fontSize: 11.5, color: '#CBD5E1', mt: 0.5 }}>
              Click "+ New Call" to log a callback request.
            </Typography>
          </Box>
        ) : (
          filteredCalls.map((call) => {
            const isSelected = String(call.id) === String(activeCallId) || String(call.sr) === String(activeCallId);
            const badge = getStatusBadge(call.Estatus || call.status);
            const appName = call.name || call.appname || call.DeptName || 'General Support';
            const hasNew = Boolean(call.hasNewComment || call.unread);

            return (
              <Box
                key={call.id || call.sr}
                onClick={() => onSelectCall(call.id || call.sr)}
                sx={{
                  p: 1.4,
                  borderRadius: '10px',
                  bgcolor: isSelected ? '#F0FDF4' : hasNew ? '#F8FAFC' : '#FFFFFF',
                  border: `1px solid ${isSelected ? '#86EFAC' : hasNew ? '#CBD5E1' : '#F1F5F9'}`,
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.18s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isSelected ? '0 2px 6px rgba(16, 185, 129, 0.08)' : 'none',
                  '&:hover': {
                    bgcolor: isSelected ? '#ECFDF5' : '#F8FAFC',
                    borderColor: isSelected ? '#34D399' : '#CBD5E1',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.04)',
                  },
                }}
              >
                {/* Unread Glowing Pulse Dot */}
                {hasNew && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: '#4F46E5',
                      boxShadow: '0 0 0 2px #fff, 0 0 0 4px #4F46E5',
                      animation: 'pulseDot 1.5s infinite ease-in-out',
                      '@keyframes pulseDot': {
                        '0%': { transform: 'scale(0.9)', opacity: 0.8 },
                        '50%': { transform: 'scale(1.25)', opacity: 1 },
                        '100%': { transform: 'scale(0.9)', opacity: 0.8 },
                      },
                    }}
                  />
                )}

                {/* Top Row: Tag (#SR • AppName) & Timestamp with unread pulse */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.6 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                    <Typography
                      sx={{
                        fontSize: 11,
                        fontWeight: 750,
                        color: isSelected ? '#047857' : '#4F46E5',
                        bgcolor: isSelected ? '#D1FAE5' : '#EEF2FF',
                        px: 0.8,
                        py: 0.2,
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                      }}
                    >
                      <span>#{call.sr || call.id}</span>
                      <span>•</span>
                      <span style={{ maxWidth: 130, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {appName}
                      </span>
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                    <Typography sx={{ fontSize: 10.5, color: hasNew ? '#4F46E5' : '#94A3B8', fontWeight: hasNew ? 750 : 500 }}>
                      {call.timestamp || call.date || ''}
                    </Typography>
                    {hasNew && (
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          bgcolor: '#4F46E5',
                          boxShadow: '0 0 0 2px #fff, 0 0 0 4px #4F46E5',
                          animation: 'pulseDot 1.5s infinite ease-in-out',
                          '@keyframes pulseDot': {
                            '0%': { transform: 'scale(0.9)', opacity: 0.8 },
                            '50%': { transform: 'scale(1.25)', opacity: 1 },
                            '100%': { transform: 'scale(0.9)', opacity: 0.8 },
                          },
                        }}
                      />
                    )}
                  </Box>
                </Box>

                {/* Main Title: Fixed Description (Never Changes) */}
                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 750,
                    color: isSelected ? '#065F46' : '#0F172A',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    mb: 0.4,
                  }}
                  title={call.description || 'Support Request'}
                >
                  {call.description || 'Support Call Request'}
                </Typography>

                {/* WhatsApp-Style Last Comment Line */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.6,
                    mb: 0.8,
                  }}
                >
                  <ChatBubbleOutlineRoundedIcon
                    sx={{
                      fontSize: 12.5,
                      color: hasNew ? '#4F46E5' : '#94A3B8',
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: 11.5,
                      color: hasNew ? '#0F172A' : '#64748B',
                      fontWeight: hasNew ? 700 : 400,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      flex: 1,
                    }}
                  >
                    {call.lastComment ? (
                      <>
                        <span style={{ fontWeight: 650, color: hasNew ? '#4F46E5' : '#334155' }}>
                          {call.lastCommentAuthor ? `${call.lastCommentAuthor}: ` : ''}
                        </span>
                        <span>{call.lastComment}</span>
                      </>
                    ) : (
                      <span style={{ color: '#94A3B8', fontStyle: 'italic' }}>
                        No comments yet
                      </span>
                    )}
                  </Typography>
                </Box>

                {/* Bottom Row: Status Badge & Company */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Chip
                    label={badge.label}
                    size="small"
                    sx={{
                      height: 18,
                      fontSize: 10,
                      fontWeight: 750,
                      bgcolor: badge.bg,
                      color: badge.color,
                      border: `1px solid ${badge.border}`,
                    }}
                  />
                  <Typography sx={{ fontSize: 10.5, color: '#94A3B8', fontWeight: 500 }}>
                    {call.company || 'Optigo Customer'}
                  </Typography>
                </Box>
              </Box>
            );
          })
        )}
      </Box>
    </Box>
  );
}
