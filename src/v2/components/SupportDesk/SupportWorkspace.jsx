import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Box, Typography, Rating } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SupportTopBar from "./SupportTopBar";
import SupportHeader from "./SupportHeader";
import SupportSidebar from "./SupportSidebar";
import SupportMessageList from "./SupportMessageList";
import MessageComposer from "./common/MessageComposer";
import CallLogDrawer from "../../modules/components/CallLogger/SideBar";
import FeedbackModal from "../../modules/components/CallLogger/FeedBackModal";
import { PopoverFeedbackCard } from "../../modules/components/CallLogger/PopoverFeedbackCard ";
import { useCallLog } from "../../modules/context/UseCallLog";
import { useAuth } from "../../modules/context/UseAuth";
import { useSocketEvent } from "../../modules/hooks/useSocketListener";
import { callStreamService } from "../../services/callStreamService";
import { commentUpdates$ } from "../../rxjs/commentEvents";
import CallLogApi from "../../apis/CallLogApiController";
import debounce from "lodash/debounce";

export default function SupportWorkspace() {
  const { user } = useAuth();
  const {
    callLog,
    setCallLog,
    addComment,
    clearCallUnread,
    refreshList,
    setrefreshList,
    masterData,
  } = useCallLog();

  const [threads, setThreads] = useState([]);
  const [activeThread, setActiveThread] = useState(null);
  const [activeThreadId, setActiveThreadId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [feedBackModalCallId, setFeedBackModalCallId] = useState(null);
  const [feedbackPopover, setFeedbackPopover] = useState(null);

  // Filter States matching CallLogger
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState("");
  const [filterState, setFilterState] = useState({
    dateRange: { startDate: "", endDate: "" },
    filterTargetField: "",
  });
  const [tempDateRange, setTempDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  // Current filters ref for instant re-fetch on Add/Update
  const filtersRef = useRef({
    endDate: "",
    startDate: "",
    statusId: "",
    projectId: "",
    filter: "",
    searchTerm: "",
  });

  // 1. Fetch Call Logs from API
  const fetchCallLogs = useCallback(
    async (filters, showLoading = false) => {
      if (showLoading) setIsLoading(true);
      try {
        const data = await CallLogApi.getCallLogs(filters);
        const list =
          data?.rd ||
          data?.Data?.rd ||
          data?.data?.rd ||
          (Array.isArray(data) ? data : []);
        if (setCallLog) setCallLog(list);
        callStreamService.setRawCalls(list);
      } catch (error) {
        console.error("Failed to fetch call logs:", error);
      } finally {
        if (showLoading) setIsLoading(false);
      }
    },
    [setCallLog]
  );

  const debouncedFilterCallLog = useMemo(
    () =>
      debounce((filters) => {
        const isEmpty = callStreamService.rawCalls$.getValue().length === 0;
        fetchCallLogs(filters, isEmpty);
      }, 350),
    [fetchCallLogs]
  );

  const prevSearchRef = useRef(searchQuery);

  useEffect(() => {
    const filters = {
      endDate: filterState?.dateRange?.endDate || "",
      startDate: filterState?.dateRange?.startDate || "",
      statusId: status && status !== "all" ? status : "",
      projectId: "",
      filter: filterState?.filterTargetField || "",
      searchTerm: searchQuery || "",
    };
    filtersRef.current = filters;

    if (prevSearchRef.current !== searchQuery) {
      prevSearchRef.current = searchQuery;
      debouncedFilterCallLog(filters);
    } else {
      // Direct click on status rail / date filter -> instant fetch with loading!
      fetchCallLogs(filters, true);
    }

    return () => {
      debouncedFilterCallLog.cancel();
    };
  }, [searchQuery, status, filterState, debouncedFilterCallLog, fetchCallLogs]);

  // Re-fetch quietly in background when refreshList or external updates trigger
  useEffect(() => {
    fetchCallLogs(filtersRef.current, false);
  }, [refreshList, fetchCallLogs]);

  // Sync callLog from UseCallLog on initial hydration if not yet loaded in callStreamService
  useEffect(() => {
    if (
      Array.isArray(callLog) &&
      callLog.length > 0 &&
      callStreamService.rawCalls$.getValue().length === 0
    ) {
      callStreamService.setRawCalls(callLog);
    }
  }, [callLog]);

  // 2. RxJS Subscriptions for active thread and reactive list
  useEffect(() => {
    const subThreads = callStreamService.filteredThreads$.subscribe(setThreads);
    const subActive = callStreamService.activeThread$.subscribe((t) => {
      setActiveThread(t);
      if (t?.id) setActiveThreadId(t.id);
    });
    const subActiveId = callStreamService.activeThreadId$.subscribe(setActiveThreadId);
    const subLoading = callStreamService.isLoading$.subscribe(setIsLoading);

    return () => {
      subThreads.unsubscribe();
      subActive.unsubscribe();
      subActiveId.unsubscribe();
      subLoading.unsubscribe();
    };
  }, []);

  // Listen to live comment updates stream and patch the thread in real time
  useEffect(() => {
    const sub = commentUpdates$.subscribe((commentData) => {
      const targetCallId = commentData?.CallLogId ?? commentData?.sr ?? commentData?.callLogId;
      if (targetCallId) {
        callStreamService.patchComment(targetCallId, {
          ...commentData,
          isNew: true,
        });
      }
    });
    return () => sub.unsubscribe();
  }, []);

  // Auto-clear unread if opened via URL query parameter ?callId=...
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlCallId = params.get("callId");
    if (urlCallId && threads.length > 0) {
      const match = threads.find(
        (t) => String(t.sr) === String(urlCallId) || String(t.rawRecord?.id) === String(urlCallId)
      );
      if (match) {
        callStreamService.selectThread(match.id);
        if (clearCallUnread) clearCallUnread(urlCallId);
      }
    }
  }, [threads, clearCallUnread]);

  // 3. Live Socket Event Listeners
  useSocketEvent("AddCall", () => {
    if (setrefreshList) {
      setrefreshList((prev) => !prev);
    } else {
      fetchCallLogs(filtersRef.current);
    }
  });

  useSocketEvent("AcceptCall", () => {
    if (setrefreshList) {
      setrefreshList((prev) => !prev);
    } else {
      fetchCallLogs(filtersRef.current);
    }
  });

  useSocketEvent("ForwardedCall", () => {
    if (setrefreshList) {
      setrefreshList((prev) => !prev);
    } else {
      fetchCallLogs(filtersRef.current);
    }
  });

  useSocketEvent("EndCall", () => {
    if (setrefreshList) {
      setrefreshList((prev) => !prev);
    } else {
      fetchCallLogs(filtersRef.current);
    }
  });

  const formatFriendlyTime = (rawTime, fallbackDateStr) => {
    const timeVal = rawTime || fallbackDateStr;
    if (!timeVal) return "12:00 PM";

    if (typeof timeVal === "string") {
      const trimmed = timeVal.trim();

      // 1. Time only string e.g. "15:45", "9:30", "15:45:00", "15:45:00.123", "10:30 AM"
      const match = trimmed.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?(?:\.\d+)?(?:\s*([AaPp][Mm]))?$/);
      if (match) {
        let h = parseInt(match[1], 10);
        const m = match[2];
        const ampmFromStr = match[4]?.toUpperCase();
        if (ampmFromStr) {
          const h12 = h % 12 || 12;
          return `${h12}:${m} ${ampmFromStr}`;
        }
        if (!isNaN(h)) {
          const ampm = h >= 12 ? "PM" : "AM";
          const h12 = h % 12 || 12;
          return `${h12}:${m} ${ampm}`;
        }
      }

      // 2. Full datetime or ISO string with or without 'Z': "2026-10-03T10:38:58.573Z", "2026-10-03T10:38:58.573", "2026-10-03 10:38:58"
      // Strip trailing 'Z' so it is treated as local time (IST), matching database on refresh.
      const cleanDateStr = trimmed.replace(/Z$/i, "").replace(" ", "T");
      const d = new Date(cleanDateStr);
      if (!isNaN(d.getTime())) {
        return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
      }
    }

    const d = new Date(timeVal);
    if (!isNaN(d.getTime())) {
      return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    }

    return "12:00 PM";
  };

  const getSortTimestamp = (timeVal, baseStartTime, index, fallbackDate) => {
    if (!timeVal) return baseStartTime + 1000 + index;
    const str = String(timeVal).trim();
    if (!str || str.startsWith("1900") || str.startsWith("0000")) {
      return baseStartTime + 1000 + index;
    }

    // 1. Full datetime string with year/date (contains '-' or '/')
    if (str.includes("-") || str.includes("/")) {
      const clean = str.replace(/Z$/i, "").replace(" ", "T");
      const d = new Date(clean);
      if (!isNaN(d.getTime())) {
        return d.getTime() + index;
      }
    }

    // 2. Time-only string: e.g. "10:58", "10:58 AM", "15:45", "11:00 PM"
    const match = str.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?(?:\.\d+)?(?:\s*([AaPp][Mm]))?$/);
    if (match) {
      let hours = parseInt(match[1], 10);
      const minutes = parseInt(match[2], 10);
      const seconds = match[3] ? parseInt(match[3], 10) : 0;
      const ampm = match[4]?.toUpperCase();

      if (ampm === "PM" && hours < 12) hours += 12;
      if (ampm === "AM" && hours === 12) hours = 0;

      const base = fallbackDate instanceof Date && !isNaN(fallbackDate.getTime())
        ? fallbackDate
        : new Date(baseStartTime);

      const d = new Date(base.getFullYear(), base.getMonth(), base.getDate(), hours, minutes, seconds);
      if (!isNaN(d.getTime())) {
        return d.getTime() + index;
      }
    }

    // 3. Fallback to direct parse
    const d = new Date(str);
    if (!isNaN(d.getTime())) {
      return d.getTime() + index;
    }

    return baseStartTime + 1000 + index;
  };

  const getCommentDateGroup = (timeVal, defaultDateGroup) => {
    if (!timeVal || typeof timeVal !== "string") return defaultDateGroup;
    if (timeVal.includes("-") || timeVal.includes("/")) {
      const clean = timeVal.replace(/Z$/i, "").replace(" ", "T");
      const d = new Date(clean);
      if (!isNaN(d.getTime())) {
        return d.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        });
      }
    }
    return defaultDateGroup;
  };

  const buildMessagesForCall = useCallback((rec, callId) => {
    if (!rec) return [];
    const baseDate = rec.date
      ? new Date(rec.date)
      : rec.callStart
        ? new Date(rec.callStart)
        : new Date();
    const dateFormatted = !isNaN(baseDate.getTime())
      ? baseDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
      : "Today";

    const baseStartTime = rec.callStart
      ? new Date(rec.callStart).getTime()
      : baseDate.getTime() || Date.now();
    const mainCallTime = formatFriendlyTime(rec.time, rec.callStart);

    const callerPersonName = rec.callBy || rec.company || "optigo carely";
    const agentPersonName = rec.receivedBy || rec.AssignedEmpName || "Support Agent";

    const items = [
      {
        id: `primary-call-${rec.sr || "main"}-${callId}`,
        dateGroup: dateFormatted,
        sender: agentPersonName,
        time: mainCallTime,
        isCallRecord: true,
        record: rec,
        sortTime: baseStartTime,
        orderIndex: 0,
      },
    ];

    if (rec.FollowUpList) {
      try {
        let followups = [];
        if (
          typeof rec.FollowUpList === "string" &&
          rec.FollowUpList.trim().startsWith("[")
        ) {
          followups = JSON.parse(rec.FollowUpList);
        } else if (Array.isArray(rec.FollowUpList)) {
          followups = rec.FollowUpList;
        }

        if (Array.isArray(followups) && followups.length > 0) {
          const sortedFollowups = [...followups].sort(
            (a, b) => (a.Id || 0) - (b.Id || 0)
          );
          sortedFollowups.forEach((fu, fIdx) => {
            const hasRealStart =
              fu.CallStart && !fu.CallStart.startsWith("1900");
            const fuTimeFormatted = hasRealStart
              ? formatFriendlyTime(null, fu.CallStart)
              : mainCallTime;
            const fuSortTime = hasRealStart
              ? getSortTimestamp(fu.CallStart, baseStartTime, fIdx + 1, baseDate)
              : baseStartTime + (fIdx + 1) * 1000;

            const fuAgent =
              fu.CreatedBy ||
              fu.ReceivedBy ||
              rec.receivedBy ||
              "Support Agent";

            const isForward = Boolean(
              fu.IsForwardFollowup === 1 ||
              fu.IsForwardFollowup === "1" ||
              fu.isForwardFollowup === 1 ||
              fu.isForwardFollowup === true
            );

            items.push({
              id: `followup-${rec.sr}-${fu.Id || fIdx}`,
              dateGroup: dateFormatted,
              sender: fuAgent,
              company: rec.company,
              time: fuTimeFormatted,
              isFollowUp: !isForward,
              isForwardCall: isForward,
              followup: fu,
              sortTime: fuSortTime,
              orderIndex: fIdx + 1,
            });
          });
        }
      } catch (e) { }
    }

    const rawComments = rec.comment || rec.review_comments;
    if (rawComments && typeof rawComments === "string" && rawComments.trim()) {
      const trimmed = rawComments.trim();
      if (trimmed.startsWith("[") || trimmed.startsWith("{")) {
        try {
          const parsedComments = JSON.parse(trimmed);
          const commentsArray = Array.isArray(parsedComments)
            ? parsedComments
            : [parsedComments];

          commentsArray.forEach((cItem, cIdx) => {
            const commentText =
              cItem.text ||
              cItem.comment ||
              cItem.Description ||
              (typeof cItem === "string" ? cItem : "");
            if (!commentText) return;

            const commentRawTime = cItem.time || cItem.CreatedDate || "";
            const cTimeFormatted = commentRawTime
              ? formatFriendlyTime(cItem.time, cItem.CreatedDate)
              : mainCallTime;
            const cSortTime = getSortTimestamp(
              commentRawTime,
              baseStartTime,
              cIdx + 1,
              baseDate
            );
            const commentDateGroup = getCommentDateGroup(
              commentRawTime,
              dateFormatted
            );

            const currentUserName = (
              `${user?.firstname || ""} ${user?.lastname || ""}`.trim() ||
              user?.fullName ||
              user?.Name ||
              user?.username ||
              ""
            ).trim();

            const currentUserId = user?.id || user?.userid || user?.EmpID;

            let authorName = (
              cItem.Name ||
              cItem.UserName ||
              cItem.CreatedByName ||
              ""
            ).trim();

            const empList = masterData?.employees || [];

            // Match employee by ID or by Name
            const matchedEmp = cItem.CreatedBy
              ? empList.find(
                (e) => String(e.id || e.EmpID || e.userid) === String(cItem.CreatedBy)
              )
              : authorName
                ? empList.find(
                  (e) =>
                    (e.Name && e.Name.trim().toLowerCase() === authorName.toLowerCase()) ||
                    (`${e.firstname || ""} ${e.lastname || ""}`.trim().toLowerCase() === authorName.toLowerCase()) ||
                    (e.user && String(e.user).trim().toLowerCase() === authorName.toLowerCase())
                )
                : null;

            const empName = matchedEmp
              ? `${matchedEmp.firstname || ""} ${matchedEmp.lastname || ""}`.trim() ||
              matchedEmp.Name ||
              matchedEmp.user
              : null;

            // Check if this comment belongs to the current logged-in user
            const isCreatedByCurrentUser = Boolean(
              (currentUserId && cItem.CreatedBy && String(cItem.CreatedBy) === String(currentUserId)) ||
              (currentUserName && authorName && authorName.toLowerCase() === currentUserName.toLowerCase())
            );

            // Is this comment from an Agent / Support Employee?
            const isAgentComment = Boolean(
              !isCreatedByCurrentUser && (
                matchedEmp ||
                Number(cItem.IsClient) === 0 ||
                (authorName && (
                  authorName.toLowerCase() === agentPersonName.toLowerCase() ||
                  authorName.toLowerCase() === (rec.receivedBy || "").toLowerCase() ||
                  authorName.toLowerCase() === (rec.AssignedEmpName || "").toLowerCase()
                ))
              )
            );

            // In client portal:
            // - Any message by current user (client) OR marked IsClient=1 OR not an agent -> Client (RIGHT side)
            // - Messages from agents/employees -> Agent (LEFT side with Agent badge)
            const isClient = Boolean(
              isCreatedByCurrentUser ||
              Number(cItem.IsClient) === 1 ||
              cItem.isClient === true ||
              cItem.isClient === 1 ||
              !isAgentComment
            );

            const isGeneric =
              !authorName ||
              authorName.toLowerCase() === "client" ||
              authorName.toLowerCase() === "support user";

            if (isCreatedByCurrentUser && currentUserName) {
              authorName = currentUserName;
            } else if (empName) {
              authorName = empName;
            } else if (isGeneric) {
              authorName = isClient ? callerPersonName : agentPersonName;
            }

            const hasAttachment = Boolean(cItem.img);
            const rawImg = cItem.img || "";
            const filenameFromUrl = rawImg ? rawImg.split("/").pop() : "";
            const fileExt = filenameFromUrl.split(".").pop()?.toUpperCase() || "";
            const isImgExt = ["PNG", "JPG", "JPEG", "GIF", "WEBP", "SVG", "BMP", "ICO"].includes(fileExt);

            items.push({
              id: cItem.id
                ? `comment-${rec.sr}-${cItem.id}`
                : `comment-${rec.sr}-${cItem.time || ''}-${cIdx}`,
              dateGroup: commentDateGroup,
              sender: authorName,
              isClientComment: isClient,
              company: rec.company,
              commentId: cItem.id || cIdx + 1,
              time: cTimeFormatted,
              content: commentText.trim(),
              isComment: true,
              hasAttachment: hasAttachment,
              attachment: hasAttachment
                ? {
                  id: cItem.id || cIdx + 1,
                  filename: filenameFromUrl
                    ? `${filenameFromUrl}`
                    : `Attachment_${cItem.id || "file"}`,
                  subTitle: isImgExt ? "Image file" : `${fileExt || "Document"} file`,
                  fileType: isImgExt ? "Image file" : `${fileExt || "Document"} file`,
                  type: isImgExt ? "image" : "document",
                  imgUrl: cItem.img,
                  text: commentText,
                }
                : null,
              sortTime: cSortTime,
              orderIndex: cIdx + 1,
              isNew: Boolean(cItem.isNew),
            });
          });
        } catch (err) { }
      }
    }

    return items;
  }, [user, masterData]);

  // Update conversation messages directly from real server call record
  useEffect(() => {
    if (!activeThread || !activeThread.rawRecord) {
      setMessages([]);
      return;
    }

    const allGenerated = buildMessagesForCall(
      activeThread.rawRecord,
      activeThread.id
    );

    allGenerated.sort((a, b) => {
      // Primary call record always stays at the very top
      if (a.isCallRecord) return -1;
      if (b.isCallRecord) return 1;

      // Chronological sort by exact timestamp
      const diff = (a.sortTime || 0) - (b.sortTime || 0);
      if (diff !== 0) return diff;

      // Deterministic tie-breaker: maintain stable array order
      return (a.orderIndex ?? 0) - (b.orderIndex ?? 0);
    });
    setMessages(allGenerated);
  }, [activeThread, buildMessagesForCall]);

  // Reactive Handlers
  const handleSelectThread = useCallback((threadId) => {
    callStreamService.selectThread(threadId);
    const found = threads.find((t) => t.id === threadId);
    const targetSr = found?.sr || found?.rawRecord?.sr || found?.rawRecord?.id;
    if (targetSr && clearCallUnread) {
      clearCallUnread(targetSr);
    }
  }, [threads, clearCallUnread]);

  const handleClearAllFilters = useCallback(() => {
    setSearchQuery("");
    setStatus("");
    const clearedRange = { startDate: "", endDate: "" };
    setFilterState({
      dateRange: clearedRange,
      filterTargetField: "",
    });
    setTempDateRange({ startDate: null, endDate: null });
  }, []);

  const getLocalISOString = () => {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    const padMs = (n) => String(n).padStart(3, "0");
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}.${padMs(now.getMilliseconds())}`;
  };

  const handleSendMessage = useCallback(
    async (text, uploadedUrl) => {
      if (!activeThread?.id) return;
      const callId = activeThread.rawRecord?.id || activeThread.sr || activeThread.id;

      if (addComment) {
        const authorName =
          `${user?.firstname || ""} ${user?.lastname || ""}`.trim() ||
          user?.fullName ||
          user?.Name ||
          "Client";

        // Optimistically patch thread chat bubble immediately with smooth pop flag
        const optimisticComment = {
          id: `local-${Date.now()}`,
          CallLogId: callId,
          Comments: text,
          FilePath: uploadedUrl || "",
          CreatedDate: getLocalISOString(),
          Name: authorName,
          CreatedBy: user?.id,
          IsClient: 1, // ALWAYS 1 on client side!
          isNew: true,
          isOwn: true,
        };
        callStreamService.patchComment(callId, optimisticComment);

        try {
          await addComment(callId, text, uploadedUrl || null, user?.id);
        } catch (err) {
          console.error("Error adding comment:", err);
        }
      }
    },
    [activeThread, addComment, user]
  );

  const handleOpenFeedbackModal = useCallback((callId) => {
    setFeedBackModalCallId(callId);
  }, []);

  const handleOpenFeedbackDetails = useCallback((anchorEl, rowData) => {
    setFeedbackPopover({ data: rowData, anchor: anchorEl });
  }, []);

  // When External Status is Completed, Solved, or Closed -> Call is closed & comments are disabled
  const raw = activeThread?.rawRecord || activeThread || {};
  const extStatus = (
    raw.Estatus ||
    raw.estatus ||
    activeThread?.estatus ||
    raw.status ||
    activeThread?.status ||
    ""
  ).toLowerCase();

  const isCallEnded = Boolean(
    extStatus === "completed" ||
    extStatus === "solved" ||
    extStatus === "closed"
  );

  const receivedByVal = String(raw.receivedBy || "").trim();
  const assignedEmpVal = String(raw.AssignedEmpName || "").trim();
  const isAccepted = Boolean(
    (receivedByVal && receivedByVal.toLowerCase() !== "unassigned" && receivedByVal !== "0" && receivedByVal !== "-") ||
    (assignedEmpVal && assignedEmpVal.toLowerCase() !== "unassigned" && assignedEmpVal !== "0" && assignedEmpVal !== "-")
  );

  const rawDuration = raw.CallDuration || raw.duration || "";
  const hasValidDuration = Boolean(
    rawDuration &&
    rawDuration !== "00:00:00" &&
    rawDuration !== "0:00" &&
    rawDuration !== "00:00"
  );
  const hasClosedTimestamp = Boolean(
    raw.callClosed &&
    typeof raw.callClosed === "string" &&
    !raw.callClosed.startsWith("1900")
  );
  const hasFollowUps = Boolean(
    (Array.isArray(raw.FollowUpList) && raw.FollowUpList.length > 0) ||
    (typeof raw.FollowUpList === "string" && raw.FollowUpList.trim().startsWith("[") && raw.FollowUpList.trim() !== "[]")
  );

  const hasCallStartedAndEnded = Boolean(
    isCallEnded ||
    hasValidDuration ||
    hasClosedTimestamp ||
    hasFollowUps ||
    (raw.callStart && !raw.callStart.startsWith("1900") && isAccepted && !rawDuration.includes("00:00:00"))
  );

  const canComment = isAccepted && hasCallStartedAndEnded && !isCallEnded;

  const currentRating = Number(raw.rating ?? raw.ratingByCustomer ?? 0);
  const hasFeedback = Boolean(raw.feedback && String(raw.feedback).trim());
  const hasRating = currentRating > 0;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 55px)",
        width: "100%",
        overflow: "hidden",
        px: { xs: 1.5, sm: 2.5, md: 5 },
        py: 1.5,
        pb: 2,
        bgcolor: "#F8FAFC",
        boxSizing: "border-box",
      }}
    >
      {/* Main Bordered Dashboard Card */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
          overflow: "hidden",
          border: "1px solid #CBD5E1",
          borderRadius: "8px",
          bgcolor: "#FFFFFF",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* 1. Support Top Bar matching CallLogger GridHeader */}
        <SupportTopBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          status={status}
          setStatus={setStatus}
          filterState={filterState}
          setFilterState={setFilterState}
          tempDateRange={tempDateRange}
          setTempDateRange={setTempDateRange}
          onAddClick={() => setIsAddDrawerOpen(true)}
          onClearAll={handleClearAllFilters}
        />

        {/* 2. Main Layout Workspace */}
        <Box sx={{ flex: 1, display: "flex", minHeight: 0, overflow: "hidden" }}>
          {/* Support Calls Sidebar */}
          <SupportSidebar
            threads={threads}
            activeThreadId={activeThreadId}
            onSelectThread={handleSelectThread}
            searchQuery={searchQuery}
            isLoading={isLoading}
            status={status}
            setStatus={setStatus}
            width={415}
          />

          {/* Conversation Canvas */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              height: "100%",
              overflow: "hidden",
              bgcolor: "#FFFFFF",
            }}
          >
            <SupportHeader
              activeThread={activeThread}
              isLoading={isLoading}
              isAccepted={isAccepted}
              onOpenFeedbackModal={handleOpenFeedbackModal}
              onOpenFeedbackDetails={handleOpenFeedbackDetails}
            />

            <SupportMessageList
              messages={messages}
              isLoading={isLoading}
              activeThreadId={activeThread?.id}
            />

            {isCallEnded ? (
              <Box
                sx={{
                  p: 2,
                  px: 3,
                  bgcolor: "#FFFFFF",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1.2,
                  userSelect: "none",
                  borderTop: "1px solid #E2E8F0",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box sx={{ flex: 1, height: "1px", bgcolor: "#E2E8F0" }} />
                  <Box
                    sx={{
                      mx: 2,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 1,
                      px: 1.5,
                      py: 0.6,
                      borderRadius: "20px",
                      bgcolor: "#F8FAFC",
                      border: "1px solid #E2E8F0",
                    }}
                  >
                    <CheckCircleIcon sx={{ fontSize: 20, color: "#16A34A" }} />
                    <Typography
                      sx={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#64748B",
                        letterSpacing: "0.01em",
                      }}
                    >
                      Our support team has marked this call as completed. Comments are now closed. Thank you for reaching out to us.
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1, height: "1px", bgcolor: "#E2E8F0" }} />
                </Box>

                {/* Rating display / prompt underneath banner */}
                {!hasRating ? (
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 1.2,
                      px: 2,
                      py: 0.6,
                      borderRadius: "20px",
                      bgcolor: "#FFFBEB",
                      border: "1px solid #FDE68A",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                      "&:hover": { bgcolor: "#FEF3C7", transform: "scale(1.02)" },
                    }}
                    onClick={() => handleOpenFeedbackModal(activeThread?.sr || activeThread?.id || raw?.id)}
                  >
                    <Typography sx={{ fontSize: 12, fontWeight: 750, color: "#92400E" }}>
                      How was our support?
                    </Typography>
                    <Rating
                      value={0}
                      readOnly
                      size="small"
                      sx={{
                        color: "#F59E0B",
                        "& .MuiRating-iconEmpty": { color: "#FCD34D" },
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: 11,
                        fontWeight: 800,
                        color: "#B45309",
                        textDecoration: "underline",
                      }}
                    >
                      Rate this Call
                    </Typography>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 1,
                      px: 2,
                      py: 0.6,
                      borderRadius: "20px",
                      bgcolor: "#F0FDF4",
                      border: "1px solid #BBF7D0",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                      "&:hover": { bgcolor: "#DCFCE7" },
                    }}
                    onClick={(e) => handleOpenFeedbackDetails(e.currentTarget, raw)}
                  >
                    <Typography sx={{ fontSize: 12, fontWeight: 750, color: "#15803D" }}>
                      Your Rating:
                    </Typography>
                    <Rating
                      value={currentRating}
                      readOnly
                      size="small"
                      sx={{ color: "#F59E0B" }}
                    />
                    <Typography sx={{ fontSize: 11.5, fontWeight: 800, color: "#166534" }}>
                      ({currentRating}/5)
                    </Typography>
                    {hasFeedback && (
                      <Typography
                        sx={{
                          fontSize: 11.5,
                          color: "#475569",
                          fontStyle: "italic",
                          maxWidth: 320,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        • "{raw.feedback}"
                      </Typography>
                    )}
                  </Box>
                )}
              </Box>
            ) : !isAccepted ? (
              <Box
                sx={{
                  p: 2,
                  px: 3,
                  bgcolor: "#FFFFFF",
                  borderTop: "1px solid #E2E8F0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  userSelect: "none",
                }}
              >
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1.2,
                    px: 2,
                    py: 0.8,
                    borderRadius: "20px",
                    bgcolor: "#FFFBEB",
                    border: "1px solid #FDE68A",
                  }}
                >
                  <HourglassEmptyRoundedIcon sx={{ fontSize: 18, color: "#D97706" }} />
                  <Typography sx={{ fontSize: 12, fontWeight: 650, color: "#92400E" }}>
                    Your call request is in the queue. Please wait while a support agent accepts your call. Comments will be enabled once your call is accepted and attended.
                  </Typography>
                </Box>
              </Box>
            ) : !hasCallStartedAndEnded ? (
              <Box
                sx={{
                  p: 2,
                  px: 3,
                  bgcolor: "#FFFFFF",
                  borderTop: "1px solid #E2E8F0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  userSelect: "none",
                }}
              >
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1.2,
                    px: 2,
                    py: 0.8,
                    borderRadius: "20px",
                    bgcolor: "#F8FAFC",
                    border: "1px solid #E2E8F0",
                  }}
                >
                  <LockOutlinedIcon sx={{ fontSize: 18, color: "#64748B" }} />
                  <Typography sx={{ fontSize: 12, fontWeight: 600, color: "#64748B" }}>
                    This call has not been attended yet. Comments will be enabled once your call is attended by an agent.
                  </Typography>
                </Box>
              </Box>
            ) : (
              <MessageComposer
                activeThread={activeThread}
                placeholder={`Add a comment for #${activeThread?.sr || "this call"}...`}
                onSendMessage={handleSendMessage}
              />
            )}
          </Box>
        </Box>
      </Box>

      {/* Exact CallLogger Add Call Drawer */}
      <CallLogDrawer
        open={isAddDrawerOpen}
        onClose={() => setIsAddDrawerOpen(false)}
        onRecordToggle={() => { }}
        callStatusValue={{ duration: 0 }}
      />

      {/* CallLogger Feedback & Rating Modal */}
      {feedBackModalCallId && (
        <FeedbackModal
          id={feedBackModalCallId}
          setFeedBackModal={setFeedBackModalCallId}
        />
      )}

      {/* Popover Card for Viewing Submitted Feedback */}
      {feedbackPopover && (
        <PopoverFeedbackCard
          anchorEl={feedbackPopover.anchor}
          open={Boolean(feedbackPopover.anchor)}
          onClose={() => setFeedbackPopover(null)}
          name={feedbackPopover.data?.callBy || feedbackPopover.data?.customerName || "Client"}
          rating={Number(feedbackPopover.data?.rating || feedbackPopover.data?.RatingByCustomer || 0)}
          description={feedbackPopover.data?.feedback || feedbackPopover.data?.Feedback || ""}
          ratingDate={feedbackPopover.data?.RatingDateTime || feedbackPopover.data?.date}
        />
      )}
    </Box>
  );
}
