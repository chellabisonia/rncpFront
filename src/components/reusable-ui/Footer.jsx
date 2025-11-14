import React from "react";
import styled from "styled-components";

import { theme } from "../../theme/index.jsx";

export default function Footer() {
    return (
        <FooterContainer>
            <LeftSection>
                <FooterLink href="#">Pourquoi nous choisir ?</FooterLink>
            </LeftSection>
            <RightSection>
                <FooterLink href="#">Contact</FooterLink>
                <FooterLink href="#">À propos de nous</FooterLink>
                <FooterLink href="#">CGU</FooterLink>
            </RightSection>
        </FooterContainer>
    );
}

const FooterContainer = styled.footer`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${theme.colors.white};
    padding: 1rem 2rem;
    font-size: 0.9rem;
    border-bottom-left-radius: ${theme.fonts.sizes.XXXS};
    border-bottom-right-radius: ${theme.fonts.sizes.XXXS};

    @media (max-width: 480px) {
        flex-direction: column;       /* met LeftSection au-dessus de RightSection */
        align-items: flex-start;           /* centre le tout */
    }
`;

const LeftSection = styled.div`
    @media (max-width: 480px) {
        text-align: left;           /* centre le texte du lien gauche */
        margin-bottom: 1rem;           /* espace avec les liens du bas */
    }
`;

const RightSection = styled.div`
  display: flex;
  gap: 1.5rem;
  
    @media (max-width: 480px) {
    flex-direction: column;       /* passe en colonne */
    align-items: flex-start;          /* centre horizontalement */
    gap: 0.8rem;                   /* espace plus petit entre les liens */
  }
`;

const FooterLink = styled.a`
  color: ${theme.colors.inputDark};
  text-decoration: none;

  &:hover {
    color: ${theme.colors.inputDark};
    text-decoration: underline;
  }
`;
