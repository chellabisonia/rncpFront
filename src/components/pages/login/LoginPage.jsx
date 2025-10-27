import React from 'react';
import styled from "styled-components";
import Header from '../../reusable-ui/Header.jsx';
import LoginForm from './LoginForm.jsx';
import {theme} from "../../../theme/index.jsx";
import Footer from "../../reusable-ui/Footer.jsx";

export default function LoginPage() {
    return (
        <PageContainer>
            <Header />
            <MainContent>
                <LoginForm />
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

