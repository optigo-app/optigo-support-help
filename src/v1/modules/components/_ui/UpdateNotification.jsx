import { useEffect, useState } from "react";
import { Box, Typography, IconButton, Fade, Divider, Button } from "@mui/material";
import { X } from "lucide-react";
import AutoModeRoundedIcon from "@mui/icons-material/AutoModeRounded";
import { saveUpdate, getSavedUpdate, clearSavedUpdate } from "../../utils/idbUtils";

export default function UpdateNotification() {
  const [open, setOpen] = useState(false);
  const [storedUpdate, setStoredUpdate] = useState(null);

    useEffect(() => {
    const currentAppVersion = window.__APP_VERSION__;
    console.log("🚀 ~ UpdateNotification ~ currentAppVersion:", currentAppVersion)
    getSavedUpdate().then((saved) => {
      console.log("🚀 ~ UpdateNotification ~ saved:", saved)
      if (saved && saved.version !== currentAppVersion) {
        setStoredUpdate(saved);
        setOpen(true);
      } else {
        clearSavedUpdate();
      }
    });
  }, []);

  useEffect(() => {
    const handleNewVersion = async (e) => {
      const { version } = e.detail;
      console.log("🔥 New version available:", version);

      await clearSavedUpdate(); 
      await saveUpdate({
        version,
        notes: "A new update is available with performance and UI improvements.",
        date: new Date().toISOString(),
      });

      setStoredUpdate({ version });
      setOpen(true);
    };

    window.addEventListener("NEW_VERSION_AVAILABLE", handleNewVersion);
    return () =>
      window.removeEventListener("NEW_VERSION_AVAILABLE", handleNewVersion);
  }, []);

  const handleClose = async () => {
    setOpen(false);
    await clearSavedUpdate(); 
  };

  const handleUpdate = async () => {
    await clearSavedUpdate();
    await new Promise((r) => setTimeout(r, 200)); 
    window.location.reload();
  };

  if (!open) return null;

  return (
    <Fade in={open}>
      <Box
        sx={{
          position: "fixed",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          bgcolor: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0,0,0,0.05)",
          display: "flex",
          flexDirection: "column",
          minWidth: "220px",
          maxWidth: "90vw",
          zIndex: 1500,
          overflow: "hidden",
          animation: "slideDown 0.3s ease-out",
        }}
      >
        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 2,
            py: 1.2,
          }}
        >
          <Box
            sx={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <AutoModeRoundedIcon fontSize="medium" color="success" />
          </Box>

          <Typography
            sx={{
              flex: 1,
              fontSize: "14px",
              fontWeight: 600,
              color: "#1f2937",
            }}
          >
            Update available — version {storedUpdate?.version}
          </Typography>

          <IconButton
            size="small"
            onClick={handleClose}
            sx={{
              p: 0.5,
              color: "#9ca3af",
              "&:hover": { color: "#6b7280", bgcolor: "transparent" },
            }}
          >
            <X size={16} />
          </IconButton>
        </Box>

        {/* DIVIDER */}
        <Divider sx={{ bgcolor: "rgba(0,0,0,0.06)" }} />

        {/* DETAILS */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            px: 2,
            py: 1.2,
            backgroundColor: "#f9fafb",
          }}
        >
          <Box>
            <Typography
              sx={{
                flex: 1,
                fontSize: "13px",
                color: "#374151",
                mr: 1,
                pb: 1.5,
              }}
            >
              {storedUpdate?.notes || "Includes UI improvements and bug fixes for better experience."}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center", justifyContent: "flex-end", width: "100%" }}>
            <Button
              variant="contained"
              color="success"
              size="small"
              sx={{
                textTransform: "none",
                fontWeight: 500,
                fontSize: "13px",
                borderRadius: "10px",
                px: 1.5,
                py: 0.4,
                color: "#fff",
              }}
              onClick={handleUpdate}
            >
              Update
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{
                textTransform: "none",
                fontWeight: 500,
                fontSize: "13px",
                borderRadius: "10px",
                borderColor: "#d1d5db",
                color: "#4b5563",
                px: 1.5,
                py: 0.4,
                "&:hover": {
                  borderColor: "#9ca3af",
                  bgcolor: "transparent",
                },
              }}
              onClick={handleClose}
            >
              Hide for now
            </Button>
          </Box>
        </Box>
      </Box>
    </Fade>
  );
}














// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   IconButton,
//   LinearProgress,
//   Collapse,
// } from "@mui/material";
// import { X, CheckCircle2, ChevronDown } from "lucide-react";

// // --- IndexedDB Utility Functions ---
// const dbName = "AppUpdatesDB";
// const storeName = "updates";

// function openDatabase() {
//   return new Promise((resolve, reject) => {
//     const request = indexedDB.open(dbName, 1);

//     request.onupgradeneeded = (e) => {
//       const db = e.target.result;
//       if (!db.objectStoreNames.contains(storeName)) {
//         db.createObjectStore(storeName, { keyPath: "id" });
//       }
//     };

//     request.onsuccess = (e) => {
//       const db = e.target.result;

//       if (db.objectStoreNames.contains(storeName)) {
//         resolve(db);
//       } else {
//         db.close();
//         indexedDB.deleteDatabase(dbName);
//         reject(
//           new Error(
//             "Database initialized without the required store, retrying..."
//           )
//         );
//       }
//     };

//     request.onblocked = () => {
//       console.warn("IndexedDB open request is blocked by another connection.");
//     };

//     request.onerror = (e) => {
//       console.error("IndexedDB open error:", e);
//       reject(e);
//     };
//   });
// }

// async function saveUpdate(update) {
//   const db = await openDatabase();
//   const tx = db.transaction(storeName, "readwrite");
//   tx.objectStore(storeName).put({ id: "latest", ...update });
//   return new Promise((resolve, reject) => {
//     tx.oncomplete = () => resolve(true);
//     tx.onerror = (e) => reject(e);
//   });
// }

// async function getSavedUpdate() {
//   const db = await openDatabase();
//   const tx = db.transaction(storeName, "readonly");
//   const store = tx.objectStore(storeName);
//   const req = store.get("latest");

//   return new Promise((resolve, reject) => {
//     req.onsuccess = () => resolve(req.result);
//     req.onerror = (err) => reject(err);
//   });
// }

// async function clearSavedUpdate() {
//   const db = await openDatabase();
//   const tx = db.transaction(storeName, "readwrite");
//   tx.objectStore(storeName).delete("latest");
//   return new Promise((resolve) => (tx.oncomplete = resolve));
// }

// export default function UpdateNotification({ latestVersion }) {
//   const [open, setOpen] = useState(false);
//   const [storedUpdate, setStoredUpdate] = useState(null);
//   const [expanded, setExpanded] = useState(false);
//   const [countdown, setCountdown] = useState(14);
//   const [progress, setProgress] = useState(100);

//   useEffect(() => {
//     getSavedUpdate().then((saved) => {
//       if (saved) {
//         setStoredUpdate(saved);
//         setOpen(true);
//       }
//     });
//   }, []);

//   useEffect(() => {
//     if (latestVersion) {
//       const currentVersion = "1.0.1";
//       if (latestVersion !== currentVersion) {
//         saveUpdate({ version: latestVersion, date: new Date().toISOString() });
//         setStoredUpdate({ version: latestVersion });
//         setOpen(true);
//       }
//     }
//   }, [latestVersion]);

//   useEffect(() => {
//     if (open && countdown > 0) {
//       const timer = setInterval(() => {
//         setCountdown((prev) => {
//           if (prev <= 1) {
//             handleRefresh();
//             return 0;
//           }
//           return prev - 1;
//         });
//         setProgress((prev) => prev - (100 / 14));
//       }, 1000);

//       return () => clearInterval(timer);
//     }
//   }, [open, countdown]);

//   const handleRefresh = async () => {
    // await clearSavedUpdate();
//     window.location.reload();
//   };

//   const handleClose = async () => {
//     setOpen(false);
//     await clearSavedUpdate();
//   };

//   const handleStop = () => {
//     setCountdown(0);
//     setProgress(0);
//   };

//   if (!open) return null;

//   return (
//     <Box
//       sx={{
//         position: "fixed",
//         top: 20,
//         left: "50%",
//         transform: "translateX(-50%)",
//         zIndex: 1300,
//         width: "auto",
//         minWidth: "320px",
//         maxWidth: "90vw",
//       }}
//     >
//       <Box
//         sx={{
//           bgcolor: "#ffffff",
//           borderRadius: "8px",
//           boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)",
//           overflow: "hidden",
//           animation: "slideDown 0.3s ease-out",
//           "@keyframes slideDown": {
//             from: {
//               opacity: 0,
//               transform: "translateY(-10px)",
//             },
//             to: {
//               opacity: 1,
//               transform: "translateY(0)",
//             },
//           },
//         }}
//       >
//         {/* Main Content */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: 1.5,
//             px: 2,
//             py: 1.5,
//           }}
//         >
//           {/* Icon */}
//           <CheckCircle2
//             size={18}
//             color="#10b981"
//             strokeWidth={2}
//             style={{ flexShrink: 0 }}
//           />

//           {/* Text */}
//           <Typography
//             sx={{
//               flex: 1,
//               fontSize: "14px",
//               fontWeight: 500,
//               color: "#1f2937",
//               letterSpacing: "-0.01em",
//             }}
//           >
//             Update available
//           </Typography>

//           {/* Actions */}
//           <IconButton
//             size="small"
//             onClick={() => setExpanded(!expanded)}
//             sx={{
//               p: 0.5,
//               color: "#9ca3af",
//               "&:hover": {
//                 color: "#6b7280",
//                 bgcolor: "transparent",
//               },
//             }}
//           >
//             <ChevronDown
//               size={16}
//               style={{
//                 transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
//                 transition: "transform 0.2s ease",
//               }}
//             />
//           </IconButton>

//           <IconButton
//             size="small"
//             onClick={handleClose}
//             sx={{
//               p: 0.5,
//               color: "#9ca3af",
//               "&:hover": {
//                 color: "#6b7280",
//                 bgcolor: "transparent",
//               },
//             }}
//           >
//             <X size={16} />
//           </IconButton>
//         </Box>

//         {/* Expanded Content */}
//         <Collapse in={expanded}>
//           <Box
//             sx={{
//               px: 2,
//               pb: 1.5,
//               pt: 0,
//               borderTop: "1px solid #f3f4f6",
//             }}
//           >
//             <Typography
//               sx={{
//                 fontSize: "13px",
//                 color: "#6b7280",
//                 mt: 1,
//               }}
//             >
//               This page will refresh in{" "}
//               <Box
//                 component="span"
//                 sx={{
//                   fontWeight: 600,
//                   color: "#1f2937",
//                 }}
//               >
//                 {countdown} seconds
//               </Box>
//               .{" "}
//               <Box
//                 component="span"
//                 onClick={handleStop}
//                 sx={{
//                   textDecoration: "underline",
//                   cursor: "pointer",
//                   "&:hover": { color: "#1f2937" },
//                 }}
//               >
//                 Click to stop
//               </Box>
//               .
//             </Typography>
//           </Box>
//         </Collapse>

//         {/* Progress Bar */}
//         <LinearProgress
//           variant="determinate"
//           value={progress}
//           sx={{
//             height: 2,
//             bgcolor: "transparent",
//             "& .MuiLinearProgress-bar": {
//               bgcolor: "#10b981",
//               transition: "transform 1s linear",
//             },
//           }}
//         />
//       </Box>
//     </Box>
//   );
// }
