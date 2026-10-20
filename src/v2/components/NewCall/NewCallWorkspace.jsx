import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Box, CircularProgress } from '@mui/material';
import NewCallSidebar from './NewCallSidebar';
import NewCallConversation from './NewCallConversation';
import CreateCallModal from './CreateCallModal';
import NewCallFeedbackModal from './NewCallFeedbackModal';
import CallLogApi from '../../apis/CallLogApiController';
import { useCallLog } from '../../modules/context/UseCallLog';
import { useAuth } from '../../modules/context/UseAuth';
import { commentUpdates$, externalStatusUpdates$ } from '../../rxjs/commentEvents';
import { useSocketEvent } from '../../modules/hooks/useSocketListener';
import { toast } from 'react-toastify';

export default function NewCallWorkspace({ width = '100%', height = 'calc(100vh - 55px)' }) {
  const { user } = useAuth();
  const { addComment, clearCallUnread, ESTATUS_LIST = [] } = useCallLog();

  const [calls, setCalls] = useState([]);
  const [activeCallId, setActiveCallId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('pending');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [feedbackCall, setFeedbackCall] = useState(null);

  // Helper: Format comment time
  const formatCommentTime = (timeVal) => {
    if (!timeVal) return '';
    try {
      const clean = String(timeVal).trim().replace(/Z$/i, '').replace(' ', 'T');
      const d = new Date(clean);
      if (!isNaN(d.getTime())) {
        return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
      }
    } catch (_) {}
    return String(timeVal);
  };

  // Helper: Parse comments array from call record
  const parseCommentsArray = (rawComment) => {
    if (!rawComment) return [];
    if (Array.isArray(rawComment)) return rawComment;
    if (typeof rawComment === 'string') {
      const trimmed = rawComment.trim();
      if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
        try {
          const parsed = JSON.parse(trimmed);
          return Array.isArray(parsed) ? parsed : [parsed];
        } catch (_) {}
      }
    }
    return [];
  };

  // Helper: Append a new comment to an existing comments array (deduplicating)
  const appendCommentDeduplicated = (existingComments, newCommentItem) => {
    const list = [...(existingComments || [])];
    const rawText = (newCommentItem.Comments ?? newCommentItem.comment ?? newCommentItem.text ?? '').trim();
    const rawFile = (newCommentItem.FilePath ?? newCommentItem.img ?? '').trim();

    const existsIdx = list.findIndex((c) => {
      if (newCommentItem.id && c.id && String(c.id) === String(newCommentItem.id)) return true;
      if (String(c.id).startsWith('local-')) {
        const cText = (c.text || c.comment || '').trim();
        const cFile = (c.FilePath || c.img || '').trim();
        return cText === rawText && cFile === rawFile;
      }
      return false;
    });

    if (existsIdx !== -1) {
      list[existsIdx] = {
        ...list[existsIdx],
        ...newCommentItem,
        id: newCommentItem.id || list[existsIdx].id,
      };
    } else {
      list.push(newCommentItem);
    }
    return list;
  };

  // 1. Fetch Calls from API
  const fetchCalls = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await CallLogApi.getCallLogs({
        endDate: '',
        startDate: '',
        statusId: '',
        projectId: '',
        filter: '',
        searchTerm: '',
      });

      const rawList =
        data?.rd ||
        data?.Data?.rd ||
        data?.data?.rd ||
        (Array.isArray(data) ? data : []);

      const mapped = rawList.map((rec, index) => {
        const sr = rec.index || rec.sr || rec.id || index + 1;
        const id = String(rec.id || sr);
        const app = rec.appname || rec.appName || rec.DeptName || 'Support Request';
        const caller = rec.callBy || rec.customerName || rec.CustomerName || '-';
        const desc = rec.description || rec.Description || rec.topicRaisedBy || '';
        const date = rec.date || rec.EntryDate || '';
        const time = rec.time || rec.CallStart || '';
        const estatus = rec.Estatus || rec.estatus || '';
        const status = rec.status || rec.Status || '';
        const parsedComments = parseCommentsArray(rec.comment || rec.review_comments);

        let lastCommentText = '';
        let lastCommentAuthor = '';
        let lastTimeText = time;
        if (parsedComments.length > 0) {
          const lastC = parsedComments[parsedComments.length - 1];
          lastCommentText = lastC.text || lastC.comment || lastC.Comments || '';
          lastCommentAuthor = lastC.Name || (lastC.IsClient === 1 || lastC.IsClient === '1' ? 'You' : 'Support');
          lastTimeText = formatCommentTime(lastC.time || lastC.CreatedDate) || time;
        }

        return {
          id,
          sr,
          name: app,
          appname: app,
          company: rec.company || rec.ProjectName || '',
          callBy: caller,
          receivedBy: rec.receivedBy || rec.AssignedEmpName || '',
          description: desc, // FIXED MAIN TITLE - NEVER OVERWRITTEN
          lastComment: lastCommentText,
          lastCommentAuthor: lastCommentAuthor,
          lastMessage: lastCommentText || desc,
          timestamp: lastTimeText,
          date,
          time,
          status,
          Estatus: estatus,
          duration: rec.CallDuration || '',
          rating: Number(rec.rating ?? rec.ratingByCustomer ?? 0),
          feedback: rec.feedback || rec.Feedback || '',
          unread: Boolean(rec.hasNewComment),
          hasNewComment: Boolean(rec.hasNewComment),
          comments: parsedComments,
          rawRecord: rec,
        };
      });

      setCalls(mapped);
      if (mapped.length > 0 && !activeCallId) {
        setActiveCallId(mapped[0].id);
      }
    } catch (err) {
      console.error('Failed to fetch customer calls:', err);
    } finally {
      setIsLoading(false);
    }
  }, [activeCallId]);

  useEffect(() => {
    fetchCalls();
  }, []);

  // 2. Real-Time Comment Event: Updates Call & SHUFFLES / RE-SORTS TO TOP
  const handleCommentUpdate = useCallback(
    (commentData) => {
      const targetId = String(commentData?.CallLogId ?? commentData?.sr ?? commentData?.callLogId ?? '');
      if (!targetId) return;

      const rawText = (commentData.Comments ?? commentData.comment ?? commentData.text ?? '').trim();
      const rawFile = (commentData.FilePath || commentData.img || '').trim();
      const rawTime = commentData.CreatedDate || commentData.time || new Date().toISOString();
      const formattedTime = formatCommentTime(rawTime);

      const isOwn =
        Boolean(commentData.isOwn) ||
        (user?.id && String(commentData.CreatedBy) === String(user.id));

      const commentAuthor = commentData.Name || (isOwn ? 'You' : 'Support');

      const commentItem = {
        id: commentData.id || `comment-${Date.now()}`,
        text: rawText,
        comment: rawText,
        time: formattedTime,
        Name: commentAuthor,
        CreatedBy: commentData.CreatedBy,
        IsClient: isOwn || commentData.IsClient === 1 || commentData.IsClient === '1' ? 1 : 0,
        FilePath: rawFile,
        img: rawFile,
      };

      setCalls((prevCalls) => {
        const foundIdx = prevCalls.findIndex(
          (c) =>
            String(c.sr) === targetId ||
            String(c.id) === targetId ||
            String(c.rawRecord?.id) === targetId ||
            String(c.rawRecord?.sr) === targetId ||
            String(c.rawRecord?.CallLogid) === targetId
        );

        if (foundIdx === -1) {
          return prevCalls;
        }

        const callToUpdate = prevCalls[foundIdx];
        const updatedComments = appendCommentDeduplicated(callToUpdate.comments, commentItem);
        const isCurrentActive =
          String(activeCallId) === String(callToUpdate.id) ||
          String(activeCallId) === String(callToUpdate.sr);
        const shouldMarkUnread = !isCurrentActive && !isOwn;

        const updatedCall = {
          ...callToUpdate,
          comments: updatedComments,
          description: callToUpdate.description, // FIXED MAIN TITLE - NEVER OVERWRITTEN
          lastComment: rawText,
          lastCommentAuthor: isOwn ? 'You' : (commentData.Name || 'Support'),
          lastMessage: rawText,
          timestamp: formattedTime || 'Just now',
          unread: shouldMarkUnread,
          hasNewComment: shouldMarkUnread,
        };

        // CRITICAL REQUIREMENT: SHUFFLE / RE-SORT TO TOP
        // Move the call with the newest comment to index 0!
        const remaining = prevCalls.filter((_, idx) => idx !== foundIdx);
        return [updatedCall, ...remaining];
      });
    },
    [activeCallId, user]
  );

  // Subscribe to RxJS comment stream
  useEffect(() => {
    const sub = commentUpdates$.subscribe(handleCommentUpdate);
    return () => sub.unsubscribe();
  }, [handleCommentUpdate]);

  // Apply external status changes to the customer call list and open conversation.
  useEffect(() => {
    const sub = externalStatusUpdates$.subscribe((statusData) => {
      const targetId = String(
        statusData?.CallLogId ?? statusData?.sr ?? statusData?.callLogId ?? ''
      );
      if (!targetId || statusData?.Estatus === undefined) return;

      const statusId = statusData.Estatus;
      const externalStatus =
        ESTATUS_LIST.find((item) => String(item.value) === String(statusId))?.label || statusId;

      setCalls((prevCalls) =>
        prevCalls.map((call) => {
          const matches =
            String(call.sr) === targetId ||
            String(call.id) === targetId ||
            String(call.rawRecord?.id) === targetId ||
            String(call.rawRecord?.sr) === targetId;
          if (!matches) return call;

          return {
            ...call,
            Estatus: externalStatus,
            EstatusId: statusId,
            rawRecord: {
              ...call.rawRecord,
              Estatus: externalStatus,
              EstatusId: statusId,
              ...(statusData.ModifiedDate && { ModifiedDate: statusData.ModifiedDate }),
              ...(statusData.UpdatedBy !== undefined && { UpdatedBy: statusData.UpdatedBy }),
            },
          };
        })
      );
    });
    return () => sub.unsubscribe();
  }, [ESTATUS_LIST]);

  // Subscribe to Socket ADDCOMMENTS
  useSocketEvent('ADDCOMMENTS', (data) => {
    if (data) {
      handleCommentUpdate(data);
    }
  });

  // Subscribe to Socket AddCall
  useSocketEvent('AddCall', (data) => {
    if (data) {
      fetchCalls();
    }
  });

  // Derive Active Call
  const activeCall = useMemo(() => {
    if (!calls || calls.length === 0) return null;
    return calls.find((c) => String(c.id) === String(activeCallId)) || calls[0];
  }, [calls, activeCallId]);

  // Select Call and Clear Unread
  const handleSelectCall = (callId) => {
    const strId = String(callId);
    setActiveCallId(strId);

    // Clear unread in local state
    setCalls((prev) =>
      prev.map((c) =>
        String(c.id) === strId || String(c.sr) === strId
          ? { ...c, unread: false, hasNewComment: false }
          : c
      )
    );

    if (clearCallUnread) {
      clearCallUnread(callId);
    }
  };

  // Send Comment (Customer Action)
  const handleSendComment = async (callId, text, filePath) => {
    if (!callId) return;

    const authorName =
      `${user?.firstname || ''} ${user?.lastname || ''}`.trim() ||
      user?.fullName ||
      'You';

    const commentPayload = {
      id: `local-${Date.now()}`,
      CallLogId: callId,
      Comments: text,
      FilePath: filePath || '',
      CreatedDate: new Date().toISOString(),
      CreatedBy: user?.id,
      IsClient: 1,
      Name: authorName,
      isOwn: true,
      isNew: true,
    };

    // Optimistically trigger local update (appends and shuffles to top)
    handleCommentUpdate(commentPayload);
    commentUpdates$.next(commentPayload);

    // Call API
    if (addComment) {
      await addComment(callId, text, filePath, user?.id);
    } else {
      await CallLogApi.addCallComments(callId, text, filePath, user?.id);
    }
  };

  // On New Call Created
  const handleCallCreated = (newRecord) => {
    const sr = newRecord?.sr || newRecord?.id || Date.now();
    const id = String(newRecord?.id || sr);
    const app = newRecord?.appname || newRecord?.appName || 'Support Request';

    const newCallItem = {
      id,
      sr,
      name: app,
      appname: app,
      company: newRecord?.company || '',
      callBy: newRecord?.callBy || user?.fullName || 'You',
      receivedBy: '',
      description: newRecord?.description || '',
      lastMessage: newRecord?.description || 'Call Request Created',
      timestamp: 'Just now',
      date: newRecord?.date || new Date().toISOString().split('T')[0],
      time: 'Just now',
      status: 'Pending',
      Estatus: 'Pending',
      duration: '',
      rating: 0,
      feedback: '',
      unread: false,
      hasNewComment: false,
      comments: [],
      rawRecord: newRecord,
    };

    // Prepend to top of calls list and set as active
    setCalls((prev) => [newCallItem, ...prev]);
    setActiveCallId(id);
  };

  return (
    <Box
      sx={{
        width,
        height,
        display: 'flex',
        bgcolor: '#FFFFFF',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Left: Customer Calls Sidebar */}
      <NewCallSidebar
        calls={calls}
        activeCallId={activeCall?.id || activeCallId}
        onSelectCall={handleSelectCall}
        onOpenAddCall={() => setIsAddModalOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        width={380}
      />

      {/* Right: Live Chat & Call Details Canvas */}
      {isLoading && calls.length === 0 ? (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#F8FAFC',
          }}
        >
          <CircularProgress size={32} sx={{ color: '#4F46E5' }} />
        </Box>
      ) : (
        <NewCallConversation
          call={activeCall}
          comments={activeCall?.comments || []}
          onSendComment={handleSendComment}
          onOpenFeedback={(c) => setFeedbackCall(c)}
        />
      )}

      {/* Modal: Create New Call Request */}
      <CreateCallModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onCallCreated={handleCallCreated}
      />

      {/* Modal: Rating & Feedback */}
      <NewCallFeedbackModal
        open={Boolean(feedbackCall)}
        onClose={() => setFeedbackCall(null)}
        call={feedbackCall}
        onSuccess={({ rating, feedback }) => {
          if (feedbackCall?.id) {
            setCalls((prev) =>
              prev.map((c) =>
                c.id === feedbackCall.id ? { ...c, rating, feedback } : c
              )
            );
          }
        }}
      />
    </Box>
  );
}
