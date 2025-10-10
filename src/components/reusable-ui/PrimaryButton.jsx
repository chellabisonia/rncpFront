import React from 'react';
import styled from "styled-components";
import Button from '@mui/material/Button';
import { theme } from "../../theme/index.jsx";

export default function PrimaryButton({ variant, onClick, children, type }) {
    return (
        <StyledButton
            variant={variant}
            onClick={onClick}
            type={type}
        >
            {children}
        </StyledButton>
    );
}

const StyledButton = styled(Button)`
    background-color: ${theme.colors.inputDark};
    color: ${theme.colors.white};
    font-weight: ${theme.fonts.weights};
    cursor: pointer;
    border-radius: ${theme.borderRadius.extraRound};
    font-size: ${theme.fonts.sizes.SM};
    font-family: ${theme.fonts.family};
    text-transform: none;
    padding: 8px 20px;
    min-width: 120px; /* évite trop petit */
    width: auto; /* s'adapte à son contenu */
    box-shadow: none;

    &:hover {
        background-color: ${theme.colors.inputDark};
        opacity: 0.9;
        box-shadow: none;
    }
`;
