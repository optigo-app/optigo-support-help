import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import { FaWpforms } from "react-icons/fa6";
import { LuTickets } from "react-icons/lu";
import PermPhoneMsgRoundedIcon from "@mui/icons-material/PermPhoneMsgRounded";
import SendTimeExtensionRoundedIcon from "@mui/icons-material/SendTimeExtensionRounded";
import { Link } from "react-router-dom";
import { useUserRights } from "../../modules/hooks/useUserRights";
import { useAuth } from "../../modules/context/UseAuth";
import Cookies from "js-cookie";
import CallLogDashBoard from "../../modules/components/CallLogger";
import DeliveryDashboard from "../../modules/components/Delivery&Training/components/Delivery/Main";
import TrainingDashboard from "../../modules/components/Delivery&Training/components/Training/Main";
import TicketUiClient from "../../modules/components/TicketUi/latest/components/index";
import SupportWorkspace from "../SupportDesk";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

export const featureCards = [
  {
    icon: <PermPhoneMsgRoundedIcon style={{ fontSize: 40, color: "#2196F3" }} />,
    title: "Calllogs & Request",
    description: `Need help? Leave your request, and we'll call you back shortly.`,
    TabId: 0,
    id: "call-logs",
    slug: "CallLog",
    SystemId: 18290,
    components: <CallLogDashBoard />
  },
  {
    icon: <LuTickets style={{ fontSize: 40, color: "#FF9800" }} />,
    description: "Organized ticket tracking, made simple and effective.",
    TabId: 1,
    id: "ticketing-system",
    title: "Tickets",
    slug: "Ticket",
    SystemId: [18294, 18262],
    components: <TicketUiClient />
  },
  {
    icon: <SendTimeExtensionRoundedIcon sx={{ fontSize: 40, color: "#4CAF50" }} />,
    description: "No more guessing, know what’s happening with your orders, right here.",
    TabId: 2,
    id: "delivery-dashboard",
    title: "Orders",
    slug: 'Order Delivery Dashboard',
    SystemId: 18291,
    components: <DeliveryDashboard />
  },
  {
    icon: <FaWpforms style={{ fontSize: 40, color: "#9C27B0" }} />,
    title: "Trainings",
    description: "Stay informed with a full overview of your training journey.",
    TabId: 3,
    id: "training-onboarding",
    slug: 'Training Dashboard',
    SystemId: 18292,
    components: <TrainingDashboard />
  },
  {
    icon: <SupportAgentIcon sx={{ fontSize: 40, color: "#6900C6" }} />,
    title: "SupportDesk",
    description: "Enterprise communication and support tickets workspace.",
    TabId: 4,
    id: "support-desk",
    slug: 'SupportDesk',
    SystemId: null,
    components: <SupportWorkspace />
  },
];

const FeatureSection = () => {
  const [userRights] = useUserRights();
  const { isThirdParty } = useAuth();
  const isIframe = window.self !== window.top;
  const isSkey = !!Cookies.get("skey");
  if (isIframe && isSkey) return null;

  const rightsSet = new Set(
    (userRights || [])
      .map((r) => r?.id)
      .filter(Boolean)
  );

  const visibleCards = featureCards.filter((card) => {
    const hasRight =
      card?.SystemId == null
        ? true
        : Array.isArray(card?.SystemId)
        ? card.SystemId.some((id) => rightsSet.has(id))
        : rightsSet.has(card?.SystemId);

    const cardSystemIds = Array.isArray(card?.SystemId)
      ? card.SystemId
      : card?.SystemId ? [card?.SystemId] : [];

    const isExcludedThirdParty =
      isThirdParty &&
      cardSystemIds.some((id) =>
        [18290, 18294, 18262, 18291, 18292].includes(id)
      );

    return hasRight && !isExcludedThirdParty;
  });

  const handleClick = (id) => {
    localStorage.setItem("currentCategory_id", id);
  };

  if (visibleCards.length === 0) return null;

  return (
    <Grid container spacing={4} sx={{ mb: 8 }}>
      {visibleCards?.map((card, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card
            onClick={() => handleClick(Number(card.TabId))}
            sx={{
              height: "100%",
              textAlign: "center",
              p: 2,
              cursor: "pointer",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 3,
              },
            }}
          >
            <Link
              to={`/${card?.TabId}/category/${encodeURI(card?.title)}`}
              style={{ all: "unset" }}
            >
              <CardContent>
                <Box sx={{ mb: 2 }}>{card.icon}</Box>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
              </CardContent>
            </Link>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default FeatureSection;
