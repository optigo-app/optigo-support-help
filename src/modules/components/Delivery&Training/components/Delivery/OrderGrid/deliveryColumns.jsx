import AssignmentTooltip from "./AssignmentTooltip";
import DescriptionButton from "./DescriptionButton";
import TrainingActionButton from "./TrainingActionButton";
import SentMailActionButton from "./SentMailActionButton";
import ActionButton from "./ActionButton";
import { ApprovalStatusChip, DeliveryStatusChip, PaymentStatusChip, ServiceTypeChip } from "./CustomChips";
import { Box, Chip, IconButton, Tooltip, Typography } from "@mui/material";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";
import PaymentAction from "./PaymentAction";
import { FormatDateIST, isUpcoming } from "../../../utils/helpers";
import DateTooltip from './DateTooltip';

export const getDeliveryColumns = (HandleFormSave, setShowTrainingForm, setShowDetails, showNotification, isClient, HandleEditMode, setShowDeleteModal, SetOpenCompass) => {
  return [
    {
      field: "index",
      headerName: "ID",

      sortable: false,
      renderHeader: () => <strong>Sr.No</strong>,
      filterable: false,

      renderCell: (params) => {
        return params.api.getRowIndexRelativeToVisibleRows(params.id) + 1;
      },
    },
    {
      field: "ClientCode",
      headerName: "Client",
      width: 170,
      renderHeader: () => <strong>Client</strong>,
    },
    {
      field: "OrderNo",
      headerName: "OrderNo",

      renderHeader: () => <strong>Order No</strong>,
      renderCell: (params) => {
        const isShowing = !isClient && isUpcoming(params?.row?.Status, params?.row?.Date);
        return (
          <Box sx={{ position: "relative", display: "flex", alignItems: "start", flexDirection: "column", maxWidth: '100px', minWidth: '100px' }}>
            {isShowing && (
              <Chip
                label="Upcoming"
                sx={{
                  position: "absolute",
                  top: -13,
                  right: -25,
                  height: 18,
                  fontSize: "0.70rem",
                  px: 0,
                  paddingLeft: 0,
                  paddingRight: 0,
                  bgcolor: "#fdf0ec",
                  color: "#cc5c00",
                  zIndex: 1,
                  textTransform: "uppercase",
                  "& .MuiChip-label": {
                    paddingLeft: "7px",
                    paddingRight: "7px",
                    overflow: "unset",
                    textOverflow: "unset",
                    whiteSpace: "unset",
                  },
                }}
              />
            )}

            <Typography variant="body2" fontSize="0.875rem" mt={0.5}>
              {params?.value}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "TopicType",
      headerName: "Topic Type",

      renderHeader: () => <strong>Topic Type</strong>,
    },
    {
      field: "TicketNo",
      headerName: "Ticket No",
      width: 150,
      renderHeader: () => <strong>Ticket No</strong>,
    },
    // Date
    {
      field: "Date",
      headerName: "Request Date",

      renderHeader: () => <strong>Date</strong>,
      renderCell: (params) => <DateTooltip isClient={isClient} params={params} />,
    },
    {
      field: "Description",
      headerName: "Description",
      renderHeader: () => <strong>Topic & Description</strong>,
      renderCell: (params) => {
        const description = params?.value || "";
        const topic = params?.row?.Topic || "";



        return (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
            }}
          >
            <Typography
              color="text.primary" // Strong, dark text
              variant="subtitle2" fontWeight={600}>
              {topic}
            </Typography>
            <Typography
              color="text.secondary" // Softer, subdued color for secondary text
              variant="body2"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
              title={description}
              fontSize={`13px`}
            >
              {description}
            </Typography>
          </Box>
        );
      }
    },

    {
      field: "CommunicationWith",
      headerName: "Communication With",
      width: 170,
      renderHeader: () => <strong>Communication With</strong>,
    },
    {
      field: "ServiceType",
      headerName: "Service",
      width: 150,
      renderHeader: () => <strong>Service</strong>,
      renderCell: (params) => <ServiceTypeChip isClient={isClient} onSelect={HandleFormSave} rowData={params} type={params?.value?.trim()} />,
    },
    {
      field: "OnDemand",
      headerName: "On Demand",
      width: 150,
      renderHeader: () => <strong>On Demand</strong>,
      renderCell: (params) => <Typography textAlign={"center"} textTransform={'capitalize'} variant="body2">  {params?.value?.trim() ==="yes" ?  "Client" : "Optigo"}</Typography>,
    },
    {
      field: "NoPrints",
      headerName: "No of Quantity",
      width: 110,
      renderHeader: () => <strong>No of Quantity</strong>,
    },
    {
      field: "Assignments",
      headerName: "Assigned To",
      width: 150,
      renderHeader: () => <strong>Estimate</strong>,
      valueFormatter: (params) => params?.value?.join(", "),
      renderCell: (params) => <AssignmentTooltip params={params} />,
    },
    {
      field: "SentMail",
      headerName: "Sent Mail",
      width: 120,
      renderHeader: () => <strong>Sent Mail</strong>,
      renderCell: (params) => <SentMailActionButton SetOpenCompass={SetOpenCompass} showNotification={showNotification} params={params} />,
    },
    {
      field: "PaymentStatus",
      headerName: "Payment Status",
      width: 140,
      renderHeader: () => <strong>Payment Status</strong>,
      renderCell: (params) => <PaymentStatusChip isClient={isClient} onSelect={HandleFormSave} rowData={params} status={params.value?.trim()} />,
    },
    {
      field: "ApprovedStatus",
      headerName: "Approval",
      width: 130,
      renderHeader: () => <strong>Approval</strong>,
      renderCell: (params) => <ApprovalStatusChip isClient={isClient} rowData={params || ""} onSelect={HandleFormSave} status={params.value?.trim()} />,
    },
    {
      field: "Status",
      headerName: "Delivery Status",
      width: 140,
      renderHeader: () => <strong>Delivery Status</strong>,
      renderCell: (params) => <DeliveryStatusChip isClient={isClient} onSelect={HandleFormSave} rowData={params} status={params.value?.trim()} />,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderHeader: () => <strong>{isClient ? "View Details" : "Action"}</strong>,
      renderCell: (params) => <ActionButton onDeleteToggle={() => setShowDeleteModal(params?.row?.SrNo)} onEdit={() => HandleEditMode(params?.row)} isClient={isClient} onOpen={() => setShowDetails(params?.row)} />,
    },
  ];
};
