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
import { useCallLog } from '../../modules/context/UseCallLog';

const ITEM_HEIGHT = 74;
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
    const runningItem = findMasterItem('running');
    const completedItem = findMasterItem('completed');

    return [
      {
        key: 'pending',
        label: 'Pending',
        statusValue: pendingItem?.value ?? 'Pending',
        theme: {
          primary: '#F59E0B',
          bgActive: 'linear-gradient(180deg, #FEF3C7 0%, #FDE68A 100%)',
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
        key: 'running',
        label: 'Running',
        statusValue: runningItem?.value ?? 'Running',
        theme: {
          primary: '#3B82F6',
          bgActive: 'linear-gradient(180deg, #EFF6FF 0%, #DBEAFE 100%)',
          bgHover: '#F0F7FF',
          border: '#BFDBFE',
          textActive: '#1E40AF',
          iconColor: '#2563EB',
          badgeBg: '#EFF6FF',
          activeBadgeBg: '#2563EB',
          activeBadgeText: '#FFFFFF',
        },
      },
      {
        key: 'completed',
        label: 'Completed',
        statusValue: completedItem?.value ?? 'Completed',
        theme: {
          primary: '#10B981',
          bgActive: 'linear-gradient(180deg, #ECFDF5 0%, #D1FAE5 100%)',
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

  // Dynamic status counts (EXACT match only: Pending, Running, Completed)
  const statusCounts = useMemo(() => {
    let pending = 0;
    let running = 0;
    let completed = 0;

    const pendingVal = String(railItems[0]?.statusValue ?? '').trim().toLowerCase();
    const runningVal = String(railItems[1]?.statusValue ?? '').trim().toLowerCase();
    const completedVal = String(railItems[2]?.statusValue ?? '').trim().toLowerCase();

    for (let i = 0; i < threads.length; i++) {
      const t = threads[i];
      const rec = t.rawRecord || t;
      const rawEstatus = rec.Estatus ?? rec.estatus ?? t.estatus;
      if (rawEstatus !== undefined && rawEstatus !== null && rawEstatus !== '') {
        const s = String(rawEstatus).trim().toLowerCase();
        if (s === 'completed' || s === 'solved' || (completedVal && s === completedVal)) {
          completed++;
        } else if (s === 'running' || (runningVal && s === runningVal)) {
          running++;
        } else if (s === 'pending' || (pendingVal && s === pendingVal)) {
          pending++;
        }
      }
    }
    return { pending, running, completed };
  }, [threads, railItems]);

  const baselineCountsRef = useRef({ pending: 0, running: 0, completed: 0 });
  useEffect(() => {
    if (!status) {
      baselineCountsRef.current = statusCounts;
    } else if (activeRailItem?.key) {
      baselineCountsRef.current = {
        ...baselineCountsRef.current,
        [activeRailItem.key]: totalCount,
      };
    }
  }, [status, statusCounts, activeRailItem, totalCount]);

  const getItemCount = useCallback(
    (key) => {
      if (!status) {
        return statusCounts[key] ?? 0;
      }
      if (activeRailItem?.key === key) {
        return totalCount;
      }
      return baselineCountsRef.current[key] ?? 0;
    },
    [status, statusCounts, totalCount, activeRailItem]
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
          <Typography
            onClick={activeRailItem ? () => setStatus && setStatus('') : undefined}
            sx={{
              fontSize: 13,
              fontWeight: 800,
              color: '#0F172A',
              cursor: activeRailItem ? 'pointer' : 'default',
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
          <Tooltip title="Clear status filter and show all calls" arrow>
            <Chip
              label={`${activeRailItem.label} ✕`}
              size="small"
              onClick={() => setStatus && setStatus('')}
              sx={{
                height: 22,
                fontSize: 10.5,
                fontWeight: 800,
                cursor: 'pointer',
                bgcolor: activeRailItem.theme.badgeBg,
                color: activeRailItem.theme.textActive,
                border: `1px solid ${activeRailItem.theme.border}`,
                transition: 'all 0.15s ease',
                '&:hover': {
                  bgcolor: activeRailItem.theme.border,
                },
              }}
            />
          </Tooltip>
        )}
      </Box>

      {/* Body: Vertical Status Rail + Virtual Scroll Calls List */}
      <Box sx={{ flex: 1, display: 'flex', minHeight: 0, overflow: 'hidden' }}>
        {/* Exact Vertical Status Filter Rail matching user's sketch */}
        <Box
          sx={{
            py: 1.2,
            pl: 1,
            pr: 0.6,
            display: 'flex',
            flexDirection: 'column',
            userSelect: 'none',
            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              width: 52,
              flex: 1,
              bgcolor: '#F8FAFC',
              border: '1.5px solid #E2E8F0',
              borderRadius: '1px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)',
            }}
          >
            {railItems.map((item, idx) => {
              const active = isItemActive(item);
              const count = getItemCount(item.key);
              const isFirst = idx === 0;
              const isLast = idx === railItems.length - 1;

              return (
                <Tooltip
                  key={item.key}
                  title={
                    <Box sx={{ p: 0.4 }}>
                      <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#FFFFFF' }}>
                        {item.label} Calls ({count})
                      </Typography>
                      <Typography sx={{ fontSize: 11, color: '#CBD5E1', mt: 0.2 }}>
                        {active ? 'Click to show all calls' : `Filter by ${item.label} (${count})`}
                      </Typography>
                    </Box>
                  }
                  placement="right"
                  arrow
                >
                  <Box
                    onClick={() => handleItemClick(item)}
                    sx={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      py: 1.6,
                      px: 0.5,
                      cursor: 'pointer',
                      position: 'relative',
                      background: active ? item.theme.bgActive : 'transparent',
                      borderBottom: !isLast ? '1.5px solid #E2E8F0' : 'none',
                      borderTopLeftRadius: isFirst ? '1px' : 0,
                      borderTopRightRadius: isFirst ? '1px' : 0,
                      borderBottomLeftRadius: isLast ? '1px' : 0,
                      borderBottomRightRadius: isLast ? '1px' : 0,
                      borderRight: active ? `3.5px solid ${item.theme.primary}` : '3.5px solid transparent',
                      boxShadow: active ? 'inset 0 0 10px rgba(0,0,0,0.03)' : 'none',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        bgcolor: active ? undefined : item.theme.bgHover,
                        '& .rail-icon': {
                          transform: 'scale(1.15)',
                        },
                      },
                    }}
                  >
                    {/* Top: Status Icon */}
                    <Box
                      sx={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: active ? item.theme.badgeBg : 'rgba(0,0,0,0.03)',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {item.key === 'pending' && (
                        <HourglassEmptyRoundedIcon
                          className="rail-icon"
                          sx={{
                            fontSize: 17,
                            color: active ? item.theme.iconColor : '#94A3B8',
                            transition: 'all 0.2s ease',
                          }}
                        />
                      )}
                      {item.key === 'running' && (
                        <PlayArrowRoundedIcon
                          className="rail-icon"
                          sx={{
                            fontSize: 19,
                            color: active ? item.theme.iconColor : '#94A3B8',
                            transition: 'all 0.2s ease',
                          }}
                        />
                      )}
                      {item.key === 'completed' && (
                        <CheckCircleRoundedIcon
                          className="rail-icon"
                          sx={{
                            fontSize: 17,
                            color: active ? item.theme.iconColor : '#94A3B8',
                            transition: 'all 0.2s ease',
                          }}
                        />
                      )}
                    </Box>

                    {/* Middle: Rotated Vertical Label */}
                    <Typography
                      sx={{
                        fontSize: 10.5,
                        fontWeight: active ? 800 : 700,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        writingMode: 'vertical-rl',
                        transform: 'rotate(180deg)',
                        color: active ? item.theme.textActive : '#64748B',
                        userSelect: 'none',
                        transition: 'color 0.2s ease',
                      }}
                    >
                      {item.label}
                    </Typography>

                    {/* Bottom: Count Badge */}
                    <Box
                      sx={{
                        minWidth: 22,
                        height: 18,
                        px: 0.6,
                        borderRadius: '9px',
                        fontSize: 10,
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: active ? item.theme.activeBadgeBg : '#E2E8F0',
                        color: active ? item.theme.activeBadgeText : '#64748B',
                        boxShadow: active ? `0 2px 6px ${item.theme.primary}45` : 'none',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {count}
                    </Box>
                  </Box>
                </Tooltip>
              );
            })}
          </Box>
        </Box>

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
                  const status = rec.Estatus || rec.estatus || thread.estatus || '';
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
                          {/* Title & Time */}
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
                            >
                              {thread.lastMessage || rec.topicRaisedBy || rec.description || thread.name}
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
                                  bgcolor: isSolved ? '#DCFCE7' : isRunning ? '#DBEAFE' : isPending ? '#FEF3C7' : '#F1F5F9',
                                  color: isSolved ? '#15803D' : isRunning ? '#1D4ED8' : isPending ? '#D97706' : '#64748B',
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
    </Box>
  );
});

export default SupportSidebar;
