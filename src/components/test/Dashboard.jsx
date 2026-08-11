import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

const metricsData = [
  {
    value: '142',
    label: 'In Transit',
    trendValue: '12%',
    trendLabel: 'vs yesterday',
  },
  {
    value: '94%',
    label: 'OTD',
    trendValue: '1.3%',
    trendLabel: 'vs last week',
  },
  {
    value: '8',
    label: 'Exceptions',
    trendValue: '3',
    trendLabel: 'New today',
  },
  {
    value: '23',
    label: 'Pending',
    trendValue: '12%',
    trendLabel: 'Awaiting carrier reply',
  },
  {
    value: '31',
    label: 'Delivered',
    trendValue: '11%',
    trendLabel: 'vs 28 days avg',
  },
];

export default function MetricsSummaryBar() {
  return (
    <Box sx={{ width: '100%', p: 2, bgcolor: '#f9fafb' }}>
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          width: '100%',
          bgcolor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        }}
      >
        {metricsData.map((item, index) => (
          <Box
            key={index}
            sx={{
              flex: 1,
              py: 2.5,
              px: 3,
              display: 'flex',
              flexDirection: 'column',
              justify: 'center',
              borderRight: {
                xs: 'none',
                md: index !== metricsData.length - 1 ? '1px solid #e5e7eb' : 'none',
              },
              borderBottom: {
                xs: index !== metricsData.length - 1 ? '1px solid #e5e7eb' : 'none',
                md: 'none',
              },
            }}
          >
            {/* Top Row: Metric Value + Metric Label */}
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, mb: 1 }}>
              <Typography
                sx={{
                  fontSize: '1.75rem', // 28px
                  fontWeight: 600,
                  color: '#111827',
                  lineHeight: 1,
                  fontFamily: 'Inter, system-ui, sans-serif',
                }}
              >
                {item.value}
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.875rem', // 14px
                  fontWeight: 500,
                  color: '#6b7280',
                  lineHeight: 1,
                  fontFamily: 'Inter, system-ui, sans-serif',
                }}
              >
                {item.label}
              </Typography>
            </Box>

            {/* Bottom Row: Trend Icon + Trend Value + Trend Label */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
              <KeyboardDoubleArrowUpIcon
                sx={{
                  fontSize: 16,
                  color: '#10b981', // Emerald green icon
                }}
              />
              <Typography
                sx={{
                  fontSize: '0.775rem', // ~12.5px
                  fontWeight: 600,
                  color: '#10b981',
                  fontFamily: 'Inter, system-ui, sans-serif',
                }}
              >
                {item.trendValue}
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.775rem',
                  fontWeight: 400,
                  color: '#6b7280',
                  fontFamily: 'Inter, system-ui, sans-serif',
                }}
              >
                {item.trendLabel}
              </Typography>
            </Box>
          </Box>
        ))}
      </Paper>
    </Box>
  );
}