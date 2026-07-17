import { Box } from "@mui/material";
import React from "react";
import { ad1 as imag1 } from "../../../../../../assets/index";

const AdvertisementBanner = () => {
	return (
		<Box
			sx={{
				width: 200,
				flexGrow: 1,
				height: "100%",
				borderLeft: "1px solid #dfe1e6",
				bgcolor: "#ffffff",
				overflowY: "auto",
				position: "relative",
			}}
		>
			<img src={imag1} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", padding: "0", margin: "0" }} />
		</Box>
	);
};

export default AdvertisementBanner;
