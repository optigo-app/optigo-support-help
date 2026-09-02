import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Tabs,
  Tab,
  Avatar,
  Chip,
  Tooltip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BusinessIcon from '@mui/icons-material/Business';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import ImageIcon from '@mui/icons-material/Image';
import StarIcon from '@mui/icons-material/Star';
import AttachmentPill from './AttachmentPill';

export default function RightDetailInspector({
  open = false,
  onClose,
  activeThread,
  selectedCompany,
  threads = [],
  companies = [],
  onSelectThread,
}) {
  const [activeTab, setActiveTab] = useState('call');

  if (!open) return null;

  const rec = activeThread?.rawRecord || {};
  const currentRating = activeThread?.rating || rec.rating || 0;

  // Extract attachments from comments or record
  const callAttachments = [];
  if (rec.comments && Array.isArray(rec.comments)) {
    rec.comments.forEach((c) => {
      if (c.img) {
        callAttachments.push({
          id: c.id || String(Math.random()),
          filename: c.img.split('/').pop() || 'Attachment.jpg',
          imgUrl: c.img,
          author: c.author || 'User',
        });
      }
    });
  }

  const followupsList = rec.followups || [];

  return (
    <Box
      sx={{
        width: 320,
        minWidth: 320,
        height: '100%',
        bgcolor: '#FFFFFF',
        borderLeft: '1px solid #E2E8F0',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 5,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 1.5,
          px: 2,
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <HeadsetMicIcon sx={{ fontSize: 18, color: '#6900C6' }} />
          <Typography sx={{ fontSize: 13.5, fontWeight: 800, color: '#0F172A' }}>
            Call Inspector
          </Typography>
        </Box>
        <IconButton size="small" onClick={onClose} sx={{ color: '#64748B' }}>
          <CloseIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onChange={(_, val) => setActiveTab(val)}
        sx={{
          borderBottom: '1px solid #F1F5F9',
          minHeight: 38,
          '& .MuiTab-root': {
            minHeight: 38,
            fontSize: 12,
            fontWeight: 700,
            textTransform: 'none',
            px: 2,
          },
        }}
      >
        <Tab value="call" label="Call Info" />
        <Tab value="files" label={`Files (${callAttachments.length})`} />
      </Tabs>

      {/* Body Content */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {activeTab === 'call' && (
          <>
            {/* Ticket Header Card */}
            <Box sx={{ p: 1.5, bgcolor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700 }}>
                Ticket #{rec.sr || activeThread?.sr || '101'}
              </Typography>
              <Typography sx={{ fontSize: 13, fontWeight: 800, color: '#0F172A', mt: 0.3 }}>
                {activeThread?.lastMessage || rec.topic || 'Support Call Record'}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mt: 1 }}>
                <Chip
                  label={activeThread?.status || 'Solved'}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: 10,
                    fontWeight: 800,
                    bgcolor: activeThread?.status === 'Solved' ? '#DCFCE7' : '#FEF3C7',
                    color: activeThread?.status === 'Solved' ? '#166534' : '#B45309',
                  }}
                />
                {currentRating > 0 && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                    <StarIcon sx={{ fontSize: 14, color: '#F59E0B' }} />
                    <Typography sx={{ fontSize: 11, fontWeight: 800, color: '#92400E' }}>
                      {currentRating}.0
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>

            {/* Caller Information */}
            <Box>
              <Typography sx={{ fontSize: 11, fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', mb: 1 }}>
                Persons In This Call
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, p: 1.2, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px' }}>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: '#EDE9FE', color: '#6900C6', fontWeight: 800, fontSize: 12 }}>
                    {(rec.callBy || 'C').charAt(0).toUpperCase()}
                  </Avatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ fontSize: 12.5, fontWeight: 750, color: '#0F172A' }}>
                      {rec.callBy || activeThread?.name || 'Client Caller'}
                    </Typography>
                    <Typography variant="caption" sx={{ fontSize: 10.5, color: '#64748B' }}>
                      Client • {rec.company || 'Company Representative'}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, p: 1.2, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px' }}>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: '#0284C7', color: '#FFFFFF', fontWeight: 800, fontSize: 12 }}>
                    {(rec.receivedBy || 'A').charAt(0).toUpperCase()}
                  </Avatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ fontSize: 12.5, fontWeight: 750, color: '#0F172A' }}>
                      {rec.receivedBy || 'Support Agent'}
                    </Typography>
                    <Typography variant="caption" sx={{ fontSize: 10.5, color: '#64748B' }}>
                      Agent • {rec.DeptName || 'General Support'}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Telemetry */}
            <Box>
              <Typography sx={{ fontSize: 11, fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', mb: 1 }}>
                Call Telemetry
              </Typography>
              <Box sx={{ p: 1.4, bgcolor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: 0.8 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography sx={{ fontSize: 11.5, color: '#64748B' }}>Start Time:</Typography>
                  <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: '#0F172A' }}>{rec.callStart || rec.time || '12:00 PM'}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography sx={{ fontSize: 11.5, color: '#64748B' }}>Duration:</Typography>
                  <Typography sx={{ fontSize: 11.5, fontWeight: 800, color: '#6900C6' }}>{rec.CallDuration || activeThread?.duration || '00:03:45'}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography sx={{ fontSize: 11.5, color: '#64748B' }}>Department:</Typography>
                  <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: '#0F172A' }}>{rec.DeptName || 'Tag Print'}</Typography>
                </Box>
              </Box>
            </Box>
          </>
        )}

        {activeTab === 'files' && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
            {callAttachments.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4, color: '#94A3B8' }}>
                <ImageIcon sx={{ fontSize: 36 }} />
                <Typography sx={{ fontSize: 13, fontWeight: 600, mt: 1 }}>No attachments</Typography>
                <Typography variant="caption">Screenshots or files in this ticket appear here</Typography>
              </Box>
            ) : (
              callAttachments.map((att, idx) => (
                <Box key={idx} sx={{ p: 1.2, bgcolor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                  <AttachmentPill attachment={att} />
                  <Typography variant="caption" sx={{ fontSize: 10.5, color: '#64748B', display: 'block', mt: 0.6, px: 0.4 }}>
                    Uploaded by {att.author || 'Agent'}
                  </Typography>
                </Box>
              ))
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
