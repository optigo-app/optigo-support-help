import { Box, Tabs, Card, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { autocompleteClasses } from "@mui/material/Autocomplete";

const StyledSubTabs = styled(Box)(({ theme }) => ({
  padding: "12px 24px",
  backgroundColor: "#f9fafb",
  //   borderBottom: '1px solid #e5e7eb',
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "8px",
}));

const SubTabButton = styled(Button)(({ theme, active }) => ({
  textTransform: "none",
  fontSize: "14px",
  fontWeight: 500,
  padding: "8px 16px",
  borderRadius: "8px",
  minWidth: "auto",
  backgroundColor: active ? "#dbeafe" : "transparent",
  color: active ? "#1d4ed8" : "#6b7280",
  "&:hover": {
    backgroundColor: active ? "#dbeafe" : "#ffffff",
    color: active ? "#1d4ed8" : "#111827",
  },
}));

const ContentCard = styled(Card)(({ theme }) => ({
  padding: "24px",
  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  border: "1px solid #f3f4f6",
  borderRadius: "12px",
}));

const StyledTabs = styled(Tabs)(({ theme, variant }) => ({
  minHeight: "48px",
  "& .MuiTabs-indicator": {
    display: "none",
  },
  "& .MuiTab-root": {
    minHeight: "48px",
    textTransform: "none",
    fontSize: "14px",
    color: "#5f6368",
    backgroundColor: "#f8f9fa",
    border: "none",
    borderRight: "1px solid rgba(85, 85, 85, 0.19)",
    borderBottom: "1px solid rgba(85, 85, 85, 0.19)",
    borderRadius: 0,
    "&:last-child": {
      borderRight: "none",
    },
    "&.Mui-selected": {
      backgroundColor: "#ffffff",
      color: "#1976d2",
      fontWeight: 500,
      borderBottom: "none",
      borderTop: "1px solid rgba(85, 85, 85, 0.19)",
    },
    "&:hover": {
      backgroundColor: "#f1f3f4",
    },
  },
}));

const TabContent = styled(Box)(({ theme, variant }) => ({
  padding: "5px 15px",
  marginTop: "-1px",
  ...(variant === "colored" && {
    backgroundColor: "#428bca",
    color: "white",
  }),
  ...(variant === "standard" && {
    border: "1px solid #dee2e6",
    borderRadius: "0 0 4px 4px",
    "& h3": {
      backgroundColor: "#428bca",
      color: "white",
      padding: "5px 15px",
      margin: 0,
    },
  }),
}));

const Root = styled("div")(({ theme }) => ({
  color: "rgba(0,0,0,0.85)",
  fontSize: "14px",
  ...theme.applyStyles?.("dark", {
    color: "rgba(255,255,255,0.65)",
  }),
}));

const InputWrapper = styled("div")(({ theme }) => ({
  width: "300px",
  border: "1px solid #d9d9d9",
  backgroundColor: "#fff",
  borderRadius: "4px",
  padding: "1px",
  display: "flex",
  flexWrap: "wrap",
  ...theme.applyStyles?.("dark", {
    borderColor: "#434343",
    backgroundColor: "#141414",
  }),
  "&:hover": {
    borderColor: "#40a9ff",
    ...theme.applyStyles?.("dark", {
      borderColor: "#177ddc",
    }),
  },
  "&.focused": {
    borderColor: "#40a9ff",
    boxShadow: "0 0 0 2px rgb(24 144 255 / 0.2)",
    ...theme.applyStyles?.("dark", {
      borderColor: "#177ddc",
    }),
  },
  "& input": {
    backgroundColor: "#fff",
    color: "rgba(0,0,0,.85)",
    height: "30px",
    boxSizing: "border-box",
    padding: "4px 6px",
    width: "100%",
    border: 0,
    margin: 0,
    outline: 0,
    ...theme.applyStyles?.("dark", {
      color: "rgba(255,255,255,0.65)",
      backgroundColor: "#141414",
    }),
  },
}));

const Listbox = styled("ul")(({ theme }) => ({
  width: "300px",
  margin: "2px 0 0",
  padding: 0,
  position: "absolute",
  listStyle: "none",
  backgroundColor: "#fff",
  overflow: "auto",
  maxHeight: "250px",
  borderRadius: "4px",
  boxShadow: "0 2px 8px rgb(0 0 0 / 0.15)",
  zIndex: 1,
  ...theme.applyStyles?.("dark", {
    backgroundColor: "#141414",
  }),
  "& li": {
    padding: "5px 12px",
    display: "flex",
    "& span": {
      flexGrow: 1,
    },
    "& svg": {
      color: "transparent",
    },
  },
  "& li[aria-selected='true']": {
    backgroundColor: "#fafafa",
    fontWeight: 600,
    ...theme.applyStyles?.("dark", {
      backgroundColor: "#2b2b2b",
    }),
    "& svg": {
      color: "#1890ff",
    },
  },
  [`& li.${autocompleteClasses.focused}`]: {
    backgroundColor: "#e6f7ff",
    cursor: "pointer",
    ...theme.applyStyles?.("dark", {
      backgroundColor: "#003b57",
    }),
    "& svg": {
      color: "currentColor",
    },
  },
}));

export { StyledTabs, StyledSubTabs, SubTabButton, ContentCard, TabContent, Root, InputWrapper, Listbox };
