import React from 'react';
import styled from "styled-components";
import TextField from '@mui/material/TextField';
import { theme } from "../../theme/index.jsx";

export default function TextInput({ variant = "outlined", value, label, onChange, type, placeholder, }) {
    return (
        <StyledTextField
            variant={variant}
            placeholder={placeholder}
            label={label}
            value={value}
            onChange={onChange}
            type={type}
            InputLabelProps={{
                shrink: true // label toujours au-dessus
            }}
            fullWidth //  s'adapte automatiquement à la largeur du parent
            InputProps={{
                disableUnderline: true // enlève la ligne MUI par défaut
            }}
            autoComplete="off"
        />
    );
}

/*
const StyledTextField = styled(TextField)`
    background-color: ${theme.colors.input};
    border-radius: ${theme.fonts.sizes.P3};
    height: 42px;
    /!* Garder même couleur au focus *!/
    & .MuiFilledInput-root.Mui-focused {
        background-color: ${theme.colors.input};
    }

    /!* Supprimer soulignement bleu (filled) *!/
    & .MuiFilledInput-underline:after {
        border-bottom: 2px solid #d9ad23 !important;
    }

    /!* Label focus *!/
    & .MuiInputLabel-root.Mui-focused {
        color: ${theme.colors.inputDark};
    }

    /!* Coins arrondis *!/
    & .MuiFilledInput-root {
        border-radius: ${theme.fonts.sizes.P3};
    }
`;
*/

const StyledTextField = styled(TextField)`
    background-color: ${theme.colors.input};
    border-radius: ${theme.fonts.sizes.P3};
    height: 42px;

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
 

    /* Bordure focus (variant outlined) */
    & .MuiOutlinedInput-notchedOutline {
        border-color: darkred;
    }
    & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: red;
    }

    /* Label focus */
    & .MuiInputLabel-root.Mui-focused {
        color: ${theme.colors.inputDark};
    }
    & .MuiInputLabel-root.MuiInputLabel-shrink {
        transform: translate(-4px, -15px) scale(0.85);
        color: white;/* monte le label */
        font-size: 14px;
        font-family: ${theme.fonts.family};
        line-height: 20px;
    }
`;

