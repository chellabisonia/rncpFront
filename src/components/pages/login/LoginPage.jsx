import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

import {login} from "../../../services/authService.js";
import {theme} from "../../../theme/index.jsx";
import Footer from "../../reusable-ui/Footer.jsx";
import Header from '../../reusable-ui/Header.jsx';

import LoginForm from './LoginForm.jsx';

export default function LoginPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    async function handleLogin({username, password}) {
        //validation simple côté  client
        if (!username || !password) {
            setError("Veuillez remplir tous les champs.");
            return;
        }

        try {
            setError("");
            setLoading(true);
            await login({username, password});
            //succès redirection Home Page
            navigate("/", {replace: true});
        } catch (e) {
            if (e.response && e.response.data && e.response.data.message) {
                setError(e.response.data.message);
            } else {
                setError(e.response.statusText);
            }
        } finally {
            setLoading(false);
        }

    }

    return (
        <PageContainer>
            <Header/>
            <MainContent>
                <LoginForm
                    onSubmit={handleLogin}
                    loading={loading}
                    error={error}
                />
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

