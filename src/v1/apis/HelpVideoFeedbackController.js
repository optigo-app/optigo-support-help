import { BaseAPI, ApiError } from "./BaseAPI";
import { GetCredentialsFromCookie } from "../utils/AuthUtils";

class HelpVideoFeedbackAPI extends BaseAPI {
  static serviceName = "Ticket";

  /**
   * Resolve Base URL dynamically based on domain and environment
   */
  static getBaseUrl() {
    if (typeof window === "undefined") {
      return process.env.NODE_ENV === "production"
        ? "https://apilx.optigoapps.com/api/report"
        : "http://newnextjs.web/api/report";
    }
    const host = window.location.hostname;
    if (
      host.includes("localhost") ||
      host.includes("nzen") ||
      host.includes("calllog.web")
    ) {
      return "http://newnextjs.web/api/report";
    }
    return process.env.NODE_ENV === "production"
      ? "https://apilx.optigoapps.com/api/report"
      : "http://newnextjs.web/api/report";
  }

  /**
   * Resolve credentials with fallback:
   * 1. BaseAPI configuration (if initialized)
   * 2. Cookies (help_support / skey)
   * 3. Environment & domain-based fallback for third-party / guest logins
   */
  static getResolvedCredentials(serviceName = "Ticket") {
    // 1. Check if BaseAPI has configured service or default config
    const baseConfig = BaseAPI.getConfig(serviceName) || {};
    if (baseConfig.YEAR_CODE && baseConfig.APP_USER_ID) {
      return {
        yearCode: baseConfig.YEAR_CODE,
        sv: baseConfig.SV,
        sp: baseConfig.SP || "14",
        version: baseConfig.VERSION_NO || "_Ticketv4",
        appUserId: baseConfig.APP_USER_ID,
      };
    }

    // 2. Check directly from cookies
    try {
      const cookieUser = GetCredentialsFromCookie();
      if (cookieUser && cookieUser.yc) {
        return {
          yearCode: cookieUser.yc,
          sv:
            cookieUser.sv ??
            (process.env.NODE_ENV === "production" ? "1" : "0"),
          sp: "14",
          version: "_Ticketv4",
          appUserId: cookieUser.userId || cookieUser.uid || "",
        };
      }
    } catch (e) {
      console.warn("Could not retrieve credentials from cookie:", e);
    }

    // 3. Fallback when cookie is absent (third-party login / guest / direct access):
    const isProduction = process.env.NODE_ENV === "production";
    const host =
      typeof window !== "undefined" ? window?.location?.hostname : "";
    const isLocalOrDev =
      host.includes("localhost") ||
      host.includes("nzen") ||
      host.includes("calllog.web") ||
      !isProduction;

    return {
      yearCode: isLocalOrDev
        ? "e3tuemVufX17ezIwfX17e29yYWlsMjV9fXt7b3JhaWwyNX19"
        : "e3tsaXZlMS5vcHRpZ29hcHBzLmNvbX19e3syMH19e3tvcHRpZ29odWJ9fXt7b3B0aWdvaHVifX0=",
      sv: isLocalOrDev ? "0" : "1",
      sp: "14",
      version: "_Ticketv4",
      appUserId: "admin@orail.in",
    };
  }

  /**
   * Standalone requestToApi method with cookie and environment fallback
   */
  static async requestToApi({
    mode,
    params,
    yearCode,
    functionName,
    serviceName = this.serviceName || "Ticket",
    sp,
    version,
    socketEvent,
  }) {
    const creds = this.getResolvedCredentials(serviceName);
    const finalYearCode = yearCode || creds.yearCode;
    const finalVersion = version || creds.version;
    const finalSv = creds.sv;
    const finalSp = sp || creds.sp;
    const finalAppUserId =
      creds.appUserId || params?.UserId || params?.userId || "";

    const headers = {
      "Content-Type": "application/json",
      YearCode: finalYearCode,
      version: finalVersion,
      sv: finalSv,
      sp: finalSp,
    };

    const body = {
      con: JSON.stringify({
        id: "",
        mode,
        appuserid: finalAppUserId,
        ...(socketEvent && { socketEvent }),
      }),
      p: JSON.stringify(params),
      f: `${serviceName} (${functionName})`,
    };

    try {
      const url = this.getBaseUrl();
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new ApiError(
          data.message || `Failed to ${functionName.toLowerCase()}`,
          functionName,
          response
        );
      }

      return data?.Data ?? data;
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(`Error during "${error.functionName}" operation:`, error);
        throw error;
      } else {
        console.error(
          `Unexpected error during "${functionName}" operation:`,
          error
        );
        throw new ApiError(error.message, functionName);
      }
    }
  }

  /**
   * Submit or save video rating / feedback
   * @param {Object} payload
   * @param {number|string} [payload.userId]
   * @param {string} [payload.userName]
   * @param {string} payload.videoName
   * @param {number} [payload.videoLang] 1: English, 2: Hindi
   * @param {string} payload.sectionName
   * @param {number} payload.feedback 1: Like/Helpful, 0: Dislike/Unhelpful
   * @param {string} [payload.comment]
   */
  static async saveFeedback({
    userId,
    userName,
    videoName,
    videoLang,
    sectionName,
    feedback,
    comment,
  }) {
    try {
      const params = {
        UserId: userId ?? 0,
        UserName: userName ?? "",
        VideoName: videoName ?? "",
        VideoLang: videoLang ?? 0,
        SectionName: sectionName ?? "",
        Feedback: feedback ?? 0,
        Comment: comment ?? "",
      };

      const response = await this.requestToApi({
        mode: "SAVE_HELPVIDEO_FEEDBACK",
        params,
        functionName: "SAVE_HELPVIDEO_FEEDBACK",
      });

      return response;
    } catch (error) {
      console.error("Error saving video feedback:", error);
      throw error;
    }
  }

  /**
   * Retrieve video feedback list with optional filters
   * @param {Object} [filter]
   * @param {string} [filter.videoName]
   * @param {string} [filter.sectionName]
   * @param {number} [filter.videoLang]
   * @param {number|string} [filter.userId]
   */
  static async getFeedbackList({
    videoName,
    sectionName,
    videoLang,
    userId,
  } = {}) {
    try {
      const params = {
        VideoName: videoName ?? "",
        SectionName: sectionName ?? "",
        VideoLang: videoLang ?? 0,
        UserId: userId ?? 0,
      };

      const response = await this.requestToApi({
        mode: "GET_HELPVIDEO_FEEDBACK",
        params,
        functionName: "GET_HELPVIDEO_FEEDBACK",
      });

      return response;
    } catch (error) {
      console.error("Error fetching video feedback list:", error);
      throw error;
    }
  }
}

export default HelpVideoFeedbackAPI;
