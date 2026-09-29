import React, { useEffect, useState, useMemo } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { SearchIcon } from "lucide-react";
import debounce from "lodash/debounce";
import { X } from "lucide-react";

const SearchBar = ({ searchQuery, setsearchQuery }) => {
	const [tempQuery, setTempQuery] = useState(searchQuery || "");
	const debouncedSetSearchQuery = useMemo(
		() =>
			debounce((value) => {
				setsearchQuery(value);
			}, 100),
		[setsearchQuery],
	);

	useEffect(() => {
		debouncedSetSearchQuery(tempQuery);
		return () => {
			debouncedSetSearchQuery.cancel();
		};
	}, [tempQuery, debouncedSetSearchQuery]);

	return (
		<TextField
			value={tempQuery}
			onChange={(e) => setTempQuery(e.target.value)}
			name="SearchQuery"
			sx={{
				minWidth: 440,
				"& .MuiInputBase-input": {
					padding: "8.5px 12px",
				},
			}}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<SearchIcon />
					</InputAdornment>
				),
				endAdornment: tempQuery ? (
					<InputAdornment position="end">
					  <IconButton
						edge="end"
						size="small"
						onClick={() => setTempQuery("")}
					  >
						<X size={18} />
					  </IconButton>
					</InputAdornment>
				  ) : null,
			}}
			variant="outlined"
			size="small"
			placeholder="Search Queries"
		/>
	);
};

export default SearchBar;
