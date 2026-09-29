import axios from "axios";
import { hashSHA1 } from "../utils/Encypter";

class AuthController {
  constructor({ headers = {} } = {}) {
    this.baseURL = (() => {
      const host = window?.location?.hostname;
      if (host.includes("localhost") || host.includes("nzen") || host.includes("calllog.web")) {
        return "http://newnextjs.web/api/report";
      }
      return process.env.NODE_ENV === "production" ? "https://apilx.optigoapps.com/api/report" : "http://newnextjs.web/api/report";
    })();



    this.defaultHeaders = {
      "Content-Type": "application/json",
      Authorization: "",
      YearCode: process.env.NODE_ENV === "production" ? "e3tsaXZlMS5vcHRpZ29hcHBzLmNvbX19e3syMH19e3tvcHRpZ29odWJ9fXt7b3B0aWdvaHVifX0=" : "e3tuemVufX17ezIwfX17e29yYWlsMjV9fXt7b3JhaWwyNX19",
      version: "v1",
      sv: process.env.NODE_ENV === "production" ? "1" : "0",
      sp: "28",
      ...headers,
    };

    this.instance = this._createInstance(this.defaultHeaders);
  }

  _createInstance(headers) {
    return axios.create({
      baseURL: this.baseURL,
      timeout: 5000,
      headers,
    });
  }

  /**
   * Update global headers and re-create axios instance.
   */
  setHeaders(headers) {
    this.defaultHeaders = { ...this.defaultHeaders, ...headers };
    this.instance = this._createInstance(this.defaultHeaders);
    return this;
  }

  _post(mode, appUserId, payload, config = {}, isFormName = true) {
    return this.instance.post("", {
      con: JSON.stringify({
        id: "35",
        mode,
        appuserid: appUserId,
        ...(isFormName && { FormName: "AMaster" }),
      }),
      p: JSON.stringify(payload),
      f: "m-test2.orail.co.in (ConversionDetail)",
    }, config);
  }

  changePassword({ oldPassword, newPassword, token }) {
    return this._post("changepassword", "admin@eg.com", {
      token: token,
      oldpassword: hashSHA1(oldPassword),
      password: hashSHA1(newPassword),
    }, {
      headers: {
        // version: "R50B3"
        version: 'R76'
      }
    },
      false
    ).then((res) => {
      console.log(res.data, "res.data");
      return res.data;
    });
  }

  verifyMailUser({ appUserId, userId }) {
    return this._post("verifydetail", appUserId, {
      appuserid: "rajan@eg.com",
      FormName: "AMaster",
      userid: userId
    }).then((res) => {
      return res.data.Data;
    });
  }

  forgotPassword({ appUserId, custId, newPassword }) {
    return this._post("forgetpassword", appUserId, {
      Custid: custId,
      password: hashSHA1(newPassword),
    }).then((res) => {
      return res.data.Data.rd[0]?.Message;
    });
  }

  corpForgotPassword({ appUserId, companyCode, userId }) {
    return this.instance.post("", {
      con: JSON.stringify({
        id: "",
        mode: "corp_forgotpass",
        appuserid: appUserId,
      }),
      p: JSON.stringify({
        companycode: companyCode,
        userid: userId,
      }),
      f: "CorporateLogin (corp_forgotpass)",
    }, {
      headers: {
        // version: "R50B3"
        version: 'R76'
      }
    }).then((res) => {
      return res.data;
    });
  }

  corpResetPassword({ appUserId, token, password }) {
    return this.instance.post("", {
      con: JSON.stringify({
        id: "",
        mode: "corp_reset",
        appuserid: appUserId,
      }),
      p: JSON.stringify({
        token: token,
        password: hashSHA1(password),
      }),
      f: "CorporateLogin (corp_forgotpass)",
    }, {
      headers: {
        // version: "R50B3"
        version: 'R76'
      }
    }).then((res) => {
      return res.data;
    });
  }

  async SendMail({ mails, link, user }) {
    const subject = "Reset your ORAIL account password";
    const message = `Hi ${user}, we received a request to reset your password. Please use the link provided to set a new password. If you didn’t request this, you can ignore this email.`;

    // Browser FormData
    const data = new FormData();
    data.append("fromEmail", "support@orail.in");
    data.append("toEmail", `[${mails}]`);
    data.append("ccEmail", "[]");
    data.append("bccEmail", "[]");
    data.append("replyTo", "support@orail.in");
    data.append("subject", subject);
    data.append("message", message);
    data.append(
      "htmlTemplate",
      `<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f9f9f9;">
         <table width="100%" style="background:#f9f9f9; padding:20px 0;">
          <tr><td align="center">
            <table width="600" style="background:#fff; border-radius:8px; overflow:hidden;">
              <tr><td style="background:#222; color:#fff; padding:20px;">
                <h2 style="margin:0; font-size:20px;">Password Reset Request</h2>
              </td></tr>
              <tr><td style="padding:25px; color:#333; font-size:15px; line-height:1.6;">
                <p>Hi <strong>${user}</strong>,</p>
                <p>We received a request to reset your password. Click below to set a new one:</p>
                <p style="text-align:center; margin:25px 0;">
                  <a href="${link}" target="_blank"
                    style="padding:12px 24px; font-weight:bold; color:#fff; text-decoration:none; background:#4F46E5; border-radius:6px;">
                    Reset Password
                  </a>
                </p>
                <p>If you didn’t request this, ignore this email or contact support.</p>
                <p>This link will expire in <strong>48 hours</strong>.</p>
              </td></tr>
              <tr><td style="background:#f5f5f5; text-align:center; font-size:12px; color:#777; padding:15px;">
                &copy; 2022 Optigo | Cloud ERP for Jewellery Industry All Rights Reserved, ORAIL SERVICES.
              </td></tr>
            </table>
          </td></tr>
         </table>
       </body>`
    );
    data.append("mode", "");
    data.append("ufcc", "test74");
    data.append("templateNo", "0");

    try {
      const response = await axios.post(
        process.env.NODE_ENV === "production"
          ? "https://livenx.optigoapps.com/api/sendemail"
          : "http://newnextjs.web/api/sendemail",
        data,
        {
          headers: {
            YearCode: process.env.NODE_ENV === "production"
              ? "e3tsaXZlLm9wdGlnb2FwcHMuY29tfX17ezIwfX17e3Byb2l0YXNrfX17e3Byb2l0YXNrfX0="
              : "e3tuemVufX17ezIwfX17e29yYWlsMjV9fXt7b3JhaWwyNX19",
            sv: process.env.NODE_ENV === "production" ? "1" : "0",
          },
          maxBodyLength: Infinity,
        }
      );
      console.log("Email sent:", response.data);
      return response.data;
    } catch (err) {
      console.error("SendMail error:", err);
      throw err;
    }
  }
}


export default AuthController;
