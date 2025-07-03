import React, { useCallback, useEffect, useState, useRef, useMemo } from "react";
import { Box } from "@mui/material";
import CallRecorderScreen from "./CallRecorderScreen";
import GridHeader from "./GridHeader";
import CallTable from "./CallTable";
import CallLogDrawer from "./SideBar";
import CallLogDetailsSidebar from "./DetailSideBar";
import { useMultiToggle } from "../../hooks/useHooks";
import { useCallLog } from "../../context/UseCallLog";
import EditCallLogDrawer from "./EditCallLog";
import ConfirmBox from "./ConfirmBox";
import PostCallReviewForm from "./PostCallReview";
import { createCallLogMap } from "../../utils/callLogUtils";
import { appBarHeight } from "../../libs/data";
import { useLocation, useNavigate } from "react-router-dom";
import FeedbackModal from "./FeedBackModal";
import AcceptCallModal from "./AcceptCallModal";
import CallLogApi from "../../../apis/CallLogApiController";
import debounce from "lodash/debounce";
import CenteredCircularLoader from "./Loading";
import { useAuth } from "../../context/UseAuth";
import withNotification from "./../../hoc/withNotification";
import { ExcelReportCallog } from "../../utils/ExcelReportDowload";

const CallLogManagementApp = ({ showNotification }) => {
  const STORAGE_KEYS = {
    RECORDING_TIME: "call_recording_time",
    CURRENT_CALL: "current_call_data",
    IS_PAUSED: "call_is_paused",
    PAUSED_DURATION: "call_paused_duration",
    PAUSE_START_TIME: "call_pause_start_time",
    SLIDERS_STATE: "call_sliders_state",
    CONCURRENT_CALL: "concurrent_call_data",
    CALL_START_TIME: "call_start_timestamp",
  };

  // --- STATE MANAGEMENT --- //
  const [recordingTime, setRecordingTime] = useState(() => {
    const savedTime = localStorage.getItem(STORAGE_KEYS.RECORDING_TIME);
    return savedTime ? parseInt(savedTime, 10) : 0;
  });

  const { endCall, AcceptQueueCall, CurrentCall, setCurrentCall, startCall, setCallLog, callLog, PauseCall, ResumeCall, isFilterActiveRef } = useCallLog();
  const timerRef = useRef(null);

  // Use stable references for component IDs to prevent unnecessary re-rendering
  const sidebarKey = useRef(Date.now()).current;
  const editDrawerKey = useRef(Date.now()).current;
  const [isLoading, setIsLoading] = useState(false);
  // Load slider state from localStorage with a more stable approach
  const [sliders, toggleSlider] = useMultiToggle(() => {
    const savedSliders = localStorage.getItem(STORAGE_KEYS.SLIDERS_STATE);
    return savedSliders
      ? JSON.parse(savedSliders)
      : {
        addMode: false,
        editMode: false,
        dialogMode: false,
        recordMode: false,
        detailMode: false,
      };
  });

  const { user } = useAuth();

  const [isPaused, setIsPaused] = useState(() => {
    const savedPaused = localStorage.getItem(STORAGE_KEYS.IS_PAUSED);
    return savedPaused ? JSON.parse(savedPaused) : false;
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pendingCallId, setPendingCallId] = useState(null);

  const [pausedDuration, setPausedDuration] = useState(() => {
    const savedDuration = localStorage.getItem(STORAGE_KEYS.PAUSED_DURATION);
    return savedDuration ? parseFloat(savedDuration) : 0;
  });

  const pauseStartTimeRef = useRef(null);

  // Use a stable reference for the concurrent call state to prevent flickering
  const concurrentCallRef = useRef(null);
  const [conCurrentCall, setConCurrentCall] = useState(() => {
    const savedConcurrentCall = localStorage.getItem(STORAGE_KEYS.CONCURRENT_CALL);
    const parsedCall = savedConcurrentCall ? JSON.parse(savedConcurrentCall) : null;
    if (parsedCall) concurrentCallRef.current = parsedCall;
    return parsedCall;
  });

  const [postReview, setPostReview] = useState(false);
  const [feedBackModal, setFeedBackModal] = useState(null);
  const [acceptModal, setAcceptModal] = useState(false);
  const [acceptCallId, setAcceptCallId] = useState(false);

  // filters states
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("team");
  const [companyStatus, setCompanyStatus] = useState("");
  const [filterState, setFilterState] = useState({
    dateRange: { startDate: "", endDate: "" },
    filterTargetField: "",
  });
  const [status, setStatus] = useState("");
  const [filteredCallLog, setFilteredCallLog] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // ✨ NEW: Enhanced time calculation function
  const calculateElapsedTime = useCallback(() => {
    if (!CurrentCall?.sr) return 0;

    const startTimestamp = localStorage.getItem(STORAGE_KEYS.CALL_START_TIME);
    if (!startTimestamp) return recordingTime; // Fallback to current recordingTime

    const now = new Date().getTime();
    const startTime = parseInt(startTimestamp, 10);
    const totalElapsed = Math.floor((now - startTime) / 1000);

    let totalPausedTime = pausedDuration;

    // If currently paused, add current pause duration
    if (isPaused && pauseStartTimeRef.current) {
      const currentPauseDuration = Math.floor((now - pauseStartTimeRef.current) / 1000);
      totalPausedTime += currentPauseDuration;
    }

    return Math.max(0, totalElapsed - totalPausedTime);
  }, [CurrentCall?.sr, pausedDuration, isPaused, recordingTime]);

  // ✨ NEW: Handle visibility change to recalculate time when tab becomes active
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && CurrentCall?.sr && !isPaused) {
        const accurateTime = calculateElapsedTime();
        setRecordingTime(accurateTime);
        localStorage.setItem(STORAGE_KEYS.RECORDING_TIME, accurateTime.toString());
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [CurrentCall?.sr, isPaused, calculateElapsedTime]);

  // ✨ NEW: Handle window focus as additional safeguard
  useEffect(() => {
    const handleFocus = () => {
      if (CurrentCall?.sr && !isPaused) {
        const accurateTime = calculateElapsedTime();
        setRecordingTime(accurateTime);
        localStorage.setItem(STORAGE_KEYS.RECORDING_TIME, accurateTime.toString());
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [CurrentCall?.sr, isPaused, calculateElapsedTime]);

  // --- PERSISTENCE EFFECTS --- //
  // Save sliders state to localStorage when it changes, using a more efficient approach
  useEffect(() => {
    const slidersJSON = JSON.stringify(sliders);
    localStorage.setItem(STORAGE_KEYS.SLIDERS_STATE, slidersJSON);
  }, [sliders]);

  // Batch localStorage updates to reduce performance impact
  const updateLocalStorage = useCallback((updates) => {
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        localStorage.removeItem(key);
      } else if (typeof value === "object") {
        localStorage.setItem(key, JSON.stringify(value));
      } else {
        localStorage.setItem(key, value.toString());
      }
    });
  }, []);

  // Save recording time to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RECORDING_TIME, recordingTime.toString());
  }, [recordingTime]);

  // Save current call to localStorage when it changes
  useEffect(() => {
    if (CurrentCall) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_CALL, JSON.stringify(CurrentCall));
    }
  }, [CurrentCall]);

  // Save paused state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.IS_PAUSED, JSON.stringify(isPaused));
  }, [isPaused]);

  // Save paused duration to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PAUSED_DURATION, pausedDuration.toString());
  }, [pausedDuration]);

  // Save pause start time to localStorage when it changes
  useEffect(() => {
    if (pauseStartTimeRef.current instanceof Date) {
      localStorage.setItem(STORAGE_KEYS.PAUSE_START_TIME, pauseStartTimeRef.current.getTime().toString());
    } else {
      localStorage.removeItem(STORAGE_KEYS.PAUSE_START_TIME);
    }
  }, [isPaused]);

  // Save concurrent call to localStorage when it changes, with debouncing
  const debouncedSetConCurrentCall = useCallback(
    debounce((call) => {
      if (call) {
        localStorage.setItem(STORAGE_KEYS.CONCURRENT_CALL, JSON.stringify(call));
        concurrentCallRef.current = call;
      } else {
        localStorage.removeItem(STORAGE_KEYS.CONCURRENT_CALL);
        concurrentCallRef.current = null;
      }
    }, 100),
    []
  );

  useEffect(() => {
    debouncedSetConCurrentCall(conCurrentCall);
  }, [conCurrentCall, debouncedSetConCurrentCall]);

  // Restore current call after page loads
  useEffect(() => {
    const savedCurrentCall = localStorage.getItem(STORAGE_KEYS.CURRENT_CALL);
    if (savedCurrentCall && !CurrentCall) {
      try {
        const parsedCall = JSON.parse(savedCurrentCall);
        setCurrentCall(parsedCall);
      } catch (error) {
        console.error("Error parsing saved current call:", error);
        localStorage.removeItem(STORAGE_KEYS.CURRENT_CALL);
      }
    }

    // Initialize pauseStartTimeRef
    const savedPauseStartTime = localStorage.getItem(STORAGE_KEYS.PAUSE_START_TIME);
    if (savedPauseStartTime) {
      pauseStartTimeRef.current = new Date(parseInt(savedPauseStartTime, 10));
    }
  }, []);

  // Handle timer resumption after page refresh
  useEffect(() => {
    const savedCallStartTime = localStorage.getItem(STORAGE_KEYS.CALL_START_TIME);

    // If we have an active call (not paused) and a start time, recalculate elapsed time
    if (CurrentCall?.sr && !isPaused && savedCallStartTime) {
      // ✨ ENHANCED: Use the new calculation method
      const accurateElapsedTime = calculateElapsedTime();
      setRecordingTime(accurateElapsedTime);

      // Restart the timer
      startTimer();
    }

    // If the call was paused during refresh, restore pause start time
    if (isPaused && CurrentCall?.sr) {
      const savedPauseStartTime = localStorage.getItem(STORAGE_KEYS.PAUSE_START_TIME);
      if (savedPauseStartTime) {
        pauseStartTimeRef.current = new Date(parseInt(savedPauseStartTime, 10));
      }
    }
  }, [CurrentCall, calculateElapsedTime]);

  const clearFilters = () => {
    setSearchQuery("");
    setViewMode("team");
    setCompanyStatus("");
    setStatus("");
    navigate({ pathname: location.pathname }, { replace: true });
    debouncedFilterCallLog({
      endDate: "",
      startDate: "",
      statusId: "",
      projectId: "",
      filter: "",
      searchTerm: "",
    });
    setFilterState({
      dateRange: { startDate: "", endDate: "" },
      filterTargetField: "",
    })
  };

  const clearFiltersState = () => {
    setSearchQuery("");
    setViewMode("team");
    setCompanyStatus("");
    setStatus("");
    setFilterState({
      dateRange: { startDate: "", endDate: "" },
      filterTargetField: "",
    })
    navigate({ pathname: location.pathname }, { replace: true });
  }

  const getQueryParams = (search) => {
    const params = new URLSearchParams(search);
    return {
      queue: params.get("queue"),
    };
  };

  const debouncedFilterCallLog = useCallback(
    debounce(async (filters) => {
      try {
        setIsLoading(true); // 🔁 Start loading
        const data = await CallLogApi.getCallLogs({
          endDate: filters.endDate || "",
          startDate: filters.startDate || "",
          statusId: filters.statusId || "",
          projectId: filters.projectId || "",
          filter: filters.filter || "",
          searchTerm: filters.searchTerm || "",
        });
        setCallLog(data?.rd);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); // ✅ Stop loading
      }
    }, 500),
    []
  );

  // URL parameter management
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (viewMode) params.set("view", viewMode);
    if (companyStatus) params.set("companyStatus", companyStatus);
    if (status && status !== "all") params.set("status", status);
    if (filterState?.filterTargetField) params.set("target", filterState.filterTargetField);
    if (filterState?.dateRange?.startDate) params.set("start", filterState.dateRange.startDate);
    if (filterState?.dateRange?.endDate) params.set("end", filterState.dateRange.endDate);

    // Use replace to avoid adding to history
    navigate({ pathname: location.pathname, search: params.toString() }, { replace: true });
  }, [searchQuery, viewMode, companyStatus, filterState, status, navigate, location.pathname]);

  // Load URL parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const savedSearch = params.get("search") || "";
    const savedView = params.get("view") || "team";
    const savedCompanyStatus = params.get("companyStatus") || "";
    const savedStatus = params.get("status") || "";
    const savedTarget = params.get("target") || "";
    const start = params.get("start");
    const end = params.get("end");

    setSearchQuery(savedSearch);
    setViewMode(savedView);
    setCompanyStatus(savedCompanyStatus);
    setStatus(savedStatus);
    setFilterState({
      filterTargetField: savedTarget,
      dateRange: {
        startDate: start,
        endDate: end,
      },
    });
  }, []);

  const isFilterActive = useMemo(() => {
    return searchQuery || companyStatus || (status && status !== "all") || filterState?.filterTargetField || filterState?.dateRange?.startDate || filterState?.dateRange?.endDate;
  }, [searchQuery, companyStatus, status, filterState]);

  useEffect(() => {
    isFilterActiveRef.current = !!isFilterActive;
  }, [isFilterActive]);

  // Filter data on criteria change
  useEffect(() => {
    const filters = {
      endDate: filterState?.dateRange?.endDate || "",
      startDate: filterState?.dateRange?.startDate || "",
      statusId: status || "",
      projectId: companyStatus || "",
      filter: filterState?.filterTargetField || "",
      searchTerm: searchQuery || "",
    };

    debouncedFilterCallLog(filters);
    return () => {
      debouncedFilterCallLog.cancel();
    };
  }, [searchQuery, companyStatus, status, filterState, debouncedFilterCallLog]);

  const removeQueueParam = () => {
    const { queue, ...params } = getQueryParams(location.search);
    const newParams = new URLSearchParams(params);
    navigate({ search: newParams.toString() });
  };

  // Filters props
  const filterProps = {
    searchQuery,
    setsearchQuery: setSearchQuery,
    Status: status,
    SetStatus: setStatus,
    viewMode,
    setViewMode,
    filterState,
    setFilterState,
    CompanyStatus: companyStatus,
    SetCompanyStatus: setCompanyStatus,
  };

  const memoizedFilteredCalls = useMemo(() => {
    if (!callLog) return [];
    let filtered = [...callLog];
    if (viewMode === "normal" && user) {
      const loggedUser = `${user.firstname} ${user.lastname}`.toLowerCase();
      filtered = filtered.filter(
        (call) =>
          (call.receivedBy && call.receivedBy.toLowerCase() === loggedUser) ||
          (call.AssignedEmpName && call.AssignedEmpName.toLowerCase() === loggedUser)
      );
    }
    return filtered;
  }, [viewMode, callLog, user]);

  useEffect(() => {
    setFilteredCallLog(memoizedFilteredCalls);
  }, [memoizedFilteredCalls]);

  const callLogMap = useMemo(() => createCallLogMap(callLog), [callLog]);

  const handleToggleRecording = useCallback(() => {
    if (!sliders.recordMode) {
      toggleSlider("recordMode");
    }
  }, [sliders.recordMode, toggleSlider]);

  const handleRecordModeClose = useCallback(() => {
    toggleSlider("recordMode");
    setCurrentCall(null);
  }, [toggleSlider]);

  const handlePauseRecording = useCallback(async () => {
    setIsPaused(true);
    await PauseCall(CurrentCall?.sr);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    pauseStartTimeRef.current = new Date();
    localStorage.setItem(STORAGE_KEYS.PAUSE_START_TIME, pauseStartTimeRef.current.getTime().toString());
  }, [CurrentCall?.sr, PauseCall]);

  const handleResumeRecording = useCallback(async () => {
    setIsPaused(false);
    await ResumeCall(CurrentCall?.sr);
    if (pauseStartTimeRef.current) {
      const pauseEndTime = new Date();
      const pauseTime = (pauseEndTime - pauseStartTimeRef.current) / 1000;
      setPausedDuration((prev) => {
        const newDuration = prev + pauseTime;
        localStorage.setItem(STORAGE_KEYS.PAUSED_DURATION, newDuration.toString());
        return newDuration;
      });
      pauseStartTimeRef.current = null;
      localStorage.removeItem(STORAGE_KEYS.PAUSE_START_TIME);
    }
    startTimer();
  }, [CurrentCall?.sr, ResumeCall]);

  // ✨ ENHANCED: Modified startTimer to use accurate time calculation
  const startTimer = useCallback(() => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        // Use the enhanced calculation method
        const accurateTime = calculateElapsedTime();
        setRecordingTime(accurateTime);
      }, 1000);
    }
  }, [calculateElapsedTime]);

  const handleStartRecording = useCallback(() => {
    setRecordingTime(0);
    setIsPaused(false);
    setPausedDuration(0);

    // Save initial call start time for accurate timing after refresh
    const startTimestamp = new Date().getTime();
    updateLocalStorage({
      [STORAGE_KEYS.CALL_START_TIME]: startTimestamp.toString(),
      [STORAGE_KEYS.PAUSED_DURATION]: "0",
      [STORAGE_KEYS.PAUSE_START_TIME]: null,
    });

    startTimer();
  }, [startTimer, updateLocalStorage]);

  const handleEndCall = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setRecordingTime(0);
    endCall(CurrentCall?.sr, pausedDuration);
    setCurrentCall(null);

    // Clear all call-related localStorage items
    updateLocalStorage({
      [STORAGE_KEYS.RECORDING_TIME]: null,
      [STORAGE_KEYS.CURRENT_CALL]: null,
      [STORAGE_KEYS.IS_PAUSED]: null,
      [STORAGE_KEYS.PAUSED_DURATION]: null,
      [STORAGE_KEYS.PAUSE_START_TIME]: null,
      [STORAGE_KEYS.CALL_START_TIME]: null,
    });

    // Use setTimeout to ensure UI is updated after state changes
    setTimeout(() => {
      setCurrentCall(null);
      setConCurrentCall(null);
    }, 100);
  }, [CurrentCall?.sr, endCall, pausedDuration, setCurrentCall, updateLocalStorage]);

  const onRowClick = useCallback(
    (rowData) => {
      if (!rowData?.sr) return;

      const selectedData = callLogMap[rowData.sr];
      if (!selectedData) return;

      setCurrentCall(selectedData);
      if (!sliders.recordMode) {
        toggleSlider("recordMode");
      }
    },
    [callLogMap, toggleSlider, sliders.recordMode]
  );

  const handleEditAndStartCall = useCallback((id) => {
    setPendingCallId(id);
    setIsDialogOpen(true);
  }, []);

  const handleConfirmStartCall = useCallback(async () => {
    const result = await startCall(pendingCallId);

    if (!result.success) {
      console.error("Failed to confirm and start call:", result.error?.message);
      showNotification(`${result.error?.message}`, "error");
      setIsDialogOpen(false);
      return;
    }

    if (!sliders.recordMode) {
      handleToggleRecording();
    }
    handleStartRecording();
    showNotification("Call started", "success");
    setIsDialogOpen(false);
  }, [pendingCallId, sliders.recordMode, handleToggleRecording, handleStartRecording, setIsDialogOpen, startCall]);

  const onStartCall = useCallback(
    async (callId) => {
      const result = await startCall(callId);

      if (!result.success) {
        console.error("Failed to start call:", result.error?.message);
        showNotification(`${result.error?.message}`, "error");
        return;
      }
      showNotification("Call started", "success");
      handleStartRecording();
    },
    [startCall, handleStartRecording]
  );

  const handleCancel = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      debouncedSetConCurrentCall.cancel();
    };
  }, [debouncedSetConCurrentCall]);

  // Handle queue parameter in URL
  useEffect(() => {
    let timeout;
    const { queue } = getQueryParams(location.search);
    if (queue === "1") {
      handleToggleRecording();
      timeout = setTimeout(() => {
        removeQueueParam();
      }, 500);
    }
    return () => clearTimeout(timeout);
  }, [location.search, navigate, handleToggleRecording, removeQueueParam]);

  const onEditToggle = useCallback(() => {
    toggleSlider("editMode");
    toggleSlider("detailMode");
  }, [toggleSlider]);

  const addConCurrentCall = useCallback(
    (data) => {
      setConCurrentCall(data);
      // Only toggle after the data is set
      setTimeout(() => {
        toggleSlider("addMode");
      }, 10);
    },
    [toggleSlider]
  );

  const onCallAnalysis = useCallback(
    (data) => {
      if (!data?.sr) return;

      const selectedData = filteredCallLog.find((item) => item?.sr === data?.sr);
      if (!selectedData) return;

      setCurrentCall({ ...selectedData, isAnalysis: true });
      toggleSlider("detailMode");
    },
    [filteredCallLog, toggleSlider]
  );

  const handleAcceptCall = useCallback((id) => {
    setAcceptCallId(id);
    setAcceptModal(true);
  }, []);

  const handleAcceptApiCall = useCallback(() => {
    AcceptQueueCall(acceptCallId);
    setAcceptCallId(null);
    setAcceptModal(false);
  }, [acceptCallId, AcceptQueueCall]);

  const contentHeight = `100vh`;

  // Ensure data is saved before page unloads
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (CurrentCall?.sr) {
        updateLocalStorage({
          [STORAGE_KEYS.RECORDING_TIME]: recordingTime.toString(),
          [STORAGE_KEYS.CURRENT_CALL]: CurrentCall,
          [STORAGE_KEYS.IS_PAUSED]: isPaused,
          [STORAGE_KEYS.PAUSED_DURATION]: pausedDuration.toString(),
          [STORAGE_KEYS.SLIDERS_STATE]: sliders,
        });

        if (pauseStartTimeRef.current instanceof Date) {
          localStorage.setItem(STORAGE_KEYS.PAUSE_START_TIME, pauseStartTimeRef.current.getTime().toString());
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [CurrentCall, recordingTime, isPaused, pausedDuration, sliders, updateLocalStorage]);

  const callStatusValue = {
    currentCallId: CurrentCall?.sr,
    duration: recordingTime,
    isRunning: Boolean(CurrentCall?.sr && timerRef.current),
    actualElapsedTime: CurrentCall?.sr ? calculateElapsedTime() : 0,
  };

  const Dowloadexcel = async () => {
    try {
      await ExcelReportCallog(filteredCallLog);
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoading && !callLog?.length) {
    return <CenteredCircularLoader />;
  }

  return (
    <Box sx={{ height: contentHeight, display: "flex", flexDirection: "column", py: 2, bgcolor: "white" }}>
      {feedBackModal !== null && <FeedbackModal id={feedBackModal} setFeedBackModal={setFeedBackModal} />}

      {/* <CallRecorderScreen isPaused={isPaused} onPause={handlePauseRecording} onResume={handleResumeRecording} onStartCall={onStartCall} CurrentCall={CurrentCall} onEndCall={handleEndCall} onCloseRecord={handleRecordModeClose} isRecordingExpanded={sliders?.recordMode} recordingTime={recordingTime} onAddConCurrentCall={addConCurrentCall} onEditCall={handleAcceptCall} onEditToggle={() => toggleSlider("editMode")} onDetailsToggle={() => toggleSlider("detailMode")} setPostReview={setPostReview} callStatusValue={callStatusValue} /> */}

      <Box sx={{ mt: 0, transition: "0.3s ease-in-out" }}>
        <GridHeader isFilterData={filteredCallLog?.length > 0 } onExcel={Dowloadexcel} onClearAll={clearFilters} {...filterProps} callStatusValue={callStatusValue} onAdd={() => toggleSlider("addMode")} />
      </Box>

      <Box
        sx={{
          flex: sliders?.recordMode ? "auto" : 1,
          transition: "height 0.3s ease-in-out",
          // overflowX: "auto",
        }}
      >
        <CallTable key={filterProps} RecordMode={sliders?.recordMode} setFeedBackModal={setFeedBackModal} onCallAnalysis={onCallAnalysis} onRowClick={onRowClick} callLogs={filteredCallLog} callStatusValue={callStatusValue} onEditCall={handleEditAndStartCall} />
      </Box>

      {/* <EditCallLogDrawer key={`edit-${editDrawerKey}-${CurrentCall?.sr || "none"}`} open={sliders?.editMode} onClose={() => toggleSlider("editMode")} callData={CurrentCall} /> */}

      <CallLogDrawer onclearFilters={clearFiltersState} callStatusValue={callStatusValue} key={`sidebar-${sidebarKey}-${conCurrentCall?.sr || "none"}`} data={conCurrentCall || concurrentCallRef.current} open={sliders?.addMode} StartRecording={handleStartRecording} onRecordToggle={handleToggleRecording} onClose={() => toggleSlider("addMode")} />

      {/* <CallLogDetailsSidebar onEditToggle={onEditToggle} key={`details-${CurrentCall?.sr || "none"}`} callLogData={CurrentCall} open={sliders?.detailMode} onClose={() => toggleSlider("detailMode")} /> */}

      <ConfirmBox handleCancel={handleCancel} handleConfirmStartCall={handleConfirmStartCall} isDialogOpen={isDialogOpen} />

      <PostCallReviewForm open={postReview} onClose={() => setPostReview(false)} data={CurrentCall} />

      <AcceptCallModal isDialogOpen={acceptModal} handleConfirmStartCall={handleAcceptApiCall} handleCancel={() => setAcceptModal(false)} />
    </Box>
  );
};

export default withNotification(CallLogManagementApp);