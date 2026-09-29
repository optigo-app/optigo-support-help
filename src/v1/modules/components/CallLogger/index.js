import CallLogManagementApp from "./CallLogger";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Maintheme } from "../../libs/DateTheme";

const CallLogDashBoard = () => {
    return (
        <div>
            <ThemeProvider theme={Maintheme}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <CssBaseline />
                    <CallLogManagementApp />
                </LocalizationProvider>
            </ThemeProvider>
        </div>
    );
};

export default CallLogDashBoard;
