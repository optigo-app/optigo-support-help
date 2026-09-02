import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tooltip,
  Dialog,
  DialogContent,
  IconButton,
  Button
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DescriptionIcon from '@mui/icons-material/Description';
import { toast } from 'react-toastify';

export default function CompactMediaPreview({ attachment, filename, imgUrl }) {
  const [openLightbox, setOpenLightbox] = useState(false);

  const rawName = filename || attachment?.filename || 'Attachment.fig';
  const mediaUrl = imgUrl || attachment?.imgUrl || attachment?.url;

  const ext = rawName.split('.').pop()?.toUpperCase() || 'FILE';
  const isImage =
    ['PNG', 'JPG', 'JPEG', 'GIF', 'WEBP'].includes(ext) || Boolean(mediaUrl && !ext.match(/(FIG|PDF|ZIP|MP4|MOV)/i));
  const isVideo = ['MP4', 'MOV', 'WEBM'].includes(ext);

  const getGradient = (type) => {
    switch (type) {
      case 'FIG':
        return 'linear-gradient(135deg, #F43F5E 0%, #E11D48 100%)';
      case 'PDF':
        return 'linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)';
      case 'ZIP':
      case 'RAR':
        return 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)';
      default:
        return 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)';
    }
  };

  const handleDownload = (e) => {
    e?.stopPropagation();
    toast.success(`Downloading ${rawName}...`);
  };

  // 1. IMAGE PREVIEW
  if (isImage && mediaUrl) {
    return (
      <>
        <Tooltip title={`View ${rawName}`} placement="top">
          <Box
            onClick={() => setOpenLightbox(true)}
            sx={{
              position: 'relative',
              width: 130,
              height: 85,
              borderRadius: '10px',
              overflow: 'hidden',
              cursor: 'pointer',
              my: 0.8,
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
              },
            }}
          >
            <Box
              component="img"
              src={mediaUrl}
              alt={rawName}
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        </Tooltip>

        <Dialog open={openLightbox} onClose={() => setOpenLightbox(false)} maxWidth="md">
          <Box
            sx={{
              p: 1.5,
              bgcolor: '#0F172A',
              color: '#FFFFFF',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              {rawName}
            </Typography>
            <IconButton size="small" onClick={() => setOpenLightbox(false)} sx={{ color: '#FFFFFF' }}>
              <CloseIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>
          <DialogContent sx={{ p: 2, bgcolor: '#020617', textAlign: 'center' }}>
            <Box
              component="img"
              src={mediaUrl}
              alt={rawName}
              sx={{ maxWidth: '100%', maxHeight: '70vh', borderRadius: '8px' }}
            />
          </DialogContent>
        </Dialog>
      </>
    );
  }

  // 2. VIDEO PREVIEW
  if (isVideo) {
    return (
      <Tooltip title={`Play Video • ${rawName}`} placement="top">
        <Box
          onClick={() => toast.info(`Streaming ${rawName}...`)}
          sx={{
            position: 'relative',
            width: 150,
            height: 90,
            borderRadius: '10px',
            overflow: 'hidden',
            bgcolor: '#0F172A',
            color: '#FFFFFF',
            cursor: 'pointer',
            my: 0.8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
            },
          }}
        >
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              bgcolor: '#10B981',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <PlayArrowIcon sx={{ fontSize: 18, ml: '2px' }} />
          </Box>

          <Typography
            sx={{
              position: 'absolute',
              bottom: 6,
              left: 8,
              fontSize: '0.68rem',
              fontWeight: 700,
              color: 'rgba(255, 255, 255, 0.85)',
            }}
          >
            MP4 • 01:24
          </Typography>
        </Box>
      </Tooltip>
    );
  }

  // 3. FILE / DOCUMENT / STACKED PREVIEW
  return (
    <>
      <Tooltip title={`Download & Preview ${rawName}`} placement="top">
        <Box
          onClick={() => setOpenLightbox(true)}
          sx={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            my: 0.8,
            cursor: 'pointer',
            userSelect: 'none',
            '&:hover': {
              '& .back-card': { transform: 'rotate(-10deg) translateX(-6px)' },
              '& .front-card': {
                transform: 'rotate(1deg) translateY(-2px)',
                boxShadow: '0 10px 22px rgba(225, 29, 72, 0.35)',
              },
              '& .download-btn': { transform: 'scale(1.15)', bgcolor: '#FFFFFF' },
            },
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: 68,
              height: 82,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 0.5,
            }}
          >
            <Box
              className="back-card"
              sx={{
                position: 'absolute',
                width: 52,
                height: 66,
                borderRadius: '9px',
                background: 'linear-gradient(135deg, #6366F1 0%, #A855F7 100%)',
                transform: 'rotate(-6deg) translateX(-4px)',
                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.25)',
                transition: 'all 0.2s ease',
              }}
            />

            <Box
              className="front-card"
              sx={{
                position: 'relative',
                width: 55,
                height: 70,
                borderRadius: '9px',
                background: getGradient(ext),
                boxShadow: '0 8px 18px rgba(225, 29, 72, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: 13,
                  height: 13,
                  bgcolor: 'rgba(255, 255, 255, 0.45)',
                  borderRadius: '0 0 0 4px',
                }}
              />

              <Typography
                sx={{
                  fontSize: '0.92rem',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  letterSpacing: '0.03em',
                  textShadow: '0 1px 4px rgba(0,0,0,0.25)',
                }}
              >
                {ext}
              </Typography>
            </Box>

            <Box
              className="download-btn"
              onClick={handleDownload}
              sx={{
                position: 'absolute',
                bottom: 2,
                left: 2,
                zIndex: 5,
                width: 22,
                height: 22,
                borderRadius: '50%',
                bgcolor: '#FFFFFF',
                boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#2563EB',
                transition: 'all 0.18s ease',
              }}
            >
              <DownloadIcon sx={{ fontSize: 13 }} />
            </Box>
          </Box>

          <Typography
            noWrap
            sx={{
              fontSize: '0.72rem',
              fontWeight: 650,
              color: '#475569',
              maxWidth: 130,
            }}
          >
            {rawName}
          </Typography>
        </Box>
      </Tooltip>

      <Dialog open={openLightbox} onClose={() => setOpenLightbox(false)} maxWidth="xs">
        <Box
          sx={{
            p: 2,
            bgcolor: '#0F172A',
            color: '#FFFFFF',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DescriptionIcon sx={{ fontSize: 18, color: '#38BDF8' }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
              {rawName}
            </Typography>
          </Box>
          <IconButton size="small" onClick={() => setOpenLightbox(false)} sx={{ color: '#FFFFFF' }}>
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
        <DialogContent sx={{ p: 2.5, bgcolor: '#FFFFFF' }}>
          <Typography variant="body2" sx={{ fontSize: '0.82rem', color: '#334155', fontWeight: 600, mb: 1 }}>
            File Details:
          </Typography>
          <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
            Format: {ext} Document
          </Typography>
          <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 2 }}>
            Size: 1.4 MB • Attachment #{attachment?.id || '58'}
          </Typography>
          <Button
            size="small"
            variant="contained"
            onClick={handleDownload}
            sx={{
              bgcolor: '#2563EB',
              color: '#FFFFFF',
              width: '100%',
              borderRadius: '6px',
              fontSize: '0.8rem',
              fontWeight: 700,
              py: 0.8,
            }}
          >
            Download File
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
