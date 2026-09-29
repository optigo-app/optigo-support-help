import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import theme  from "../constants/Themes";


const MaterialThemeProvider = ({ children }) => (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme} >
            <CssBaseline />
            {children}
        </ThemeProvider>
    </LocalizationProvider>
)

export default MaterialThemeProvider