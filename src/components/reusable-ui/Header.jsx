import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, {bindTrigger, bindMenu} from "material-ui-popup-state";
import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

import {isAuthenticated as checkAuth, logout} from "../../services/authService.js";
import {theme} from "../../theme/index.jsx";
import Logo from "../reusable-ui/Logo.jsx";

export default function Header() {
    const [isAuth, setIsAuth] = useState(checkAuth());
    const navigate = useNavigate();

    const handleToLoginPage = () => navigate("/login");
    const handleToRegistrationPage = () => navigate("/register");
    const handleToProfilePage = () => navigate("/profile");
    const handleLogout = () => {
        logout();
        setIsAuth(false);
        navigate("/");
    };

    const handleToHomePage = () => navigate("/");

    // écoute les changements d'auth (login/logout dans cet onglet)
    useEffect(() => {
        const onAuthChanged = (e) => {
            setIsAuth(e.detail?.isAuthenticated ?? checkAuth());
        };
        window.addEventListener("auth-changed", onAuthChanged);
        return () => window.removeEventListener("auth-changed", onAuthChanged);
    }, []);

    // écoute depuis un autre onglet (évènement 'storage')
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
                <LogoWrapper onClick={handleToHomePage}>
                    <Logo/>
                </LogoWrapper>
                {/* Burger menu (tous écrans) */}
                <PopupState variant="popover" popupId="header-burger-menu">
                    {(popupState) => (
                        <>
                            <IconButton
                                aria-label="Ouvrir le menu"
                                edge="end"
                                size="large"
                                {...bindTrigger(popupState)}
                                sx={{color: theme.colors.inputDark}}
                            >
                                <MenuIcon/>
                            </IconButton>

                            <Menu
                                {...bindMenu(popupState)}
                                anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                                transformOrigin={{vertical: "top", horizontal: "right"}}
                                keepMounted
                                slotProps={{
                                    paper: {
                                        sx: {
                                            backgroundColor: theme.colors.pageBody,
                                            color: theme.colors.inputDark,
                                            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                                            "& .MuiMenuItem-root": {
                                                backgroundColor: theme.colors.pageBody,
                                                color: theme.colors.inputDark,
                                                "& .MuiListItemIcon-root": {
                                                    color: theme.colors.inputDark,
                                                },
                                                "&:hover": {
                                                    backgroundColor: theme.colors.pageBody,
                                                },
                                            },
                                            "& .MuiDivider-root": {
                                                borderColor: "rgba(0,0,0,0.1)",
                                            },
                                        },
                                    },
                                }}
                            >
                                {isAuth ? (
                                    <>
                                        <MenuItem
                                            onClick={() => {
                                                popupState.close();
                                                handleToProfilePage();
                                            }}
                                        >
                                            <ListItemIcon>
                                                <AccountCircleIcon fontSize="small"/>
                                            </ListItemIcon>
                                            Profil
                                        </MenuItem>
                                        <Divider/>
                                        <MenuItem
                                            onClick={() => {
                                                popupState.close();
                                                handleLogout();
                                            }}
                                        >
                                            <ListItemIcon>
                                                <LogoutIcon fontSize="small"/>
                                            </ListItemIcon>
                                            Déconnexion
                                        </MenuItem>
                                    </>
                                ) : (
                                    <>
                                        <MenuItem
                                            onClick={() => {
                                                popupState.close();
                                                handleToLoginPage();
                                            }}
                                        >
                                            <ListItemIcon>
                                                <LoginIcon fontSize="small"/>
                                            </ListItemIcon>
                                            Connexion
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => {
                                                popupState.close();
                                                handleToRegistrationPage();
                                            }}
                                        >
                                            <ListItemIcon>
                                                <AccountCircleIcon fontSize="small"/>
                                            </ListItemIcon>
                                            Inscription
                                        </MenuItem>
                                    </>
                                )}
                            </Menu>
                        </>
                    )}
                </PopupState>
            </HeaderBar>
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

const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`;
