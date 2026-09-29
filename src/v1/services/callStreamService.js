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
      const estatus = rec.Estatus || rec.estatus || rec.Status || rec.status || '';
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

    const rawText = (commentPayload.Comments ?? commentPayload.comment ?? commentPayload.text ?? "").trim();
    const rawFile = (commentPayload.FilePath || commentPayload.img || "").trim();
    const commentItem = {
      id: commentPayload.id || Date.now(),
      text: rawText,
      comment: rawText,
      time: commentPayload.CreatedDate || commentPayload.time || new Date().toISOString(),
      Name: commentPayload.Name || (commentPayload.IsClient ? "Client" : "Support User"),
      CreatedBy: commentPayload.CreatedBy,
      IsClient: commentPayload.IsClient ?? 0,
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
          return (c.text || c.comment || "").trim() === rawText && (c.FilePath || c.img || "").trim() === rawFile;
        });

        if (existingIdx !== -1) {
          existing[existingIdx] = {
            ...existing[existingIdx],
            ...commentItem,
            id: commentPayload.id || existing[existingIdx].id,
          };
        } else {
          existing.push(commentItem);
        }

        const isCurrentActive = activeId === thread.id;
        const isOwn = Boolean(commentPayload.isOwn);
        const shouldMarkUnread = !isCurrentActive && !isOwn;

        return {
          ...thread,
          lastMessage: rawText || thread.lastMessage,
          timestamp: commentItem.time ? new Date(commentItem.time).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) : thread.timestamp,
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
