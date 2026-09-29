import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Popover,
  Button,
  Divider,
  Stack,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS_SHORT = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function isSameDay(d1, d2) {
  if (!d1 || !d2) return false;
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

function isBetweenDays(date, start, end) {
  if (!date || !start || !end) return false;
  const t = date.getTime();
  return t >= start.getTime() && t <= end.getTime();
}

export default function AirbnbDateRangePicker({
  startDate = null,
  endDate = null,
  onChange,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [rangeStart, setRangeStart] = useState(startDate);
  const [rangeEnd, setRangeEnd] = useState(endDate);
  const [hoverDate, setHoverDate] = useState(null);

  const [currentMonth, setCurrentMonth] = useState(
    startDate instanceof Date ? new Date(startDate.getFullYear(), startDate.getMonth(), 1) : new Date()
  );

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setRangeStart(startDate);
    setRangeEnd(endDate);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setHoverDate(null);
  };

  const handleApply = () => {
    if (onChange) {
      onChange({ start: rangeStart, end: rangeEnd });
    }
    handleClose();
  };

  const handleClear = () => {
    setRangeStart(null);
    setRangeEnd(null);
    setHoverDate(null);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const nextMonthDate = useMemo(() => {
    return new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
  }, [currentMonth]);

  const handleDateClick = (dayDate) => {
    if (!rangeStart || (rangeStart && rangeEnd)) {
      setRangeStart(dayDate);
      setRangeEnd(null);
    } else if (rangeStart && !rangeEnd) {
      if (dayDate.getTime() < rangeStart.getTime()) {
        setRangeEnd(rangeStart);
        setRangeStart(dayDate);
      } else {
        setRangeEnd(dayDate);
      }
    }
  };

  const handlePreset = (presetKey) => {
    const today = new Date();
    let s = new Date(today);
    let e = new Date(today);

    switch (presetKey) {
      case 'today':
        break;
      case 'yesterday':
        s.setDate(today.getDate() - 1);
        e.setDate(today.getDate() - 1);
        break;
      case 'last7':
        s.setDate(today.getDate() - 6);
        break;
      case 'last30':
        s.setDate(today.getDate() - 29);
        break;
      case 'thisMonth':
        s = new Date(today.getFullYear(), today.getMonth(), 1);
        e = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      case 'lastMonth':
        s = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        e = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      case 'ytd':
        s = new Date(today.getFullYear(), 0, 1);
        break;
      default:
        break;
    }

    setRangeStart(s);
    setRangeEnd(e);
    if (onChange) {
      onChange({ start: s, end: e });
    }
    handleClose();
  };

  const displayText = useMemo(() => {
    if (!startDate && !endDate) return 'Select dates';
    const fmt = (d) =>
      d
        ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : '';
    if (startDate && !endDate) return `${fmt(startDate)} - ...`;
    if (startDate && endDate) {
      if (isSameDay(startDate, endDate)) return fmt(startDate);
      return `${fmt(startDate)} - ${fmt(endDate)}`;
    }
    return 'Select dates';
  }, [startDate, endDate]);

  const renderMonthGrid = (monthDate) => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null);
    }
    for (let d = 1; d <= totalDays; d++) {
      days.push(new Date(year, month, d));
    }

    return (
      <Box sx={{ width: 230 }}>
        <Typography
          sx={{
            textAlign: 'center',
            fontWeight: 800,
            fontSize: 13,
            color: '#0F172A',
            mb: 1.2,
          }}
        >
          {MONTH_NAMES[month]} {year}
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', mb: 0.8 }}>
          {DAYS_SHORT.map((ds) => (
            <Typography
              key={ds}
              sx={{
                textAlign: 'center',
                fontSize: 10.5,
                fontWeight: 700,
                color: '#94A3B8',
              }}
            >
              {ds}
            </Typography>
          ))}
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
          {days.map((dayDate, idx) => {
            if (!dayDate) {
              return <Box key={`empty-${idx}`} sx={{ height: 30 }} />;
            }

            const isStart = isSameDay(dayDate, rangeStart);
            const isEnd = isSameDay(dayDate, rangeEnd);
            const effectiveEnd = rangeEnd || (rangeStart && hoverDate ? hoverDate : null);
            const inRange =
              rangeStart && effectiveEnd && isBetweenDays(dayDate, rangeStart, effectiveEnd);

            return (
              <Box
                key={dayDate.toISOString()}
                onClick={() => handleDateClick(dayDate)}
                onMouseEnter={() => {
                  if (rangeStart && !rangeEnd) setHoverDate(dayDate);
                }}
                sx={{
                  height: 30,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11.5,
                  fontWeight: isStart || isEnd ? 800 : 500,
                  cursor: 'pointer',
                  borderRadius: isStart ? '6px 0 0 6px' : isEnd ? '0 6px 6px 0' : '4px',
                  bgcolor: isStart || isEnd ? '#4F46E5' : inRange ? '#EEF2FF' : 'transparent',
                  color: isStart || isEnd ? '#FFFFFF' : inRange ? '#4338CA' : '#1E293B',
                  transition: 'all 0.1s ease',
                  '&:hover': {
                    bgcolor: isStart || isEnd ? '#4338CA' : '#E0E7FF',
                  },
                }}
              >
                {dayDate.getDate()}
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          border: '1px solid #CBD5E1',
          borderRadius: '5px',
          bgcolor: '#FFFFFF',
          height: 32,
          p: '2px',
          transition: 'all 0.15s ease',
          '&:hover': {
            borderColor: '#94A3B8',
          },
        }}
      >
        <IconButton
          size="small"
          onClick={() => {
            const s = new Date(startDate || 2026, 7, 1);
            const e = new Date(endDate || 2026, 7, 31);
            s.setDate(s.getDate() - 7);
            e.setDate(e.getDate() - 7);
            if (onChange) onChange({ start: s, end: e });
          }}
          sx={{ p: 0.4, color: '#64748B' }}
        >
          <ChevronLeftIcon sx={{ fontSize: 15 }} />
        </IconButton>

        <Box
          onClick={handleClick}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.8,
            px: 1,
            cursor: 'pointer',
            height: '100%',
          }}
        >
          <CalendarMonthIcon sx={{ fontSize: 16, color: '#4F46E5' }} />
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 600,
              color: '#0F172A',
              letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
            }}
          >
            {displayText}
          </Typography>
          <KeyboardArrowDownIcon sx={{ fontSize: 14, color: '#64748B' }} />
        </Box>

        <IconButton
          size="small"
          onClick={() => {
            const s = new Date(startDate || 2026, 7, 1);
            const e = new Date(endDate || 2026, 7, 31);
            s.setDate(s.getDate() + 7);
            e.setDate(e.getDate() + 7);
            if (onChange) onChange({ start: s, end: e });
          }}
          sx={{ p: 0.4, color: '#64748B' }}
        >
          <ChevronRightIcon sx={{ fontSize: 15 }} />
        </IconButton>
      </Paper>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: '12px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.16)',
            overflow: 'hidden',
            bgcolor: '#FFFFFF',
          },
        }}
      >
        <Box sx={{ display: 'flex' }}>
          {/* Quick Presets */}
          <Box
            sx={{
              width: 140,
              p: 1.5,
              borderRight: '1px solid #F1F5F9',
              bgcolor: '#FAFAFA',
              display: 'flex',
              flexDirection: 'column',
              gap: 0.4,
            }}
          >
            <Typography
              sx={{
                fontSize: 10.5,
                fontWeight: 750,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                color: '#94A3B8',
                mb: 0.6,
                px: 1,
              }}
            >
              Presets
            </Typography>
            {[
              { id: 'today', label: 'Today' },
              { id: 'yesterday', label: 'Yesterday' },
              { id: 'last7', label: 'Last 7 days' },
              { id: 'last30', label: 'Last 30 days' },
              { id: 'thisMonth', label: 'This month' },
              { id: 'lastMonth', label: 'Last month' },
              { id: 'ytd', label: 'Year to date' },
            ].map((preset) => (
              <Box
                key={preset.id}
                onClick={() => handlePreset(preset.id)}
                sx={{
                  px: 1,
                  py: 0.6,
                  borderRadius: '6px',
                  fontSize: 11.5,
                  fontWeight: 550,
                  color: '#334155',
                  cursor: 'pointer',
                  transition: 'all 0.12s ease',
                  '&:hover': {
                    bgcolor: '#EEF2FF',
                    color: '#4F46E5',
                  },
                }}
              >
                {preset.label}
              </Box>
            ))}
          </Box>

          {/* Dual Month Calendar */}
          <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 1.5,
              }}
            >
              <IconButton
                size="small"
                onClick={handlePrevMonth}
                sx={{ border: '1px solid #E2E8F0', borderRadius: '6px', p: 0.5 }}
              >
                <ChevronLeftIcon sx={{ fontSize: 16, color: '#334155' }} />
              </IconButton>

              <Typography sx={{ fontSize: 12, fontWeight: 650, color: '#64748B' }}>
                Select check-in & check-out dates
              </Typography>

              <IconButton
                size="small"
                onClick={handleNextMonth}
                sx={{ border: '1px solid #E2E8F0', borderRadius: '6px', p: 0.5 }}
              >
                <ChevronRightIcon sx={{ fontSize: 16, color: '#334155' }} />
              </IconButton>
            </Box>

            <Stack direction="row" spacing={3} divider={<Divider orientation="vertical" flexItem />}>
              {renderMonthGrid(currentMonth)}
              {renderMonthGrid(nextMonthDate)}
            </Stack>

            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Button
                size="small"
                onClick={handleClear}
                sx={{ textTransform: 'none', fontSize: 12, fontWeight: 650, color: '#64748B' }}
              >
                Clear dates
              </Button>

              <Stack direction="row" spacing={1}>
                <Button
                  size="small"
                  onClick={handleClose}
                  sx={{ textTransform: 'none', fontSize: 12, fontWeight: 600, color: '#475569' }}
                >
                  Cancel
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  onClick={handleApply}
                  sx={{
                    textTransform: 'none',
                    fontSize: 12,
                    fontWeight: 650,
                    bgcolor: '#1E293B',
                    color: '#FFFFFF',
                    '&:hover': { bgcolor: '#0F172A' },
                  }}
                >
                  Apply Range
                </Button>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Popover>
    </>
  );
}
