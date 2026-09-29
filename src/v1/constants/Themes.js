import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "4rem",
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 600,
      marginBottom: "0.5rem",
    },
    body1: {
      fontSize: "1.1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.95rem",
    },
    
  },
  palette: {
    mode: "light",
    primary: {
      main: "#2563EB",
      light: "#DBEAFE",
      dark: "#1E40AF",
    },
    secondary: {
      main: "#8B5CF6",
      light: "#EDE9FE",
      dark: "#6D28D9",
    },
    success: {
      main: "#10B981",
      light: "#D1FAE5",
      dark: "#059669",
    },
    warning: {
      main: "#F59E0B",
      light: "#FEF3C7",
      dark: "#D97706",
    },
    error: {
      main: "#EF4444",
      light: "#FEE2E2",
      dark: "#B91C1C",
    },
    info: {
      main: "#3B82F6",
      light: "#DBEAFE",
      dark: "#2563EB",
    },
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
    },
    divider: "rgba(0, 0, 0, 0.05)",
    optigo:{
      main  :"#FFEB3B" ,
      gradient : "#F8F9FA"
    }
  },
  components: {
    MuiTextField: {
      styleOverrides: {
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontSize: "1rem",
          fontWeight: 500,
        },
      },
    },
  },
});

export default theme;
