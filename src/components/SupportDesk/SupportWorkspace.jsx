import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Box, Typography, Rating } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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
import CallLogApi from "../../apis/CallLogApiController";
import debounce from "lodash/debounce";

export default function SupportWorkspace() {
  const { user } = useAuth();
  const {
    callLog,
    setCallLog,
    addComment,
    refreshList,
    setrefreshList,
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
    async (filters) => {
      setIsLoading(true);
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
        setIsLoading(false);
      }
    },
    [setCallLog]
  );

  const debouncedFilterCallLog = useMemo(
    () =>
      debounce((filters) => {
        fetchCallLogs(filters);
      }, 350),
    [fetchCallLogs]
  );

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

    debouncedFilterCallLog(filters);
    return () => {
      debouncedFilterCallLog.cancel();
    };
  }, [searchQuery, status, filterState, debouncedFilterCallLog]);

  // Re-fetch when refreshList or external updates trigger
  useEffect(() => {
    fetchCallLogs(filtersRef.current);
  }, [refreshList, fetchCallLogs]);

  // Sync callLog from UseCallLog if updated externally
  useEffect(() => {
    if (Array.isArray(callLog) && callLog.length > 0) {
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
    if (rawTime && typeof rawTime === "string" && rawTime.includes(":")) {
      const parts = rawTime.split(":");
      if (parts.length >= 2) {
        const h = parseInt(parts[0], 10);
        const m = parts[1].slice(0, 2);
        if (!isNaN(h)) {
          const ampm = h >= 12 ? "PM" : "AM";
          const h12 = h % 12 || 12;
          return `${h12}:${m} ${ampm}`;
        }
      }
    }
    if (fallbackDateStr) {
      const d = new Date(fallbackDateStr);
      if (!isNaN(d.getTime())) {
        return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
      }
    }
    return "12:00 PM";
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
              ? new Date(fu.CallStart).getTime()
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
            });
          });
        }
      } catch (e) {}
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

            const cTimeFormatted = cItem.time
              ? formatFriendlyTime(null, cItem.time)
              : mainCallTime;
            const cSortTime =
              cItem.time && !cItem.time.startsWith("1900")
                ? new Date(cItem.time).getTime()
                : baseStartTime + 60000 + cIdx * 1000;

            const isClient =
              cItem.IsClient === 1 ||
              cItem.isClient === 1 ||
              cItem.isClient === true ||
              cItem.IsClient === "1";

            const authorName = isClient
              ? callerPersonName
              : (cItem.Name || agentPersonName);

            const hasAttachment = Boolean(cItem.img);
            const rawImg = cItem.img || "";
            const filenameFromUrl = rawImg ? rawImg.split("/").pop() : "";

            items.push({
              id: `comment-${rec.sr}-${cItem.id || cIdx}-${cIdx}`,
              dateGroup: dateFormatted,
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
                      : `Attachment_${cItem.id || "58"}`,
                    subTitle: "Image file",
                    fileType: "Image file",
                    type: "image",
                    imgUrl: cItem.img,
                    text: commentText,
                  }
                : null,
              sortTime: cSortTime,
            });
          });
        } catch (err) {}
      }
    }

    return items;
  }, []);

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

    allGenerated.sort((a, b) => (a.sortTime || 0) - (b.sortTime || 0));
    setMessages(allGenerated);
  }, [activeThread, buildMessagesForCall]);

  // Reactive Handlers
  const handleSelectThread = useCallback((threadId) => {
    callStreamService.selectThread(threadId);
  }, []);

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

  const handleSendMessage = useCallback(
    async (text, uploadedUrl) => {
      if (!activeThread?.id) return;
      const callId = activeThread.rawRecord?.id || activeThread.sr || activeThread.id;

      if (addComment) {
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
            width={380}
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
              onOpenFeedbackModal={handleOpenFeedbackModal}
              onOpenFeedbackDetails={handleOpenFeedbackDetails}
            />

            <SupportMessageList messages={messages} isLoading={isLoading} />

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
        onRecordToggle={() => {}}
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
