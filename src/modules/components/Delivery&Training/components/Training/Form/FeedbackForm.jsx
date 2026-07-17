import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Rating, Typography, TextField, Button, Box, IconButton } from "@mui/material";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import CloseIcon from "@mui/icons-material/Close";
import { useTraining } from "../../../context/TrainingProvider";

const FeedbackModal = ({ open, onClose }) => {
    const [rating, setRating] = useState(null);
    const [comment, setComment] = useState("");
    const [IsRating, setIsRating] = useState(false);
    const { AddFeedBack } = useTraining();

    const handleSubmit = () => {
        AddFeedBack({
            rating,
            comment,
            id:open
        })
        onClose();
        setRating(null);
        setComment("");
        setIsRating(false);
    };

    return (
        <Dialog
            open={Boolean(open)}
            onClose={() => onClose()}
            maxWidth="xs"
            fullWidth
            TransitionProps={{ timeout: 240 }}
            slotProps={{
                backdrop: {
                    sx: {
                        backdropFilter: "blur(6px)",
                        background: "rgba(0,0,0,0.25)",
                    },
                },
            }}
            PaperProps={{
                sx: {
                    borderRadius: 4,
                    p: 0,
                    overflow: "hidden",
                    background: "#fff",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 12px 32px rgba(0,0,0,0.18)",
                },
            }}
            sx={{
                zIndex: 200000,
            }}
        >
            {/* HEADER */}
            <DialogTitle
                sx={{
                    fontWeight: 600,
                    fontSize: "17px",
                    px: 3,
                    pt: 2.2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: "#111",
                }}
            >
                <Typography>
                    <Typography fontWeight={700} fontSize={16}>
                        Training Feedback
                    </Typography>

                    <Typography
                        sx={{
                            mb: 1.8,
                            fontSize: 14,
                            fontWeight: 500,
                            color: "#333",
                        }}
                    >
                        How was your training experience ?
                    </Typography>
                </Typography>
                <IconButton onClick={() => onClose()} size="small">
                    <CloseIcon fontSize="small" sx={{ color: "#333" }} />
                </IconButton>
            </DialogTitle>

            {/* CONTENT */}
            <DialogContent sx={{ px: 3, pt: 0 }}>

                {/* Rating */}
                <Box sx={{ textAlign: "center", mt: 2, mb: 3 }}>
                    <Rating
                        name="feedback-rating"
                        value={rating}
                        onChange={(e, newValue) => {
                            setRating(newValue);
                            setIsRating(true);
                        }}
                        size="large"
                        sx={{ color: "#f7aa1cff", fontSize: "60px" }}
                        icon={<StarRoundedIcon fontSize="60px" />}
                        emptyIcon={<StarBorderRoundedIcon fontSize="60px" />}
                    />
                </Box>

                {/* Conditional Comment */}
                {IsRating && rating < 4 && (
                    <>
                        <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
                            Describe your issue
                        </Typography>

                        <TextField fullWidth placeholder="We’d love to hear your suggestions" multiline rows={3} value={comment} onChange={(e) => setComment(e.target.value)} variant="outlined" size="small" />
                    </>
                )}
            </DialogContent>

            {/* ACTIONS */}
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    fullWidth
                    sx={{
                        py: 1.2,
                        borderRadius: 3,
                        textTransform: "none",
                        fontWeight: 600,
                        fontSize: 15,
                        background: "#2563eb", // Tailwind-like Blue-600
                        transition: "all 0.25s ease",
                        "&:hover": {
                            background: "#1d4ed8",
                        },
                        color: "#fff",
                    }}
                >
                    Submit Feedback
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FeedbackModal;
