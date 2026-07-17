import React from "react";
import { Box, Typography, Divider, List, IconButton, Badge ,Tooltip } from "@mui/material";
import TicketItem from "./TicketItem";
import { useState } from "react";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import FilterAltOffRoundedIcon from "@mui/icons-material/FilterAltOffRounded";
import { useUrlFilters } from "../../../../../hooks/useFilters";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SearchBar from "./SearchBar";
import FilterPopOver from "./FilterPopOver";
import ExcelReportDowload from './../../../../../utils/ExcelReportDowload';
import { motion, useAnimation } from "framer-motion";
import { useTicket } from "../../../../../context/useTicket";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";


const TicketList = ({ tickets, selectedTicket, onTicketSelect }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [isFilterActive, setIsFilterActive] = useState(false);
	const { filterCount } = useUrlFilters();
	const controls = useAnimation();
	const [isRotating, setIsRotating] = useState(false);
	const {setRefresh} = useTicket();
  
	const handleClickRotate = async () => {
	  if (!isRotating) {
		setIsRotating(true);
		await controls.start({
		  rotate: 360,
		  transition: { duration: 0.6, ease: "easeInOut" },
		});
		controls.set({ rotate: 0 });
		setIsRotating(false);
		setRefresh((prev) => !prev);
	  }
	};
  
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
		setIsFilterActive(false);
	};

	const HandleDownloadExcel = () => {
		ExcelReportDowload(tickets);
	};

	return (
		<Box
			sx={{
				width: "32%",
				borderRight: "1px solid #DFE1E6",
				display: "flex",
				flexDirection: "column",
				bgcolor: "#fff",
				flexGrow: 1,
			}}
		>
			<Box
				sx={{
					p: 2,
					display: "flex",
					alignItems: "center",
					borderBottom: "1px solid #DFE1E6",
					justifyContent: "space-between",
				}}
			>
				<SearchBar />
				<IconButton
					onClick={(event) => {
						handleClick(event);
						setIsFilterActive((prev) => !prev);
					}}
					size="small"
					sx={{ ml: 1 }}
				>
					<Badge badgeContent={filterCount} color="primary">
						{isFilterActive ? <FilterAltOffRoundedIcon fontSize="medium" sx={{ color: "#8B07A7" }} /> : <FilterAltRoundedIcon fontSize="medium" sx={{ color: "#8B07A7" }} />}
					</Badge>
				</IconButton>
				<IconButton size="small" onClick={handleClickRotate}>
          <Tooltip title="Refresh" placement="top">
            <motion.div animate={controls} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <RefreshRoundedIcon fontSize="medium" sx={{ color: "#8B07A7" }} />
            </motion.div>
          </Tooltip>
        </IconButton>
			</Box>
			<List
				sx={{
					p: 0,
					overflow: "auto",
					flexGrow: 1,
				}}
			>
				{tickets?.length === 0 ? (
					<Box
						sx={{
							textAlign: "center",
							p: 3,
							color: "text.secondary",
							height: "100%",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							flexDirection: "column",
						}}
					>
						<InfoOutlinedIcon sx={{ fontSize: 48, mb: 1 }} />
						<Typography variant="h6" gutterBottom>
							No Tickets Found
						</Typography>
						<Typography variant="body2">Try adjusting your filters or check back later.</Typography>
					</Box>
				) : (
					tickets?.map((ticket, idx) => (
						<React.Fragment key={idx || ticket?.TicketNo}>
							<TicketItem ticket={ticket} selectedTicket={selectedTicket} onTicketSelect={onTicketSelect} />
							<Divider />
						</React.Fragment>
					))
				)}
			</List>
			<FilterPopOver anchorEl={anchorEl} handleClose={handleClose} open={open} HandleDownloadExcel={HandleDownloadExcel} />
		</Box>
	);
};

export default TicketList;
