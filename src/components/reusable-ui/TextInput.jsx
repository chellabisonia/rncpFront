import React from 'react';
import styled from "styled-components";
import TextField from '@mui/material/TextField';
import { theme } from "../../theme/index.jsx";

export default function TextInput({ variant = "outlined", value, label, onChange, type }) {
    return (
        <StyledTextField
            variant={variant}
            label={label}
            value={value}
            onChange={onChange}
            type={type}
            InputLabelProps={{
                shrink: true // label toujours au-dessus
            }}
            fullWidth //  s'adapte automatiquement à la largeur du parent
        />
    );
}

const StyledTextField = styled(TextField)`
    background-color: ${theme.colors.input};
    border-radius: ${theme.fonts.sizes.P3};
    height: 42px;
    /* Garder même couleur au focus */
    & .MuiFilledInput-root.Mui-focused {
        background-color: ${theme.colors.input};
    }

    /* Supprimer soulignement bleu (filled) */
    & .MuiFilledInput-underline:after {
        border-bottom: 2px solid #d9ad23 !important;
    }

    /* Label focus */
    & .MuiInputLabel-root.Mui-focused {
        color: ${theme.colors.inputDark};
    }

    /* Coins arrondis */
    & .MuiFilledInput-root {
        border-radius: ${theme.fonts.sizes.P3};
    }
`;
