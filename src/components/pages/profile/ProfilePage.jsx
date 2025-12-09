import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { getToken } from "../../../services/authService";
import { theme } from "../../../theme/index.jsx";
import Footer from "../../reusable-ui/Footer.jsx";
import Header from "../../reusable-ui/Header.jsx";
import PrimaryButton from "../../reusable-ui/PrimaryButton.jsx";

import ProfileCard from "./ProfileCard.jsx";

const BP = {
    mobile: 640,
    tablet: 1024,
};

const DEFAULT_PROFILE = {
    lastname: "",
    firstname: "",
    username: "",
    address: "",
    phoneNumber: "",
    email: "",
    personalDescription: "",
    avatarUrl: "",
};

const getAuthHeaders = () => {
    const token = getToken();
    if (!token) {
        console.warn("[ProfilePage] Aucun token trouvé.");
        return {};
    }

    return {
        Authorization: `Bearer ${token}`,
    };
};

// petite fonction utilitaire pour savoir si le profil a changé
const isProfileEqual = (a, b) => {
    if (!a || !b) return false;
    const keys = Object.keys(a);
    for (const key of keys) {
        if (a[key] !== b[key]) {
            return false;
        }
    }
    return true;
};

export default function ProfilePage() {
    const [profile, setProfile] = useState(DEFAULT_PROFILE);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const snapshotRef = useRef(profile);
    const [cancelSignal, setCancelSignal] = useState(0);
    const [userId, setUserId] = useState(null);

    // ===== FETCH USER =====
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
                    avatarUrl: data.avatarUrl ?? "",
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

    // ===== HANDLERS =====
    const enterEdit = () => {
        // on prend un snapshot AVANT de passer en édition
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

        // 👉 Si rien n'a changé, on ne fait PAS d'appel backend
        if (isProfileEqual(snapshotRef.current, profile)) {
            setIsEditing(false);
            setCancelSignal((n) => n + 1); // pour resync le ProfileCard si besoin
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const payload = { ...profile, id: userId };

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
                avatarUrl: updated.avatarUrl ?? "",
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

    const handleAvatarFile = (file) => {
        if (!file) return;
        const preview = URL.createObjectURL(file);
        setProfile((prev) => ({ ...prev, avatarUrl: preview }));
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
                            onAvatarSelected={handleAvatarFile}
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

    @media (min-width: 641px) && (max-width: ${BP.tablet}px) {
    max-width: 880px;
}
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
  /* Pas de padding horizontal ici pour coller le titre le plus à gauche possible */
  padding-inline: 0;
  flex-wrap: nowrap;
    text-align: left;

  /* TABLETTE & DESKTOP : ligne, titre à gauche, bouton à droite */
  @media (min-width: ${BP.mobile + 1}px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    & > button,
    & > a {
      width: auto;
      flex-shrink: 0;
    }
  }

  /* MOBILE : colonne + un peu de padding pour respirer */
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

  /* prend tout l’espace dispo côté gauche */
  flex: 1 1 auto;
  min-width: 0;
  word-break: break-word;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.75rem;

  /* Tablette et 1024px : deux boutons côte à côte */
  @media (max-width: ${BP.tablet}px) {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }

  /* Mobile : les boutons à l'intérieur passent en full width */
  @media (max-width: ${BP.mobile}px) {
    & > button {
      width: 100%;
    }
  }
`;


