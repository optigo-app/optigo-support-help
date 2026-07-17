import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react'



const theme = createTheme({
    typography: {
        fontFamily: '"Manrope Variable", sans-serif',
        h4: { fontWeight: 500, fontSize: '1.75rem', color: '#111827' },
        body1: { fontSize: '0.95rem', color: '#374151' },
        body2: { fontSize: '0.875rem', color: '#6B7280' },
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16, // Very rounded corners
                    borderColor: '#F3F4F6',
                    boxShadow: 'none',
                    border: '1px solid #E5E7EB',
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: 24, // Pill shape for selected items
                    padding: '4px 16px',
                    marginBottom: '4px',
                },
            },
        },
    },
});



const ThemeWrapper = ({ children }) => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </>
    )
}

export default ThemeWrapper