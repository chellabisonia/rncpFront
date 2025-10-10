
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { theme } from './theme/index.jsx'
import './index.css'

// 🔹 Création du thème MUI avec ta police accessible
const muiTheme = createTheme({
    typography: {
        fontFamily: "'Atkinson Hyperlegible', sans-serif",
    },
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/* 🔹 On entoure d'abord par le ThemeProvider de MUI */}
        <MuiThemeProvider theme={muiTheme}>
            {/* 🔹 Puis ton thème Styled Components (pour cohérence des couleurs, etc.) */}
            <StyledThemeProvider theme={theme}>
                <App />
            </StyledThemeProvider>
        </MuiThemeProvider>
    </React.StrictMode>,
)
