import { Home, Person, TrendingUp, SupportAgent, ConfirmationNumber, EmojiObjects } from "@mui/icons-material";
import { Phone as PhoneIcon, School as SchoolIcon, LocalShipping as TruckIcon, MoreHoriz as MoreHorizontalIcon } from "@mui/icons-material";
import ConfirmationNumberRoundedIcon from "@mui/icons-material/ConfirmationNumberRounded";
import LeaderboardRoundedIcon from "@mui/icons-material/LeaderboardRounded";
import { images } from "../assets";
import HomeIcon from '@mui/icons-material/Home';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export const navItems = [
  {
    label: 'Home',
    path: '/',
    icon: <HomeIcon />
  },
  {
    label: "What's New",
    path: '/whats-new',
    icon: <NewReleasesIcon />
  },
  {
    label: 'Help Files',
    path: '/help',
    icon: <HelpOutlineIcon />
  }
];


export const menuItems = [
  { label: "Home", icon: <Home /> },
  { label: "For You", icon: <Person /> },
  { label: "Call Log", icon: <SupportAgent /> },
  { label: "Tickets", icon: <ConfirmationNumber /> },
  { label: "Training", icon: <EmojiObjects /> },
  { label: "Leads", icon: <TrendingUp /> },
];

export const faqData = [
  {
    id: "panel1",
    question: "How does the AI generate content?",
    answer: "Our AI is trained on vast amounts of text data and uses advanced language models to generate human-like text based on your input prompts.",
  },
  {
    id: "panel2",
    question: "Can I customize the AI-generated content?",
    answer: "Our AI is trained on vast amounts of text data and uses advanced language models to generate human-like text based on your input prompts.",
  },
  {
    id: "panel3",
    question: "What types of content can I create?",
    answer: "Our AI is trained on vast amounts of text data and uses advanced language models to generate human-like text based on your input prompts.",
  },
  {
    id: "panel4",
    question: "Is the AI-generated content plagiarism-free?",
    answer: "Our AI is trained on vast amounts of text data and uses advanced language models to generate human-like text based on your input prompts.",
  },
  {
    id: "panel5",
    question: "Does the tool support multiple languages?",
    answer: "Our AI is trained on vast amounts of text data and uses advanced language models to generate human-like text based on your input prompts.",
  },
];

export const helpCategories = [
  {
    TabId: 0,
    id: "call-logs",
    title: "Call Logs",
    description: "Review and manage all incoming and outgoing call activity.",
    src: images.CallogImg,
  },
  {
    TabId: 2,
    id: "delivery-dashboard",
    title: "Delivery Dashboard",
    description: "Track deliveries, view status updates, and manage logistics.",
    src: images.DeliveryDashboardImg,
  },
  {
    TabId: 3,
    id: "ticketing-system",
    title: "Ticketing System",
    description: "Create, assign, and resolve customer or internal support tickets.",
    src: images.TicketSystemImg,
  },
  {
    TabId: 1,
    id: "training-onboarding",
    title: "Training & Onboarding",
    description: "Access training materials to onboard your team efficiently.",
    src: images.TrainingImg,
  },
  {
    TabId: 4,
    id: "leads-crm",
    title: "leads & CRM",
    description: "Manage leads and customer relationships effectively.",
    src: "https://images.ctfassets.net/fo9twyrwpveg/2ol5WIAAYBTUfI2ClYFOel/26295bf2e69d93ddafdeedf90ecb250a/-Partner-_Launching_the_Contentful_Feature_Library_for_SAP_Composable_Storefront.png?fm=webp&w=3840&q=100",
  },
  {
    TabId: 5,
    id: "api-developer-docs",
    title: "API & Developer Docs",
    description: "Find integration guides and API references.",
    src: "https://cf-assets.www.cloudflare.com/zkvhlag99gkb/1Mes42U4gOEy3piPQwOhWs/b4a3515cbd34af478b2cff4e09d933e8/image4-18.png",
  },
  {
    TabId: 5,
    id: "security-compliance",
    title: "Security & Compliance",
    description: "Learn how we protect your data and ensure compliance.",
    src: "https://www.prodwaregroup.com/wp-content/uploads/2019/12/security-compliance-en.png",
  },
];

export const mainTabs = [
  {
    id: "calllog",
    label: "CallLog",
    icon: <PhoneIcon sx={{ fontSize: 16 }} />,
    color: "#fbbf24",
  },
  {
    id: "training",
    label: "Training",
    icon: <SchoolIcon sx={{ fontSize: 16 }} />,
    color: "#3b82f6",
  },
  {
    id: "delivery",
    label: "Delivery",
    icon: <TruckIcon sx={{ fontSize: 16 }} />,
    color: "#10b981",
  },
  {
    id: "ticket",
    label: "Ticket",
    icon: <ConfirmationNumberRoundedIcon sx={{ fontSize: 16 }} />,
    color: "purple",
  },
  {
    id: "lead",
    label: "Leads",
    icon: <LeaderboardRoundedIcon sx={{ fontSize: 16 }} />,
    color: "violet",
  },
  {
    id: "more3",
    label: "More",
    icon: <MoreHorizontalIcon sx={{ fontSize: 16 }} />,
    color: "#9ca3af",
  },
];

export const subTabs = {
  0: ["Active", "Completed", "Pending", "Missed"],
  1: ["Current", "Upcoming", "Completed", "Certificates"],
  2: ["In Transit", "Delivered", "Pending", "Returns"],
  3: ["In Transit", "Delivered", "Pending", "Returns"],
  4: ["In Transit", "Delivered", "Pending", "Returns"],
};
