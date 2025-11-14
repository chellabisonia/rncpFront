import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { CssBaseline } from '@mui/material';
import { theme as customTheme } from './theme/index.jsx';
import './index.css';

const muiTheme = createTheme({
    typography: {
        fontFamily: "'Atkinson Hyperlegible', sans-serif",
    },
});

// 2) Fusionne les thèmes : on part de MON thème, puis on écrase par le thème MUI
// => les clés MUI (spacing, palette, breakpoints, etc.) gagnent
// => mes tokens restent accessibles (colors, etc.)
const mergedTheme = {
    ...customTheme,
    ...muiTheme,
    // (optionnel) pour éviter tout risque de collision à l'avenir,
    // je dois exposer mon thème custom sous une clé dédiée :
    // app: customTheme,
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/* On passe EXACTEMENT le même objet de thème aux deux providers */}
        <MuiThemeProvider theme={mergedTheme}>
            <CssBaseline />
            <StyledThemeProvider theme={mergedTheme}>
                <App />
            </StyledThemeProvider>
        </MuiThemeProvider>
    </React.StrictMode>,
);

