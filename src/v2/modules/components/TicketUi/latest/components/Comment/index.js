import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useAuth } from "./../../../../../context/UseAuth";
import ReusableConfirmModal from "../ui/Modal";
import CreateComment from "./CreateComment";
import { AttachmentPreview } from "./AttachmentPreview";
import { filesUploadApi } from "./../../../../../../apis/UploadFille";
import { useTicket } from "./../../../../../context/useTicket";

const PreviewImage = styled("img")({
  maxWidth: 200,
  maxHeight: 200,
  borderRadius: 4,
  border: "1px solid #ccc",
});

const TicketComment = ({ setComments, data, showNotification, feedBackModal }) => {
  const [attachment, setAttachment] = useState(null);
  const [fileName, setFileName] = useState("");
  const [Message, setMessage] = useState("");
  const [OfficeUse, setOfficeUse] = useState(false);
  const { updateTicket, AddComment, CloseTicket, handleRefresh } = useTicket();
  const [open, setOpen] = useState(null);
  const [Openpreview, setOpenPreview] = useState(false);
  const { user, CompanyInfo } = useAuth();
  const IsClosed = data?.Status === "Closed";
  const [AttachmentList, setAttachmentList] = useState([]);
  const [isCommenting, setisCommenting] = useState(false);

  const handleAttachmentChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setAttachment(URL.createObjectURL(file));
    }
    const files = Array.from(event.target.files);
    const maxSizeInBytes = 15 * 1024 * 1024; // 15 MB
    const validFiles = [];
    const invalidFiles = [];
    files.forEach((file) => {
      if (file.size <= maxSizeInBytes) {
        const fileNameParts = file.name.split(".");
        const extension = fileNameParts.pop().toLowerCase();
        const fileName = fileNameParts.join(".");

        validFiles.push({
          file,
          name: fileName,
          fileName: file.name,
          extension,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified,
          id: Math.random().toString(),
        });
      } else {
        invalidFiles.push(file);
      }
    });

    // Update state with valid files only
    setAttachmentList((prevList) => [...prevList, ...validFiles]);

    // Notify user about invalid files
    if (invalidFiles.length > 0) {
      const errorMessage = invalidFiles.map((file) => `${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`).join(", ");

      showNotification(`The following files exceed the 15MB limit and were not added:\n\n${errorMessage}`, "error");
    }
    event.target.value = null;
  };

  const HandleRemoveAttachMent = (id) => {
    setAttachmentList((prevList) => prevList.filter((item) => item.id !== id));
  };

  // const HandleCommentEdit = async () => {
  //   setisCommenting(true);
  //   try {
  //     let uploadFilePath = null;
  //     // if (!Message) return;
  //     if (!Message.trim() && AttachmentList.length === 0) {
  //       showNotification("Please add a message or an attachment.", "error");
  //       return;
  //     }

  //     if (AttachmentList.length > 0) {
  //       uploadFilePath = await filesUploadApi({
  //         ukey: CompanyInfo?.ukey,
  //         folderName: "Ticket",
  //         uniqueNo: data?.TicketNo,
  //         attachments: AttachmentList?.map((file) => file.file),
  //       });
  //     }
  //     const newComment = {
  //       TicketNo: data?.TicketNo,
  //       time: new Date().toISOString(),
  //       message: Message,
  //       name: user?.id,
  //       attachment: uploadFilePath?.files
  //         ? {
  //           preview: uploadFilePath.files.map((file) => file.url).join(","),
  //           name: uploadFilePath.files[0]?.fileName,
  //         }
  //         : null,
  //       Role: 1,
  //       isOfficeUseOnly: OfficeUse,
  //     };
  //     const res = await AddComment(newComment);
  //     if (res?.stat_msg === "Comment added successfully") {
  //       setComments((prevComments) => [...prevComments, newComment]);
  //       handleRefresh();
  //       showNotification(" Comment updated successfully", "success");
  //       setMessage("");
  //       setAttachment(null);
  //       uploadFilePath = null;
  //       setAttachmentList([]);
  //       setFileName("");
  //       setOfficeUse(false);
  //     } else {
  //       showNotification(res?.stat_msg, "error");
  //       setMessage("");
  //       setAttachment(null);
  //       uploadFilePath = null;
  //       setAttachmentList([]);
  //       setFileName("");
  //       setOfficeUse(false);
  //     }
  //   } catch (error) {
  //     setisCommenting(false);
  //     console.log(error);
  //   } finally {
  //     setisCommenting(false);
  //   }
  // };


  const HandleCommentEdit = async () => {
  setisCommenting(true);

  try {
    // Validation ---------------------
    if (!Message.trim() && AttachmentList.length === 0) {
      showNotification("Please add a message or an attachment.", "error");
      return;
    }

    // Upload attachments -------------
    let uploadFilePath = null;

    if (AttachmentList.length > 0) {
      uploadFilePath = await filesUploadApi({
        ukey: CompanyInfo?.ukey,
        folderName: "Ticket",
        uniqueNo: data?.TicketNo,
        attachments: AttachmentList.map((file) => file.file),
      });
    }

    // Prepare comment object ---------
    const newComment = {
      TicketNo: data?.TicketNo,
      time: new Date().toISOString(),
      message: Message.trim(),
      name: user?.id,
      attachment: uploadFilePath?.files
        ? {
            preview: uploadFilePath.files.map((file) => file.url).join(","),
            name: uploadFilePath.files[0]?.fileName,
          }
        : null,
      Role: 1,
      isOfficeUseOnly: OfficeUse,
    };

    // API Request --------------------
    const res = await AddComment(newComment);

    if (res?.stat_msg === "Comment added successfully") {
      setComments((prevComments) => [...prevComments, newComment]);
      handleRefresh();
      showNotification("Comment updated successfully", "success");
    } else {
      showNotification(res?.stat_msg || "Something went wrong", "error");
    }

    // Reset Form Values --------------
    resetCommentForm();

  } catch (error) {
    console.log("Comment Add Error:", error);
    showNotification("Unable to add comment", "error");
  } finally {
    setisCommenting(false);
  }
};


  const resetCommentForm = () => {
  setMessage("");
  setAttachment(null);
  setAttachmentList([]);
  setFileName("");
  setOfficeUse(false);
};


  const HandleClosedTicket = () => {
    CloseTicket(data?.TicketNo, 0);
    showNotification(" Ticket closed successfully", "success");
    setOpen(null);
    feedBackModal(data?.TicketNo);
  };

  const HandleMoveToSuggestion = () => {
    updateTicket(data?.TicketNo, { suggested: 1 });
    setOpen(null);
    showNotification(" Ticket moved to suggestion successfully", "info");
  };

  return (
    <>
      <AttachmentPreview open={Openpreview} setOpen={setOpenPreview} attachments={AttachmentList} HandleRemoveAttachMent={HandleRemoveAttachMent} />
      <ReusableConfirmModal
        open={Boolean(open)}
        type={open}
        onClose={() => setOpen(null)}
        onConfirm={() => {
          if (open === "suggest") {
            HandleMoveToSuggestion();
          } else if (open === "close") {
            HandleClosedTicket();
          }
        }}
      />
      {!IsClosed && <CreateComment isCommenting={isCommenting} key={data?.TicketId} setOpenPreview={setOpenPreview} HandleCommentEdit={HandleCommentEdit} Message={Message} setMessage={setMessage} attachment={attachment} fileName={fileName} handleAttachmentChange={handleAttachmentChange} OfficeUse={OfficeUse} setOfficeUse={setOfficeUse} data={data} attachmentsList={AttachmentList} PreviewImage={PreviewImage} setOpen={setOpen} user={user} IsClosed={IsClosed} />}
    </>
  );
};

export default TicketComment;
