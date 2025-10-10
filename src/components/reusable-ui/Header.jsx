/*
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
    height: 32px;

  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;

    button {
      width: 100%;
    }
  }
`;


*/
/*
import React, { useState } from "react";
import styled from "styled-components";
import PrimaryButton from "../reusable-ui/PrimaryButton.jsx";
import Logo from "../reusable-ui/Logo.jsx";
import { theme } from "../../theme/index.jsx";

export default function Header() {
    const [open, setOpen] = useState(false);

    return (
        <HeaderContainer>
            <HeaderContent>
                <Logo />

                {/!* Boutons visibles en desktop/tablette *!/}
                <ButtonGroup>
                    <PrimaryButton variant="contained">Connexion</PrimaryButton>
                    <PrimaryButton variant="contained">Inscription</PrimaryButton>
                </ButtonGroup>

                {/!* Burger visible en mobile *!/}
                <BurgerButton
                    aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
                    aria-expanded={open}
                    aria-controls="mobile-menu"
                    onClick={() => setOpen((v) => !v)}
                >
                    <BurgerBar $open={open} />
                    <BurgerBar $open={open} />
                    <BurgerBar $open={open} />
                </BurgerButton>
            </HeaderContent>

            {/!* Menu mobile déroulant *!/}
            <MobileMenu id="mobile-menu" $open={open} onClick={() => setOpen(false)}>
                <PrimaryButton variant="contained">Connexion</PrimaryButton>
                <PrimaryButton variant="contained">Inscription</PrimaryButton>
            </MobileMenu>
        </HeaderContainer>
    );
}

const HeaderContainer = styled.header`
  position: fixed;
  inset: 0 0 auto 0;
  height: 64px;
  background-color: ${theme.colors.nude};
  border-bottom: 1px solid ${theme.colors.nude};
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;

const HeaderContent = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  height: 32px;

  /!* Cacher sur mobile *!/
  @media (max-width: 768px) {
    display: none;
  }
`;

/!* Burger visible uniquement sur mobile *!/
const BurgerButton = styled.button`
  position: relative;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`;

const BurgerBar = styled.span`
  position: absolute;
  width: 22px;
  height: 2px;
  background: ${theme.colors.dark};
  transition: transform 0.25s ease, opacity 0.2s ease, top 0.25s ease;
  top: ${({ $open }) => ($open ? "50%" : "50%")};
  transform-origin: center;

  &:nth-child(1) {
    transform: ${({ $open }) => ($open ? "translateY(-50%) rotate(45deg)" : "translateY(-8px)")};
  }
  &:nth-child(2) {
    opacity: ${({ $open }) => ($open ? 0 : 1)};
    transform: translateY(-50%);
  }
  &:nth-child(3) {
    transform: ${({ $open }) => ($open ? "translateY(-50%) rotate(-45deg)" : "translateY(6px)")};
  }
`;

/!* Panneau du menu mobile *!/
const MobileMenu = styled.nav`
  display: none;

  @media (max-width: 768px) {
    display: grid;
    gap: 8px;
    padding: 12px 16px 16px;
    background: ${theme.colors.nude};
    border-bottom: 1px solid ${theme.colors.nude};
    box-shadow: 0 8px 20px rgba(0,0,0,0.08);
    transform: ${({ $open }) => ($open ? "translateY(0)" : "translateY(-10px)")};
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  /!* Les boutons prennent toute la largeur en mobile *!/
  & > button {
    width: 100%;
    height: 40px;
  }
`;
*/

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PrimaryButton from "../reusable-ui/PrimaryButton.jsx";
import Logo from "../reusable-ui/Logo.jsx";
import { theme } from "../../theme/index.jsx";

export default function Header() {
    const [open, setOpen] = useState(false);

    // Empêche le scroll de la page quand le menu mobile est ouvert
    useEffect(() => {
        if (open) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
        return () => (document.body.style.overflow = "");
    }, [open]);

    return (
        <HeaderContainer>
            <HeaderBar>
                <Logo />
                <ButtonGroup>
                    <PrimaryButton variant="contained">Connexion</PrimaryButton>
                    <PrimaryButton variant="contained">Inscription</PrimaryButton>
                </ButtonGroup>

                <BurgerButton
                    aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
                    aria-expanded={open}
                    aria-controls="mobile-menu"
                    onClick={() => setOpen((v) => !v)}
                >
                    <BurgerBar $open={open} />
                    <BurgerBar $open={open} />
                    <BurgerBar $open={open} />
                </BurgerButton>
            </HeaderBar>

            {/* Overlay + panneau superposé */}
            <Backdrop $open={open} onClick={() => setOpen(false)} />
            <MobileMenu id="mobile-menu" $open={open}>
                <PrimaryButton variant="contained" onClick={() => setOpen(false)}>
                    Connexion
                </PrimaryButton>
                <PrimaryButton variant="contained" onClick={() => setOpen(false)}>
                    Inscription
                </PrimaryButton>
            </MobileMenu>
        </HeaderContainer>
    );
}

const HEADER_HEIGHT = 64;

const HeaderContainer = styled.header`
  position: fixed;
  inset: 0 0 auto 0;
  height: ${HEADER_HEIGHT}px;
  z-index: 1000; /* base du header */
`;

const HeaderBar = styled.div`
  height: 100%;
  background: ${theme.colors.nude};
  border-bottom: 1px solid ${theme.colors.nude};
    border-top-left-radius: ${theme.fonts.sizes.XXXS};
    border-top-right-radius: ${theme.fonts.sizes.XXXS};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  height: 32px;

  @media (max-width: 768px) {
    display: none; /* caché en mobile */
  }
`;
/*
const BurgerButton = styled.button`
  width: 40px;
  height: 40px;
  border: 0 ;
  background: transparent;
  display: none;
  cursor: pointer;
    outline: none;
    box-shadow: none;

  @media (max-width: 768px) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
    &:focus-visible{
        outline: 2px solid ${theme.colors.black};
        border-radius: 4px;
    }
`;*/

const BurgerButton = styled.button`
  /* reset de base */
  width: 40px;
  height: 40px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;

  /* pour Safari / mobile */
  -webkit-appearance: none;
  appearance: none;
  -webkit-tap-highlight-color: transparent;

  /* caché en desktop */
  display: none;
  @media (max-width: 768px) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  /* 🔒 important : neutraliser tous les états */
  &:focus,
  &:focus-visible,
  &:active {
    outline: none !important;
    box-shadow: none !important;
  }

  /* Firefox ajoute un bord interne : on le retire */
  &::-moz-focus-inner {
    border: 0;
  }
`;


const BurgerBar = styled.span`
  position: absolute;
  width: 22px;
  height: 2px;
  background: ${theme.colors.dark || "#1a1a1a"};
  transition: transform 0.25s ease, opacity 0.2s ease;
  transform-origin: center;

  &:nth-child(1) {
    transform: ${({ $open }) => ($open ? "rotate(45deg)" : "translateY(-7px)")};
  }
  &:nth-child(2) {
    opacity: ${({ $open }) => ($open ? 0 : 1)};
  }
  &:nth-child(3) {
    transform: ${({ $open }) => ($open ? "rotate(-45deg)" : "translateY(7px)")};
  }
`;

/* Fond semi-transparent qui couvre la page quand le menu est ouvert */
const Backdrop = styled.div`
  position: fixed;
  inset: ${HEADER_HEIGHT}px 0 0 0; /* commence sous le header */
  background: rgba(0, 0, 0, 0.35);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
  transition: opacity 0.2s ease;
  z-index: 1001;
`;

/* Panneau mobile superposé (ne pousse pas le contenu) */
const MobileMenu = styled.nav`
  position: fixed;
  top: ${HEADER_HEIGHT}px;
  left: 0;
  right: 0;
  background: ${theme.colors.nude};
  border-bottom: 1px solid ${theme.colors.nude};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  display: grid;
  gap: 8px;
  padding: 12px 16px 16px;
  transform: ${({ $open }) => ($open ? "translateY(0)" : "translateY(-8px)")};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
  transition: opacity 0.2s ease, transform 0.2s ease;
  z-index: 1002; /* au-dessus du backdrop */

  @media (min-width: 769px) {
    display: none;
  }

  & > button {
    width: 100%;
    height: 40px;
  }
`;

