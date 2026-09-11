import { useEffect, useRef, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  Drawer,
  Box,
  Typography,
  Divider,
  TextField,
  Grid,
  Button,
  Autocomplete,
  Stack,
  Paper,
  CircularProgress,
  Tooltip,
  IconButton,
} from "@mui/material";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import { CircleHelp, CopyPlus } from "lucide-react";
import { SideBarTheme } from "../../libs/DateTheme";
import { formatTimeX } from "../../libs/formatTime";
import { useCallLog } from "../../context/UseCallLog";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../context/UseAuth";
import { filesUploadApi } from "../../../apis/UploadFille";
import { compressImagesToWebP } from "../../../utils/ImageCompressor";
import { toast } from "react-toastify";

const INITIAL_FORM_STATE = {
  id: uuidv4(),
  date: "",
  time: "",
  company: "",
  callBy: "",
  appname: "",
  receivedBy: "",
  forward: "",
  description: "",
};

export default function CallLogDrawer({ onclearFilters, open, onClose, onRecordToggle, data, callStatusValue }) {
  const { user, CompanyInfo } = useAuth();
  const [formData, setFormData] = useState({ ...INITIAL_FORM_STATE });
  const [errors, setErrors] = useState({});
  const [additionalSettingsOpen, setAdditionalSettingsOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addCall, APPNAME_LIST, companyOptions, forwardOption } = useCallLog();
  const companyInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const isConcurrent = callStatusValue?.duration > 0 || !!data;

  useEffect(() => {
    if (open) {
      if (!data) {
        //  const companyValue = companyOptions?.find((option) => option?.label?.toLocaleLowerCase() === CompanyInfo?.companycode?.toLocaleLowerCase() || null);
        const companyValue = companyOptions?.find((option) => option?.label?.split("/")?.[0]?.toLocaleLowerCase() === CompanyInfo?.companycode?.toLocaleLowerCase() || null)
        const now = new Date();
        setFormData({
          ...INITIAL_FORM_STATE,
          id: uuidv4(),
          date: now.toISOString().split("T")[0],
          time: formatTimeX(now),
          receivedBy: "",
          company: companyValue?.value,
          callBy: user?.fullName
        });
        setFiles([]);

        // Update time every minute
        const timerId = setInterval(() => {
          setFormData((prev) => ({ ...prev, time: formatTimeX(new Date()) }));
        }, 60000);

        return () => clearInterval(timerId);
      } else {

        const companyValue = companyOptions?.find((option) => option?.label === data?.company)?.value || null;

        const appnameValue = APPNAME_LIST?.find((option) => option?.AppName === data.AppName)?.AppId || null;

        // Handle receivedBy - could be an ID or a string
        let receivedByValue = forwardOption?.find((option) => option?.person === data?.receivedBy) || null;

        if (receivedByValue) {
          receivedByValue = {
            label: receivedByValue?.person,
            value: receivedByValue?.id?.split(",")[1],
          };
        }
        let forwardValue = "";

        if (data?.AssignedEmpName) {
          const foundForward = forwardOption?.find((option) => option?.person === data.AssignedEmpName);
          if (foundForward) {
            forwardValue = foundForward.id;
          }
        } else if (data?.forward) {
          forwardValue = data.forward;
        }

        setFormData({
          id: data?.id || uuidv4(),
          date: data?.date ? new Date(data.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
          time: data?.time || formatTimeX(new Date()),
          company: companyValue,
          callBy: data?.callBy || "",
          appname: appnameValue,
          receivedBy: receivedByValue?.value,
          forward: isConcurrent ? "" : forwardValue,
          description: data?.description || "",
        });
        setFiles([]);
      }
    }
  }, [open, data, forwardOption]);

  // Focus on company input when drawer opens
  useEffect(() => {
    if (open && companyInputRef.current) {
      const focusTimer = setTimeout(() => {
        const input = companyInputRef.current.querySelector("input");
        if (input) input.focus();
      }, 100);
      return () => clearTimeout(focusTimer);
    }
  }, [open]);

  // Handle text field changes
  const handleTextFieldChange = (field) => (event) => {
    if (!event?.target) return;

    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // Handle company selection
  const handleCompanyChange = (event, newValue) => {

    setFormData((prev) => ({
      ...prev,
      company: newValue?.value || null,
    }));
    setErrors((prev) => ({ ...prev, company: "" }));
  };

  // Handle app name selection
  const handleAppNameChange = (event, newValue) => {
    setFormData((prev) => ({
      ...prev,
      appname: newValue?.value || null,
    }));
    setErrors((prev) => ({ ...prev, appname: "" }));
  };

  // Handle receivedBy field - supports both selection and free text input
  const handleReceivedByChange = (event, newValue) => {
    if (typeof newValue === "string") {
      // Direct input as string
      setFormData((prev) => ({
        ...prev,
        receivedBy: newValue,
      }));
    } else if (newValue && typeof newValue === "object") {
      // Selection from dropdown with value property
      setFormData((prev) => ({
        ...prev,
        receivedBy: newValue.value || "",
      }));
    } else {
      // Fallback for null/undefined
      setFormData((prev) => ({
        ...prev,
        receivedBy: "",
      }));
    }

    setErrors((prev) => ({ ...prev, receivedBy: "" }));
  };

  // Handle forward selection
  const handleForwardChange = (event, newValue) => {
    setFormData((prev) => ({
      ...prev,
      forward: newValue?.id || "",
    }));
    setErrors((prev) => ({ ...prev, forward: "" }));
  };

  // File upload handler
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
      const errorMsg = invalidFiles.map((f) => f.name).join(", ");
      toast.warn(`File(s) exceed 15MB limit: ${errorMsg}`);
    }

    if (validFilesToProcess.length === 0) {
      e.target.value = null;
      return;
    }

    try {
      setIsCompressing(true);
      const imageFiles = validFilesToProcess.filter((f) => f.type.startsWith("image/"));
      const otherFiles = validFilesToProcess.filter((f) => !f.type.startsWith("image/"));

      let compressedImages = [];
      if (imageFiles.length > 0) {
        compressedImages = await compressImagesToWebP(imageFiles);
      }

      const formattedImages = compressedImages.map((img) => {
        const fileObj = new File([img.blob], img.compressedName, {
          type: "image/webp",
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
      console.error("Error processing files:", error);
      toast.error("Failed to process attachment image.");
    } finally {
      setIsCompressing(false);
      e.target.value = null;
    }
  };

  const removeFile = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 B";
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.company) newErrors.company = "Company is required";
    if (!formData.callBy) newErrors.callBy = "Customer Name is required";
    if (!formData.description || !formData.description.trim()) newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    let uploadedFileUrl = "";

    try {
      if (files.length > 0) {
        try {
          const rawFiles = files.map((f) => f.file);
          const uploadRes = await filesUploadApi({
            ukey: user?.ukey || CompanyInfo?.ukey,
            folderName: "CallLog",
            uniqueNo: "1",
            attachments: rawFiles,
          });
          if (uploadRes?.files && uploadRes.files.length > 0) {
            uploadedFileUrl = uploadRes.files.map((f) => f.url).join(",");
          }
        } catch (uploadErr) {
          console.error("Attachment upload error:", uploadErr);
          toast.warn("Attachments failed to upload, continuing without attachments.");
        }
      }

      const newCallId = data?.id || uuidv4();
      const callData = {
        id: newCallId,
        appname: formData.appname || "",
        receivedBy: formData.receivedBy,
        callBy: formData.callBy,
        forward: formData.forward,
        description: formData.description,
        date: formData.date,
        company: formData.company,
        time: formData.time,
        filePath: uploadedFileUrl || "",
        comments: uploadedFileUrl ? formData.description.trim() : "",
      };

      await addCall(callData, isConcurrent);
      if (!data || !open) {
        onRecordToggle();
      }
      handleReset();
    } catch (error) {
      console.error("Error adding call log:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({ ...INITIAL_FORM_STATE, id: uuidv4() });
    setErrors({});
    setFiles([]);
    setAdditionalSettingsOpen(false);
    // onclearFilters();
    onClose();
  };

  // Find the corresponding display objects based on the stored values
  const selectedCompany = companyOptions?.find((option) => option?.value === formData?.company) || null;

  const selectedAppName = APPNAME_LIST?.find((option) => option?.AppId === formData?.appname || option?.value === formData?.appname);

  const appNameValue = selectedAppName
    ? {
      label: selectedAppName?.AppName,
      value: selectedAppName?.AppId,
    }
    : null;

  // Find the forward person by ID
  const selectedForward = forwardOption?.find((option) => option?.id === formData?.forward) || null;

  // Process receivedBy value for the Autocomplete component
  let receivedByValue = null;

  // First try to find a match in the options
  const receivedByOption = forwardOption?.find((option) => option?.id?.split(",")[1] === formData?.receivedBy || option?.person === formData?.receivedBy);

  if (receivedByOption) {
    // If we found a match in the options, use that
    receivedByValue = {
      label: receivedByOption.person,
      value: receivedByOption.id?.split(",")[1] || receivedByOption.id,
    };
  } else if (formData.receivedBy) {
    // If no match but we have a value, use it directly
    if (typeof formData.receivedBy === "string") {
      receivedByValue = { label: formData.receivedBy, value: formData.receivedBy };
    } else if (typeof formData.receivedBy === "object" && formData.receivedBy !== null) {
      receivedByValue = formData.receivedBy;
    }
  }

  // Custom filter for forward options
  const filterForwardOptions = (options, { inputValue }) => {
    const query = inputValue?.toLowerCase()?.trim() || "";
    if (!query) return options;

    const keywords = query?.split(" ").filter(Boolean);
    return options.filter((option) => {
      const fullText = `${option?.designation || ""} ${option?.person || ""}`.toLowerCase();
      return keywords.every((word) => fullText.includes(word));
    });
  };

  return (
    <ThemeProvider theme={SideBarTheme}>
      <Drawer anchor="left" open={open} onClose={handleReset}>
        <Box sx={{ width: 500, p: 2, display: "flex", flexDirection: "column", height: "100vh" }}>
          <Box sx={{ flexGrow: 1, overflowY: "auto", pr: 0.5 }}>
            {/* Header */}
            <Typography variant="h6">
              <CopyPlus size={22} />  {"Add CallBack Request"}
            </Typography>
            {/* <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                This form is only for Support team use.
              </Typography>
            </Box> */}

            <Divider sx={{ my: 2 }} />

            {/* Date & Time */}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Date"
                  type="date"
                  value={formData.date || ""}
                  onChange={handleTextFieldChange("date")}
                  margin="normal"
                  // disabled={!!data}
                  disabled
                  InputLabelProps={{ shrink: true }}
                  inputProps={{
                    min: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split("T")[0],
                    max: new Date().toISOString().split("T")[0],
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Time"
                  type="time"
                  value={formData.time || ""}
                  onChange={handleTextFieldChange("time")}
                  margin="normal"
                  disabled={!data}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ step: 600 }}
                />
              </Grid>
            </Grid>
            {/* Received By */}
            {/* <Autocomplete
              fullWidth
              options={
                forwardOption?.map((val) => ({
                  label: val?.person,
                  value: val?.id?.split(",")[1],
                })) || []
              }
              disabled
              value={receivedByValue}
              onChange={handleReceivedByChange}
              freeSolo
              getOptionLabel={(option) => {
                // Handle different value types for display purposes
                if (typeof option === "string") {
                  return option;
                }
                if (option && option.label) {
                  return option.label;
                }
                return "";
              }}
              isOptionEqualToValue={(option, value) => {
                if (typeof option === "string" && typeof value === "string") {
                  return option === value;
                }
                if (option && value && option.value && value.value) {
                  return option.value === value.value;
                }
                if (option && value && option.label && value.label) {
                  return option.label === value.label;
                }
                return false;
              }}
              renderInput={(params) => <TextField {...params} label="Received By" margin="normal" />}
            /> */}

            {/* Company Selection */}
            <Autocomplete
              key={'company-input'}
              ref={companyInputRef}
              fullWidth
              options={companyOptions || []}
              value={selectedCompany}
              onChange={handleCompanyChange}
              getOptionLabel={(option) => option?.label || ""}
              disabled
              isOptionEqualToValue={(option, value) => option?.value === value?.value}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Company Name"
                  margin="normal"
                  error={!!errors.company}
                  helperText={errors.company}
                />
              )}
            />

            {/* Customer Name */}
            <TextField
              fullWidth
              label="Customer Name"
              value={formData.callBy || ""}
              onChange={handleTextFieldChange("callBy")}
              margin="normal"
              error={!!errors.callBy}
              helperText={errors.callBy}
              disabled
            />

            {/* Description */}
            <TextField
              required
              fullWidth
              label="Description"
              value={formData?.description || ""}
              onChange={handleTextFieldChange("description")}
              margin="normal"
              error={!!errors.description}
              helperText={errors.description}
              multiline
              rows={4}
            />

            {/* AppName Selection */}
            <Autocomplete
              fullWidth
              options={
                APPNAME_LIST?.map((option) => ({
                  label: option?.AppName,
                  value: option?.AppId,
                })) || []
              }
              value={appNameValue}
              onChange={handleAppNameChange}
              getOptionLabel={(option) => option?.label || ""}
              isOptionEqualToValue={(option, value) => option?.value === value?.value}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="AppName"
                  margin="normal"
                  error={!!errors.appname}
                  helperText={errors.appname}
                // disabled={!!data}
                />
              )}
            />
            <Divider sx={{ my: 2 }} />

            {/* Additional Settings */}
            {/* <Typography onClick={() => setAdditionalSettingsOpen(!additionalSettingsOpen)} fontSize={15} sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
              * Additional Settings <CircleHelp size={15} style={{ marginLeft: 5 }} />
            </Typography> */}
            {/* AppName Selection */}

            {/* Forward To */}
            {/* <Autocomplete
              fullWidth
              options={forwardOption || []}
              value={selectedForward}
              getOptionLabel={(option) => (option && option.designation && option.person ? `${option.designation} / ${option.person}` : "")}
              onChange={handleForwardChange}
              isOptionEqualToValue={(option, value) => option?.id === value?.id}
              filterOptions={filterForwardOptions}
              renderInput={(params) => <TextField {...params} label="Forward To" margin="normal" sx={{ mt: 2 }} />}
              renderOption={(props, option) => (
                <Box component="li" {...props} sx={{ borderBottom: "1px solid #eee" }}>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {option.designation}
                  </Typography>
                  /
                  <Typography variant="body2" fontWeight="600" sx={{ color: "text.primary" }}>
                    {option.person}
                  </Typography>
                </Box>
              )}
            /> */}

            {/* Attachments Section */}
            <Box sx={{ mt: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, color: "text.secondary" }}>
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
                    borderRadius: "20px",
                    textTransform: "none",
                    fontSize: "0.75rem",
                    py: 0.3,
                    px: 1.5,
                  }}
                >
                  {isCompressing ? "Compressing..." : "Attach Files"}
                </Button>
              </Box>

              {files.length > 0 && (
                <Stack spacing={1} sx={{ mt: 1, maxHeight: 160, overflowY: "auto", pr: 0.5 }}>
                  {files.map((fileObj) => (
                    <Paper
                      key={fileObj.id}
                      variant="outlined"
                      sx={{
                        borderRadius: 2,
                        bgcolor: "#F8FAFC",
                        borderColor: "#E2E8F0",
                        p: 0.8,
                        px: 1.2,
                        display: "flex",
                        alignItems: "center",
                        gap: 1.2,
                      }}
                    >
                      <Box
                        sx={{
                          width: 34,
                          height: 34,
                          borderRadius: 1.5,
                          overflow: "hidden",
                          flexShrink: 0,
                          bgcolor: "#E2E8F0",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {fileObj.preview ? (
                          <img
                            src={fileObj.preview}
                            alt="preview"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        ) : (
                          <InsertDriveFileRoundedIcon sx={{ color: "#64748B", fontSize: 20 }} />
                        )}
                      </Box>

                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Tooltip title={fileObj.name} placement="top">
                          <Typography
                            variant="body2"
                            noWrap
                            sx={{ fontSize: "0.8rem", fontWeight: 600, color: "#1E293B" }}
                          >
                            {fileObj.name}
                          </Typography>
                        </Tooltip>
                        <Typography variant="caption" sx={{ fontSize: "0.72rem", color: "#64748B" }}>
                          {formatFileSize(fileObj.size)}
                        </Typography>
                      </Box>

                      <IconButton
                        size="small"
                        onClick={() => removeFile(fileObj.id)}
                        disabled={isSubmitting}
                        sx={{ p: 0.4, color: "#94A3B8", "&:hover": { color: "#EF4444" } }}
                      >
                        <CloseRoundedIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Paper>
                  ))}
                </Stack>
              )}
            </Box>

            <Divider sx={{ my: 2 }} />
          </Box>

          {/* Footer Buttons */}
          <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, p: 0, pt: 1 }}>
            <Button
              variant="contained"
              sx={{ flex: 1 }}
              color="primary"
              size="large"
              disabled={isSubmitting || isCompressing}
              onClick={handleSubmit}
            >
              {isSubmitting
                ? "Adding..."
                : isConcurrent
                  ? "+ Add Call"
                  : data
                    ? "Update"
                    : "Add"}
            </Button>
            <Button
              variant="contained"
              sx={{ flex: 1 }}
              onClick={handleReset}
              disabled={isSubmitting}
              size="large"
              color="error"
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Drawer>
    </ThemeProvider>
  );
}
