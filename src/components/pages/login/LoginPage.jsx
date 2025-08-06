import React from 'react';
import styled from "styled-components";
import Header from '../../reusable-ui/Header.jsx';
import LoginForm from './LoginForm.jsx';
import {theme} from "../../../theme/index.jsx";

export default function LoginPage() {
    return (
        <PageContainer>
            <Header />
            <MainContent>
                <LoginForm />
            </MainContent>
        </PageContainer>
    );
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100vw;
    background-color: ${theme.colors.backgroundDark};
`;

const MainContent = styled.main`
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${theme.colors.backgroundDark};

    @media (max-width: 768px) {
        padding: 20px 10px;
    }
`;

