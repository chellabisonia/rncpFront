import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { getToken } from "../../../services/authService";
import { theme } from "../../../theme/index.jsx";
import { isProfileEqual } from "../../../utils/profileUtils";
import Footer from "../../reusable-ui/Footer.jsx";
import Header from "../../reusable-ui/Header.jsx";
import PrimaryButton from "../../reusable-ui/PrimaryButton.jsx";

import ProfileCard from "./ProfileCard.jsx";

const BP = { mobile: 640, tablet: 1024 };

const DEFAULT_PROFILE = {
    lastname: "",
    firstname: "",
    username: "",
    address: "",
    phoneNumber: "",
    email: "",
    personalDescription: "",
    pictureName: "",
};

const getAuthHeaders = () => {
    const token = getToken();
    if (!token) return {};
    return { Authorization: `Bearer ${token}` };
};

export default function ProfilePage() {
    const [profile, setProfile] = useState(DEFAULT_PROFILE);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const snapshotRef = useRef(profile);
    const [cancelSignal, setCancelSignal] = useState(0);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const fetchUser = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await fetch("http://localhost:8080/api/users/me", {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        ...getAuthHeaders(),
                    },
                    signal: controller.signal,
                });

                if (res.status === 401) {
                    setError("Vous n'êtes pas autorisé. Merci de vous reconnecter.");
                    throw new Error("Unauthorized");
                }

                if (!res.ok) throw new Error(`Erreur ${res.status}`);

                const data = await res.json();

                const nextProfile = {
                    lastname: data.lastname ?? "",
                    firstname: data.firstname ?? "",
                    username: data.username ?? "",
                    address: data.address ?? "",
                    phoneNumber: data.phoneNumber ?? "",
                    email: data.email ?? "",
                    personalDescription: data.personalDescription ?? "",
                    pictureName: data.picture?.pictureName ?? "", // ✅
                };

                setProfile(nextProfile);
                snapshotRef.current = nextProfile;

                if (data.id !== null) setUserId(data.id);
            } catch (e) {
                if (e.name !== "AbortError") {
                    console.error(e);
                    setError((prev) => prev ?? "Impossible de charger le profil.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
        return () => controller.abort();
    }, []);

    const enterEdit = () => {
        snapshotRef.current = profile;
        setIsEditing(true);
    };

    const handleChange = (field, value) => {
        setProfile((prev) => ({ ...prev, [field]: value }));
    };

    const handleCancel = () => {
        setProfile(snapshotRef.current);
        setIsEditing(false);
        setCancelSignal((n) => n + 1);
    };

    const handleSave = async () => {
        if (!userId) {
            setError("Impossible de sauvegarder : ID utilisateur manquant.");
            return;
        }

        if (isProfileEqual(snapshotRef.current, profile)) {
            setIsEditing(false);
            setCancelSignal((n) => n + 1);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const payload = {
                firstname: profile.firstname,
                lastname: profile.lastname,
                username: profile.username,
                email: profile.email,
                phoneNumber: profile.phoneNumber,
                address: profile.address,
                personalDescription: profile.personalDescription,
                picture: profile.pictureName,
            };

            const res = await fetch(`http://localhost:8080/api/users/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    ...getAuthHeaders(),
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                let backendMessage = "";
                try {
                    const errBody = await res.json();
                    backendMessage = errBody.message || JSON.stringify(errBody);
                } catch {
                    backendMessage = await res.text();
                }
                throw new Error(backendMessage || `Erreur ${res.status}`);
            }

            const updated = await res.json();

            const nextProfile = {
                lastname: updated.lastname ?? "",
                firstname: updated.firstname ?? "",
                username: updated.username ?? "",
                address: updated.address ?? "",
                phoneNumber: updated.phoneNumber ?? "",
                email: updated.email ?? "",
                personalDescription: updated.personalDescription ?? "",
                pictureName: updated.picture?.pictureName ?? "",
            };

            setProfile(nextProfile);
            snapshotRef.current = nextProfile;

            if (updated.id !== null) setUserId(updated.id);

            setIsEditing(false);
            setCancelSignal((n) => n + 1);
        } catch (e) {
            console.error(e);
            setError(`Erreur lors de la sauvegarde du profil : ${e.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleAvatarSelected = (pictureName) => {
        setProfile((prev) => ({ ...prev, pictureName }));
    };

    return (
        <Page>
            <Header />
            <MainContent>
                <Section>
                    <CardWrapper>
                        <TopBar>
                            <Title>À propos de moi</Title>

                            {!isEditing ? (
                                <PrimaryButton
                                    variant="contained"
                                    type="button"
                                    onClick={enterEdit}
                                    disabled={loading}
                                >
                                    {loading ? "Chargement..." : "Modifier"}
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
                                        {loading ? "Sauvegarde..." : "Valider"}
                                    </PrimaryButton>
                                </Actions>
                            )}
                        </TopBar>

                        {error && (
                            <p style={{ color: "red", paddingInline: "1rem" }}>{error}</p>
                        )}

                        <ProfileCard
                            isEditing={isEditing}
                            profile={profile}
                            onChange={handleChange}
                            onAvatarSelected={handleAvatarSelected}
                            cancelSignal={cancelSignal}
                        />
                    </CardWrapper>
                </Section>
            </MainContent>
            <Footer />
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
    padding-top: clamp(4.5rem, 7vw, 6rem);
    padding-bottom: clamp(2rem, 6vw, 4rem);

    @media (max-width: ${BP.mobile}px) {
        padding-top: 5.5rem;
    }

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
`;

const TopBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1rem;
    padding-inline: 0;
    flex-wrap: nowrap;

    @media (max-width: ${BP.mobile}px) {
        flex-direction: column;
        align-items: stretch;
        gap: 0.75rem;
        padding-inline: 0.75rem;

        & > button,
        & > a {
            width: 100%;
        }
    }
`;

const Title = styled.h1`
    color: ${theme.colors.inputDark};
    font-size: clamp(1.35rem, 3vw, 2rem);
    line-height: 1.2;
    font-weight: 700;
    margin: 0;
    flex: 1 1 auto;
    min-width: 0;
    text-align: left;
`;

const Actions = styled.div`
    display: flex;
    gap: 0.75rem;

    @media (max-width: ${BP.tablet}px) {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.5rem;
    }
`;

