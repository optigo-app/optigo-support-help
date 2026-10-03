import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

class CallStreamService {
  constructor() {
    // Core Reactive Stores
    this.rawCalls$ = new BehaviorSubject([]);
    this.activeThreadId$ = new BehaviorSubject(null);
    this.isLoading$ = new BehaviorSubject(false);

    // Filtered Threads Stream (API is single source of truth for filtering)
    this.filteredThreads$ = this.rawCalls$.asObservable();

    // Derived: Active Thread stream
    this.activeThread$ = combineLatest([
      this.filteredThreads$,
      this.activeThreadId$,
    ]).pipe(
      map(([threads, activeId]) => {
        if (!threads || threads.length === 0) return null;
        if (!activeId) return threads[0];
        return threads.find((t) => t.id === activeId) || threads[0];
      })
    );
  }

  // Set Raw Calls directly from API / useCallLog
  setRawCalls(callLogs) {
    if (!Array.isArray(callLogs)) {
      this.rawCalls$.next([]);
      return;
    }

    const mapped = callLogs.map((rec, index) => {
      const sr = rec.index || rec.sr || rec.id || index + 1;
      const id = `call-${rec.id || sr}`;
      const caller = rec.callBy || rec.customerName || rec.CustomerName || '-';
      const app = rec.appname || rec.appName || rec.DeptName || '-';
      const desc = rec.description || rec.Description || rec.topicRaisedBy || '';
      const date = rec.date || rec.EntryDate || '';
      const time = rec.time || rec.CallStart || '';
      const estatus = rec.Estatus || rec.estatus || '';
      const status = rec.status || rec.Status || rec.InternalStatus || '';
      const feedback = rec.feedback || rec.Feedback || '';
      const rating = Number(rec.rating ?? rec.ratingByCustomer ?? 0);
      const duration = rec.CallDuration || '';
      const callClosed = rec.callClosed || rec.CallClosed || '';

      const hasNewComment = Boolean(rec.hasNewComment);

      return {
        id,
        sr,
        name: app,
        company: rec.company || rec.ProjectName || '',
        callBy: caller,
        receivedBy: rec.receivedBy || rec.AssignedEmpName || '',
        createdBy: rec.createdBy || rec.CreatedBy || '',
        lastMessage: desc || app,
        timestamp: time,
        date,
        status: status || estatus,
        estatus: estatus,
        duration: duration,
        DeptName: app,
        rating,
        feedback,
        unread: hasNewComment,
        hasNewComment: hasNewComment,
        online: true,
        rawRecord: {
          ...rec,
          sr,
          id: rec.id || sr,
          company: rec.company || rec.ProjectName || '',
          callBy: caller,
          receivedBy: rec.receivedBy || rec.AssignedEmpName || '',
          createdBy: rec.createdBy || rec.CreatedBy || '',
          appname: app,
          DeptName: app,
          status: status,
          Estatus: estatus,
          feedback: feedback,
          CallDuration: rec.CallDuration || '',
          time,
          callStart: rec.callStart || rec.CallStart || time,
          callClosed: callClosed,
          topicRaisedBy: desc,
          description: desc,
          RequirementRaised: desc,
          rating,
          date,
          FollowUpList: rec.FollowUpList || [],
          comment: rec.comment || rec.review_comments || '',
          hasNewComment: hasNewComment,
        },
      };
    });

    this.rawCalls$.next(mapped);

    const currentActiveId = this.activeThreadId$.getValue();
    if (!currentActiveId || !mapped.some((t) => t.id === currentActiveId)) {
      if (mapped.length > 0) {
        this.activeThreadId$.next(mapped[0].id);
      }
    }
  }

  patchComment(callLogId, commentPayload) {
    const rawCalls = this.rawCalls$.getValue();
    if (!rawCalls || rawCalls.length === 0) return;

    const targetCallId = String(callLogId);
    const activeId = this.activeThreadId$.getValue();

    const getLocalISOString = () => {
      const now = new Date();
      const pad = (n) => String(n).padStart(2, "0");
      const padMs = (n) => String(n).padStart(3, "0");
      return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}.${padMs(now.getMilliseconds())}`;
    };

    const rawText = (commentPayload.Comments ?? commentPayload.comment ?? commentPayload.text ?? "").trim();
    const rawFile = (commentPayload.FilePath || commentPayload.img || "").trim();
    const rawTime = (commentPayload.CreatedDate || commentPayload.time || getLocalISOString()).toString().replace(/Z$/i, "").replace(" ", "T");

    const isOwn = Boolean(commentPayload.isOwn);
    const isClientVal = isOwn || commentPayload.IsClient === 1 || commentPayload.IsClient === "1" ? 1 : (commentPayload.IsClient !== undefined ? Number(commentPayload.IsClient) : 1);
    const commentItem = {
      id: commentPayload.id || Date.now(),
      text: rawText,
      comment: rawText,
      time: rawTime,
      Name: commentPayload.Name || (isClientVal ? "Client" : "Support User"),
      CreatedBy: commentPayload.CreatedBy,
      IsClient: isClientVal,
      FilePath: rawFile,
      img: rawFile,
      isNew: commentPayload.isNew !== undefined ? Boolean(commentPayload.isNew) : true,
    };

    let matched = false;
    const updated = rawCalls.map((thread) => {
      const threadSr = String(thread.sr || "");
      const threadCallId = String(thread.rawRecord?.id || thread.rawRecord?.sr || "");

      if (threadSr === targetCallId || threadCallId === targetCallId || thread.id === `call-${targetCallId}`) {
        matched = true;
        const rec = thread.rawRecord || {};
        let existing = [];
        try {
          existing = typeof rec.comment === "string" ? JSON.parse(rec.comment) : [...(rec.comment || [])];
        } catch (_) {
          existing = [];
        }

        const existingIdx = existing.findIndex((c) => {
          if (commentItem.id && c.id && String(c.id) === String(commentItem.id)) return true;
          if (String(c.id).startsWith("local-")) {
            const cText = (c.text || c.comment || "").trim();
            const cFile = (c.FilePath || c.img || "").trim();
            return cText === rawText && cFile === rawFile;
          }
          return false;
        });

        if (existingIdx !== -1) {
          const prev = existing[existingIdx];
          existing[existingIdx] = {
            ...prev,
            ...commentItem,
            id: commentPayload.id || prev.id,
            IsClient: isOwn ? 1 : (commentPayload.IsClient !== undefined ? Number(commentPayload.IsClient) : prev.IsClient ?? 1),
            time: commentItem.time || prev.time,
          };
        } else {
          existing.push(commentItem);
        }

        const isCurrentActive = activeId === thread.id;
        const shouldMarkUnread = !isCurrentActive && !isOwn;

        const formatTimeForThread = (timeStr) => {
          if (!timeStr) return "";
          if (typeof timeStr === "string") {
            const clean = timeStr.trim().replace(/Z$/i, "").replace(" ", "T");
            const d = new Date(clean);
            if (!isNaN(d.getTime())) {
              return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
            }
          }
          const d = new Date(timeStr);
          return !isNaN(d.getTime()) ? d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) : "";
        };

        return {
          ...thread,
          lastMessage: rawText || thread.lastMessage,
          timestamp: commentItem.time ? formatTimeForThread(commentItem.time) : thread.timestamp,
          hasNewComment: shouldMarkUnread,
          unread: shouldMarkUnread,
          rawRecord: {
            ...rec,
            comment: JSON.stringify(existing),
            comments: existing,
            hasNewComment: shouldMarkUnread,
          },
        };
      }
      return thread;
    });

    if (matched) {
      this.rawCalls$.next(updated);
    }
  }

  selectThread(threadId) {
    this.activeThreadId$.next(threadId);

    const rawCalls = this.rawCalls$.getValue();
    const updated = rawCalls.map((t) => {
      if (t.id === threadId) {
        return {
          ...t,
          hasNewComment: false,
          unread: false,
          rawRecord: {
            ...t.rawRecord,
            hasNewComment: false,
          },
        };
      }
      return t;
    });
    this.rawCalls$.next(updated);
  }

  setIsLoading(loading) {
    this.isLoading$.next(loading);
  }
}

export const callStreamService = new CallStreamService();
