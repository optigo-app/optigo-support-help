import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Chip,
  Skeleton,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ShareIcon from '@mui/icons-material/Share';
import { toast } from 'react-toastify';

const DEFAULT_STATUS_STYLE = { dotColor: '#64748B', bg: '#F1F5F9', color: '#475569', border: '#E2E8F0' };

const getStatusColorConfig = (statusName) => {
  const s = String(statusName || '').toLowerCase();
  if (s.includes('completed') || s.includes('solved') || s.includes('done') || s.includes('delivered')) {
    return { dotColor: '#16A34A', bg: '#F0FDF4', color: '#15803D', border: '#BBF7D0' };
  }
  if (s.includes('pending') || s.includes('wait') || s.includes('tracking')) {
    return { dotColor: '#D97706', bg: '#FFFBEB', color: '#B45309', border: '#FDE68A' };
  }
  if (s.includes('running') || s.includes('progress') || s.includes('testing')) {
    return { dotColor: '#DC2626', bg: '#FEF2F2', color: '#B91C1C', border: '#FECACA' };
  }
  if (s.includes('ticket') || s.includes('generated')) {
    return { dotColor: '#2563EB', bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE' };
  }
  return DEFAULT_STATUS_STYLE;
};

const SupportHeader = React.memo(function SupportHeader({
  activeThread,
  isLoading = false,
  onOpenFeedbackModal,
  onOpenFeedbackDetails,
}) {
  const [profileAnchor, setProfileAnchor] = useState(null);

  const raw = activeThread?.rawRecord || activeThread || {};
  const currentExtStatus =
    raw.Estatus ||
    raw.estatus ||
    activeThread?.estatus ||
    raw.status ||
    'Pending';

  const currentRating =
    Number(raw.rating ?? raw.ratingByCustomer ?? activeThread?.rating ?? 0);

  const hasFeedback = Boolean(raw.feedback && String(raw.feedback).trim());
  const hasRating = currentRating > 0;

  const isCallClosed = Boolean(
    (raw.callClosed && typeof raw.callClosed === 'string' && !raw.callClosed.startsWith("1900")) ||
    currentExtStatus.toLowerCase() === 'completed' ||
    currentExtStatus.toLowerCase() === 'solved' ||
    currentExtStatus.toLowerCase() === 'closed'
  );

  const extConfig = useMemo(
    () => getStatusColorConfig(currentExtStatus),
    [currentExtStatus]
  );

  if (!activeThread) {
    return (
      <Box
        sx={{
          height: 48,
          minHeight: 48,
          px: 2,
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid #E5E7EB',
          bgcolor: '#FFFFFF',
        }}
      >
        <Typography sx={{ fontSize: 13, color: '#94A3B8', fontWeight: 600 }}>
          Select a support call from the list
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: '#FFFFFF',
        borderBottom: '1px solid #E5E7EB',
        display: 'flex',
        flexDirection: 'column',
        userSelect: 'none',
      }}
    >
      <Box
        sx={{
          height: 48,
          minHeight: 48,
          px: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1.5,
        }}
      >
        {/* Left: Contact Person & Static External Status Chip */}
        {isLoading ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Skeleton variant="rounded" width={26} height={26} animation="wave" sx={{ borderRadius: '6px' }} />
            <Skeleton variant="text" width={130} height={22} animation="wave" />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
            {/* Caller Name & Avatar */}
            <Box
              onClick={(e) => setProfileAnchor(e.currentTarget)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.8,
                cursor: 'pointer',
                p: 0.4,
                px: 0.6,
                borderRadius: '6px',
                transition: 'all 0.15s ease',
                '&:hover': { bgcolor: '#F1F5F9' },
              }}
            >
              <Avatar
                sx={{
                  width: 26,
                  height: 26,
                  fontSize: 11,
                  fontWeight: 800,
                  bgcolor: '#EDE9FE',
                  color: '#6900C6',
                  borderRadius: '50px',
                }}
              >
                {(activeThread.callBy || activeThread.name || 'C').charAt(0).toUpperCase()}
              </Avatar>

              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: '#0F172A',
                  letterSpacing: '-0.01em',
                  whiteSpace: 'nowrap',
                }}
              >
                {activeThread.callBy || activeThread.name || 'Client'}
              </Typography>
            </Box>

            {/* Static Non-Editable External Status Chip */}
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.6,
                px: 1.2,
                py: 0.4,
                borderRadius: '50px',
                bgcolor: extConfig.bg,
                color: extConfig.color,
                border: `1px solid ${extConfig.border}`,
                cursor: 'default',
              }}
            >
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: extConfig.dotColor }} />
              <Typography sx={{ fontSize: 11.5, fontWeight: 750 }}>
                {currentExtStatus}
              </Typography>
            </Box>

            {/* Rating / Feedback Button matching CallLogger DataGrid logic */}
            {!isCallClosed ? (
              // 1. Not closed yet -> Feedback locked
              <Tooltip title="Feedback is locked until the call is completed" placement="top" arrow>
                <span>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.4,
                      px: 1,
                      py: 0.35,
                      borderRadius: '50px',
                      bgcolor: '#F8FAFC',
                      color: '#94A3B8',
                      border: '1px solid #E2E8F0',
                      cursor: 'not-allowed',
                      opacity: 0.7,
                    }}
                  >
                    <StarBorderIcon sx={{ fontSize: 13, color: '#94A3B8' }} />
                    <Typography sx={{ fontSize: 11, fontWeight: 700 }}>Rate</Typography>
                  </Box>
                </span>
              </Tooltip>
            ) : hasRating || hasFeedback ? (
              // 2. Call Closed + Rated -> Click to View Feedback Details Popover
              <Tooltip
                title={`Rated ${currentRating}/5${hasFeedback ? ` • ${raw.feedback}` : ''}`}
                placement="top"
                arrow
              >
                <Box
                  onClick={(e) => {
                    if (onOpenFeedbackDetails) {
                      onOpenFeedbackDetails(e.currentTarget, raw);
                    }
                  }}
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.5,
                    px: 1,
                    py: 0.35,
                    borderRadius: '50px',
                    bgcolor: '#F0FDF4',
                    color: '#15803D',
                    border: '1px solid #BBF7D0',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    '&:hover': { bgcolor: '#DCFCE7' },
                  }}
                >
                  <StarIcon sx={{ fontSize: 13, color: '#F59E0B' }} />
                  <Typography sx={{ fontSize: 11, fontWeight: 800 }}>
                    {hasRating ? `${currentRating}/5` : 'Done'}
                  </Typography>
                </Box>
              </Tooltip>
            ) : (
              // 3. Call Closed + Not Rated Yet -> Open FeedbackModal for One-Time Rating
              <Tooltip title="Send feedback for this call" placement="top" arrow>
                <Box
                  onClick={() => {
                    if (onOpenFeedbackModal) {
                      onOpenFeedbackModal(activeThread?.sr || activeThread?.id || raw?.id);
                    }
                  }}
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.4,
                    px: 1,
                    py: 0.35,
                    borderRadius: '50px',
                    bgcolor: '#EFF6FF',
                    color: '#2563EB',
                    border: '1px solid #BFDBFE',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    '&:hover': { bgcolor: '#DBEAFE' },
                  }}
                >
                  <StarBorderIcon sx={{ fontSize: 13, color: '#2563EB' }} />
                  <Typography sx={{ fontSize: 11, fontWeight: 800 }}>Rate</Typography>
                </Box>
              </Tooltip>
            )}
          </Box>
        )}

        {/* Profile Details Menu */}
        <Menu
          anchorEl={profileAnchor}
          open={Boolean(profileAnchor)}
          onClose={() => setProfileAnchor(null)}
          PaperProps={{ sx: { borderRadius: '8px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', minWidth: 210, mt: 0.5 } }}
        >
          <MenuItem onClick={() => setProfileAnchor(null)} sx={{ fontSize: 13, fontWeight: 600 }}>
            {activeThread.callBy || 'Client'} {activeThread.company ? `(${activeThread.company})` : ''}
          </MenuItem>
          <MenuItem onClick={() => setProfileAnchor(null)} sx={{ fontSize: 13, fontWeight: 550 }}>
            AppName: {activeThread.appname || activeThread.DeptName || 'Support'}
          </MenuItem>
          <MenuItem onClick={() => setProfileAnchor(null)} sx={{ fontSize: 13, fontWeight: 550 }}>
            Attend: {activeThread.receivedBy || 'Unassigned'}
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
});

export default SupportHeader;
