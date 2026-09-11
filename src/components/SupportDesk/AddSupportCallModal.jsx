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
  Autocomplete,
  Stack,
  Paper,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import { toast } from 'react-toastify';
import { useCallLog } from '../../modules/context/UseCallLog';
import { useAuth } from '../../modules/context/UseAuth';
import { filesUploadApi } from '../../apis/UploadFille';
import { compressImagesToWebP } from '../../utils/ImageCompressor';

export default function AddSupportCallModal({ open, onClose }) {
  const { user } = useAuth();
  const { addCall, APPNAME_LIST, companyOptions, forwardOption } = useCallLog();

  const [company, setCompany] = useState(companyOptions?.[0]?.value || '');
  const [callBy, setCallBy] = useState(user?.fullName || '');
  const [appname, setAppname] = useState(APPNAME_LIST?.[0]?.AppId || '');
  const [receivedBy, setReceivedBy] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef(null);

  const handleFileUpload = async (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;

    const maxSizeInBytes = 15 * 1024 * 1024; // 15 MB
    const validFilesToProcess = [];
    const invalidFiles = [];

    selectedFiles.forEach((file) => {
      if (file.size <= maxSizeInBytes) {
        validFilesToProcess.push(file);
      } else {
        invalidFiles.push(file);
      }
    });

    if (invalidFiles.length > 0) {
      const errorMsg = invalidFiles.map((f) => f.name).join(', ');
      toast.warn(`File(s) exceed 15MB limit: ${errorMsg}`);
    }

    if (validFilesToProcess.length === 0) {
      e.target.value = null;
      return;
    }

    try {
      setIsCompressing(true);
      const imageFiles = validFilesToProcess.filter((f) => f.type.startsWith('image/'));
      const otherFiles = validFilesToProcess.filter((f) => !f.type.startsWith('image/'));

      let compressedImages = [];
      if (imageFiles.length > 0) {
        compressedImages = await compressImagesToWebP(imageFiles);
      }

      const formattedImages = compressedImages.map((img) => {
        const fileObj = new File([img.blob], img.compressedName, {
          type: 'image/webp',
          lastModified: Date.now(),
        });

        return {
          file: fileObj,
          id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          preview: img.previewUrl,
          name: img.compressedName,
          size: fileObj.size,
        };
      });

      const formattedOthers = otherFiles.map((file) => ({
        file: file,
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        preview: null,
        name: file.name,
        size: file.size,
      }));

      setFiles((prev) => [...prev, ...formattedImages, ...formattedOthers]);
    } catch (error) {
      console.error('Error processing files:', error);
      toast.error('Failed to process attachment image.');
    } finally {
      setIsCompressing(false);
      e.target.value = null;
    }
  };

  const removeFile = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) {
      toast.error('Please enter the description / inquiry.');
      return;
    }

    setIsSubmitting(true);
    let uploadedFileUrl = '';

    try {
      // 1. Upload attachments if any attached
      if (files.length > 0) {
        try {
          const rawFiles = files.map((f) => f.file);
          const uploadRes = await filesUploadApi({
            ukey: user?.ukey,
            folderName: 'CallLog',
            uniqueNo: '1',
            attachments: rawFiles,
          });

          if (uploadRes?.files && uploadRes.files.length > 0) {
            uploadedFileUrl = uploadRes.files.map((f) => f.url).join(',');
          }
        } catch (uploadErr) {
          console.error('Attachment upload error:', uploadErr);
          toast.warn('Attachments failed to upload, logging call without attachments.');
        }
      }

      // 2. Submit call log
      const now = new Date();
      const payload = {
        date: now.toISOString().split('T')[0],
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        company,
        callBy: callBy.trim() || user?.fullName || 'Client Caller',
        appname,
        receivedBy: receivedBy?.value || receivedBy || '',
        forward: '',
        description: description.trim(),
        filePath: uploadedFileUrl || '',
        comments: uploadedFileUrl ? description.trim() : '',
      };

      if (addCall) {
        await addCall(payload);
        toast.success('Support inquiry created successfully');
      }

      setDescription('');
      setFiles([]);
      onClose();
    } catch (err) {
      console.error('Error creating support call:', err);
      toast.error('Failed to create support call');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    if (!isSubmitting) {
      setFiles([]);
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleModalClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.15)', overflow: 'hidden' },
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle
          sx={{
            px: 2.5,
            py: 1.8,
            bgcolor: '#FFFFFF',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '6px',
                bgcolor: '#FEF3C7',
                color: '#D97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AddIcon sx={{ fontSize: 20 }} />
            </Box>
            <Box>
              <Typography sx={{ fontSize: 15, fontWeight: 800, color: '#0F172A' }}>
                New Support Call Entry
              </Typography>
              <Typography sx={{ fontSize: 11, color: '#64748B' }}>
                Log a new customer support inquiry directly
              </Typography>
            </Box>
          </Box>

          <IconButton size="small" onClick={handleModalClose} sx={{ color: '#94A3B8', '&:hover': { bgcolor: '#F1F5F9' } }}>
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Company & Caller */}
          <Box sx={{ display: 'flex', gap: 1.5, mt: 1 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="company-label">Company</InputLabel>
              <Select
                labelId="company-label"
                value={company}
                label="Company"
                onChange={(e) => setCompany(e.target.value)}
              >
                {(companyOptions || []).map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              size="small"
              label="Caller / Contact Name"
              value={callBy}
              onChange={(e) => setCallBy(e.target.value)}
            />
          </Box>

          {/* AppName & Attend By */}
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="module-label">Module / Department</InputLabel>
              <Select
                labelId="module-label"
                value={appname}
                label="Module / Department"
                onChange={(e) => setAppname(e.target.value)}
              >
                {(APPNAME_LIST || []).map((item) => (
                  <MenuItem key={item.AppId} value={item.AppId}>
                    {item.AppName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Autocomplete
              fullWidth
              size="small"
              options={forwardOption || []}
              getOptionLabel={(option) => option?.person || ''}
              value={forwardOption?.find((f) => f.person === receivedBy) || null}
              onChange={(e, val) => setReceivedBy(val?.person || '')}
              renderInput={(params) => <TextField {...params} label="Attend By / Executive" />}
            />
          </Box>

          {/* Description */}
          <TextField
            fullWidth
            size="small"
            label="Inquiry / Issue Description"
            multiline
            rows={3.5}
            required
            placeholder="Describe the issue, query, or topic raised by the client..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* Attachments Section */}
          <Box sx={{ mt: 0.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>
                Attachments (Optional)
              </Typography>
              <input
                type="file"
                ref={fileInputRef}
                hidden
                multiple
                onChange={handleFileUpload}
                accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx,.txt"
              />
              <Button
                size="small"
                variant="outlined"
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                disabled={isSubmitting || isCompressing}
                startIcon={
                  isCompressing ? (
                    <CircularProgress size={14} />
                  ) : (
                    <AttachFileRoundedIcon sx={{ fontSize: 16 }} />
                  )
                }
                sx={{
                  borderRadius: '20px',
                  textTransform: 'none',
                  fontSize: '0.75rem',
                  py: 0.3,
                  px: 1.5,
                  borderColor: '#CBD5E1',
                  color: '#4F46E5',
                  '&:hover': {
                    borderColor: '#4F46E5',
                    bgcolor: 'rgba(79, 70, 229, 0.04)',
                  },
                }}
              >
                {isCompressing ? 'Compressing...' : 'Attach Files'}
              </Button>
            </Box>

            {files.length > 0 && (
              <Stack spacing={1} sx={{ mt: 1, maxHeight: 160, overflowY: 'auto', pr: 0.5 }}>
                {files.map((fileObj) => (
                  <Paper
                    key={fileObj.id}
                    variant="outlined"
                    sx={{
                      borderRadius: 2,
                      bgcolor: '#F8FAFC',
                      borderColor: '#E2E8F0',
                      p: 0.8,
                      px: 1.2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 34,
                        height: 34,
                        borderRadius: 1.5,
                        overflow: 'hidden',
                        flexShrink: 0,
                        bgcolor: '#E2E8F0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {fileObj.preview ? (
                        <img
                          src={fileObj.preview}
                          alt="preview"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <InsertDriveFileRoundedIcon sx={{ color: '#64748B', fontSize: 20 }} />
                      )}
                    </Box>

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Tooltip title={fileObj.name} placement="top">
                        <Typography
                          variant="body2"
                          noWrap
                          sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#1E293B' }}
                        >
                          {fileObj.name}
                        </Typography>
                      </Tooltip>
                      <Typography variant="caption" sx={{ fontSize: '0.72rem', color: '#64748B' }}>
                        {formatFileSize(fileObj.size)}
                      </Typography>
                    </Box>

                    <IconButton
                      size="small"
                      onClick={() => removeFile(fileObj.id)}
                      disabled={isSubmitting}
                      sx={{ p: 0.4, color: '#94A3B8', '&:hover': { color: '#EF4444' } }}
                    >
                      <CloseRoundedIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Paper>
                ))}
              </Stack>
            )}
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            px: 2.5,
            py: 1.5,
            bgcolor: '#F8FAFC',
            borderTop: '1px solid #E2E8F0',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 1,
          }}
        >
          <Button
            onClick={handleModalClose}
            disabled={isSubmitting}
            sx={{
              color: '#64748B',
              fontWeight: 650,
              fontSize: 12.5,
              textTransform: 'none',
              px: 2,
              '&:hover': { bgcolor: '#F1F5F9' },
            }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting || isCompressing}
            sx={{
              bgcolor: '#4F46E5',
              color: '#FFFFFF',
              fontWeight: 750,
              fontSize: 12.5,
              textTransform: 'none',
              borderRadius: '6px',
              px: 2.5,
              boxShadow: 'none',
              '&:hover': { bgcolor: '#4338CA', boxShadow: 'none' },
            }}
          >
            {isSubmitting ? 'Creating...' : 'Create Call Log'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
