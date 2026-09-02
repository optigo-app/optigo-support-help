import React, { useState } from 'react';
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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import { useCallLog } from '../../modules/context/UseCallLog';
import { useAuth } from '../../modules/context/UseAuth';

export default function AddSupportCallModal({ open, onClose }) {
  const { user } = useAuth();
  const { addCall, APPNAME_LIST, companyOptions, forwardOption } = useCallLog();

  const [company, setCompany] = useState(companyOptions?.[0]?.value || '');
  const [callBy, setCallBy] = useState(user?.fullName || '');
  const [appname, setAppname] = useState(APPNAME_LIST?.[0]?.AppId || '');
  const [receivedBy, setReceivedBy] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) {
      toast.error('Please enter the description / inquiry.');
      return;
    }

    setIsSubmitting(true);
    try {
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
      };

      if (addCall) {
        await addCall(payload);
        toast.success('Support inquiry created successfully');
      }

      setDescription('');
      onClose();
    } catch (err) {
      console.error('Error creating support call:', err);
      toast.error('Failed to create support call');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
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

          <IconButton size="small" onClick={onClose} sx={{ color: '#94A3B8', '&:hover': { bgcolor: '#F1F5F9' } }}>
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
            onClick={onClose}
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
            disabled={isSubmitting}
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
