import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Tooltip,
  Avatar,
  Chip,
  Skeleton,
  Rating,
} from '@mui/material';

const ITEM_HEIGHT = 74;
const OVERSCAN = 5;

const SupportSidebar = React.memo(function SupportSidebar({
  threads = [],
  activeThreadId,
  onSelectThread,
  searchQuery = '',
  isLoading = false,
  width = 380,
}) {
  const [filterMode, setFilterMode] = useState('all');
  const scrollContainerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(600);

  // High-Performance Filtered Threads Stream
  const filteredThreads = useMemo(() => {
    if (!threads || threads.length === 0) return [];
    const query = searchQuery ? searchQuery.trim().toLowerCase() : '';
    const isUnreadOnly = filterMode === 'unread';

    const result = [];
    for (let i = 0; i < threads.length; i++) {
      const thread = threads[i];
      if (isUnreadOnly && !thread.unread) continue;

      if (query) {
        const tName = (thread.name || '').toLowerCase();
        const tCallBy = (thread.callBy || '').toLowerCase();
        const tMsg = (thread.lastMessage || '').toLowerCase();
        const tSr = String(thread.sr || '');
        if (
          !tName.includes(query) &&
          !tCallBy.includes(query) &&
          !tMsg.includes(query) &&
          !tSr.includes(query)
        ) {
          continue;
        }
      }
      result.push(thread);
    }
    return result;
  }, [threads, filterMode, searchQuery]);

  // Measure container height
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const updateHeight = () => setContainerHeight(el.clientHeight || 600);
    updateHeight();
    const ro = new ResizeObserver(updateHeight);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Smooth scroll listener
  const onScroll = useCallback((e) => {
    const top = e.currentTarget.scrollTop;
    requestAnimationFrame(() => setScrollTop(top));
  }, []);

  const totalCount = filteredThreads.length;
  const totalHeight = totalCount * ITEM_HEIGHT;
  const startIndex = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - OVERSCAN);
  const endIndex = Math.min(totalCount, Math.ceil((scrollTop + containerHeight) / ITEM_HEIGHT) + OVERSCAN);

  const visibleItems = useMemo(() => {
    return filteredThreads.slice(startIndex, endIndex);
  }, [filteredThreads, startIndex, endIndex]);

  const offsetY = startIndex * ITEM_HEIGHT;

  const handleListClick = useCallback(
    (e) => {
      const button = e.target.closest('[data-thread-id]');
      if (button && onSelectThread) {
        const id = button.getAttribute('data-thread-id');
        if (id) onSelectThread(id);
      }
    },
    [onSelectThread]
  );

  return (
    <Box
      sx={{
        width: width,
        minWidth: width,
        maxWidth: width,
        bgcolor: '#FFFFFF',
        borderRight: '1px solid #E5E7EB',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          height: 48,
          minHeight: 48,
          px: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #F1F5F9',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 800, color: '#0F172A' }}>
            All Calls
          </Typography>
          <Chip
            label={totalCount > 999 ? `${(totalCount / 1000).toFixed(1)}k` : totalCount}
            size="small"
            sx={{
              height: 18,
              fontSize: 10,
              fontWeight: 750,
              bgcolor: '#EDE9FE',
              color: '#6900C6',
            }}
          />
        </Box>
      </Box>

      {/* Virtual Scroll Container */}
      <Box
        ref={scrollContainerRef}
        onScroll={onScroll}
        sx={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          position: 'relative',
          WebkitOverflowScrolling: 'touch',
          '&::-webkit-scrollbar': { width: '5px' },
          '&::-webkit-scrollbar-thumb': { bgcolor: '#CBD5E1', borderRadius: '4px' },
        }}
      >
        {isLoading ? (
          <Box sx={{ p: 2 }}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Box key={i} sx={{ mb: 2 }}>
                <Skeleton variant="text" width="70%" height={20} />
                <Skeleton variant="text" width="40%" height={15} />
              </Box>
            ))}
          </Box>
        ) : totalCount === 0 ? (
          <Box sx={{ p: 3, textAlign: 'center', color: '#94A3B8' }}>
            <Typography sx={{ fontSize: 13, fontWeight: 600 }}>No support calls found</Typography>
          </Box>
        ) : (
          <Box onClick={handleListClick} sx={{ height: `${totalHeight}px`, position: 'relative', width: '100%' }}>
            <Box sx={{ transform: `translateY(${offsetY}px)`, position: 'absolute', top: 0, left: 0, right: 0 }}>
              {visibleItems.map((thread) => {
                const isActive = thread.id === activeThreadId;
                const rec = thread.rawRecord || thread;
                const status = rec.Estatus || rec.estatus || thread.estatus || thread.status || rec.status || 'Pending';
                const isSolved = status.toLowerCase() === 'solved' || status.toLowerCase() === 'completed';
                const isRunning = status.toLowerCase() === 'running' || status.toLowerCase() === 'in progress';
                const rating = Number(rec.rating ?? rec.ratingByCustomer ?? thread.rating ?? 0);

                const hoverTooltipTitle = (
                  <Box sx={{ p: 1.2, maxWidth: 320 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.8, gap: 1 }}>
                      <Typography sx={{ fontSize: 12, fontWeight: 800, color: '#FAEA2B' }}>
                        Support Call #{thread.sr || rec.sr || 'N/A'}
                      </Typography>
                      {status && (
                        <Chip
                          label={status}
                          size="small"
                          sx={{
                            height: 17,
                            fontSize: 9.5,
                            fontWeight: 800,
                            bgcolor: isSolved ? '#10B981' : isRunning ? '#EF4444' : '#F59E0B',
                            color: '#FFFFFF',
                          }}
                        />
                      )}
                    </Box>

                    <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: '#FFFFFF', lineHeight: 1.35 }}>
                      {thread.lastMessage || rec.topicRaisedBy || rec.description || thread.name}
                    </Typography>

                    {rec.description && rec.description !== thread.lastMessage && (
                      <Typography sx={{ fontSize: 11.5, color: '#E2E8F0', lineHeight: 1.35, mt: 0.6 }}>
                        {rec.description}
                      </Typography>
                    )}
                  </Box>
                );

                return (
                  <Tooltip
                    key={thread.id}
                    title={hoverTooltipTitle}
                    placement="right"
                    arrow
                    enterDelay={250}
                    leaveDelay={100}
                    componentsProps={{
                      tooltip: {
                        sx: {
                          bgcolor: '#1E1B4B',
                          boxShadow: '0 12px 30px rgba(0,0,0,0.35)',
                          borderRadius: '8px',
                          border: '1px solid rgba(255,255,255,0.15)',
                          p: 0,
                        },
                      },
                      arrow: { sx: { color: '#1E1B4B' } },
                    }}
                  >
                    <Box
                      data-thread-id={thread.id}
                      sx={{
                        height: `${ITEM_HEIGHT}px`,
                        p: 1.1,
                        px: 1.2,
                        bgcolor: isActive ? '#EFD7FF' : 'transparent',
                        borderBottom: '1px solid #F8FAFC',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.2,
                        cursor: 'pointer',
                        boxSizing: 'border-box',
                        transition: 'background-color 0.1s ease',
                        '&:hover': { bgcolor: isActive ? '#EFD7FF' : '#F8FAFC' },
                      }}
                    >
                      {/* Avatar */}
                      <Box sx={{ position: 'relative', flexShrink: 0, mt: 0.2 }}>
                        <Avatar
                          sx={{
                            width: 35,
                            height: 35,
                            borderRadius: '50px',
                            bgcolor: '#EDE9FE',
                            color: '#6900C6',
                            fontSize: 12,
                            fontWeight: 700,
                          }}
                        >
                          {(thread.name || thread.callBy || thread.company || 'E').charAt(0).toUpperCase()}
                        </Avatar>

                        {thread.online && (
                          <Box
                            sx={{
                              position: 'absolute',
                              bottom: -1,
                              right: -1,
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              bgcolor: '#10B981',
                              border: '1.5px solid #FFFFFF',
                            }}
                          />
                        )}
                      </Box>

                      {/* Content */}
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        {/* Title & Time */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.2 }}>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              fontSize: '0.82rem',
                              fontWeight: thread.unread ? 800 : 700,
                              color: '#0F172A',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              maxWidth: 285,
                            }}
                          >
                            {thread.lastMessage || rec.topicRaisedBy || rec.description || thread.name}
                          </Typography>

                          <Typography variant="caption" sx={{ fontSize: '0.68rem', color: '#94A3B8', flexShrink: 0 }}>
                            {thread.timestamp || rec.time || '12:00'}
                          </Typography>
                        </Box>

                        {/* Person Name & Status Chip + Rating Star Display */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, mb: 0.3 }}>
                          <Typography
                            variant="caption"
                            sx={{
                              fontSize: 11,
                              color: '#475569',
                              fontWeight: 650,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              maxWidth: 180,
                            }}
                          >
                            {thread.callBy || thread.name || 'Client'}
                          </Typography>

                          {status && (
                            <Chip
                              label={status}
                              size="small"
                              sx={{
                                height: 16,
                                fontSize: '0.62rem',
                                fontWeight: 700,
                                px: 0.2,
                                bgcolor: isSolved ? '#DCFCE7' : isRunning ? '#FEE2E2' : '#FEF3C7',
                                color: isSolved ? '#15803D' : isRunning ? '#DC2626' : '#D97706',
                              }}
                            />
                          )}

                          {rating > 0 ? (
                            <Rating
                              value={rating}
                              readOnly
                              size="small"
                              sx={{ fontSize: '0.75rem', ml: 'auto', color: '#F59E0B' }}
                            />
                          ) : null}
                        </Box>
                      </Box>
                    </Box>
                  </Tooltip>
                );
              })}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
});

export default SupportSidebar;
