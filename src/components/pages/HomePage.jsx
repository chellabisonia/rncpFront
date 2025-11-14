import React from 'react';
import styled from "styled-components";
import Header from '../reusable-ui/Header.jsx';
import Footer from "../reusable-ui/Footer.jsx";
import PrimaryButton from "../reusable-ui/PrimaryButton.jsx";
import TextInput from "../reusable-ui/TextInput.jsx";
import { theme } from "../../theme";

export default function HomePage() {
    const [textInput, setTextInput] = React.useState("");

    return (
        <HomePageContainer>
            <Header />
            <MainContent>
                <SearchBar>
                    <StyledTextInput
                        type="text"
                        variant="filled"
                        onChange={(e) => setTextInput(e.target.value)}
                        value={textInput}
                        placeholder="Destination"
                    />
                    <StyledPrimaryButton
                        variant="contained"
                        type="submit">
                        Rechercher
                    </StyledPrimaryButton>
                </SearchBar>
                {/* Ici tu mettras tes sections "Séjours populaires" */}
                <StyledPopularStays>
                    <h1>Séjours populaires</h1>
                </StyledPopularStays>
            </MainContent>
            <Footer />
        </HomePageContainer>
    );
}

// ===== STYLES =====
const HomePageContainer = styled.div`
    background-color: ${theme.colors.pageBody}; 
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

const MainContent = styled.main`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
`;

const SearchBar = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    max-width: 800px;
    margin-top: 3rem;
`;

const StyledTextInput = styled(TextInput)`
    background-color: ${theme.colors.inputDark};
    border-radius: 50px;
    flex: 1;
    input {
        border-radius: 50px;
        padding: 0.6rem 1rem;
        &::placeholder {
            color: ${theme.colors.inputDark};
            opacity: 0.7; /* facultatif : un peu de transparence */
        }
    }
   
`;

const StyledPrimaryButton = styled(PrimaryButton)`
    background-color: ${theme.colors.inputDark};
    color: ${theme.colors.white};
    border-radius: 50px;
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
    &:hover {
        background-color: ${theme.colors.inputDark};
    }
`;

const StyledPopularStays = styled.div`
    width: 100%;
    padding-left: 2rem; /* marge depuis le bord de l’écran */
    margin-top: -4px;

    h1 {
        color: ${theme.colors.inputDark};
        font-size: 1.2rem;
        font-family: ${theme.fonts.family};
        font-weight: 600;
        line-height: 28px;
        text-align: left;
    }
`;