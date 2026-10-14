import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Rating,
  TextField,
  IconButton,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { toast } from 'react-toastify';
import CallLogApi from '../../apis/CallLogApiController';
import { useAuth } from '../../modules/context/UseAuth';

export default function NewCallFeedbackModal({ open, onClose, call, onSuccess }) {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!call?.id && !call?.sr) return;
    setIsSubmitting(true);
    try {
      const callLogId = call.id ?? call.sr;
      await CallLogApi.addFeedback({
        callLogId,
        feedback: rating,
        ratingByCustomer: feedback,
        createdBy: user?.id,
      });
      toast.success('Thank you! Your feedback has been recorded.');
      if (onSuccess) onSuccess({ rating, feedback });
      onClose();
    } catch (err) {
      console.error('Failed to submit feedback:', err);
      toast.error('Could not submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={Boolean(open)}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          p: 1.5,
          boxShadow: '0 20px 45px rgba(15, 23, 42, 0.15)',
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
        <Typography sx={{ fontSize: 16, fontWeight: 750, color: '#0F172A' }}>
          Rate Support Experience
        </Typography>
        <IconButton size="small" onClick={onClose} sx={{ color: '#94A3B8' }}>
          <CloseRoundedIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        <Typography sx={{ fontSize: 13, color: '#64748B', mb: 2 }}>
          How would you rate our support on call #{call?.sr || call?.id || 'N/A'} (
          {call?.name || call?.appname || 'Support Request'})?
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 2 }}>
          <Rating
            value={rating}
            onChange={(e, val) => setRating(val || 1)}
            size="large"
            icon={<StarRoundedIcon sx={{ fontSize: 36, color: '#F59E0B' }} />}
            emptyIcon={<StarRoundedIcon sx={{ fontSize: 36, color: '#E2E8F0' }} />}
          />
          <Typography sx={{ fontSize: 12, fontWeight: 650, color: '#D97706', mt: 0.8 }}>
            {rating === 5 && 'Outstanding! 🌟'}
            {rating === 4 && 'Very Good! 👍'}
            {rating === 3 && 'Average 🙂'}
            {rating === 2 && 'Needs Improvement 😕'}
            {rating === 1 && 'Poor 😞'}
          </Typography>
        </Box>

        <TextField
          multiline
          rows={3}
          fullWidth
          placeholder="Share your feedback or suggestions (optional)..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          sx={{
            mt: 1,
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
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, pt: 1 }}>
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
          disabled={isSubmitting}
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
          {isSubmitting ? 'Submitting...' : 'Submit Rating'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
