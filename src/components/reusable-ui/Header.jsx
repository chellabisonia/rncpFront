import React from "react";
import styled from "styled-components";
import PrimaryButton from "../reusable-ui/PrimaryButton.jsx";
import Logo from "../reusable-ui/Logo.jsx";
import { theme } from "../../theme/index.jsx";

export default function Header() {
    return (
        <HeaderContainer>
            <HeaderContent>
                    <Logo />
                <ButtonGroup>
                    <PrimaryButton variant="contained">Connexion</PrimaryButton>
                    <PrimaryButton variant="contained">Inscription</PrimaryButton>
                </ButtonGroup>
            </HeaderContent>
        </HeaderContainer>
    );
}

const HeaderContainer = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 64px;
    background-color: ${theme.colors.nude};
    border-radius: ${theme.fonts.sizes.XXXS};
    border-bottom: 1px solid ${theme.colors.nude};
    z-index: 1000;
    display: flex;
    justify-content: space-between;
`;


const HeaderContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
    
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
    height: auto;
    padding: 8px 0;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;

    button {
      width: 100%;
    }
  }
`;


