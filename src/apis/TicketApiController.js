import { BaseAPI } from "./BaseAPI";

class TicketAPI extends BaseAPI {
  static serviceName = "Ticket";

  static async requestToApi({ mode, params, yearCode, functionName ,socketEvent }) {
    return super.requestToApi({
      mode,
      params,
      yearCode,
      functionName,
      serviceName: this.serviceName,
      socketEvent
    });
  }

  // Get Employee List ✅
  static async getEmployeeList(empId) {
    try {
      const params = empId ? { EmpId: empId } : {};
      const response = await this.requestToApi({
        mode: "EMPLOYEE_LIST",
        params,
        functionName: "EMPLOYEE_LIST",
      });
      return response;
    } catch (error) {
      console.error("Error fetching employee list:", error);
      throw error;
    }
  }

  // Get Filter Data  ✅
  static async getMasterData() {
    try {
      const params = {};
      const response = await this.requestToApi({
        mode: "FILTER",
        params,
        functionName: "FILTER",
      });
      return response;
    } catch (error) {
      console.error("Error fetching filter data:", error);
      throw error;
    }
  }

  // Create a new ticket ✅
  static async createTicket({ callLogId, custId, projectId, cateId, appId, subject, description, createdBy, filePath, isClient, CorpId }) {
    try {
      const params = {
        CallLogid: callLogId ?? "",
        CustId: custId ?? "",
        ProjectId: projectId ?? "",
        CateId: cateId ?? "",
        AppId: appId ?? "",
        Subject: subject ?? "",
        Descr: description ?? "",
        CreatedBy: createdBy ?? "",
        FilePath: filePath ?? "",
        IsClient: 1,
        CorpId: CorpId ?? "",
        Role: 0,
        isOfficeUseOnly : 0
      };

      const response = await this.requestToApi({
        mode: "CREATETICKET",
        params,
        functionName: "CREATETICKET",
        socketEvent : 'CreateTicket'

      });

      return response;
    } catch (error) {
      console.error("Error creating ticket:", error);
      throw error;
    }
  }

  // Update an existing ticket
  static async updateTicket({ ticketNo, statusId, appId, cateId, priorityId, followUp1, keywords, sendEmail, promiseDate, createdBy, suggested, star, mainSubject }) {
    try {
      const params = {
        TicketNo: ticketNo || "",
        StatusId: statusId || "",
        AppId: appId || "",
        CateId: cateId || "",
        PriorityId: priorityId || "",
        FollowUp: followUp1 || "",
        Keywords: keywords || "",
        SendEmail: sendEmail || "",
        PromiseDate: promiseDate || "",
        CreatedBy: createdBy || "",
        IsSuggested: suggested || "",
        MainSubject: mainSubject || "",
        Star: star || "",
      };
      // {
      //     const params = {
      //         TicketNo: ticketNo || "",
      //         StatusId: statusId || 0,
      //         AppId: appId || 0,
      //         CateId: cateId || 0,
      //         PriorityId: priorityId || 0,
      //         FollowUp: followUp1 || "",
      //         Keywords: keywords || "",
      //         SendEmail: sendEmail || 0,
      //         PromiseDate: promiseDate || "",
      //         CreatedBy: createdBy || 0,
      //         IsSuggested: suggested || 0,
      //         MainSubject: mainSubject || "",
      //         Star: star || 0,
      //     };

      const response = await this.requestToApi({
        mode: "UPDATETICKET",
        params,
        functionName: "UPDATETICKET",
        socketEvent:'UpdateTicket'
      });

      return response;
    } catch (error) {
      console.error("Error updating ticket:", error);
      throw error;
    }
  }

  // Add a comment to a ticket ✅
  static async addComment({ ticketNo, callLogId, isOfficeUseOnly, comment, filePath, createdBy, Role, CorpId }) {
    console.log(`🚀 ~ TicketAPI ~ addComment ~ { ticketNo, callLogId, isOfficeUseOnly, comment, filePath, createdBy, Role, CorpId }:`, { ticketNo, callLogId, isOfficeUseOnly, comment, filePath, createdBy, Role, CorpId })
    try {
      const params = {
        TicketNo: ticketNo,
        CallLogid: callLogId,
        isOfficeUseOnly: isOfficeUseOnly,
        Comment: comment,
        FilePath: filePath,
        CreatedBy: createdBy,
        Role: 0,
        CorpId: CorpId,
      };

      const response = await this.requestToApi({
        mode: "ADDComment",
        params,
        functionName: "ADDComment",
        socketEvent : 'TicketComment'

      });

      return response;
    } catch (error) {
      console.error("Error adding comment:", error);
      throw error;
    }
  }

  static async CreateCustomerRating({ TicketId, RatingValue, RatingDescription, RatingBy, CorpId }) {
    try {
      const params = { TicketId: TicketId, RatingValue: RatingValue, RatingBy: RatingBy, ...(RatingDescription?.trim() ? { RatingDescription } : {}), CorpId: CorpId };
      const response = await this.requestToApi({
        mode: "ADDRATING",
        params,
        functionName: "ADD RATING",
      });
      return response;
    } catch (error) {
      console.error("Error forwarding call:", error);
      throw error;
    }
  }

  // Get ticket data ✅
  static async getTicketsList({ statusId, projectId, filter, startDate, endDate, searchTerm } = {}) {
    try {
      const params = {
        StatusId: statusId ?? "",
        ProjectID: projectId ?? "",
        Filter: filter ?? "",
        StartDate: startDate ?? "",
        EndDate: endDate ?? "",
        SearchTerm: searchTerm ?? "",
        IsClient: 1,
      };

      const response = await this.requestToApi({
        mode: "TICKETDATA_CUST",
        params,
        functionName: "TICKETDATA_CUST",
      });

      return response;
    } catch (error) {
      console.error("Error fetching tickets:", error);
      throw error;
    }
  }

  // Add a new project
  static async addProject({ projectCode, projectName }) {
    try {
      const params = {
        Projectcode: projectCode,
        Projectname: projectName,
      };

      const response = await this.requestToApi({
        mode: "ADDPROJECT",
        params,
        functionName: "ADDPROJECT",
      });

      return response;
    } catch (error) {
      console.error("Error adding project:", error);
      throw error;
    }
  }

  // Add a new customer
  static async addNewCustomer({ code, projectID, firstName, middleName, lastName, address, mobileNo, emailId, salary, filePath }) {
    try {
      const params = {
        Code: code,
        ProjectID: projectID,
        FirstName: firstName,
        MiddleName: middleName,
        LastName: lastName,
        Address: address,
        MobileNo: mobileNo,
        EmailId: emailId,
        Salary: salary,
        FilePath: filePath,
      };

      const response = await this.requestToApi({
        mode: "NEWCUSTOMER",
        params,
        functionName: "NEWCUSTOMER",
      });

      return response;
    } catch (error) {
      console.error("Error adding new customer:", error);
      throw error;
    }
  }

  // Add a new category
  static async addNewCategory({ code, categoryName, description, displayOrder }) {
    try {
      const params = {
        Code: code,
        categoryname: categoryName,
        Descr: description,
        DisplayOrder: displayOrder,
      };

      const response = await this.requestToApi({
        mode: "NEWCATEGORY",
        params,
        functionName: "NEWCATEGORY",
      });

      return response;
    } catch (error) {
      console.error("Error adding new category:", error);
      throw error;
    }
  }

  // Close a ticket
  static async closeTicket({ ticketNo, createdBy, reopen = 0 , CorpId }) {
    try {
      const params = {
        TicketNo: ticketNo,
        CreatedBy: createdBy,
        Reopen: reopen,
        CorpId: CorpId,
      };

      const response = await this.requestToApi({
        mode: "CLOSETICKET",
        params,
        functionName: "CLOSETICKET",
        socketEvent:'CloseTicket'
      });

      return response;
    } catch (error) {
      console.error("Error closing ticket:", error);
      throw error;
    }
  }

  static async AddFeedBack({ TicketId, RatingValue, RatingDescription, RatingBy, CorpId }) {
    try {
      const params = {
        TicketNo: TicketId,
        RatingValue: RatingValue,
        ...(RatingDescription?.trim() ? { RatingDescription } : {}),
        RatingBy: RatingBy,
        CorpId: CorpId,
      };

      const response = await this.requestToApi({
        mode: "ADDRATING",
        params,
        functionName: "ADDRATING",
        socketEvent:'AddRating'
      });

      return response;
    } catch (error) {
      console.error("Error adding rating:", error);
      throw error;
    }
  }
}

export default TicketAPI;
