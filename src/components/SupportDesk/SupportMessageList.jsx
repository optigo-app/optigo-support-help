import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Box, Typography, Skeleton, IconButton, Tooltip } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SupportMessageItem from './SupportMessageItem';

const SupportMessageList = React.memo(function SupportMessageList({ messages = [], isLoading = false }) {
  const scrollRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState(false);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollEl;
      setShowScrollTop(scrollTop > 150);
      setShowScrollBottom(scrollHeight - scrollTop - clientHeight > 150);
    };

    scrollEl.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => scrollEl.removeEventListener('scroll', handleScroll);
  }, [messages]);

  // Auto-scroll to bottom on update
  const prevMsgLengthRef = useRef(messages.length);
  useEffect(() => {
    if (isLoading) return;
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const isNewMsg = messages.length > prevMsgLengthRef.current;
    prevMsgLengthRef.current = messages.length;

    const performScroll = () => {
      if (!scrollEl) return;
      scrollEl.scrollTo({
        top: scrollEl.scrollHeight,
        behavior: isNewMsg ? 'smooth' : 'auto',
      });
    };

    const rAF = requestAnimationFrame(performScroll);
    const timer = setTimeout(performScroll, 80);

    return () => {
      cancelAnimationFrame(rAF);
      clearTimeout(timer);
    };
  }, [messages, isLoading]);

  const scrollToTop = useCallback(() => {
    const scrollEl = scrollRef.current;
    if (scrollEl) {
      scrollEl.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const scrollToBottom = useCallback(() => {
    const scrollEl = scrollRef.current;
    if (scrollEl) {
      scrollEl.scrollTo({ top: scrollEl.scrollHeight, behavior: 'smooth' });
    }
  }, []);

  // Group messages by dateGroup
  const groupedMessages = messages.reduce((acc, msg) => {
    const group = msg.dateGroup || 'Today';
    if (!acc[group]) acc[group] = [];
    acc[group].push(msg);
    return acc;
  }, {});

  return (
    <Box sx={{ flex: 1, height: '100%', overflow: 'hidden', bgcolor: '#FFFFFF', position: 'relative' }}>
      {/* Floating Scroll Buttons */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 1.2,
          pointerEvents: 'none',
        }}
      >
        {showScrollTop && (
          <Tooltip title="Jump to Top" arrow placement="top">
            <IconButton
              size="small"
              onClick={scrollToTop}
              sx={{
                pointerEvents: 'auto',
                width: 36,
                height: 36,
                bgcolor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid rgba(226, 232, 240, 0.9)',
                color: '#6900C6',
                boxShadow: '0 8px 24px rgba(105, 0, 198, 0.18)',
                '&:hover': {
                  bgcolor: '#F3E8FF',
                  borderColor: '#C4B5FD',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <ArrowUpwardIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
        )}

        {showScrollBottom && (
          <Tooltip title="Jump to Latest" arrow placement="top">
            <IconButton
              size="small"
              onClick={scrollToBottom}
              sx={{
                pointerEvents: 'auto',
                width: 36,
                height: 36,
                bgcolor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid rgba(226, 232, 240, 0.9)',
                color: '#0284C7',
                boxShadow: '0 8px 24px rgba(2, 132, 199, 0.18)',
                '&:hover': {
                  bgcolor: '#E0F2FE',
                  borderColor: '#BAE6FD',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <ArrowDownwardIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {/* Main Conversation Scroll Stream */}
      <Box
        ref={scrollRef}
        sx={{
          height: '100%',
          overflowY: 'auto',
          '&::-webkit-scrollbar': { width: 6 },
          '&::-webkit-scrollbar-thumb': { bgcolor: '#CBD5E1', borderRadius: 3 },
        }}
      >
        {isLoading ? (
          <Box sx={{ py: 2.5, px: 3, display: 'flex', flexDirection: 'column', gap: 2.5, width: '100%', boxSizing: 'border-box' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
              <Skeleton variant="rounded" width={160} height={24} animation="wave" sx={{ borderRadius: '12px' }} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, width: '100%' }}>
              <Skeleton variant="circular" width={34} height={34} animation="wave" sx={{ flexShrink: 0 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1, maxWidth: 400 }}>
                <Skeleton variant="text" width={120} height={18} animation="wave" />
                <Skeleton variant="rounded" width="100%" height={80} animation="wave" sx={{ borderRadius: '12px' }} />
              </Box>
            </Box>
          </Box>
        ) : (
          <Box sx={{ py: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {Object.entries(groupedMessages).map(([dateGroup, groupMsgs]) => (
              <Box key={dateGroup} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 1.5 }}>
                  <Typography
                    sx={{
                      fontSize: 11,
                      fontWeight: 750,
                      color: '#64748B',
                      bgcolor: '#F1F5F9',
                      px: 2,
                      py: 0.4,
                      borderRadius: '12px',
                      border: '1px solid #E2E8F0',
                      userSelect: 'none',
                    }}
                  >
                    {dateGroup}
                  </Typography>
                </Box>

                {groupMsgs.map((msg) => (
                  <SupportMessageItem key={msg.id} message={msg} />
                ))}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
});

export default SupportMessageList;
