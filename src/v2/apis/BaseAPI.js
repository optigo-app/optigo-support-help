import { hashSHA1 } from "../utils/Encypter";

class ApiError extends Error {
  constructor(message, functionName, response) {
    super(message);
    this.name = "ApiError";
    this.functionName = functionName;
    this.timestamp = new Date();
    this.response = response;
  }

  getResponseData() {
    return this.response && this.response.json ? this.response.json() : null;
  }
}

class BaseAPI {
  // static BASE_URL = process.env.NODE_ENV === "production" ? "https://livenx.optigoapps.com/api/report" : "http://newnextjs.web/api/report";
  static BASE_URL = (() => {
    const host = window?.location?.hostname;
    if (
      host.includes("localhost") ||
      host.includes("nzen") ||
      host.includes("calllog.web")
    ) {
      // return "http://192.168.1.71:3001/api/report";
      // return "https://apilx.optigoapps.com/api/report";
      return "http://newnextjs.web/api/report";
    }
    return process.env.NODE_ENV === "production"
      ? "https://apilx.optigoapps.com/api/report"
      : "http://newnextjs.web/api/report";
  })();

  // static BASE_URL = "http://newnextjs.web/api/report";
  static config = {};

  // Service-specific configs
  static serviceConfigs = {};

  /**
   * Initialize configuration for a specific service or general config
   * @param {Object} configValues - Configuration values
   * @param {String} serviceName - Optional service name for service-specific config
   * @returns {Object} The resulting configuration
   */
  static initialize(configValues = {}, serviceName = null) {
    if (serviceName) {
      this.serviceConfigs[serviceName] = {
        ...configValues,
      };
      return this.serviceConfigs[serviceName];
    } else {
      this.config = {
        ...configValues,
      };
      return this.config;
    }
  }

  /**
   * Get configuration for a specific service or default config
   * @param {String} serviceName - Optional service name
   * @returns {Object} Configuration object
   */
  static getConfig(serviceName = null) {
    return serviceName && this.serviceConfigs[serviceName]
      ? this.serviceConfigs[serviceName]
      : this.config;
  }

  /**
   * Get HTTP headers using appropriate configuration
   * @param {String} yearCode - Optional year code override
   * @param {String} serviceName - Optional service name
   * @returns {Object} Headers object
   */
  static getHeaders(yearCode, serviceName = null, sp, version) {
    const config = this.getConfig(serviceName);

    return {
      "Content-Type": "application/json",
      YearCode: yearCode || config.YEAR_CODE,
      version: version || config.VERSION_NO,
      sv: config.SV,
      sp: sp || config.SP,
    };
  }

  /**
   * Make API request using appropriate service configuration
   * @param {Object} options - Request options
   * @returns {Promise} Promise resolving to API response
   */
  static async requestToApi({
    mode,
    params,
    yearCode,
    functionName,
    serviceName = "CallLog",
    sp,
    version,
    socketEvent,
  }) {
    const config = this.getConfig(serviceName);

    const body = {
      con: JSON.stringify({
        id: "",
        mode,
        appuserid: config.APP_USER_ID || this.config.APP_USER_ID,
        ...(socketEvent && { socketEvent }),
      }),
      p: JSON.stringify(params),
      f: `${serviceName} (${functionName})`,
    };

    try {
      const response = await fetch(this.BASE_URL, {
        method: "POST",
        headers: this.getHeaders(yearCode, serviceName, sp, version),
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new ApiError(
          data.message || `Failed to ${functionName.toLowerCase()}`,
          functionName,
          response,
        );
      }

      return data?.Data;
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(`Error during "${error.functionName}" operation:`, error);
        throw error;
      } else {
        console.error(
          `Unexpected error during "${functionName}" operation:`,
          error,
        );
        throw new ApiError(error.message, functionName);
      }
    }
  }

  /**
   * Get authentication token
   * @param {String} userId - User ID
   * @returns {Promise} Promise resolving to token data
   */
  static async getToken(userId, isCorporate = true) {
    console.log("Getting token for user:", userId, "corporate:", isCorporate);

    try {
      const params = { appuserid: userId };
      if (isCorporate) {
        params.corporate = "true";
      }

      const response = await this.requestToApi({
        mode: "gettoken",
        params,
        functionName: "gettoken",
      });

      return response;
    } catch (error) {
      console.error("Error getting token:", error);
      throw error;
    }
  }

  static async OnLogin(username, password, projectCode) {
    try {
      const payload = {
        con: JSON.stringify({
          id: "",
          mode: "corp_login",
          // appuserid: username,
        }),
        p: JSON.stringify({
          companycode: projectCode,
          userid: username,
          password: hashSHA1(password),
        }),
        f: `${username} (support optigo)`,
      };
      const headers = {
        "Content-Type": "application/json",
        version: "v1",
        sp: 28,
        YearCode: "",
        ...(process.env.NODE_ENV === "production" ? { sv: 1 } : { sv: 0 }),
      };

      const response = await fetch(this.BASE_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("🚀 ~ BaseAPI ~ OnLogin ~ result:", result);

      if (result.Status !== "200") {
        return {
          success: false,
          message: result.Message || "Unknown error occurred",
          data: null,
        };
      }

      const userInfo = result.Data?.rd?.[0] || {};
      const userRights = result.Data?.rd1 || [];
      sessionStorage.setItem("API_DATA", JSON.stringify(result.Data));
      sessionStorage?.setItem("userRights", JSON?.stringify(userRights || []));
      if (userInfo.stat !== 1) {
        return {
          success: false,
          status: 401,
          message: userInfo.stat_msg || "Login failed",
          data: null,
        };
      }

      return {
        success: true,
        status: 200,
        message: result.Message || "Login successful",
        data: {
          userInfo,
          userRights,
        },
      };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: error.message || "Something went wrong",
        data: null,
      };
    }
  }
}

export { BaseAPI, ApiError };
