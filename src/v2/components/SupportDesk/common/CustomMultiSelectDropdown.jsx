import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Popover,
  Checkbox,
  InputBase,
  Button,
  Chip,
  IconButton,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

export default function CustomMultiSelectDropdown({
  title = 'Filter',
  options = [],
  selectedValues = [],
  onChange,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [tempSelected, setTempSelected] = useState(selectedValues || []);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setTempSelected(selectedValues || []);
    setSearchQuery('');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDone = () => {
    if (onChange) {
      onChange(tempSelected);
    }
    handleClose();
  };

  const handleClear = () => {
    setTempSelected([]);
  };

  const normalizedOptions = useMemo(() => {
    return options.map((opt) => {
      if (typeof opt === 'string') {
        return { id: opt, label: opt };
      }
      return opt;
    });
  }, [options]);

  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return normalizedOptions;
    const q = searchQuery.toLowerCase();
    return normalizedOptions.filter((opt) => opt.label.toLowerCase().includes(q));
  }, [normalizedOptions, searchQuery]);

  const handleToggleItem = (id) => {
    setTempSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleAll = () => {
    if (tempSelected.length === normalizedOptions.length) {
      setTempSelected([]);
    } else {
      setTempSelected(normalizedOptions.map((o) => o.id));
    }
  };

  const allSelected =
    normalizedOptions.length > 0 && tempSelected.length === normalizedOptions.length;
  const isIndeterminate =
    tempSelected.length > 0 && tempSelected.length < normalizedOptions.length;

  const countBadge = selectedValues.length;

  return (
    <>
      <Box
        onClick={handleClick}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.6,
          height: 32,
          px: 1.2,
          bgcolor: '#FFFFFF',
          color: '#334155',
          borderRadius: '5px',
          cursor: 'pointer',
          userSelect: 'none',
          transition: 'all 0.15s ease',
          border: '1px solid #CBD5E1',
          '&:hover': {
            borderColor: '#94A3B8',
            bgcolor: '#F8FAFC',
          },
        }}
      >
        <FilterListIcon sx={{ fontSize: 15, color: '#4F46E5' }} />
        <Typography sx={{ fontSize: 12, fontWeight: 650, letterSpacing: '0.01em', color: '#0F172A' }}>
          {title}
        </Typography>

        {countBadge > 0 && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: '#4F46E5',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: 10.5,
              borderRadius: '10px',
              px: 0.7,
              height: 18,
              minWidth: 18,
            }}
          >
            {countBadge}
          </Box>
        )}

        <KeyboardArrowDownIcon sx={{ fontSize: 14, color: '#64748B' }} />
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: {
            mt: 1,
            width: 250,
            borderRadius: '10px',
            boxShadow: '0 15px 35px rgba(0,0,0,0.18)',
            overflow: 'hidden',
            bgcolor: '#FFFFFF',
          },
        }}
      >
        <Box sx={{ p: 1.5, pb: 1, borderBottom: '1px solid #F1F5F9' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography sx={{ fontSize: '0.82rem', fontWeight: 800, color: '#0F172A' }}>
              {title}
            </Typography>

            {tempSelected.length > 0 && (
              <Typography
                onClick={handleClear}
                sx={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: '#2563EB',
                  cursor: 'pointer',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Clear all
              </Typography>
            )}
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              bgcolor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '6px',
              px: 1,
              height: 32,
              '&:focus-within': {
                borderColor: '#2563EB',
                bgcolor: '#FFFFFF',
              },
            }}
          >
            <SearchIcon sx={{ fontSize: 16, color: '#2563EB', mr: 0.8 }} />
            <InputBase
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${title.toLowerCase()}...`}
              sx={{
                fontSize: '0.8rem',
                flex: 1,
                color: '#0F172A',
                fontWeight: 500,
                '& input::placeholder': { color: '#94A3B8', opacity: 1 },
              }}
            />
            {searchQuery && (
              <IconButton size="small" onClick={() => setSearchQuery('')} sx={{ p: 0.2 }}>
                <CloseIcon sx={{ fontSize: 13, color: '#64748B' }} />
              </IconButton>
            )}
          </Box>
        </Box>

        <Box sx={{ px: 1.5, py: 0.4 }}>
          <Box
            onClick={handleToggleAll}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 1,
              py: 0.6,
              borderRadius: '6px',
              bgcolor: allSelected ? '#EFF6FF' : '#F8FAFC',
              border: allSelected ? '1px solid #BFDBFE' : '1px solid transparent',
              cursor: 'pointer',
              '&:hover': { bgcolor: allSelected ? '#DBEAFE' : '#F1F5F9' },
            }}
          >
            <Checkbox
              checked={allSelected}
              indeterminate={isIndeterminate}
              onChange={handleToggleAll}
              size="small"
              sx={{
                p: 0,
                color: '#CBD5E1',
                '&.Mui-checked, &.MuiCheckbox-indeterminate': { color: '#2563EB' },
              }}
            />
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: '0.82rem',
                color: '#2563EB',
                userSelect: 'none',
              }}
            >
              Select All
            </Typography>

            {allSelected && (
              <Chip
                label="ALL"
                size="small"
                sx={{
                  ml: 'auto',
                  height: 18,
                  fontSize: '0.62rem',
                  fontWeight: 800,
                  bgcolor: '#2563EB',
                  color: '#FFFFFF',
                }}
              />
            )}
          </Box>
        </Box>

        <Box sx={{ borderBottom: '1px solid #F1F5F9', my: 0.5 }} />

        <Box
          sx={{
            maxHeight: 220,
            overflowY: 'auto',
            px: 1.5,
            py: 0.4,
            display: 'flex',
            flexDirection: 'column',
            gap: 0.3,
            '&::-webkit-scrollbar': { width: 5 },
            '&::-webkit-scrollbar-thumb': { bgcolor: '#CBD5E1', borderRadius: 3 },
          }}
        >
          {filteredOptions.length === 0 ? (
            <Typography
              variant="caption"
              sx={{ color: '#94A3B8', py: 2, textAlign: 'center', display: 'block', fontWeight: 500 }}
            >
              No matching options found
            </Typography>
          ) : (
            filteredOptions.map((opt) => {
              const isChecked = tempSelected.includes(opt.id);

              return (
                <Box
                  key={opt.id}
                  onClick={() => handleToggleItem(opt.id)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 1,
                    py: 0.6,
                    borderRadius: '6px',
                    bgcolor: isChecked ? '#EFF6FF' : 'transparent',
                    border: isChecked ? '1px solid #BFDBFE' : '1px solid transparent',
                    cursor: 'pointer',
                    userSelect: 'none',
                    '&:hover': {
                      bgcolor: isChecked ? '#DBEAFE' : '#F8FAFC',
                    },
                  }}
                >
                  <Checkbox
                    checked={isChecked}
                    onChange={() => handleToggleItem(opt.id)}
                    size="small"
                    sx={{
                      p: 0,
                      color: '#CBD5E1',
                      '&.Mui-checked': { color: '#2563EB' },
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: '0.82rem',
                      color: isChecked ? '#0F172A' : '#334155',
                      fontWeight: isChecked ? 700 : 500,
                      flex: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {opt.label}
                  </Typography>

                  {isChecked && <CheckIcon sx={{ fontSize: 14, color: '#2563EB', flexShrink: 0 }} />}
                </Box>
              );
            })
          )}
        </Box>

        <Box
          sx={{
            background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
            p: 1.2,
            px: 1.8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1,
            mt: 0.8,
          }}
        >
          <Typography
            noWrap
            sx={{
              color: '#FFFFFF',
              fontSize: '0.74rem',
              fontWeight: 650,
              flex: 1,
              minWidth: 0,
            }}
          >
            {tempSelected.length === 0
              ? 'None selected'
              : tempSelected.length === normalizedOptions.length
              ? 'All selected'
              : `${tempSelected.length} selected`}
          </Typography>

          <Button
            onClick={handleDone}
            variant="contained"
            size="small"
            startIcon={<CheckIcon sx={{ fontSize: 14 }} />}
            sx={{
              bgcolor: '#FFFFFF',
              color: '#1D4ED8',
              fontWeight: 800,
              fontSize: '0.76rem',
              textTransform: 'none',
              px: 1.6,
              py: 0.4,
              minWidth: 70,
              borderRadius: '6px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
              flexShrink: 0,
              '&:hover': {
                bgcolor: '#F8FAFC',
              },
            }}
          >
            Done
          </Button>
        </Box>
      </Popover>
    </>
  );
}
