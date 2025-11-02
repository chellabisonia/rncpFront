import React, {useState} from "react";
import styled from "styled-components";
import Header from "../../reusable-ui/Header.jsx";
import Footer from "../../reusable-ui/Footer.jsx";
import {theme} from "../../../theme/index.jsx";
import RegistrationForm from "./RegistrationForm.jsx";
import {useNavigate} from "react-router-dom";
import {register} from "../../../services/authService.js";

export default function RegistrationPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function isEmailValid(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    async function handleRegister(form) {
        // Validation simple côté client
        const required = ["lastname", "firstname", "username", "email", "password"];
        const missing = required.filter((k) => !form[k]?.trim());
        if (missing.length) {
            setError("Veuillez remplir tous les champs obligatoires.");
            return;
        }
        if (!isEmailValid(form.email)) {
            setError("Format d'email invalide.");
            return;
        }
        if (form.password.length < 6) {
            setError("Le mot de passe doit contenir au moins 6 caractères.");
            return;
        }

        try {
            setError("");
            setLoading(true);
            await register(form);
            // au choix: rediriger vers la page de connexion
            navigate("/login", {replace: true, state: {justRegistered: true}});
            // ou bien connecter directement et aller sur "/"
        } catch (e) {
            setError(e?.message || "Erreur serveur lors de l'inscription.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <PageContainer>
            <Header/>
            <MainContent>
                <RegistrationForm onSubmit={handleRegister} loading={loading} error={error}/>
            </MainContent>
            <Footer/>
        </PageContainer>
    );
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100vw;
    background-color: ${theme.colors.pageBody};
    box-sizing: border-box;
    overflow-x: hidden;
    padding-top: 64px; /* compense le header fixe */
`;

const MainContent = styled.main`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${theme.colors.pageBody};
`;
