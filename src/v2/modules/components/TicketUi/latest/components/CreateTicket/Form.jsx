import { Autocomplete, Badge, Box, Grid, IconButton, TextField, Tooltip, FormHelperText } from "@mui/material";
import React from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useTicket } from "./../../../../../context/useTicket";
import AttachMentGroup from "../Comment/AttachMentGroup";

const Form = ({ form, errors, handleChange, handleFileChange, previewURL, attachment, setOpenPreview }) => {
  const { CATEGORY_LIST } = useTicket();

  return (
    <Box sx={{ flexGrow: 1, mt: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Autocomplete options={CATEGORY_LIST} value={CATEGORY_LIST.find((item) => item.value === form.category) || null} getOptionLabel={(option) => option.label || ""} onChange={(e, newVal) => handleChange("category", newVal ? newVal.value : null)} renderInput={(params) => <TextField {...params} label="Category" required error={Boolean(errors.category)} helperText={errors.category ? "Category is required" : ""} />} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Subject" fullWidth required variant="outlined" error={Boolean(errors.subject)} helperText={errors.subject ? "Subject is required" : ""} value={form.subject} onChange={(e) => handleChange("subject", e.target.value)} />
        </Grid>

        <Grid item xs={12}>
          <TextField label="Message" fullWidth multiline rows={6} variant="outlined" value={form.instruction} error={Boolean(errors.instruction)} helperText={errors.instruction ? "Special Instruction is required" : ""} required  onChange={(e) => handleChange("instruction", e.target.value)} />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "flex-start", mt: -1, ml: -0.5 }}>
            <input type="file" multiple style={{ display: "none" }} id="file-upload" onChange={handleFileChange} />
            <label
              htmlFor="file-upload"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <IconButton component="span">
                <AttachFileIcon />
              </IconButton>
            </label>
            <AttachMentGroup attachmentsList={attachment} setOpenPreview={setOpenPreview} />

            {form.attachment && <FormHelperText>{form.attachment.name}</FormHelperText>}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Form;
