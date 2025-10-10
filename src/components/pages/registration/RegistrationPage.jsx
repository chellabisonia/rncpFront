import React from 'react';
import styled from "styled-components";
import Header from '../../reusable-ui/Header.jsx';
import RegistrationForm from "./RegistrationForm.jsx";
import {theme} from '../../../theme/index.jsx';
import Footer from "../../reusable-ui/Footer.jsx";

export default function RegistrationPage() {
    return(
        <PageContainer>
            <Header/>
            <MainContent>
                <RegistrationForm/>
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
    background-color: ${theme.colors.backgroundDark};
    box-sizing: border-box;
    overflow-x: hidden;
`

const MainContent = styled.main`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${theme.colors.backgroundDark};
    }

    
`;