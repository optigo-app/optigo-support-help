import React from "react";
import Preview from "./Preview";

const index = ({ attachments = [], open = false, setOpen = () => {}, initialIndex = 0 }) => {
	return <Preview attachments={attachments} open={open} setOpen={setOpen} initialIndex={initialIndex} />;
};

export default index;
