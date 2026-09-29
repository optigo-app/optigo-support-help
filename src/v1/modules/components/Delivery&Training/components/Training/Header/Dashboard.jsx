import React from "react";
import { Box, Typography, Grid, Card, CardContent, Chip, styled, Tooltip } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { calculateTrainingModeDistribution, calculateAverageAttendees, calculateTotalTrainingTime, calculateTrainingTypesDistribution } from "./../../../utils/deliveryUtils";
const PremiumTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} arrow />)(({ theme }) => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    fontSize: 13,
    fontWeight: 500,
    borderRadius: 8,
    boxShadow: theme.shadows[4],
    padding: "8px 12px",
    maxWidth: 300, // allows text wrap
    whiteSpace: "pre-wrap",
    lineHeight: 1.4,
    border: `1px solid ${theme.palette.divider}`,
  },
  [`& .MuiTooltip-arrow`]: {
    color: theme.palette.background.paper,
  },
}));

// import React from 'react';
// import {
//     Box,
//     Typography,
//     Grid,
//     Card,
//     CardContent,
//     Chip
// } from '@mui/material';
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// import { calculateTrainingModeDistribution, calculateAverageAttendees, calculateTotalTrainingTime, calculateTrainingTypesDistribution } from './../../../utils/deliveryUtils'
// import MenuList from './MenuList';

const Dashboard = ({ Data, filters }) => {
	const totalTrainings = Data.filter((training) => training?.Status !== "Cancelled").length;
	const CancelledTrainings = Data.filter((training) => training?.Status === "Cancelled").length;
	const totalTrainingTime = calculateTotalTrainingTime(Data);
	const averageAttendees = calculateAverageAttendees(Data);
	const trainingTypesDistribution = calculateTrainingTypesDistribution(Data);
	const trainingModeDistribution = calculateTrainingModeDistribution(Data);
	return (
		<Grid container spacing={2}>
			{/* Total Trainings */}
			<Grid item xs={12} sm={6} md={2.6} display={'flex'} gap={0} >
				<PremiumTooltip title="Total Trainings" placement="top" >
					<Card sx={{
						borderRadius: 4,
						flex: 1,
						boxShadow: "none",
						display: 'flex'
					}} >
						<Card
							sx={{
								borderRadius: 0,
								flex: 1,
								boxShadow: "none",
								background: "linear-gradient(to right, #f1fff0, #f5fff0)",
								border: 'none'
							}}
						>
							<CardContent>
								<Typography variant="subtitle2" color="text.secondary" gutterBottom>
									Total Trainings
								</Typography>
								<Typography variant="h4" sx={{ fontWeight: "bold", my: 1 }}>
									{totalTrainings || 0}
								</Typography>
								<Box
									sx={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
									}}
								>
									<Box sx={{ display: "flex", alignItems: "center" }}>
										<TrendingUpIcon sx={{ color: "#4caf50", fontSize: 16, mr: 0.5 }} />
										<Typography variant="caption" sx={{ color: "#4caf50", fontWeight: "medium" }}>
											+{totalTrainings || 0} Trainings
										</Typography>
									</Box>
								</Box>
							</CardContent>
						</Card>

						<Card
							sx={{
								borderRadius: 0,
								flex: 1,
								boxShadow: "none",
								background: "linear-gradient(to right, #fff5f5, #fff0f0)",
								border: 'none'
							}}
						>
							<CardContent>
								<Typography variant="subtitle2" color="text.secondary" gutterBottom>
									Cancelled Trainings
								</Typography>
								<Typography variant="h4" sx={{ fontWeight: "bold", my: 1 }}>
									{CancelledTrainings || 0}
								</Typography>
								<Box
									sx={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
									}}
								>
									<Box sx={{ display: "flex", alignItems: "center" }}>
										<TrendingDownIcon sx={{ color: "#f44336", fontSize: 16, mr: 0.5 }} />
										<Typography variant="caption" sx={{ color: "#f44336", fontWeight: "medium" }}>
											{CancelledTrainings || 0} Trainings
										</Typography>
									</Box>
								</Box>
							</CardContent>
						</Card>
					</Card>
				</PremiumTooltip>
			</Grid>

			{/* Total Training Time */}
			<Grid item xs={12} sm={6} md={2.4}>
				<PremiumTooltip title="Total Training Time" placement="top" >
					<Card
						sx={{
							borderRadius: 4,
							boxShadow: "none",
							background: "linear-gradient(to right, #f5f8ff, #f0f4ff)",
						}}
					>
						<CardContent>
							<Typography variant="subtitle2" color="text.secondary" gutterBottom>
								Total Training Time
							</Typography>
							<Typography variant="h4" sx={{ fontWeight: "bold", my: 1 }}>
								{totalTrainingTime || 0} Hours
							</Typography>
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<Box sx={{ display: "flex", alignItems: "center" }}>
									<TrendingUpIcon sx={{ color: "#4caf50", fontSize: 16, mr: 0.5 }} />
									<Typography variant="caption" sx={{ color: "#4caf50", fontWeight: "medium" }}>
										+{totalTrainingTime || 0} Hours
									</Typography>
								</Box>
								<Typography variant="caption" sx={{ color: "text.secondary" }}></Typography>
							</Box>
						</CardContent>
					</Card>
				</PremiumTooltip>
			</Grid>

			{/* Average Attendees per Training */}
			<Grid item xs={12} sm={6} md={2.4}>
				<PremiumTooltip title="Average Attendees per Training" placement="top" >
					<Card
						sx={{
							borderRadius: 4,
							boxShadow: "none",
							background: "linear-gradient(to right, #f0f9ff, #f5faff)",
						}}
					>
						<CardContent>
							<Typography variant="subtitle2" color="text.secondary" gutterBottom>
								Average Attendees per Training
							</Typography>
							<Typography variant="h4" sx={{ fontWeight: "bold", my: 1 }}>
								{averageAttendees.toFixed(2) || 0}
							</Typography>
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<Box sx={{ display: "flex", alignItems: "center" }}>
									<TrendingUpIcon sx={{ color: "#4caf50", fontSize: 16, mr: 0.5 }} />
									<Typography variant="caption" sx={{ color: "#4caf50", fontWeight: "medium" }}>
										+{averageAttendees.toFixed(2) || 0} Attendees
									</Typography>
								</Box>
								<Typography variant="caption" sx={{ color: "text.secondary" }}></Typography>
							</Box>
						</CardContent>
					</Card>
				</PremiumTooltip>
			</Grid>

			{/* Training Types Distribution */}
			<Grid item xs={12} sm={6} md={2.6} display={"flex"} gap={0}>
				<PremiumTooltip title="Training Types Distribution" placement="top" >
					<Card
						sx={{
							borderRadius: 4,
							flex: 1,
							boxShadow: "none",
							display: "flex",
							...Object.entries(trainingTypesDistribution).length === 0 &&
							 {background : "linear-gradient(to right, #f5f0ff, #faf5ff)"  ,
                              alignItems : "center",
                              justifyContent : "center",
                              flexDirection : "column",
                              	},
						}}
					>
						{Object.entries(trainingTypesDistribution).length === 0 && (
							<CardContent>
								<Typography variant="subtitle2" color="text.secondary" gutterBottom>
									No Analytics Available
																	</Typography>
							</CardContent>
						)}
							{Object.entries(trainingTypesDistribution).map(([type, value], index) => {
							const gradients = [
								"linear-gradient(to right, #fff0f6, #fff5f8)",
								"linear-gradient(to right, #f0f8ff, #f5fbff)",
								"linear-gradient(to right, #f7f5ff, #f9f8ff)",
							];
							const gradient = gradients[index % gradients.length];

							return (
								<Card
									key={type}
									sx={{
										borderRadius: 0,
										flex: 1,
										boxShadow: "none",
										background: gradient,
										border: "none",
									}}
								>
									<CardContent>
										<Typography variant="subtitle2" color="text.secondary" gutterBottom>
											{type}
										</Typography>
										<Typography variant="h4" sx={{ fontWeight: "bold", my: 1 }}>
											{value}
										</Typography>
										<Box
											sx={{
												display: "flex",
												justifyContent: "space-between",
												alignItems: "center",
											}}
										>
											<Box sx={{ display: "flex", alignItems: "center" }}>
												{/* <TrendingUpIcon
												sx={{
													color: index === 0 ? "#4caf50" : index === 1 ? "#2196f3" : "#9c27b0",
													fontSize: 16,
													mr: 0.5,
												}}
											/> */}
												<Typography
													variant="caption"
													sx={{
														color: index === 0 ? "#4caf50" : index === 1 ? "#2196f3" : "#9c27b0",
														fontWeight: "medium",
													}}
												>
													{`+${value} Sessions`}
												</Typography>
											</Box>
										</Box>
									</CardContent>
								</Card>
							);
						})}
					</Card>
				</PremiumTooltip>
			</Grid>
			{/* Training Mode Distribution */}
			<Grid item xs={12} sm={6} md={2} display={"flex"} gap={0}>
				<PremiumTooltip title="Training Mode Distribution" placement="top" >
					<Card
						sx={{
							borderRadius: 4,
							flex: 1,
							boxShadow: "none",
							display: "flex",
							...Object.entries(trainingModeDistribution).length === 0 &&
							 {background : "linear-gradient(to right, #f0f4ff, #f7f9ff)"  ,
                              alignItems : "center",
                              justifyContent : "center",
                              flexDirection : "column",
                              	},
						}}
					>
						{Object.entries(trainingModeDistribution).length === 0 && (
							<CardContent>
								<Typography variant="subtitle2" color="text.secondary" gutterBottom>
									No Analytics Available
								</Typography>
							</CardContent>
						)}
						{Object.entries(trainingModeDistribution)?.map(([type, value], index) => {
							const gradients = [
								// "linear-gradient(to right, #fffdf0, #fffff5)", // pale vanilla
								//   "linear-gradient(to right, #f0fff0, #f9fff5)", // frosted lime
								"linear-gradient(to right, #f5f0ff, #faf5ff)", // soft orchid
								"linear-gradient(to right, #f0f4ff, #f7f9ff)", // arctic frost
								"linear-gradient(to right, #fff0fa, #fff5fc)", // pink frost
								"linear-gradient(to right, #f0fffc, #f7fffd)", // mint ice
								"linear-gradient(to right, #fffaf0, #fffef8)", // honey cream
							];

							const gradient = gradients[index % gradients.length];

							return (
								<Card
									key={type}
									sx={{
										borderRadius: 0,
										flex: 1,
										boxShadow: "none",
										background: gradient,
										border: "none",
									}}
								>
									<CardContent>
										<Typography variant="subtitle2" color="text.secondary" gutterBottom>
											{type}
										</Typography>
										<Typography variant="h4" sx={{ fontWeight: "bold", my: 1 }}>
											{value}
										</Typography>
										<Box
											sx={{
												display: "flex",
												justifyContent: "space-between",
												alignItems: "center",
											}}
										>
											<Box sx={{ display: "flex", alignItems: "center" }}>
												{/* <TrendingUpIcon
												sx={{
													color: index === 0 ? "#4caf50" : index === 1 ? "#2196f3" : "#9c27b0",
													fontSize: 16,
													mr: 0.5,
												}}
											/> */}
												<Typography
													variant="caption"
													sx={{
														color: index === 0 ? "#4caf50" : index === 1 ? "#2196f3" : "#9c27b0",
														fontWeight: "medium",
													}}
												>
													{`+${value} Sessions`}
												</Typography>
											</Box>
										</Box>
									</CardContent>
								</Card>
							);
						})}
					</Card>
				</PremiumTooltip>
			</Grid>
		</Grid>
	);
};

export default Dashboard;

// import React from 'react';
// import {
//     Box,
//     Typography,
//     Grid,
//     Card,
//     CardContent,
//     Chip
// } from '@mui/material';
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// import { calculateTrainingModeDistribution, calculateAverageAttendees, calculateTotalTrainingTime, calculateTrainingTypesDistribution } from './../../../utils/deliveryUtils'
// import MenuList from './MenuList';
// const Dashboard = ({ Data, filters }) => {
//     const totalTrainings = Data.filter(training => training?.Status !== "Cancelled").length;
//     const totalTrainingTime = calculateTotalTrainingTime(Data);
//     const averageAttendees = calculateAverageAttendees(Data);
//     const trainingTypesDistribution = calculateTrainingTypesDistribution(Data);
//     const trainingModeDistribution = calculateTrainingModeDistribution(Data);
//     const [anchorEl, setAnchorEl] = React.useState(null);
//     const [anchorElMode, setAnchorElMode] = React.useState(null);
//     const [selectedType, setSelectedType] = React.useState('');
//     const [selectedMode, setSelectedMode] = React.useState('');

// // Training Type
// React.useEffect(() => {
//     const availableTypes = Object.keys(trainingTypesDistribution).filter(
//         key => trainingTypesDistribution[key] > 0
//     );

//     if (availableTypes.length > 0) {
//         if (filters?.trainingType && trainingTypesDistribution[filters.trainingType] > 0) {
//             setSelectedType(filters.trainingType);
//         } else if (!availableTypes.includes(selectedType) || trainingTypesDistribution[selectedType] === 0) {
//             setSelectedType(availableTypes[0]);
//         }
//     } else {
//         setSelectedType('');
//     }
// }, [trainingTypesDistribution, filters?.trainingType]);

// // Training Mode
// React.useEffect(() => {
//     const availableModes = Object.keys(trainingModeDistribution).filter(
//         key => trainingModeDistribution[key] > 0
//     );

//     if (availableModes.length > 0) {
//         if (filters?.trainingMode && trainingModeDistribution[filters.trainingMode] > 0) {
//             setSelectedMode(filters.trainingMode);
//         } else if (!availableModes.includes(selectedMode) || trainingModeDistribution[selectedMode] === 0) {
//             setSelectedMode(availableModes[0]);
//         }
//     } else {
//         setSelectedMode('');
//     }
// }, [trainingModeDistribution, filters?.trainingMode]);



//     return (
//         <Grid container spacing={2}>
//             {/* Total Trainings */}
//             <Grid item xs={12} sm={6} md={2.4}>
//                 <Card sx={{
//                     borderRadius: 2,
//                     boxShadow: 'none',
//                     height: 140,
//                     background: 'linear-gradient(to right, #f1fff0, #f5fff0)'
//                 }}>
//                     <CardContent>
//                         <Typography variant="subtitle2" color="text.secondary" gutterBottom>
//                             Total Trainings
//                         </Typography>
//                         <Typography variant="h4" sx={{ fontWeight: 'bold', my: 1 }}>
//                             {totalTrainings || 0}
//                         </Typography>
//                         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                 <TrendingUpIcon sx={{ color: '#4caf50', fontSize: 16, mr: 0.5 }} />
//                                 <Typography variant="caption" sx={{ color: '#4caf50', fontWeight: 'medium' }}>
//                                     +{totalTrainings || 0} Trainings
//                                 </Typography>
//                             </Box>
//                             <Typography variant="caption" sx={{ color: 'error.main', fontStyle: "italic" }}>
//                                 Cancelled Trainings are excluded
//                             </Typography>
//                         </Box>
//                     </CardContent>
//                 </Card>
//             </Grid>

//             {/* Total Training Time */}
//             <Grid item xs={12} sm={6} md={2.4}>
//                 <Card sx={{
//                     borderRadius: 2,
//                     boxShadow: 'none',
//                     height: 140,
//                     background: 'linear-gradient(to right, #f5f8ff, #f0f4ff)'
//                 }}>
//                     <CardContent>
//                         <Typography variant="subtitle2" color="text.secondary" gutterBottom>
//                             Total Training Time
//                         </Typography>
//                         <Typography variant="h4" sx={{ fontWeight: 'bold', my: 1 }}>
//                             {totalTrainingTime || 0} Hours
//                         </Typography>
//                         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                 <TrendingUpIcon sx={{ color: '#4caf50', fontSize: 16, mr: 0.5 }} />
//                                 <Typography variant="caption" sx={{ color: '#4caf50', fontWeight: 'medium' }}>
//                                     +{totalTrainingTime || 0} Hours
//                                 </Typography>
//                             </Box>
//                             <Typography variant="caption" sx={{ color: 'text.secondary' }}>
//                             </Typography>
//                         </Box>
//                     </CardContent>
//                 </Card>
//             </Grid>

//             {/* Average Attendees per Training */}
//             <Grid item xs={12} sm={6} md={2.4}>
//                 <Card sx={{
//                     borderRadius: 2,
//                     boxShadow: 'none',
//                     height: 140,
//                     background: 'linear-gradient(to right, #f0f9ff, #f5faff)'
//                 }}>
//                     <CardContent>
//                         <Typography variant="subtitle2" color="text.secondary" gutterBottom>
//                             Average Attendees per Training
//                         </Typography>
//                         <Typography variant="h4" sx={{ fontWeight: 'bold', my: 1 }}>
//                             {averageAttendees.toFixed(2) || 0}
//                         </Typography>
//                         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                 <TrendingUpIcon sx={{ color: '#4caf50', fontSize: 16, mr: 0.5 }} />
//                                 <Typography variant="caption" sx={{ color: '#4caf50', fontWeight: 'medium' }}>
//                                     +{averageAttendees.toFixed(2) || 0} Attendees
//                                 </Typography>
//                             </Box>
//                             <Typography variant="caption" sx={{ color: 'text.secondary' }}>
//                             </Typography>
//                         </Box>
//                     </CardContent>
//                 </Card>
//             </Grid>

//             {/* Training Types Distribution */}
//             <Grid item xs={12} sm={6} md={2.4}>
//                 <Card sx={{
//                     borderRadius: 2,
//                     boxShadow: 'none',
//                     height: 140,
//                     background: 'linear-gradient(to right, #fff0f6, #fff5f8)'
//                 }}>
//                     <CardContent>
//                         <Typography variant="subtitle2" color="text.secondary" gutterBottom>
//                             Training Types Distribution -{" "}
//                             <Chip
//                                 label={selectedType || 'None'}
//                                 color={'secondary'}
//                                 size="small"
//                                 onClick={(e) => setAnchorEl(e.currentTarget)}
//                                 sx={{
//                                     cursor: "pointer",
//                                     pointerEvents: "auto",
//                                     opacity: 1,
//                                     "&.Mui-disabled": {
//                                         opacity: 1,
//                                         pointerEvents: "auto",
//                                         cursor: "default",
//                                     },
//                                     borderRadius: '4px'
//                                 }}
//                             />
//                             <MenuList
//                                 options={Object.keys(trainingTypesDistribution).map((key) => ({
//                                     label: `${key} (${trainingTypesDistribution[key]})`,
//                                     value: key
//                                 }))}
//                                 anchorEl={anchorEl}
//                                 open={Boolean(anchorEl)}
//                                 handleClose={() => setAnchorEl(null)}
//                                 handleSelect={(value) => {
//                                     console.log("🚀 ~ Dashboard ~ value:", value)
//                                     setSelectedType(value);
//                                     setAnchorEl(null);
//                                 }}
//                             />
//                         </Typography>

//                         <Typography variant="h4" sx={{ fontWeight: 'bold', my: 1 }}>
//                             {trainingTypesDistribution[selectedType] || 0}
//                         </Typography>

//                         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                 <TrendingUpIcon sx={{ color: '#4caf50', fontSize: 16, mr: 0.5 }} />
//                                 <Typography variant="caption" sx={{ color: '#4caf50', fontWeight: 'medium' }}>
//                                     +{Object.keys(trainingTypesDistribution).length || 0} Types
//                                 </Typography>
//                             </Box>
//                             <Typography variant="caption" sx={{ color: 'text.secondary' }}>
//                                 {/* Optional additional info */}
//                             </Typography>
//                         </Box>
//                     </CardContent>
//                 </Card>
//             </Grid>

//             {/* Training Mode Distribution */}
//             <Grid item xs={12} sm={6} md={2.4}>
//                 <Card sx={{
//                     borderRadius: 2,
//                     boxShadow: 'none',
//                     height: 140,
//                     background: 'linear-gradient(to right, #fff6f3, #fff9f0)'
//                 }}>
//                     <CardContent>
//                         <Typography variant="subtitle2" color="text.secondary" gutterBottom>
//                             Training Mode Distribution - {" "}
//                             <Chip
//                                 label={selectedMode || 'None'}
//                                 color={'primary'}
//                                 size="small"
//                                 onClick={(e) => setAnchorElMode(e.currentTarget)}
//                                 sx={{
//                                     cursor: "pointer",
//                                     pointerEvents: "auto",
//                                     opacity: 1,
//                                     "&.Mui-disabled": {
//                                         opacity: 1,
//                                         pointerEvents: "auto",
//                                         cursor: "default",
//                                     },
//                                     borderRadius: '4px'
//                                 }}
//                             />
//                             <MenuList
//                                 options={Object.keys(trainingModeDistribution).map((key) => ({
//                                     label: `${key} (${trainingModeDistribution[key]})`,
//                                     value: key
//                                 }))}
//                                 anchorEl={anchorElMode}
//                                 open={Boolean(anchorElMode)}
//                                 handleClose={() => setAnchorElMode(null)}
//                                 handleSelect={(value) => {
//                                     setSelectedMode(value);
//                                     setAnchorElMode(null);
//                                 }}
//                             />
//                         </Typography>

//                         <Typography variant="h4" sx={{ fontWeight: 'bold', my: 1 }}>
//                             {trainingModeDistribution[selectedMode] || 0}
//                         </Typography>

//                         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                 <TrendingUpIcon sx={{ color: '#4caf50', fontSize: 16, mr: 0.5 }} />
//                                 <Typography variant="caption" sx={{ color: '#4caf50', fontWeight: 'medium' }}>
//                                     +{Object.keys(trainingModeDistribution).length || 0} Modes
//                                 </Typography>
//                             </Box>
//                             <Typography variant="caption" sx={{ color: 'text.secondary' }}>
//                                 {/* Optional additional info */}
//                             </Typography>
//                         </Box>
//                     </CardContent>
//                 </Card>
//             </Grid>
//         </Grid>
//     );
// };


// export default Dashboard;