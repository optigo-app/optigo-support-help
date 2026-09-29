import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import SendIcon from "@mui/icons-material/Send";
import { filesUploadApi } from "../../../apis/UploadFille";
import { useAuth } from "../../../modules/context/UseAuth";
import { toast } from "react-toastify";

const MessageComposer = React.memo(function MessageComposer({
  placeholder = "Add a comment...",
  activeThread,
  onSendMessage,
  disabled = false,
}) {
  const { user } = useAuth();
  const [comment, setComment] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (previewURL) {
      URL.revokeObjectURL(previewURL);
    }
    setPreviewURL(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePostComment = async () => {
    if (!comment.trim() && !selectedFile) return;
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      let uploadedUrl = null;

      // 1. If file is selected, upload via filesUploadApi
      if (selectedFile) {
        try {
          const uploadRes = await filesUploadApi({
            ukey: user?.ukey,
            folderName: "CallLog",
            uniqueNo: activeThread?.sr || activeThread?.id || "1",
            attachments: [selectedFile],
          });
          uploadedUrl = uploadRes?.files?.[0]?.url ?? null;
        } catch (uploadErr) {
          console.error("File upload failed, proceeding with comment only:", uploadErr);
          toast.warn("Attachment upload had an issue, posting comment text.");
        }
      }

      // 2. Trigger onSendMessage callback
      if (onSendMessage) {
        await onSendMessage(comment.trim(), uploadedUrl, selectedFile);
      }

      // 3. Reset form state
      setComment("");
      handleRemoveFile();
    } catch (err) {
      console.error("Failed to post comment:", err);
      toast.error("Failed to post comment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handlePostComment();
    }
  };

  if (disabled) return null;

  const isImage = selectedFile?.type?.startsWith("image/");

  return (
    <Box sx={{ p: 1.5, px: 2, bgcolor: "#FFFFFF", borderTop: "1px solid #E2E8F0" }}>
      <Box
        sx={{
          border: "1px solid #CBD5E1",
          borderRadius: "8px",
          bgcolor: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.15s ease",
          "&:focus-within": {
            borderColor: "#4F46E5",
            boxShadow: "0 0 0 2px rgba(79, 70, 229, 0.12)",
          },
        }}
      >
        {/* Selected file preview chip */}
        {selectedFile && (
          <Box
            sx={{
              p: 0.8,
              px: 1.5,
              borderBottom: "1px solid #F1F5F9",
              display: "flex",
              alignItems: "center",
              gap: 1,
              bgcolor: "#F8FAFC",
            }}
          >
            {isImage && previewURL ? (
              <img
                src={previewURL}
                alt=""
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 4,
                  objectFit: "cover",
                  flexShrink: 0,
                }}
              />
            ) : (
              <InsertDriveFileIcon sx={{ fontSize: 18, color: "#2563EB", flexShrink: 0 }} />
            )}

            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 600,
                color: "#1E293B",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: 260,
              }}
            >
              {selectedFile.name}
            </Typography>

            <Typography sx={{ fontSize: 10.5, color: "#64748B" }}>
              ({(selectedFile.size / 1024).toFixed(1)} KB)
            </Typography>

            <IconButton
              size="small"
              onClick={handleRemoveFile}
              sx={{ p: 0.3, ml: "auto", color: "#64748B", "&:hover": { color: "#EF4444" } }}
            >
              <CloseIcon sx={{ fontSize: 15 }} />
            </IconButton>
          </Box>
        )}

        {/* Text Input Row + Action Buttons */}
        <Box sx={{ display: "flex", alignItems: "center", px: 1.5, py: 0.8, gap: 1 }}>
          <TextField
            fullWidth
            multiline
            minRows={1}
            maxRows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            variant="standard"
            InputProps={{
              disableUnderline: true,
              sx: {
                fontSize: 13,
                color: "#0F172A",
                lineHeight: 1.45,
                "& textarea::placeholder": { color: "#94A3B8", opacity: 1 },
              },
            }}
          />

          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.json,.ppt,.pptx,.zip,.rar"
            style={{ display: "none" }}
            id="comment-file-upload"
            onChange={handleFileChange}
          />

          {/* Attach file button */}
          <label htmlFor="comment-file-upload" style={{ margin: 0, display: "flex" }}>
            <Tooltip
              title={selectedFile ? `Replace: ${selectedFile.name}` : "Attach file / image"}
              placement="top"
              arrow
            >
              <IconButton
                component="span"
                size="small"
                sx={{
                  color: selectedFile ? "#4F46E5" : "#64748B",
                  p: 0.6,
                  borderRadius: "6px",
                  "&:hover": { bgcolor: "#F1F5F9", color: "#0F172A" },
                }}
              >
                <AttachFileIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>
          </label>

          {/* Post button */}
          <Tooltip title="Post comment (Enter)" placement="top" arrow>
            <span>
              <Button
                variant="contained"
                size="small"
                disabled={(!comment.trim() && !selectedFile) || isSubmitting}
                onClick={handlePostComment}
                sx={{
                  bgcolor: "#4F46E5",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: 12,
                  textTransform: "none",
                  borderRadius: "6px",
                  boxShadow: "none",
                  minWidth: 64,
                  height: 32,
                  px: 1.5,
                  "&:hover": { bgcolor: "#4338CA", boxShadow: "none" },
                  "&.Mui-disabled": {
                    bgcolor: "#F1F5F9",
                    color: "#94A3B8",
                  },
                }}
              >
                {isSubmitting ? (
                  <CircularProgress size={14} sx={{ color: "#FFFFFF" }} />
                ) : (
                  <>
                    <span>Post</span>
                    <SendIcon sx={{ fontSize: 13, ml: 0.5 }} />
                  </>
                )}
              </Button>
            </span>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
});

export default MessageComposer;
