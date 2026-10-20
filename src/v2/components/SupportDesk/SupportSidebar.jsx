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
import HourglassEmptyRoundedIcon from '@mui/icons-material/HourglassEmptyRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import { useCallLog } from '../../modules/context/UseCallLog';

const ITEM_HEIGHT = 78;
const OVERSCAN = 5;

const SupportSidebar = React.memo(function SupportSidebar({
  threads = [],
  activeThreadId,
  onSelectThread,
  searchQuery = '',
  isLoading = false,
  status = '',
  setStatus,
  width = 415,
}) {
  const { ESTATUS_LIST = [] } = useCallLog();
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

  // 1. Status Rail Configuration (3 Status Options: Pending, Running, Completed)
  const railItems = useMemo(() => {
    const findMasterItem = (keyword) => {
      const kw = keyword.trim().toLowerCase();
      // 1. EXACT match first
      const exact = ESTATUS_LIST.find(
        (item) => (item?.label || '').trim().toLowerCase() === kw
      );
      if (exact) return exact;

      // 2. Completed can match 'solved' as exact
      if (kw === 'completed') {
        const solved = ESTATUS_LIST.find(
          (item) => (item?.label || '').trim().toLowerCase() === 'solved'
        );
        if (solved) return solved;
      }
      return null;
    };

    const pendingItem = findMasterItem('pending');
    const completedItem = findMasterItem('completed');

    return [
      {
        key: 'pending',
        label: 'Pending',
        statusValue: pendingItem?.value ?? 'Pending',
        icon: HourglassEmptyRoundedIcon,
        theme: {
          primary: '#F59E0B',
          bgActive: '#FEF3C7',
          bgHover: '#FFFBEB',
          border: '#FCD34D',
          textActive: '#92400E',
          iconColor: '#D97706',
          badgeBg: '#FEF3C7',
          activeBadgeBg: '#D97706',
          activeBadgeText: '#FFFFFF',
        },
      },
      {
        key: 'completed',
        label: 'Solved',
        statusValue: completedItem?.value ?? 'Solved',
        icon: CheckCircleRoundedIcon,
        theme: {
          primary: '#10B981',
          bgActive: '#ECFDF5',
          bgHover: '#F0FDF4',
          border: '#A7F3D0',
          textActive: '#065F46',
          iconColor: '#059669',
          badgeBg: '#ECFDF5',
          activeBadgeBg: '#059669',
          activeBadgeText: '#FFFFFF',
        },
      },
    ];
  }, [ESTATUS_LIST]);

  // Check if an item is currently active (EXACT match only)
  const isItemActive = useCallback(
    (item) => {
      if (!status) return false;
      const statusStr = String(status).trim().toLowerCase();
      const valStr = String(item.statusValue).trim().toLowerCase();
      if (statusStr === valStr) return true;

      const itemLabel = item.label.trim().toLowerCase();
      if (statusStr === itemLabel) return true;

      const matched = ESTATUS_LIST.find(
        (e) => String(e.value).trim().toLowerCase() === statusStr
      );
      if (matched) {
        const mLbl = (matched.label || '').trim().toLowerCase();
        if (item.key === 'pending') return mLbl === 'pending';
        if (item.key === 'running') return mLbl === 'running';
        if (item.key === 'completed') return mLbl === 'completed' || mLbl === 'solved';
      }

      if (item.key === 'pending') return statusStr === 'pending';
      if (item.key === 'running') return statusStr === 'running';
      if (item.key === 'completed') return statusStr === 'completed' || statusStr === 'solved';

      return false;
    },
    [status, ESTATUS_LIST]
  );

  // Active status item (if any)
  const activeRailItem = useMemo(() => {
    return railItems.find((item) => isItemActive(item)) || null;
  }, [railItems, isItemActive]);

  // Handle clicking on rail section
  const handleItemClick = useCallback(
    (item) => {
      if (!setStatus) return;
      if (isItemActive(item)) {
        setStatus('');
      } else {
        setStatus(item.statusValue);
      }
    },
    [isItemActive, setStatus]
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
      {/* Sidebar Header: All Calls & Status Filter Chips */}
      <Box
        sx={{
          px: 2,
          py: 1.2,
          bgcolor: '#FFFFFF',
          borderBottom: '1px solid #F1F5F9',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          flexShrink: 0,
        }}
      >
        {/* Row 1: All Calls Title + Count Badge */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box
            onClick={activeRailItem ? () => setStatus && setStatus('') : undefined}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              cursor: activeRailItem ? 'pointer' : 'default',
            }}
          >
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 800,
                color: '#0F172A',
                cursor: activeRailItem ? 'pointer' : 'default',
                transition: 'color 0.15s ease',
                '&:hover': activeRailItem ? { color: '#4F46E5' } : undefined,
              }}
            >
              All Calls
            </Typography>
            <Chip
              label={totalCount > 999 ? `${(totalCount / 1000).toFixed(1)}k` : totalCount}
              size="small"
              onClick={activeRailItem ? () => setStatus && setStatus('') : undefined}
              sx={{
                height: 18,
                fontSize: 10,
                fontWeight: 750,
                bgcolor: '#EDE9FE',
                color: '#6900C6',
                cursor: activeRailItem ? 'pointer' : 'default',
              }}
            />
          </Box>

          {activeRailItem && (
            <Tooltip title="Clear filter and show all calls" arrow>
              <Typography
                onClick={() => setStatus && setStatus('')}
                sx={{
                  fontSize: 11,
                  fontWeight: 650,
                  color: '#64748B',
                  cursor: 'pointer',
                  transition: 'color 0.15s ease',
                  '&:hover': { color: '#EF4444' },
                }}
              >
                Clear filter
              </Typography>
            </Tooltip>
          )}
        </Box>

        {/* Row 2: Status Filter Chips (Pending, Running, Completed) without counts */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, flexWrap: 'wrap' }}>
          {railItems.map((item) => {
            const active = isItemActive(item);
            const IconComponent = item.icon;

            return (
              <Chip
                key={item.key}
                label={item.label}
                size="small"
                icon={
                  IconComponent ? (
                    <IconComponent
                      sx={{
                        fontSize: '13px !important',
                        color: active
                          ? `${item.theme.iconColor} !important`
                          : '#94A3B8 !important',
                        transition: 'color 0.15s ease',
                      }}
                    />
                  ) : undefined
                }
                onDelete={active ? () => setStatus && setStatus('') : undefined}
                onClick={() => handleItemClick(item)}
                sx={{
                  height: 24,
                  fontSize: 11,
                  fontWeight: active ? 750 : 600,
                  cursor: 'pointer',
                  bgcolor: active ? item.theme.badgeBg : '#F8FAFC',
                  color: active ? item.theme.textActive : '#64748B',
                  border: `1px solid ${active ? item.theme.primary : '#E2E8F0'}`,
                  transition: 'all 0.18s cubic-bezier(0.4, 0, 0.2, 1)',
                  '& .MuiChip-deleteIcon': {
                    fontSize: 13,
                    color: item.theme.iconColor,
                    marginRight: '4px',
                    '&:hover': {
                      color: item.theme.textActive,
                    },
                  },
                  '&:hover': {
                    bgcolor: active ? item.theme.border : '#F1F5F9',
                    borderColor: active ? item.theme.primary : '#CBD5E1',
                    color: active ? item.theme.textActive : '#334155',
                  },
                }}
              />
            );
          })}
        </Box>
      </Box>

      {/* Body: Virtual Scroll Calls List */}
      <Box sx={{ flex: 1, display: 'flex', minHeight: 0, overflow: 'hidden' }}>

        {/* Virtual Scroll Container */}
        <Box
          ref={scrollContainerRef}
          onScroll={onScroll}
          sx={{
            flex: 1,
            minWidth: 0,
            overflowY: 'auto',
            overflowX: 'hidden',
            position: 'relative',
            WebkitOverflowScrolling: 'touch',
            '&::-webkit-scrollbar': { width: '5px' },
            '&::-webkit-scrollbar-thumb': { bgcolor: '#CBD5E1', borderRadius: '4px' },
          }}
        >
          {isLoading && totalCount === 0 ? (
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
                  const status = String(rec.Estatus || rec.estatus || thread.estatus || '');
                  const isSolved = status.toLowerCase() === 'solved' || status.toLowerCase() === 'completed';
                  const isRunning = status.toLowerCase() === 'running';
                  const isPending = status.toLowerCase() === 'pending';
                  const rating = Number(rec.rating ?? rec.ratingByCustomer ?? thread.rating ?? 0);

                  const hoverTooltipTitle = (
                    <Box sx={{ p: 1.2, maxWidth: 320 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.8, gap: 1 }}>
                        <Typography sx={{ fontSize: 12, fontWeight: 800, color: '#FAEA2B' }}>
                          Support Call #{thread.sr || rec.sr || 'N/A'}
                        </Typography>
                        {status && (
                          <Chip
                            label={isSolved ? 'Solved' : 'Pending'}
                            size="small"
                            sx={{
                              height: 17,
                              fontSize: 9.5,
                              fontWeight: 800,
                              bgcolor: isSolved ? '#10B981' : '#F59E0B',
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
                          {(() => {
                            const hasNewComment = Boolean(thread.hasNewComment || thread.unread || rec.hasNewComment);
                            return (
                              <Avatar
                                sx={{
                                  width: 35,
                                  height: 35,
                                  borderRadius: '50px',
                                  bgcolor: '#EDE9FE',
                                  color: '#6900C6',
                                  fontSize: 12,
                                  fontWeight: 700,
                                  boxShadow: hasNewComment ? "0 0 0 2px #fff, 0 0 0 4px #4A66FF" : "none",
                                  transition: "box-shadow 0.2s ease-in-out",
                                }}
                              >
                                {(thread.name || thread.callBy || thread.company || 'E').charAt(0).toUpperCase()}
                              </Avatar>
                            );
                          })()}

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
                          {/* 1. Main Title (Fixed Description / Topic) & Time */}
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.2 }}>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                fontSize: '0.82rem',
                                fontWeight: (thread.hasNewComment || thread.unread) ? 800 : 700,
                                color: '#0F172A',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: 240,
                              }}
                              title={rec.description || rec.topicRaisedBy || thread.title || thread.name}
                            >
                              {rec.description || rec.topicRaisedBy || thread.title || thread.name || 'Support Call'}
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, flexShrink: 0 }}>
                              {Boolean(thread.hasNewComment || thread.unread || rec.hasNewComment) && (
                                <Chip
                                  label="• NEW"
                                  size="small"
                                  sx={{
                                    height: 16,
                                    fontSize: '0.6rem',
                                    fontWeight: 800,
                                    bgcolor: '#4A66FF',
                                    color: '#FFFFFF',
                                    animation: 'pulseBadge 1.5s infinite ease-in-out',
                                    '@keyframes pulseBadge': {
                                      '0%': { opacity: 1, transform: 'scale(1)' },
                                      '50%': { opacity: 0.7, transform: 'scale(0.96)' },
                                      '100%': { opacity: 1, transform: 'scale(1)' },
                                    },
                                  }}
                                />
                              )}
                              <Typography variant="caption" sx={{ fontSize: '0.68rem', color: '#94A3B8' }}>
                                {thread.timestamp || rec.time || '12:00'}
                              </Typography>
                            </Box>
                          </Box>

                          {/* 2. Person Name & Status Chip + Rating Star Display */}
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, mb: 0.2 }}>
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
                                label={isSolved ? 'Solved' : 'Pending'}
                                size="small"
                                sx={{
                                  height: 16,
                                  fontSize: '0.62rem',
                                  fontWeight: 700,
                                  px: 0.2,
                                  bgcolor: isSolved ? '#DCFCE7' : '#FEF3C7',
                                  color: isSolved ? '#15803D' : '#D97706',
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

                          {/* 3. New Line: Latest Comment Snippet */}
                          {(() => {
                            let cText = thread.latestComment;
                            let cAuthor = thread.latestCommentAuthor;
                            if (!cText) {
                              try {
                                const raw = rec.comment || rec.review_comments;
                                const parsed = typeof raw === 'string' ? JSON.parse(raw) : (Array.isArray(raw) ? raw : []);
                                if (Array.isArray(parsed) && parsed.length > 0) {
                                  const lastC = parsed[parsed.length - 1];
                                  cText = (lastC.Comments ?? lastC.comment ?? lastC.text ?? '').trim();
                                  cAuthor = lastC.Name || (lastC.IsClient === 1 || lastC.IsClient === '1' ? 'Client' : 'Agent');
                                }
                              } catch (_) { }
                            }

                            return (
                              <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0, mt: 0.1 }}>
                                {cText ? (
                                  <Typography
                                    variant="caption"
                                    sx={{
                                      fontSize: '0.72rem',
                                      color: (thread.hasNewComment || thread.unread) ? '#1E293B' : '#64748B',
                                      fontWeight: (thread.hasNewComment || thread.unread) ? 650 : 400,
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      maxWidth: 240,
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: 0.4,
                                    }}
                                  >
                                    <ChatBubbleOutlineRoundedIcon
                                      sx={{
                                        fontSize: '12px',
                                        color: (thread.hasNewComment || thread.unread) ? '#4F46E5' : '#94A3B8',
                                        flexShrink: 0,
                                        mr: 0.2,
                                      }}
                                    />
                                    {cAuthor ? (
                                      <span style={{ fontWeight: 650, color: (thread.hasNewComment || thread.unread) ? '#4338CA' : '#475569', flexShrink: 0 }}>
                                        {cAuthor}:
                                      </span>
                                    ) : null}
                                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                      {cText}
                                    </span>
                                  </Typography>
                                ) : (
                                  <Typography
                                    variant="caption"
                                    sx={{
                                      fontSize: '0.7rem',
                                      color: '#94A3B8',
                                      fontStyle: 'italic',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: 0.4,
                                    }}
                                  >
                                    <ChatBubbleOutlineRoundedIcon sx={{ fontSize: '11px', color: '#CBD5E1', flexShrink: 0 }} />
                                    No comments yet
                                  </Typography>
                                )}
                              </Box>
                            );
                          })()}
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
    </Box>
  );
});

export default SupportSidebar;
