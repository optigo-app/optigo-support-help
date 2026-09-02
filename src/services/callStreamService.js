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

      return {
        id,
        sr,
        name: app,
        company: rec.company || rec.ProjectName || '',
        callBy: caller,
        receivedBy: rec.receivedBy || rec.createdBy || rec.CreatedBy || rec.AssignedEmpName || '',
        lastMessage: desc || app,
        timestamp: time,
        date,
        status: status || estatus,
        estatus: estatus,
        duration: duration,
        DeptName: app,
        rating,
        feedback,
        unread: false,
        online: true,
        rawRecord: {
          ...rec,
          sr,
          id: rec.id || sr,
          company: rec.company || rec.ProjectName || '',
          callBy: caller,
          receivedBy: rec.receivedBy || rec.createdBy || rec.CreatedBy || rec.AssignedEmpName || '',
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

  selectThread(threadId) {
    this.activeThreadId$.next(threadId);
  }

  setIsLoading(loading) {
    this.isLoading$.next(loading);
  }
}

export const callStreamService = new CallStreamService();
