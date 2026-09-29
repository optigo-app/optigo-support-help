import { InputBase, IconButton } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { Search as SearchIcon, X as CloseIcon } from "lucide-react";
import { useUrlFilters } from "../../../../../hooks/useFilters";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	border: "1px solid #DFE1E6",
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	color: "#42526E",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "#172B4D",
	width: "100%",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		paddingRight: `2em`,
		transition: theme.transitions.create("width"),
		width: "100%",
	},
}));

const ClearButton = styled(IconButton)(({ theme }) => ({
	position: "absolute",
	right: 4,
	top: "50%",
	transform: "translateY(-50%)",
	padding: 4,
	color: "#6B778C",
}));

const SearchBar = () => {
	const { filters, updateFilters } = useUrlFilters();
	const inputRef = useRef(null);
	const [value, setValue] = useState(filters.searchQuery || "");

	const debouncedUpdate = useMemo(
		() => debounce((val) => updateFilters({ searchQuery: val }), 40),
		[updateFilters]
	);

	useEffect(() => {
		if (inputRef.current && inputRef.current.value.trim() !== (filters.searchQuery ?? "").trim()) {
			inputRef.current.value = filters.searchQuery || "";
			setValue(filters.searchQuery || "");
		}
	}, [filters.searchQuery]);

	useCallback(() => debouncedUpdate.cancel, [debouncedUpdate]);

	const handleClear = () => {
		setValue("");
		updateFilters({ searchQuery: "" });
		if (inputRef.current) inputRef.current.value = "";
	};

	return (
		<Search>
			<SearchIconWrapper>
				<SearchIcon />
			</SearchIconWrapper>
			<StyledInputBase
				inputRef={inputRef}
				value={value}
				onChange={(e) => {
					setValue(e.target.value);
					debouncedUpdate(e.target.value);
				}}
				disableUnderline
				placeholder="Search tickets ..."
				inputProps={{ "aria-label": "search tickets" }}
			/>
			{value && (
				<ClearButton size="medium" onClick={handleClear}>
					<CloseIcon size={16} />
				</ClearButton>
			)}
		</Search>
	);
};

export default SearchBar;

// import { InputBase } from "@mui/material";
// import { styled, alpha } from "@mui/material/styles";
// import { Search as SearchIcon } from "lucide-react";
// import { useUrlFilters } from "../../../../../hooks/useFilters";
// import debounce from "lodash.debounce";
// import { useCallback, useEffect, useMemo, useRef } from "react";

// const Search = styled("div")(({ theme }) => ({
// 	position: "relative",
// 	borderRadius: theme.shape.borderRadius,
// 	backgroundColor: alpha(theme.palette.common.white, 0.15),
// 	border: "1px solid #DFE1E6",
// 	"&:hover": {
// 		backgroundColor: alpha(theme.palette.common.white, 0.25),
// 	},
// 	marginRight: theme.spacing(2),
// 	marginLeft: 0,
// 	width: "100%",
// }));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
// 	padding: theme.spacing(0, 2),
// 	height: "100%",
// 	position: "absolute",
// 	pointerEvents: "none",
// 	display: "flex",
// 	alignItems: "center",
// 	justifyContent: "center",
// 	color: "#42526E",
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
// 	color: "#172B4D",
// 	width: "100%",
// 	"& .MuiInputBase-input": {
// 		padding: theme.spacing(1, 1, 1, 0),
// 		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
// 		transition: theme.transitions.create("width"),
// 		width: "100%",
// 	},
// }));
// const SearchBar = () => {
// 	const { filters, updateFilters } = useUrlFilters();
// 	const inputRef = useRef(null);

// 	const debouncedUpdate = useMemo(() => debounce((value) => updateFilters({ searchQuery: value }), 150), [updateFilters]);

// 	useEffect(() => {
// 		if (inputRef.current && inputRef.current.value.trim() !== (filters.searchQuery ?? "").trim()) {
// 			inputRef.current.value = filters.searchQuery || "";
// 		}
// 	}, [filters.searchQuery]);

// 	useCallback(() => {
// 		return () => debouncedUpdate.cancel();
// 	}, [debouncedUpdate]);

// 	return (
// 		<Search>
// 			<SearchIconWrapper>
// 				<SearchIcon />
// 			</SearchIconWrapper>
// 			<StyledInputBase  inputRef={inputRef} defaultValue={filters.searchQuery} onChange={(e) => debouncedUpdate(e.target.value)} disableUnderline placeholder="Search tickets ..." inputProps={{ "aria-label": "search tickets" }} />
				
// 		</Search>
// 	);
// };

// export default SearchBar;
