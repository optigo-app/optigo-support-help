import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Stack,
  Tooltip,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { toast } from 'react-toastify';
import { useCallLog } from '../../modules/context/UseCallLog';
import { useAuth } from '../../modules/context/UseAuth';
import { filesUploadApi } from '../../apis/UploadFille';
import { compressImagesToWebP } from '../../utils/ImageCompressor';

export default function CreateCallModal({ open, onClose, onCallCreated }) {
  const { user } = useAuth();
  const { addCall, APPNAME_LIST = [], companyOptions = [] } = useCallLog();

  const [company, setCompany] = useState(companyOptions?.[0]?.value || '');
  const [callBy, setCallBy] = useState(user?.fullName || user?.firstname || '');
  const [appname, setAppname] = useState(APPNAME_LIST?.[0]?.AppId || '');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef(null);

  // Sync default options once loaded from context/sessionStorage
  React.useEffect(() => {
    if (!company && companyOptions?.length > 0) {
      setCompany(companyOptions[0].value);
    }
  }, [companyOptions, company]);

  React.useEffect(() => {
    if (!appname && APPNAME_LIST?.length > 0) {
      setAppname(APPNAME_LIST[0].AppId);
    }
  }, [APPNAME_LIST, appname]);

  React.useEffect(() => {
    if (!callBy && user) {
      setCallBy(user?.fullName || user?.firstname || '');
    }
  }, [user, callBy]);

  const handleFileUpload = async (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;

    const maxSizeInBytes = 15 * 1024 * 1024; // 15 MB
    const validFiles = selectedFiles.filter((f) => f.size <= maxSizeInBytes);
    if (validFiles.length < selectedFiles.length) {
      toast.warn('Some files exceeded the 15MB limit and were skipped.');
    }
    if (validFiles.length === 0) return;

    try {
      setIsCompressing(true);
      const processedFiles = await compressImagesToWebP(validFiles);
      setFiles((prev) => [...prev, ...processedFiles]);
    } catch (err) {
      console.error('Image compression error:', err);
      setFiles((prev) => [...prev, ...validFiles]);
    } finally {
      setIsCompressing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!description.trim()) {
      toast.warn('Please describe your request or issue.');
      return;
    }

    setIsSubmitting(true);
    try {
      let uploadedFilePath = '';
      if (files.length > 0) {
        const uploadRes = await filesUploadApi(files);
        uploadedFilePath = uploadRes?.files?.[0]?.path || uploadRes?.data?.[0]?.path || uploadRes?.data || '';
      }

      const todayStr = new Date().toISOString().split('T')[0];
      const newCallPayload = {
        appname: appname || APPNAME_LIST?.[0]?.AppId || '',
        callBy: callBy || user?.fullName || 'Customer',
        receivedBy: '',
        description: description.trim(),
        date: todayStr,
        company: company || companyOptions?.[0]?.value || '',
        isClient: 1,
        source: 'client_portal',
        filePath: uploadedFilePath,
        comments: '',
      };

      const res = await addCall(newCallPayload);
      toast.success('Call request submitted successfully! Our team will assist shortly.');
      
      const createdRecord = res?.rd1?.[0] || res?.rd?.[0] || newCallPayload;
      if (onCallCreated) onCallCreated(createdRecord);

      // Reset
      setDescription('');
      setFiles([]);
      onClose();
    } catch (err) {
      console.error('Failed to create call:', err);
      toast.error('Failed to submit call request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={Boolean(open)}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          boxShadow: '0 20px 45px rgba(15, 23, 42, 0.15)',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 3,
          pt: 2.5,
          pb: 1.5,
          borderBottom: '1px solid #F1F5F9',
        }}
      >
        <Box>
          <Typography sx={{ fontSize: 16, fontWeight: 750, color: '#0F172A' }}>
            New Support Call Request
          </Typography>
          <Typography sx={{ fontSize: 12, color: '#64748B', mt: 0.3 }}>
            Tell us about your issue and we'll connect with you right away.
          </Typography>
        </Box>
        <IconButton size="small" onClick={onClose} sx={{ color: '#94A3B8' }}>
          <CloseRoundedIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 3, py: 2.5, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* App / Module selection */}
        <FormControl fullWidth size="small">
          <InputLabel id="appname-label" sx={{ fontSize: 13 }}>Module / Application</InputLabel>
          <Select
            labelId="appname-label"
            value={appname || (APPNAME_LIST?.[0]?.AppId ?? '')}
            label="Module / Application"
            onChange={(e) => setAppname(e.target.value)}
            sx={{
              borderRadius: '10px',
              fontSize: 13,
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#E2E8F0' },
            }}
          >
            {APPNAME_LIST.map((app) => (
              <MenuItem key={app.AppId ?? app.appname} value={app.AppId ?? app.appname} sx={{ fontSize: 13 }}>
                {app.appname || app.AppName || app.AppId}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Company / Branch */}
        {companyOptions.length > 0 && (
          <FormControl fullWidth size="small">
            <InputLabel id="company-label" sx={{ fontSize: 13 }}>Company</InputLabel>
            <Select
              labelId="company-label"
              value={company || (companyOptions?.[0]?.value ?? '')}
              label="Company"
              onChange={(e) => setCompany(e.target.value)}
              sx={{
                borderRadius: '10px',
                fontSize: 13,
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#E2E8F0' },
              }}
            >
              {companyOptions.map((c) => (
                <MenuItem key={c.value} value={c.value} sx={{ fontSize: 13 }}>
                  {c.label || c.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {/* Issue Description */}
        <TextField
          label="What do you need help with?"
          multiline
          rows={4}
          fullWidth
          required
          placeholder="Please describe your issue, steps to reproduce, or any error messages..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '10px',
              fontSize: 13,
              bgcolor: '#F8FAFC',
              '& fieldset': { borderColor: '#E2E8F0' },
              '&:hover fieldset': { borderColor: '#CBD5E1' },
              '&.Mui-focused fieldset': { borderColor: '#4F46E5' },
            },
          }}
        />

        {/* Attachments Section */}
        <Box>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            multiple
            accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
            style={{ display: 'none' }}
          />

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#475569' }}>
              Attachments (Screenshots / Documents)
            </Typography>
            <Button
              size="small"
              startIcon={<AttachFileRoundedIcon sx={{ fontSize: 16 }} />}
              onClick={() => fileInputRef.current?.click()}
              disabled={isCompressing}
              sx={{
                textTransform: 'none',
                fontSize: 12,
                fontWeight: 650,
                color: '#4F46E5',
              }}
            >
              {isCompressing ? 'Compressing...' : '+ Attach File'}
            </Button>
          </Box>

          {/* Uploaded File Pills */}
          {files.length > 0 && (
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 1 }}>
              {files.map((file, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.8,
                    bgcolor: '#EEF2FF',
                    border: '1px solid #C7D2FE',
                    borderRadius: '8px',
                    px: 1.2,
                    py: 0.5,
                  }}
                >
                  <InsertDriveFileRoundedIcon sx={{ fontSize: 15, color: '#4F46E5' }} />
                  <Typography
                    sx={{
                      fontSize: 11.5,
                      fontWeight: 600,
                      color: '#3730A3',
                      maxWidth: 160,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {file.name}
                  </Typography>
                  <IconButton size="small" onClick={() => removeFile(idx)} sx={{ p: 0.2, color: '#6366F1' }}>
                    <DeleteOutlineRoundedIcon sx={{ fontSize: 14 }} />
                  </IconButton>
                </Box>
              ))}
            </Stack>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid #F1F5F9' }}>
        <Button
          onClick={onClose}
          sx={{
            textTransform: 'none',
            fontSize: 13,
            fontWeight: 650,
            color: '#64748B',
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isSubmitting || !description.trim()}
          sx={{
            textTransform: 'none',
            fontSize: 13,
            fontWeight: 700,
            bgcolor: '#4F46E5',
            borderRadius: '8px',
            px: 2.5,
            boxShadow: '0 4px 12px rgba(79, 70, 229, 0.25)',
            '&:hover': { bgcolor: '#4338CA' },
          }}
        >
          {isSubmitting ? 'Submitting Call...' : 'Create Call'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
