import { InputAdornment, TextField } from "@mui/material";
import { Search } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import debounce from "lodash/debounce";

const SearchBar = ({ filters, handleSearchChange }) => {
  const [tempSearch, setTempSearch] = useState(filters?.search || "");
  const handleSearchChangeRef = useRef(handleSearchChange);

  useEffect(() => {
    handleSearchChangeRef.current = handleSearchChange;
  }, [handleSearchChange]);

  const debouncedSearchChange = useMemo(
    () =>
      debounce((value) => {
        handleSearchChangeRef.current({ target: { name: "search", value } });
      }, 300),
    []
  );

  // Cleanup debounced function on unmount
  useEffect(() => {
    return () => debouncedSearchChange.cancel();
  }, [debouncedSearchChange]);

  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    setTempSearch(value);
    debouncedSearchChange(value);
  }, [debouncedSearchChange]);

  useEffect(() => {
    if (filters?.search !== tempSearch) {
      setTempSearch(filters?.search || "");
    }
  }, [filters?.search]);

  return (
    <TextField
      placeholder="Search Training..."
      size="small"
      fullWidth
      value={tempSearch}
      onChange={handleInputChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search size={20} />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;