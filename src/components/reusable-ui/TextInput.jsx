import TextField from '@mui/material/TextField';
import React from 'react';
import styled from "styled-components";

import { theme } from "../../theme/index.jsx";

export default function TextInput({ variant = "outlined", value, label, onChange, type, placeholder,name }) {
    return (
        <StyledTextField
            name={name}
            label={label}
            value={value ?? ""}
            onChange={onChange}
            type={type}
            placeholder={placeholder}
            variant={variant}
            fullWidth
            autoComplete="off"
            InputLabelProps={{ shrink: true }}
            InputProps={{ disableUnderline: true }}
        />
    );
}
const StyledTextField = styled(TextField)`
    background-color: ${theme.colors.white};
    height: 42px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);

    & .MuiInputBase-input::placeholder {
        color: ${theme.colors.inputDark} !important;  /* ✅ priorité accrue */
        opacity: 0.8; /* sinon MUI réduit la visibilité du placeholder */
    }

    /* Applique la même hauteur au container et à l'input interne */
    & .MuiInputBase-root {
        height: 42px;
        box-sizing: border-box;
    }

    /* Fixe le padding pour éviter que le focus change la hauteur */
    & .MuiInputBase-input {
        padding: 0 12px; /* ajustable */
        height: 100%;
        box-sizing: border-box;
    }
    /* Supprimer le halo/ligne bleue navigateur */
    & .MuiInputBase-root:focus,
    & .MuiOutlinedInput-root:focus,
    & .MuiOutlinedInput-root.Mui-focused {
        outline: none;
        box-shadow: none;
    }
    
    /* Label focus */
    & .MuiInputLabel-root.Mui-focused {
        color: ${theme.colors.inputDark};
    }
    & .MuiInputLabel-root.MuiInputLabel-shrink {
        transform: translate(-4px, -20px) scale(0.85);
        color: ${theme.colors.inputDark};/* monte le label */
        font-size: 16px;
        font-family: ${theme.fonts.family.fontFamily};
        line-height: 20px;
        font-weight: ${theme.fonts.weights.heavy};
    }
`;

