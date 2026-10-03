import { createContext, useCallback, useContext, useState, useEffect, useMemo, useRef } from "react";
import { format } from "date-fns";
import CallLogApi from "../../apis/CallLogApiController";
import { useAuth } from './UseAuth';
import { useSocketEvent } from "../hooks/useSocketListener";
import { commentUpdates$ } from "../../rxjs/commentEvents";

const isValidCommentPayload = (data) => {
  if (!data || typeof data !== "object") return false;
  const callId = data.CallLogId ?? data.sr ?? data.callLogId;
  if (!callId || isNaN(Number(callId)) || Number(callId) <= 0) return false;
  if (data.Comments === undefined && data.comment === undefined && data.text === undefined) return false;
  return true;
};

const getLocalISOString = () => {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const padMs = (n) => String(n).padStart(3, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}.${padMs(now.getMilliseconds())}`;
};

const appendCommentToCall = (callRecord, commentPayload) => {
  if (!callRecord) return callRecord;
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
    isNew: Boolean(commentPayload.isNew),
  };
  let existing = [];
  try {
    existing = typeof callRecord.comment === "string" ? JSON.parse(callRecord.comment) : [...(callRecord.comment || [])];
  } catch (_) { existing = []; }
  // Deduplicate by ID OR matching pending local comment with same text + attachment
  const existsIdx = existing.findIndex((c) => {
    if (commentItem.id && c.id && String(c.id) === String(commentItem.id)) return true;
    if (String(c.id).startsWith("local-")) {
      const cText = (c.text || c.comment || "").trim();
      const cFile = (c.FilePath || c.img || "").trim();
      return cText === rawText && cFile === rawFile;
    }
    return false;
  });
  if (existsIdx !== -1) {
    const prev = existing[existsIdx];
    existing[existsIdx] = {
      ...prev,
      ...commentItem,
      id: commentPayload.id || prev.id,
      IsClient: isOwn ? 1 : (commentPayload.IsClient !== undefined ? Number(commentPayload.IsClient) : prev.IsClient ?? 1),
      time: commentItem.time || prev.time,
    };
  } else {
    existing.push(commentItem);
  }
  return {
    ...callRecord,
    comment: JSON.stringify(existing),
    comments: existing,
  };
};

const CallLogContext = createContext(null);

export function CallLogProvider(props) {
  const { user, isAuthenticated } = useAuth()
  const [callLog, setCallLog] = useState([])
  const [CurrentCall, setCurrentCall] = useState(null);
  const currentTime = format(new Date(), "hh:mm a");
  const [masterData, setMasterData] = useState(() => {
    const stored = sessionStorage.getItem("masterData");
    return stored ? JSON.parse(stored) : { master: null, employees: null };
  });
  const isFilterActiveRef = useRef(false); // <- shared mutable ref
  const EMPLOYEE_LIST = masterData?.employees || [];
  const COMPANY_LIST = masterData?.master?.rd || [];
  const APPNAME_LIST = masterData?.master?.rd1 || [];
  const STATUS_LIST = masterData?.master?.rd2?.map((val) => ({ value: val?.StatusID, label: val?.Name })) || [];
  const PRIORITY_LIST = masterData?.master?.rd3?.map((val) => ({ value: val?.PriorityID, label: val?.Name })) || [];
  const ESTATUS_LIST = masterData?.master?.rd6?.map((val) => ({ value: val?.StatusID, label: val?.Name })) || [];
  const COMPANY_INFO_MASTER = masterData?.master?.rd7 || [];
  const INTERNAL_STATUS_LIST = "INTERNAL_STATUS";
  const INTERNAL_ESTATUS_LIST = "INTERNAL_ESTATUS";
  const location = window.location;

  const companyOptions = COMPANY_LIST.map((option) => ({
    label: option?.ProjectCode,
    value: option?.ProjectID,
  })) || [];

  const departmentsNames = (EMPLOYEE_LIST || []).reduce((acc, emp) => {
    const key = emp?.designation || "Other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(emp);
    return acc;
  }, {});

  const forwardOption = Object.entries(departmentsNames).flatMap(([designation, people]) =>
    people.map((emp) => ({
      designation,
      person: emp?.user,
      id: `${emp?.DesignaitonId},${emp?.userid}`,
    }))
  );

  const [refreshList, setrefreshList] = useState(false);

  useEffect(() => {
    const GetMasterData = async () => {
      try {
        const [master, employees] = await Promise.all([
          CallLogApi.getMasterData(),
          CallLogApi.getEmployeeMasterD()
        ]);
        const data = { master, employees: employees?.rd };
        setMasterData(data);
        sessionStorage.setItem("masterData", JSON.stringify(data));
      } catch (err) {
        console.error("Error fetching master data:", err.message);
      }
    };
    if (!sessionStorage.getItem("masterData")) {
      GetMasterData();
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const savedSearch = params.get("search") || "";
    const savedCompanyStatus = params.get("companyStatus") || "";
    const savedStatus = params.get("status") || "";
    const savedTarget = params.get("target") || "";
    const start = params.get("start");
    const end = params.get("end");

    const GetAllCallLogs = async () => {
      try {
        const data = await CallLogApi.getCallLogs({
          endDate: end || "",
          startDate: start || "",
          statusId: savedStatus || "",
          projectId: savedCompanyStatus || "",
          filter: savedTarget || "",
          searchTerm: savedSearch || "",
        });
        const list =
          data?.rd ||
          data?.Data?.rd ||
          data?.data?.rd ||
          (Array.isArray(data) ? data : []);
        setCallLog(list);
      } catch (error) {
        console.log(error);
      }
    };
    if (!user) return;
    GetAllCallLogs();
  }, [refreshList]);


  const addCall = useCallback(async (call, isConcurrent) => {
    try {
      const data = await CallLogApi.addCall({
        appID: call?.appname ,
        createdBy: call?.receivedBy,
        customerName: call?.callBy,
        deptId: call?.forward && call?.forward?.split(",")[0],
        empId: call?.forward && call?.forward?.split(",")[1],
        description: call?.description,
        entryDate: call?.date,
        projectID: call?.company ,
        CorpId: call?.CorpId ,
        source: call?.source || "helpdesk",
        isClient: call?.isClient ?? 1,
        filePath: call?.filePath || "",
        comments: call?.comments || "",
      });
      const newCall = data?.rd1?.[0] || data?.rd?.[0];
      setrefreshList((prev) => !prev);

      if (!isConcurrent && newCall) {
        setCurrentCall(newCall);
      }
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
    [callLog, setCallLog, user?.id]
  );

  const editCall = useCallback(async (callId, updatedFields) => {
    try {
      const data = await CallLogApi.editCallApi(
        callId,
        updatedFields.CreatedBy,
        updatedFields.CustomerName,
        updatedFields.PriorityId,
        updatedFields.ParentId,
        updatedFields.Descr,
        updatedFields.EmpId,
        updatedFields.DeptId,
        updatedFields.StatusId,
        updatedFields.Estatus,
        updatedFields.calldetails,
        updatedFields.EntryDate,
      )
      // const updatedCall = data?.rd1?.[0];
      // setCurrentCall(updatedCall);
      setrefreshList((prev) => !prev);

    } catch (error) {
      console.log(error)
    }
  },
    [callLog, setCallLog]
  );

  const UpdateStatusAndPriority = useCallback(async (callId, updatedFields, type) => {
    let data;
    try {
      if (INTERNAL_STATUS_LIST == type) {
        data = await CallLogApi.changeInternalStatus({
          callLogId: callId,
          ...updatedFields,
        })
      } else {
        data = await CallLogApi.changeExternalStatusAndPriority({
          callLogId: callId,
          ...updatedFields,
        })
      }
      setrefreshList((prev) => !prev);

      console.log(data, type)
    } catch (error) {
      console.log(error)
    }
  }, [callLog, setCallLog])

  // Call Forward API
  const ForwardCall = useCallback(async (callId, updatedFields) => {
    try {
      const data = await CallLogApi.forwardCall({
        callLogId: callId,
        ...updatedFields
      })
      const updatedCall = data?.rd1?.[0];
      setCurrentCall(updatedCall);
      setrefreshList((prev) => !prev);

    } catch (error) {
      console.log(error)
    }
  },
    [callLog, setCallLog]
  );
  const startCall = useCallback(
    async (callId) => {
      try {
        const data = await CallLogApi.startCall({
          callLogId: callId,
          createdBy: user?.id
        });

        const rdStatus = data?.rd?.[0];
        const rd1Status = data?.rd1?.[0];

        if (rd1Status?.stat === 0 || rd1Status?.stat_code === 1001 || rdStatus?.stat === 0 || rdStatus?.stat_code === 1001) {
          const errorMessage = rdStatus?.stat_msg || rd1Status?.stat_msg || "Unknown error.";
          const errorCode = rdStatus?.stat_code || rd1Status?.stat_code || 500;
          return { success: false, error: new Error(errorMessage), errorCode };
        }

        setCurrentCall(data?.rd1?.[0]);
        setrefreshList((prev) => !prev);
        return { success: true, data };

      } catch (err) {
        console.error("Error starting call:", err);
        return { success: false, error: err };
      }
    },
    [user?.id, setCurrentCall, setrefreshList]
  );

  const endCall = useCallback(
    async (callId) => {
      try {
        const data = await await CallLogApi.endCall({
          callLogId: callId,
          createdBy: user?.id
        })
        // setCurrentCall(data?.rd1?.[0]);
        setrefreshList((prev) => !prev);

      } catch (error) {
        console.log(error)
      }

    },
    [callLog, setCallLog]
  );

  const PauseCall = useCallback(
    async (callId) => {
      try {
        const data = await await CallLogApi.pauseCall({
          callLogId: callId,
        })
        setrefreshList((prev) => !prev);

      } catch (error) {
        console.log(error)
      }

    },
    [callLog, setCallLog]
  );

  const AcceptQueueCall = useCallback(
    async (callId) => {
      try {
        const data = await await CallLogApi.AcceptCall({
          callLogId: callId,
          createdBy: user?.id
        })
        console.log(data, "Accept Queue Call")
        setrefreshList((prev) => !prev);

      } catch (error) {
        console.log(error)
      }

    },
    [callLog, setCallLog]
  );

  const ResumeCall = useCallback(
    async (callId) => {
      try {
        const data = await await CallLogApi.resumeCall({
          callLogId: callId,
        })
        setrefreshList((prev) => !prev);
      } catch (error) {
        console.log(error)
      }

    },
    [callLog, setCallLog]
  );

  const ConCurrentCall = useCallback(
    async (callId) => {
      try {
        // const data = await await CallLogApi.ConcurrentCall({
        //   callLogId: callId,
        // })
        //         setrefreshList((prev) => !prev);

      } catch (error) {
        console.log(error)
      }

    }, [callLog, setCallLog]
  )

  const updateCallLog = useCallback(
    (updateFn) => {
      setCallLog((prev) => {
        const updated = updateFn(prev);
        const current = updated.find((c) => c.id === CurrentCall?.id);
        if (current) setCurrentCall(current);
        return updated;
      });
    },
    [CurrentCall, setCallLog, setCurrentCall]
  );

  const addComment = useCallback(
    async (callId, comment, img, createdBy) => {
      const authorName =
        `${user?.firstname || ""} ${user?.lastname || ""}`.trim() ||
        user?.fullName ||
        user?.Name ||
        "Client";
      const commentPayload = {
        id: `local-${Date.now()}`,
        CallLogId: callId,
        Comments: comment,
        FilePath: img || "",
        CreatedDate: getLocalISOString(),
        CreatedBy: createdBy,
        IsClient: 1,
        Name: authorName,
        isNew: true,
        isOwn: true,
      };

      // Optimistically append comment to in-memory callLog
      setCallLog((prev) =>
        prev.map((c) =>
          String(c.sr || c.id) === String(callId)
            ? appendCommentToCall(c, commentPayload)
            : c
        )
      );

      // Broadcast to comment stream so active workspace and listeners receive it smoothly
      commentUpdates$.next(commentPayload);

      try {
        const data = await CallLogApi.addCallComments(
          callId,
          comment,
          img,
          createdBy
        );
        return data;
      } catch (error) {
        console.error("Error adding comment in CallLogProvider:", error);
        throw error;
      }
    },
    [user]
  );

  const addFeedback = useCallback(
    async (callId, feedback, ratingByCustomer, contactMe, createdBy) => {
      try {
        const data = await CallLogApi.addFeedback(
          {
            callLogId: callId,
            feedback,
            ratingByCustomer,
            contactMe,
            createdBy
          }
        )
        console.log(data, "data")
        setrefreshList((prev) => !prev);
      } catch (error) {

      }
    },
    [updateCallLog, currentTime]
  );


  const queue = useMemo(() => {
    return [...callLog].filter((val) => !val?.receivedBy)?.sort((a, b) => new Date(b?.date) - new Date(a?.date));
  }, [callLog]);

  const forwardedCalls = useMemo(() => {
    const fullName = `${user?.firstname || ""} ${user?.lastname || ""}`.trim().toLowerCase();
    const designation = user?.designation?.toLowerCase();

    return [...callLog]
      .filter((val) => {
        const assignedName = val?.AssignedEmpName?.toLowerCase();
        const deptName = val?.DeptName?.toLowerCase();
        const isForwarded = !!assignedName && !!deptName;

        const isAssignedToCurrentUser =
          assignedName === fullName && deptName === designation;

        const isNotClosed = !val?.callClosed;

        return isForwarded && isAssignedToCurrentUser && isNotClosed;
      })
      .sort((a, b) => new Date(b?.date) - new Date(a?.date));
  }, [callLog]);



  const clearCallUnread = useCallback((callId) => {
    if (!callId) return;
    setCallLog((prev) =>
      prev.map((c) =>
        String(c.sr || c.id) === String(callId) ? { ...c, hasNewComment: false } : c
      )
    );
  }, []);

  useSocketEvent("AddCall", (data) => {
    setrefreshList((prev) => !prev);
    // setCallLog((prev) => [data, ...prev]);
  });

  // Push incoming socket event into RxJS stream
  useSocketEvent("ADDCOMMENTS", (data) => {
    if (!isValidCommentPayload(data)) return;
    const currentUserName =
      `${user?.firstname || ""} ${user?.lastname || ""}`.trim() ||
      user?.fullName ||
      user?.Name ||
      "";
    const isOwn = user?.id && String(data.CreatedBy) === String(user.id);
    const isClientVal = isOwn || data.IsClient === 1 || data.IsClient === "1" ? 1 : (data.IsClient !== undefined ? Number(data.IsClient) : 1);
    const enrichedName =
      data.Name ||
      (isOwn ? currentUserName : isClientVal ? "Client" : "Support User");

    commentUpdates$.next({
      ...data,
      Name: enrichedName,
      isOwn: Boolean(isOwn),
      IsClient: isClientVal,
    });
  });

  // Reactively update in-memory call list and mark unread
  useEffect(() => {
    const sub = commentUpdates$.subscribe((commentData) => {
      if (!isValidCommentPayload(commentData)) return;
      const targetCallId = commentData.CallLogId ?? commentData.sr ?? commentData.callLogId;
      setCallLog((prev) =>
        prev.map((c) =>
          String(c.sr || c.id) === String(targetCallId)
            ? {
                ...appendCommentToCall(c, commentData),
                hasNewComment: commentData.isOwn ? false : true,
              }
            : c
        )
      );
    });
    return () => sub.unsubscribe();
  }, []);

  // Accept Call Events
  useSocketEvent("AcceptCall", (data) => {
    setrefreshList((prev) => !prev);
    // setCallLog((prev) => {
    //   return prev.map((c) => (c.sr === data.sr ? { ...c, ...data } : c));
    // });
  });

  // Forwarded Call Events
  useSocketEvent("ForwardedCall", (data) => {
    setrefreshList((prev) => !prev);
    // setCallLog((prev) => {
    //   const exists = prev.some((c) => c.sr === data.sr);
    //   return exists ? prev.map((c) => (c.sr === data.sr ? { ...c, ...data } : c)) : [data, ...prev];
    // });
  });


  const contextValue = useMemo(
    () => ({
      queue,
      forwardedCalls,
      addComment,
      callLog,
      setCallLog,
      clearCallUnread,
      refreshList,
      setrefreshList,
      addCall,
      editCall,
      startCall,
      endCall,
      CurrentCall,
      setCurrentCall,
      masterData,
      EMPLOYEE_LIST,
      COMPANY_LIST,
      APPNAME_LIST,
      companyOptions,
      departmentsNames,
      forwardOption,
      ForwardCall,
      STATUS_LIST,
      ESTATUS_LIST,
      PRIORITY_LIST,
      UpdateStatusAndPriority,
      INTERNAL_STATUS_LIST,
      INTERNAL_ESTATUS_LIST,
      PauseCall,
      ResumeCall,
      AcceptQueueCall,
      ConCurrentCall,
      isFilterActiveRef,
      COMPANY_INFO_MASTER,
      addFeedback
    }),
    [queue, callLog, CurrentCall, masterData, clearCallUnread, refreshList]
  );
  return <CallLogContext.Provider value={contextValue}>{props.children}</CallLogContext.Provider>;
}

export function useCallLog() {
  if (!useContext(CallLogContext)) {
    throw new Error("useCallLog must be used within a CallLogProvider");
  }
  return useContext(CallLogContext);
}
