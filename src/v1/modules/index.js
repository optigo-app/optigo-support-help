import "./styles/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css/navigation";
import "swiper/css";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Maintheme } from "./libs/DateTheme";
import { AuthProvider } from "./context/UseAuth";
import { TicketProvider } from "./context/useTicket";
import { CallLogProvider } from "./context/UseCallLog";

const Modules = ({ children }) => {
  return (
    <div data-lenis-prevent>
      <AuthProvider>
        <CallLogProvider>
          <TicketProvider>
            <ThemeProvider theme={Maintheme}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <CssBaseline />
                {children}
              </LocalizationProvider>
            </ThemeProvider>
          </TicketProvider>
        </CallLogProvider>
      </AuthProvider>
    </div>
  )
}

export default Modules;