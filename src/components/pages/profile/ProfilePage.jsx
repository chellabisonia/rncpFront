import React, {useRef, useState} from "react";
import styled from "styled-components";

import {theme} from "../../../theme/index.jsx";
import Footer from "../../reusable-ui/Footer.jsx";
import Header from "../../reusable-ui/Header.jsx";
import PrimaryButton from "../../reusable-ui/PrimaryButton.jsx";

import ProfileCard from "./ProfileCard.jsx";


const BP = {
    mobile: 640,     // <= 640px
    tablet: 1024,    // 641-1024px
};

export default function ProfilePage({loading}) {
    const [profile, setProfile] = useState({
        lastname: "Picard",
        firstname: "Jean-Luc",
        username: "CaptainJL",
        address: "1701-D Enterprise, Starfleet",
        phone: "555-1701",
        email: "picard@starfleet.com",
        bio:
            "Passionné par l'accueil et le partage de moments inoubliables, je suis ravi de vous accueillir dans mon logement chaleureux.",
        avatarUrl:
            "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=256&q=80&auto=format&fit=crop",
    });

    const [isEditing, setIsEditing] = useState(false);
    const snapshotRef = useRef(profile);
    const [cancelSignal, setCancelSignal] = useState(0);

    const enterEdit = () => {
        snapshotRef.current = profile;
        setIsEditing(true);
    };

    const handleChange = (field, value) =>
        setProfile((p) => ({...p, [field]: value}));

    const handleCancel = () => {
        setProfile(snapshotRef.current);
        setIsEditing(false);
        setCancelSignal((n) => n + 1);
    };

    const handleSave = async () => {
        // Next step to do
        snapshotRef.current = profile;
        setIsEditing(false);
        setCancelSignal((n) => n + 1);
    };

    const handleAvatarFile = (file) => {
        if (!file) return;
        const preview = URL.createObjectURL(file);
        setProfile((p) => ({...p, avatarUrl: preview}));
        // TODO: upload serveur puis remplacer par l’URL finale
    };

    return (
        <Page>
            <Header/>
            <MainContent>
                <Section>
                    <CardWrapper>
                        <TopBar>
                            <Title>À propos de moi</Title>

                            {/* Affichage du bouton à droite du titre */}
                            {!isEditing ? (
                                <PrimaryButton
                                    variant="contained"
                                    type="button"
                                    onClick={enterEdit}
                                    disabled={loading}
                                >
                                    Modifier
                                </PrimaryButton>
                            ) : (
                                <Actions>
                                    <PrimaryButton
                                        variant="outlined"
                                        type="button"
                                        onClick={handleCancel}
                                        disabled={loading}
                                    >
                                        Annuler
                                    </PrimaryButton>
                                    <PrimaryButton
                                        variant="contained"
                                        type="button"
                                        onClick={handleSave}
                                        disabled={loading}
                                    >
                                        {loading ? "Sauvegarde..." : "Terminé"}
                                    </PrimaryButton>
                                </Actions>
                            )}
                        </TopBar>

                        <ProfileCard
                            isEditing={isEditing}
                            profile={profile}
                            onChange={handleChange}
                            onAvatarSelected={handleAvatarFile}
                            cancelSignal={cancelSignal}
                        />
                    </CardWrapper>
                </Section>
            </MainContent>
            <Footer/>
        </Page>
    );
}

/* ====== styles ====== */
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

    @media (min-width: ${BP.tablet + 1}px) {
        align-items: center;
    }
`;

const Section = styled.div`
    width: 100%;
    max-width: 1200px;
`;

const CardWrapper = styled.div`
    width: 100%;
    max-width: 960px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    @media (min-width: 641px) and (max-width: ${BP.tablet}px) {
        max-width: 880px;
    }
`;

const TopBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1rem;
    padding-inline: clamp(1rem, 3vw, 2.5rem);

    /* MOBILE: empilement + boutons full width */
    @media (max-width: ${BP.mobile}px) {
        flex-direction: column;
        align-items: stretch;
        gap: .75rem;

        & > *:last-child {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: .5rem;
        }

        /* Si un seul bouton (mode affichage), largeur 100% */
        & > button, & > a, & > div > button {
            width: 100%;
        }
    }
`;

const Title = styled.h1`
    color: ${theme.colors.inputDark};
    font-size: clamp(1.35rem, 3vw, 2rem);
    line-height: 1.2;
    font-family: ${theme.fonts.family};
    font-weight: 700;
    margin: 0;
`;

const Actions = styled.div`
    display: flex;
    gap: .75rem;

    @media (max-width: ${BP.mobile}px) {
        width: 100%;
        gap: .5rem;

        & > button {
            width: 100%;
        }
    }
`;