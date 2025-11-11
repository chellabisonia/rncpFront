import React from "react";
import styled from "styled-components";
import Header from "../../reusable-ui/Header.jsx";
import Footer from "../../reusable-ui/Footer.jsx";
import PrimaryButton from "../../reusable-ui/PrimaryButton.jsx";
import ProfileCard from "./ProfileCard.jsx";
import {theme} from "../../../theme/index.jsx";

export default function ProfilePage({loading,}) {
    return (
        <Page>
            <Header/>
            <MainContent>
                <Section>
                    <CardWrapper>
                        {/* TopBar aligné sur la largeur de la card */}
                        <TopBar>
                            <Title>À propos de moi</Title>
                            <PrimaryButton
                                variant="contained" type="submit" disabled={loading}
                            >
                                {loading ? "Modification..." : "Modifier"}
                            </PrimaryButton>
                        </TopBar>

                        <ProfileCard/>
                    </CardWrapper>
                </Section>
            </MainContent>
            <Footer/>
        </Page>
    );
}

/* ====== STYLES ====== */

const Page = styled.div`
    background-color: ${theme.colors.pageBody};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

const MainContent = styled.main`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-inline: clamp(1rem, 4vw, 2rem);
    padding-top: clamp(2rem, 5vw, 5rem);
    padding-bottom: clamp(2rem, 6vw, 4rem);

    /* MOBILE */
    @media (max-width: 640px) {
        padding-top: 5.75rem;
        align-items: flex-start;
    }

    /* TABLETTE */
    @media (min-width: 641px) and (max-width: 1024px) {
        padding-top: 4.5rem;
        align-items: flex-start;
    }

    /* DESKTOP */
    @media (min-width: 1025px) {
        align-items: center; /* centre verticalement le bloc */
    }
`;

const Section = styled.div`
    width: 100%;
    max-width: 1200px;
`;

/* Le bloc global centré */
const CardWrapper = styled.div`
    width: 100%;
    max-width: 960px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: stretch; /* pour que TopBar et Card aient la même largeur */
    text-align: left;

    @media (min-width: 641px) and (max-width: 1024px) {
        max-width: 880px;
    }

    @media (max-width: 400px) {
        max-width: 100%;
    }
`;

/* Aligne titre + bouton sur la largeur de la card */
const TopBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1rem;
    padding-inline: clamp(1rem, 3vw, 2.5rem); /* identique à la card */

    /* MOBILE : empilement */
    @media (max-width: 640px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
        padding-inline: 1.25rem;
    }
`;

const Title = styled.h1`
    color: ${theme.colors.inputDark};
    font-size: clamp(1.5rem, 3vw, 2rem);
    line-height: 1.2;
    font-family: ${theme.fonts.family};
    font-weight: 700;
    margin: 0;
    scroll-margin-top: 6rem;

    @media (max-width: 640px) {
        scroll-margin-top: 6.5rem;
    }
`;
