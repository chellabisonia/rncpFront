import React, {useState, useEffect} from "react";
import styled from "styled-components";
import PrimaryButton from "../reusable-ui/PrimaryButton.jsx";
import Logo from "../reusable-ui/Logo.jsx";
import {theme} from "../../theme/index.jsx";
import {useNavigate} from "react-router-dom";
import {isAuthenticated as checkAuth, logout} from "../../services/authService.js";

export default function Header() {
    const [open, setOpen] = useState(false);
    const [isAuth, setIsAuth] = useState(checkAuth);
    const navigate = useNavigate();

    const handleToLoginPage = () => {
        navigate("/login");
    };
    const handleToRegistrationPage = () => {
        navigate("/register");
    };
    const handleToProfilePage = () => {
        navigate("/profile");
    }
    const handleLogout = () => {
        logout();
        setIsAuth(false);
        navigate("/");
    };

    useEffect(() => {
        if (open) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
        return () => (document.body.style.overflow = "");
    }, [open]);

    // écoute les changements d'auth (login/logout dans ce même onglet)
    useEffect(() => {
        const onAuthChanged = (e) => {
            setIsAuth(e.detail?.isAuthenticated ?? checkAuth());
        };
        window.addEventListener("auth-changed", onAuthChanged);
        return () => window.removeEventListener("auth-changed", onAuthChanged);
    }, []);

    // écoute les changements depuis un autre onglet (évènement natif 'storage')
    useEffect(() => {
        const onStorage = (e) => {
            if (e.key === "auth_token") setIsAuth(checkAuth());
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    return (
        <HeaderContainer>
            <HeaderBar>
                <Logo/>
                <ButtonGroup>
                    {/* rendu conditionnel : connecté => Profil/Déconnexion, sinon Connexion/Inscription */}
                    {isAuth ? (
                        <>
                            <PrimaryButton variant="contained" onClick={handleToProfilePage}>
                                Profil
                            </PrimaryButton>
                            <PrimaryButton variant="outlined" onClick={handleLogout}>
                                Déconnexion
                            </PrimaryButton>
                        </>
                    ) : (
                        <>
                            <PrimaryButton variant="contained" onClick={handleToLoginPage}>
                                Connexion
                            </PrimaryButton>
                            <PrimaryButton variant="contained" onClick={handleToRegistrationPage}>
                                Inscription
                            </PrimaryButton>
                        </>
                    )}
                </ButtonGroup>

                <BurgerButton
                    type="button"
                    aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
                    aria-expanded={open}
                    aria-controls="mobile-menu"
                    onClick={() => setOpen(v => !v)}
                >
                    <BurgerBar $open={open}/>
                    <BurgerBar $open={open}/>
                    <BurgerBar $open={open}/>
                </BurgerButton>
            </HeaderBar>

            <Backdrop $open={open} onClick={() => setOpen(false)}/>

            <MobileMenu id="mobile-menu" $open={open}>

                {/* rendu conditionnel : connecté => Profil/Déconnexion, sinon Connexion/Inscription sur mobile */}
                {isAuth ? (
                    <>
                        <PrimaryButton
                            variant="contained"
                            onClick={() => {
                                setOpen(false);
                                handleToProfilePage();
                            }}
                        >
                            Profil
                        </PrimaryButton>
                        <PrimaryButton
                            variant="outlined"
                            onClick={() => {
                                setOpen(false);
                                handleLogout();
                            }}
                        >
                            Déconnexion
                        </PrimaryButton>
                    </>
                ) : (
                    <>
                        <PrimaryButton
                            variant="contained"
                            onClick={() => {
                                setOpen(false);
                                navigate("/login");
                            }}
                        >
                            Connexion
                        </PrimaryButton>
                        <PrimaryButton
                            variant="contained"
                            onClick={() => {
                                setOpen(false);
                                navigate("/register");
                            }}
                        >
                            Inscription
                        </PrimaryButton>
                    </>
                )}
            </MobileMenu>
        </HeaderContainer>
    );
}

const HEADER_HEIGHT = 64;

const HeaderContainer = styled.header`
    position: fixed;
    inset: 0 0 auto 0;
    height: ${HEADER_HEIGHT}px;
    z-index: 1000;
`;

const HeaderBar = styled.div`
    height: 100%;
    background: ${theme.colors.white};
    border-bottom: 1px solid ${theme.colors.pageBody};
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
        display: none;
    }
`;

const BurgerButton = styled.button`
    width: 40px;
    height: 40px;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;
    -webkit-tap-highlight-color: transparent;

    /* important pour que les barres en position:absolute se placent correctement */
    position: relative;

    display: none;
    @media (max-width: 768px) {
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }

    &:focus,
    &:focus-visible,
    &:active {
        outline: none !important;
        box-shadow: none !important;
    }

    &::-moz-focus-inner {
        border: 0;
    }
`;

const BurgerBar = styled.span`
    position: absolute;
    width: 22px;
    height: 2px;
    background: ${theme.colors.inputDark || "#1a1a1a"};
    transition: transform 0.25s ease, opacity 0.2s ease;
    transform-origin: center;

    &:nth-child(1) {
        transform: ${({$open}) => ($open ? "rotate(45deg)" : "translateY(-7px)")};
    }

    &:nth-child(2) {
        opacity: ${({$open}) => ($open ? 0 : 1)};
    }

    &:nth-child(3) {
        transform: ${({$open}) => ($open ? "rotate(-45deg)" : "translateY(7px)")};
    }
`;

const Backdrop = styled.div`
    position: fixed;
    inset: ${HEADER_HEIGHT}px 0 0 0;
    background: rgba(0, 0, 0, 0.35);
    opacity: ${({$open}) => ($open ? 1 : 0)};
    pointer-events: ${({$open}) => ($open ? "auto" : "none")};
    transition: opacity 0.2s ease;
    z-index: 1001;
`;

const MobileMenu = styled.nav`
    position: fixed;
    top: ${HEADER_HEIGHT}px;
    left: 0;
    right: 0;
    background: ${theme.colors.white};
    border-bottom: 1px solid ${theme.colors.white};
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    display: grid;
    gap: 8px;
    padding: 12px 16px 16px;
    transform: ${({$open}) => ($open ? "translateY(0)" : "translateY(-8px)")};
    opacity: ${({$open}) => ($open ? 1 : 0)};
    pointer-events: ${({$open}) => ($open ? "auto" : "none")};
    transition: opacity 0.2s ease, transform 0.2s ease;
    z-index: 1002;

    @media (min-width: 769px) {
        display: none;
    }

    & > button {
        width: 100%;
        height: 40px;
    }
`;

