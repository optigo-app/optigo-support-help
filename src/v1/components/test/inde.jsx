import React, { useState } from 'react';
import {
    Box,
    Typography,
    Container,
    Button,
    Stack
} from '@mui/material';
import { Link } from 'react-router-dom';
import VideoFloatingPreview from '../Help/VideoFloatingPreview';

const PlayIcon = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" {...props} width="1em" height="1em" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path fill="currentColor" d="M21.409 9.353a2.998 2.998 0 0 1 0 5.294L8.597 21.614C6.534 22.737 4 21.277 4 18.968V5.033c0-2.31 2.534-3.769 4.597-2.648z" />
        </svg>
    );
};

export default function InteractiveVideoFAQ({ children }) {
    const [showPreview, setShowPreview] = useState(false);

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                width: '100%',
            }}
        >
            {/* Background Decorative Glow Blobs */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '10%',
                    left: '5%',
                    width: '350px',
                    height: '350px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(124, 77, 255, 0.12) 0%, rgba(124, 77, 255, 0) 70%)',
                    filter: 'blur(60px)',
                    zIndex: 1,
                    pointerEvents: 'none',
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    right: '5%',
                    width: '400px',
                    height: '400px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(0, 229, 255, 0.1) 0%, rgba(0, 229, 255, 0) 70%)',
                    filter: 'blur(70px)',
                    zIndex: 1,
                    pointerEvents: 'none',
                }}
            />

            <Box
                sx={{
                    width: '100%',
                    p: { xs: 3, md: 5 },
                    pb: { xs: 0, md: 0 },
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    overflow: 'visible',
                    zIndex: 2,
                }}
            >
                {/* TOP SECTION: Tilted Badge & Title */}
                <Box sx={{ textAlign: 'center', pt: 1, mb: 4, zIndex: 2, overflow: 'visible' }}>
                    <Container maxWidth="lg">
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 800,
                                fontSize: { xs: '24px', sm: '28px', md: '38px' },
                                letterSpacing: '-0.03em',
                                textTransform: "capitalize",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexWrap: "wrap",
                                gap: 1,
                                overflow: 'visible',
                            }}
                        >
                            Frequently
                            {/* Wrapper for Asked */}
                            <Box
                                onMouseEnter={() => setShowPreview(true)}
                                onMouseLeave={() => setShowPreview(false)}
                                sx={{
                                    position: "relative",
                                    display: "inline-block",
                                    overflow: 'visible',
                                }}
                            >
                                {/* Floating video preview */}
                                {showPreview && <VideoFloatingPreview />}

                                {/* Rotated Badge Button */}
                                <Button
                                    component={Link}
                                    to="/help"
                                    variant="contained"
                                    sx={{
                                        position: "absolute",
                                        top: -36,
                                        left: "50%",
                                        transform: "translateX(-50%) rotate(-6deg)",
                                        fontSize: "0.75rem",
                                        px: 1.5,
                                        py: 0.2,
                                        minHeight: "auto",
                                        textTransform: "none",
                                        background: "linear-gradient(45deg, #7c4dff 0%, #00e5ff 100%)",
                                        boxShadow: "0 4px 14px rgba(124, 77, 255, 0.3)",
                                        borderRadius: "50px",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 0.5,
                                        fontWeight: 700,
                                        color: "white",
                                        whiteSpace: "nowrap",
                                        zIndex: 3,
                                        "&:hover": {
                                            background: "linear-gradient(45deg, #7c4dff 0%, #00e5ff 100%)",
                                            boxShadow: "0 6px 20px rgba(124, 77, 255, 0.4)",
                                        }
                                    }}
                                >
                                    <PlayIcon style={{ fontSize: 12, marginRight: 2 }} />
                                    Video Help
                                </Button>

                                {/* Asked text */}
                                <Box
                                    component="span"
                                    sx={{
                                        display: "inline-block",
                                        color: (theme) => theme.palette.primary.main
                                    }}
                                >
                                    Asked
                                </Box>
                            </Box>
                            Questions?
                        </Typography>
                    </Container>
                    
                    <Box sx={{ position: "relative", width: "100%", maxWidth: 650, mx: "auto", mt: 2 }}>
                        {/* Floating Left Badge: Ticket Support */}
                        <Box
                            component={Link}
                            to="/help?tab=1"
                            sx={{
                                display: { xs: "none", md: "flex" },
                                alignItems: "center",
                                gap: 1.5,
                                position: "absolute",
                                left: "-180px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                background: "rgba(255, 255, 255, 0.8)",
                                backdropFilter: "blur(12px)",
                                border: "1px solid rgba(226, 232, 240, 0.8)",
                                borderRadius: "16px",
                                p: 1.5,
                                pr: 2.5,
                                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)",
                                textDecoration: "none",
                                color: "inherit",
                                transition: "all 0.3s ease",
                                zIndex: 5,
                                "&:hover": {
                                    transform: "translateY(-55%) scale(1.02)",
                                    boxShadow: "0 15px 30px -5px rgba(249, 115, 22, 0.15)",
                                    borderColor: "#F97316",
                                },
                                "@keyframes floatLeft": {
                                    "0%, 100%": { transform: "translateY(-50%)" },
                                    "50%": { transform: "translateY(-55%)" }
                                },
                                animation: "floatLeft 6s ease-in-out infinite",
                            }}
                        >
                            <Box
                                sx={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: "12px",
                                    background: "linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#F97316",
                                }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 9a3 3 0 010 6v2a2 2 0 002 2h16a2 2 0 002-2v-2a3 3 0 010-6V7a2 2 0 00-2-2H4a2 2 0 00-2 2v2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </Box>
                            <Box sx={{ textAlign: "left" }}>
                                <Typography sx={{ fontWeight: 800, fontSize: "12px", color: "#1E293B" }}>Ticket Support</Typography>
                                <Typography sx={{ fontSize: "10px", color: "#64748B" }}>Track queries</Typography>
                            </Box>
                        </Box>

                        {/* Floating Right Badge: Callback Request */}
                        <Box
                            component={Link}
                            to="/help?tab=0"
                            sx={{
                                display: { xs: "none", md: "flex" },
                                alignItems: "center",
                                gap: 1.5,
                                position: "absolute",
                                right: "-180px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                background: "rgba(255, 255, 255, 0.8)",
                                backdropFilter: "blur(12px)",
                                border: "1px solid rgba(226, 232, 240, 0.8)",
                                borderRadius: "16px",
                                p: 1.5,
                                pr: 2.5,
                                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)",
                                textDecoration: "none",
                                color: "inherit",
                                transition: "all 0.3s ease",
                                zIndex: 5,
                                "&:hover": {
                                    transform: "translateY(-45%) scale(1.02)",
                                    boxShadow: "0 15px 30px -5px rgba(59, 130, 246, 0.15)",
                                    borderColor: "#3B82F6",
                                },
                                "@keyframes floatRight": {
                                    "0%, 100%": { transform: "translateY(-50%)" },
                                    "50%": { transform: "translateY(-45%)" }
                                },
                                animation: "floatRight 5s ease-in-out infinite",
                            }}
                        >
                            <Box
                                sx={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: "12px",
                                    background: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#3B82F6",
                                }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </Box>
                            <Box sx={{ textAlign: "left" }}>
                                <Typography sx={{ fontWeight: 800, fontSize: "12px", color: "#1E293B" }}>24/7 Callbacks</Typography>
                                <Typography sx={{ fontSize: "10px", color: "#64748B" }}>Get instant calls</Typography>
                            </Box>
                        </Box>

                        {/* Search Input Box */}
                        {children}

                        {/* Mobile Chips Row (displayed below search on mobile) */}
                        <Stack
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                            sx={{
                                display: { xs: "flex", md: "none" },
                                mt: 3,
                            }}
                        >
                            <Box
                                component={Link}
                                to="/help?tab=1"
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    background: "#FFFFFF",
                                    border: "1px solid rgba(226, 232, 240, 0.8)",
                                    borderRadius: "12px",
                                    py: 1,
                                    px: 2,
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                                    textDecoration: "none",
                                    color: "#1E293B",
                                    fontSize: "11px",
                                    fontWeight: 700,
                                }}
                            >
                                🎫 Tickets
                            </Box>
                            <Box
                                component={Link}
                                to="/help?tab=0"
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    background: "#FFFFFF",
                                    border: "1px solid rgba(226, 232, 240, 0.8)",
                                    borderRadius: "12px",
                                    py: 1,
                                    px: 2,
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                                    textDecoration: "none",
                                    color: "#1E293B",
                                    fontSize: "11px",
                                    fontWeight: 700,
                                }}
                            >
                                📞 Callbacks
                            </Box>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
// import React, { useState } from 'react';
// import {
//     Box,
//     Typography,
//     IconButton,
//     Tooltip,
//     Container
// } from '@mui/material';
// import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
// import ForumIcon from '@mui/icons-material/Forum';
// import SupportAgentIcon from '@mui/icons-material/SupportAgent';
// import LayersIcon from '@mui/icons-material/Layers';
// import { Link } from 'react-router-dom';

// const PlayIcon = (props) => {
//     return <>
//         <svg xmlns="http://www.w3.org/2000/svg" {...props} width="1em" height="1em" viewBox="0 0 24 24">
//             <path d="M0 0h24v24H0z" fill="none" />
//             <path fill="currentColor" d="M21.409 9.353a2.998 2.998 0 0 1 0 5.294L8.597 21.614C6.534 22.737 4 21.277 4 18.968V5.033c0-2.31 2.534-3.769 4.597-2.648z" />
//         </svg>

//     </>
// }

// export default function InteractiveVideoFAQ({ children }) {
//     return (
//         <Box
//             sx={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 position: 'relative',
//             }}
//         >
//             {/* Background Decorative Glow Blobs */}
//             <Box
//                 sx={{
//                     position: 'absolute',
//                     top: '10%',
//                     left: '5%',
//                     width: '350px',
//                     height: '350px',
//                     borderRadius: '50%',
//                     background: 'radial-gradient(circle, rgba(124, 77, 255, 0.12) 0%, rgba(124, 77, 255, 0) 70%)',
//                     filter: 'blur(60px)',
//                     zIndex: 1,
//                     pointerEvents: 'none',
//                 }}
//             />
//             <Box
//                 sx={{
//                     position: 'absolute',
//                     right: '5%',
//                     width: '400px',
//                     height: '400px',
//                     borderRadius: '50%',
//                     background: 'radial-gradient(circle, rgba(0, 229, 255, 0.1) 0%, rgba(0, 229, 255, 0) 70%)',
//                     filter: 'blur(70px)',
//                     zIndex: 1,
//                     pointerEvents: 'none',
//                 }}
//             />

//             <Box
//                 sx={{
//                     width: '100%',
//                     minHeight: '550px',
//                     p: { xs: 3, md: 5 },
//                     pb: { xs: 0, md: 0 },
//                     position: 'relative',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     justifyContent: 'flex-end',
//                     overflow: 'hidden',
//                     zIndex: 2,
//                 }}
//             >

//                 {/* TOP SECTION: Tilted Badge & Title */}
//                 <Box sx={{ textAlign: 'center', pt: 1, mb: 4, zIndex: 2 }}>
//                     <Container maxWidth="lg">
//                         <Typography
//                             variant="h2"
//                             sx={{
//                                 fontWeight: 800,
//                                 fontSize: { xs: '24px', sm: '28px', md: '38px' },
//                                 letterSpacing: '-0.03em',
//                                 textTransform: "capitalize",
//                                 display: "flex",
//                                 justifyContent: "center",
//                                 alignItems: "center",
//                                 flexWrap: "wrap",
//                                 gap: 1,
//                             }}
//                         >
//                             Frequently
//                             {/* Wrapper for Asked */}
//                             <Box
//                                 sx={{
//                                     position: "relative",
//                                     display: "inline-block",
//                                 }}
//                             >
//                                 {/* Asked text */}
//                                 <Box
//                                     component="span"
//                                     sx={{
//                                         display: "inline-block",
//                                         color: (theme) => theme.palette.primary.main
//                                     }}
//                                 >
//                                     Asked
//                                 </Box>
//                             </Box>
//                             Questions?
//                         </Typography>
//                     </Container>
//                     {children}
//                 </Box>
//                 {/* MIDDLE CONTAINER: Side Icons + Center Video Area with Flex Layout */}
//                 <Box
//                     sx={{
//                         width: '100%',
//                         maxWidth: '1400px',
//                         margin: '0 auto',
//                         display: 'flex',
//                         flexDirection: { xs: 'column', md: 'row' },
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         gap: { xs: 4, md: 0 },
//                         mt: 4,
//                         mb: 0,
//                         position: 'relative',
//                         zIndex: 2,
//                     }}
//                 >
//                     <Box
//                         sx={{
//                             display: { xs: 'none', md: 'flex' },
//                             flexDirection: 'column',
//                             gap: 3,
//                             justifyContent: 'center',
//                             alignItems: 'flex-end',
//                             flexGrow: 1,
//                             width: 'auto',
//                             mb: 0,
//                         }}
//                     >
//                         <Tooltip title="Read Documentation" placement="right">
//                             <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'flex-end' }}>
//                                 <IconButton
//                                     sx={{
//                                         width: 54,
//                                         height: 54,
//                                         backgroundColor: 'rgba(255, 255, 255, 0.8)',
//                                         backdropFilter: 'blur(8px)',
//                                         border: '1px solid rgba(0, 0, 0, 0.08)',
//                                         color: '#4b5563',
//                                         transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
//                                         '&:hover': {
//                                             backgroundColor: 'rgba(124, 77, 255, 0.08)',
//                                             borderColor: 'rgba(124, 77, 255, 0.3)',
//                                             color: '#7c4dff',
//                                             transform: 'translateX(-3px)',
//                                             boxShadow: '0 10px 20px rgba(124, 77, 255, 0.1)'
//                                         }
//                                     }}
//                                 >
//                                     <LibraryBooksIcon sx={{ fontSize: 20 }} />
//                                 </IconButton>
//                                 <Box sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1, height: '2px', background: 'linear-gradient(90deg, rgba(124, 77, 255, 0.2), rgba(124, 77, 255, 0.8))', ml: 1.5 }} />
//                             </Box>
//                         </Tooltip>

//                         <Tooltip title="Interactive Guide" placement="right">
//                             <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'flex-end' }}>
//                                 <IconButton
//                                     sx={{
//                                         width: 54,
//                                         height: 54,
//                                         backgroundColor: 'rgba(255, 255, 255, 0.8)',
//                                         backdropFilter: 'blur(8px)',
//                                         border: '1px solid rgba(0, 0, 0, 0.08)',
//                                         color: '#4b5563',
//                                         transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
//                                         '&:hover': {
//                                             backgroundColor: 'rgba(124, 77, 255, 0.08)',
//                                             borderColor: 'rgba(124, 77, 255, 0.3)',
//                                             color: '#7c4dff',
//                                             transform: 'translateX(-3px)',
//                                             boxShadow: '0 10px 20px rgba(124, 77, 255, 0.1)'
//                                         }
//                                     }}
//                                 >
//                                     <LayersIcon sx={{ fontSize: 20 }} />
//                                 </IconButton>
//                                 <Box sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1, height: '2px', background: 'linear-gradient(90deg, rgba(124, 77, 255, 0.2), rgba(124, 77, 255, 0.8))', ml: 1.5 }} />
//                             </Box>
//                         </Tooltip>
//                     </Box>

//                     <Box
//                         sx={{
//                             width: '100%',
//                             maxWidth: '750px',
//                             aspectRatio: { xs: 'auto', sm: '16/9' },
//                             background: 'rgba(255, 255, 255, 0.08)',
//                             backdropFilter: 'blur(10px)',
//                             WebkitBackdropFilter: 'blur(10px)',
//                             border: '1px solid rgba(255, 255, 255, 0.25)',
//                             borderBottom: 'none',
//                             borderTopLeftRadius: '38px',
//                             borderTopRightRadius: '38px',
//                             borderBottomLeftRadius: '0px',
//                             borderBottomRightRadius: '0px',
//                             p: 1,
//                             display: 'flex',
//                             flexDirection: { xs: 'column', sm: 'row' },
//                             gap: 1,
//                             position: 'relative',
//                             overflow: 'hidden',
//                             boxShadow: '0 -20px 40px -15px rgba(0, 0, 0, 0.12), -20px 0 40px -15px rgba(0, 0, 0, 0.08), 20px 0 40px -15px rgba(0, 0, 0, 0.08)',
//                             outline: 'none',
//                             '&:hover > a': {
//                                 flex: { xs: 1, sm: 0.75 },
//                             },
//                         }}
//                     >
//                         <Box
//                             component={Link}
//                             to="/help?tab=training-videos"
//                             sx={{
//                                 flex: 1,
//                                 textDecoration: 'none',
//                                 borderTopLeftRadius: '28px',
//                                 borderTopRightRadius: { xs: '28px', sm: '12px' },
//                                 borderBottomLeftRadius: '0',
//                                 borderBottomRightRadius: '0',
//                                 overflow: 'hidden',
//                                 position: 'relative',
//                                 display: 'flex',
//                                 flexDirection: 'column',
//                                 justifyContent: 'space-between',
//                                 p: 3.5,
//                                 minHeight: { xs: '160px', sm: 'auto' },
//                                 background: 'linear-gradient(135deg, rgba(124, 77, 255, 0.15) 0%, rgba(124, 77, 255, 0.05) 100%)',
//                                 border: '1px solid rgba(124, 77, 255, 0.15)',
//                                 transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
//                                 cursor: 'pointer',
//                                 '&:hover': {
//                                     flex: { xs: 1, sm: 1.25 },
//                                     background: 'linear-gradient(135deg, rgba(124, 77, 255, 0.22) 0%, rgba(124, 77, 255, 0.1) 100%)',
//                                     borderColor: 'rgba(124, 77, 255, 0.35)',
//                                     boxShadow: '0 12px 30px rgba(124, 77, 255, 0.15)',
//                                     '& .card-icon-1': {
//                                         transform: 'scale(1.1) rotate(-8deg)',
//                                         background: 'rgba(124, 77, 255, 0.25)',
//                                     }
//                                 }
//                             }}
//                         >
//                             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
//                                 <Box
//                                     className="card-icon-1"
//                                     sx={{
//                                         p: 1.5,
//                                         borderRadius: '16px',
//                                         bgcolor: 'rgba(124, 77, 255, 0.12)',
//                                         color: '#7c4dff',
//                                         display: 'flex',
//                                         alignItems: 'center',
//                                         justifyContent: 'center',
//                                         transition: 'all 0.3s ease',
//                                     }}
//                                 >
//                                     <LibraryBooksIcon sx={{ fontSize: 26 }} />
//                                 </Box>
//                             </Box>
//                             <Box>
//                                 <Typography variant="h5" sx={{ fontWeight: 800, color: '#1a0e42', fontSize: { xs: '18px', md: '22px' }, mb: 1, letterSpacing: '-0.02em' }}>
//                                     Training Videos
//                                 </Typography>
//                                 <Typography sx={{ color: 'rgba(26, 14, 66, 0.75)', fontSize: '13px', lineHeight: 1.4, fontWeight: 500 }}>
//                                     Master the platform with step-by-step tutorials and interactive guides.
//                                 </Typography>
//                             </Box>
//                         </Box>
//                         <Box
//                             component={Link}
//                             to="/help?tab=help-videos"
//                             sx={{
//                                 flex: 1,
//                                 textDecoration: 'none',
//                                 borderTopLeftRadius: '12px',
//                                 borderTopRightRadius: '28px',
//                                 borderBottomLeftRadius: '0',
//                                 borderBottomRightRadius: '0',
//                                 overflow: 'hidden',
//                                 position: 'relative',
//                                 display: 'flex',
//                                 flexDirection: 'column',
//                                 justifyContent: 'space-between',
//                                 p: 3.5,
//                                 minHeight: { xs: '160px', sm: 'auto' },
//                                 background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.15) 0%, rgba(0, 229, 255, 0.05) 100%)',
//                                 border: '1px solid rgba(0, 229, 255, 0.15)',
//                                 transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
//                                 cursor: 'pointer',
//                                 '&:hover': {
//                                     flex: { xs: 1, sm: 1.25 },
//                                     background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.22) 0%, rgba(0, 229, 255, 0.1) 100%)',
//                                     borderColor: 'rgba(0, 229, 255, 0.35)',
//                                     boxShadow: '0 12px 30px rgba(0, 229, 255, 0.15)',
//                                     '& .card-icon-2': {
//                                         transform: 'scale(1.1) rotate(8deg)',
//                                         background: 'rgba(0, 229, 255, 0.25)',
//                                     }
//                                 }
//                             }}
//                         >
//                             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
//                                 <Box
//                                     className="card-icon-2"
//                                     sx={{
//                                         p: 1.5,
//                                         borderRadius: '16px',
//                                         bgcolor: 'rgba(0, 229, 255, 0.12)',
//                                         color: '#00bcd4',
//                                         display: 'flex',
//                                         alignItems: 'center',
//                                         justifyContent: 'center',
//                                         transition: 'all 0.3s ease',
//                                     }}
//                                 >
//                                     <PlayIcon style={{ fontSize: 26 }} />
//                                 </Box>
//                             </Box>
//                             <Box>
//                                 <Typography variant="h5" sx={{ fontWeight: 800, color: '#004854', fontSize: { xs: '18px', md: '22px' }, mb: 1, letterSpacing: '-0.02em' }}>
//                                     Help Videos
//                                 </Typography>
//                                 <Typography sx={{ color: 'rgba(0, 72, 84, 0.75)', fontSize: '13px', lineHeight: 1.4, fontWeight: 500 }}>
//                                     Quick visual answers to frequently asked questions and troubleshooting.
//                                 </Typography>
//                             </Box>
//                         </Box>
//                     </Box>
//                     {/* RIGHT SIDE: Two Circular Icon Buttons with Connector Lines */}
//                     <Box
//                         sx={{
//                             display: { xs: 'none', md: 'flex' },
//                             flexDirection: 'column',
//                             gap: 3,
//                             justifyContent: 'center',
//                             alignItems: 'flex-start',
//                             flexGrow: 1,
//                             width: 'auto',
//                             mt: 0,
//                         }}
//                     >
//                         <Tooltip title="Community Forum" placement="left">
//                             <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'flex-start' }}>
//                                 <Box sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1, height: '2px', background: 'linear-gradient(270deg, rgba(124, 77, 255, 0.2), rgba(124, 77, 255, 0.8))', mr: 1.5 }} />
//                                 <IconButton
//                                     sx={{
//                                         width: 54,
//                                         height: 54,
//                                         backgroundColor: 'rgba(255, 255, 255, 0.8)',
//                                         backdropFilter: 'blur(8px)',
//                                         border: '1px solid rgba(0, 0, 0, 0.08)',
//                                         color: '#4b5563',
//                                         transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
//                                         '&:hover': {
//                                             backgroundColor: 'rgba(124, 77, 255, 0.08)',
//                                             borderColor: 'rgba(124, 77, 255, 0.3)',
//                                             color: '#7c4dff',
//                                             transform: 'translateX(3px)',
//                                             boxShadow: '0 10px 20px rgba(124, 77, 255, 0.1)'
//                                         }
//                                     }}
//                                 >
//                                     <ForumIcon sx={{ fontSize: 20 }} />
//                                 </IconButton>
//                             </Box>
//                         </Tooltip>

//                         <Tooltip title="Live Support" placement="left">
//                             <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'flex-start' }}>
//                                 <Box sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1, height: '2px', background: 'linear-gradient(270deg, rgba(124, 77, 255, 0.2), rgba(124, 77, 255, 0.8))', mr: 1.5 }} />
//                                 <IconButton
//                                     sx={{
//                                         width: 54,
//                                         height: 54,
//                                         backgroundColor: 'rgba(255, 255, 255, 0.8)',
//                                         backdropFilter: 'blur(8px)',
//                                         border: '1px solid rgba(0, 0, 0, 0.08)',
//                                         color: '#4b5563',
//                                         transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
//                                         '&:hover': {
//                                             backgroundColor: 'rgba(124, 77, 255, 0.08)',
//                                             borderColor: 'rgba(124, 77, 255, 0.3)',
//                                             color: '#7c4dff',
//                                             transform: 'translateX(3px)',
//                                             boxShadow: '0 10px 20px rgba(124, 77, 255, 0.1)'
//                                         }
//                                     }}
//                                 >
//                                     <SupportAgentIcon sx={{ fontSize: 20 }} />
//                                 </IconButton>
//                             </Box>
//                         </Tooltip>
//                     </Box>
//                 </Box>
//             </Box>
//         </Box>
//     );
// }