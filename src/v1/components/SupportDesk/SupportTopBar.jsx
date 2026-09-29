import React from "react";
import {
  Box,
  InputBase,
  Button,
  Tooltip,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  ListItemText,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import AirbnbDateRangePicker from "./common/AirbnbDateRangePicker";
import { useCallLog } from "../../modules/context/UseCallLog";

export default function SupportTopBar({
  searchQuery = "",
  setSearchQuery,
  status = "",
  setStatus,
  filterState,
  setFilterState,
  tempDateRange,
  setTempDateRange,
  onAddClick,
  onClearAll,
}) {
  const { STATUS_LIST = [], ESTATUS_LIST = [] } = useCallLog();
  const statusList = [...STATUS_LIST, ...ESTATUS_LIST];

  const hasActiveFilter = Boolean(
    searchQuery ||
      (status && status !== "all") ||
      filterState?.filterTargetField ||
      filterState?.dateRange?.startDate ||
      filterState?.dateRange?.endDate
  );

  // Bridge AirbnbDateRangePicker's { start, end } Date output → filterState string dates
  const formatDateForApi = (date) => {
    if (!(date instanceof Date) || isNaN(date)) return "";
    const localDate = new Date(date.getTime() + Math.abs(date.getTimezoneOffset() * 60000));
    return localDate.toISOString().split("T")[0];
  };

  const handleDateRangeChange = ({ start, end }) => {
    const startStr = formatDateForApi(start);
    const endStr = formatDateForApi(end);
    setFilterState((prev) => ({
      ...prev,
      filterTargetField: prev.filterTargetField || "date",
      dateRange: { startDate: startStr, endDate: endStr },
    }));
    setTempDateRange({ startDate: start || null, endDate: end || null });
  };

  // Compute Date objects to pass to AirbnbDateRangePicker
  const pickerStart = tempDateRange?.startDate instanceof Date
    ? tempDateRange.startDate
    : filterState?.dateRange?.startDate
    ? new Date(filterState.dateRange.startDate + "T00:00:00")
    : null;

  const pickerEnd = tempDateRange?.endDate instanceof Date
    ? tempDateRange.endDate
    : filterState?.dateRange?.endDate
    ? new Date(filterState.dateRange.endDate + "T00:00:00")
    : null;

  const selectedStatusItem = statusList.find(
    (i) => String(i.value) === String(status) || i.label === status
  );
  const hasStatus = Boolean(status);

  return (
    <Box
      sx={{
        height: 52,
        minHeight: 52,
        bgcolor: "#FFFFFF",
        borderBottom: "1px solid #E2E8F0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 2,
        gap: 1.5,
        overflowX: "auto",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {/* LEFT: Add + Search */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, flexShrink: 0 }}>
        <Button
          onClick={onAddClick}
          variant="contained"
          startIcon={<AddIcon sx={{ fontSize: 17 }} />}
          sx={{
            bgcolor: "#FFEB3B",
            color: "#0F172A",
            height: 34,
            px: 1.8,
            fontSize: 12.5,
            fontWeight: 800,
            borderRadius: "6px",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            boxShadow: "none",
            border: "1px solid #FBC02D",
            "&:hover": { bgcolor: "#FDD835", boxShadow: "none" },
          }}
        >
          Add
        </Button>

        {/* Search pill */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: 34,
            px: 1.2,
            borderRadius: "6px",
            border: searchQuery ? "1px solid #4F46E5" : "1px solid #CBD5E1",
            bgcolor: searchQuery ? "#EEF2FF" : "#F8FAFC",
            width: 220,
            transition: "all 0.15s ease",
            "&:hover": { borderColor: "#94A3B8", bgcolor: "#FFFFFF" },
            "&:focus-within": {
              borderColor: "#4F46E5",
              boxShadow: "0 0 0 3px rgba(79,70,229,0.1)",
              bgcolor: "#FFFFFF",
            },
          }}
        >
          <SearchIcon sx={{ fontSize: 15, color: searchQuery ? "#4F46E5" : "#94A3B8", flexShrink: 0 }} />
          <InputBase
            value={searchQuery}
            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
            placeholder="Search calls…"
            sx={{
              ml: 0.8,
              fontSize: 12.5,
              flex: 1,
              color: "#0F172A",
              "& input": { p: 0, "&::placeholder": { color: "#94A3B8", opacity: 1 } },
            }}
          />
          {searchQuery && (
            <CloseIcon
              sx={{ fontSize: 13, color: "#94A3B8", cursor: "pointer", ml: 0.4, "&:hover": { color: "#0F172A" } }}
              onClick={() => setSearchQuery && setSearchQuery("")}
            />
          )}
        </Box>
      </Box>

      {/* RIGHT: Clear + AirbnbDateRangePicker + Status */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}>
        {hasActiveFilter && (
          <Tooltip title="Clear all filters">
            <IconButton
              onClick={onClearAll}
              size="small"
              sx={{
                p: 0.7,
                border: "1px solid #FCA5A5",
                borderRadius: "6px",
                bgcolor: "#FEF2F2",
                color: "#DC2626",
                "&:hover": { bgcolor: "#FEE2E2", borderColor: "#F87171" },
              }}
            >
              <FilterAltOffIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}

        {/* AirbnbDateRangePicker — existing component, wired to filterState */}
        {/* Filter By field selector */}
        <FormControl size="small" sx={{ minWidth: 120, flexShrink: 0 }}>
          <Select
            value={filterState?.filterTargetField || ""}
            onChange={(e) =>
              setFilterState((prev) => ({ ...prev, filterTargetField: e.target.value }))
            }
            displayEmpty
            MenuProps={{
              PaperProps: {
                sx: {
                  borderRadius: "10px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                  mt: 0.5,
                  "& .MuiMenuItem-root": { fontSize: 12.5, py: 0.6, minHeight: 32 },
                },
              },
            }}
            sx={{
              height: 30,
              borderRadius: "20px",
              fontSize: 12,
              color: filterState?.filterTargetField ? "#4338CA" : "#64748B",
              fontWeight: filterState?.filterTargetField ? 700 : 500,
              bgcolor: filterState?.filterTargetField ? "#EEF2FF" : "#F1F5F9",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: filterState?.filterTargetField ? "#A5B4FC" : "#E2E8F0",
                borderRadius: "20px",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#A5B4FC" },
              "& .MuiSelect-select": { py: 0, pl: 1.5, pr: "28px !important", display: "flex", alignItems: "center", minHeight: "30px !important" },
              "& .MuiSelect-icon": { color: filterState?.filterTargetField ? "#4F46E5" : "#94A3B8", fontSize: 18, right: 4 },
            }}
            renderValue={() => (
              <Typography sx={{ fontSize: 12, fontWeight: filterState?.filterTargetField ? 700 : 500, color: filterState?.filterTargetField ? "#4338CA" : "#64748B", lineHeight: "30px" }}>
                {filterState?.filterTargetField === "date"
                  ? "Date"
                  : filterState?.filterTargetField === "callStart"
                  ? "Call Start"
                  : filterState?.filterTargetField === "callClosed"
                  ? "Call Closed"
                  : "Filter By"}
              </Typography>
            )}
          >
            <MenuItem value="date"><ListItemText primaryTypographyProps={{ fontSize: 12.5 }} primary="Date" /></MenuItem>
            <MenuItem value="callStart"><ListItemText primaryTypographyProps={{ fontSize: 12.5 }} primary="Call Start" /></MenuItem>
            <MenuItem value="callClosed"><ListItemText primaryTypographyProps={{ fontSize: 12.5 }} primary="Call Closed" /></MenuItem>
            <MenuItem value=""><ListItemText primaryTypographyProps={{ fontSize: 12.5 }} primary="None" /></MenuItem>
          </Select>
        </FormControl>

        <AirbnbDateRangePicker
          startDate={pickerStart}
          endDate={pickerEnd}
          onChange={handleDateRangeChange}
        />

        {/* Single-select Status pill */}
        <FormControl size="small" sx={{ minWidth: 120, flexShrink: 0 }}>
          <Select
            value={status || ""}
            onChange={(e) => setStatus(e.target.value)}
            displayEmpty
            MenuProps={{
              PaperProps: {
                sx: {
                  borderRadius: "10px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                  mt: 0.5,
                  maxHeight: 220,
                  overflowY: "auto",
                  "& .MuiMenuItem-root": { fontSize: 12.5, py: 0.6, minHeight: 32 },
                },
              },
            }}
            sx={{
              height: 30,
              borderRadius: "20px",
              fontSize: 12,
              fontWeight: hasStatus ? 700 : 500,
              color: hasStatus ? "#4338CA" : "#64748B",
              bgcolor: hasStatus ? "#EEF2FF" : "#F1F5F9",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: hasStatus ? "#A5B4FC" : "#E2E8F0",
                borderRadius: "20px",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#A5B4FC" },
              "& .MuiSelect-select": { py: 0, pl: 1.5, pr: "28px !important", display: "flex", alignItems: "center", minHeight: "30px !important" },
              "& .MuiSelect-icon": { color: hasStatus ? "#4F46E5" : "#94A3B8", fontSize: 18, right: 4 },
            }}
            renderValue={() =>
              hasStatus ? (
                <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#4338CA", lineHeight: "30px" }}>
                  {selectedStatusItem?.label || status}
                </Typography>
              ) : (
                <Typography sx={{ fontSize: 12, color: "#64748B", lineHeight: "30px" }}>Status</Typography>
              )
            }
          >
            <MenuItem value="">
              <ListItemText primaryTypographyProps={{ fontSize: 12.5 }} primary="All Status" />
            </MenuItem>
            {statusList.map((item) => (
              <MenuItem key={item.value ?? item.label} value={item.value ?? item.label}>
                <ListItemText primaryTypographyProps={{ fontSize: 12.5 }} primary={item.label} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}
