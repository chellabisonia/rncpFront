import React from 'react';
import styled from "styled-components";

import maisonImg from "../../assets/stayPicture/maison.jpg";
import appartImg from "../../assets/stayPicture/montmartre.jpg"
import { theme } from "../../theme";
import Footer from "../reusable-ui/Footer.jsx";
import Header from '../reusable-ui/Header.jsx';
import PrimaryButton from "../reusable-ui/PrimaryButton.jsx";
import StayCard  from "../reusable-ui/StayCard.jsx";
import TextInput from "../reusable-ui/TextInput.jsx";

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
                    <CardsGrid>
                        <StayCard   image={maisonImg}
                                    title="Chalet de montagne"
                                    city="Grenoble"
                                    price={150}/>
                        <StayCard
                            image={appartImg}
                            title="Appartement vue sur Montmartre"
                            CITY="Paris"
                            price={150}/><StayCard   image={maisonImg}
                                                     title="Chalet de montagne"
                                                     city="Grenoble"
                                                     price={150}/>
                        <StayCard
                            image={appartImg}
                            title="Appartement vue sur Montmartre"
                            CITY="Paris"
                            price={150}/><StayCard   image={maisonImg}
                                                     title="Chalet de montagne"
                                                     city="Grenoble"
                                                     price={150}/>
                        <StayCard
                            image={appartImg}
                            title="Appartement vue sur Montmartre"
                            CITY="Paris"
                            price={150}/>
                    </CardsGrid>
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
    padding-top: calc(2rem + 72px); /* ✅ compense un header fixed */

    @media (max-width: 768px) {
        padding: 1rem;
        padding-top: calc(1rem + 72px);
    }
`;


const SearchBar = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    max-width: 1100px;
    margin-top: 0.5rem;

    /* MOBILE */
    @media (max-width: 767px) {
        flex-direction: column;
        align-items: stretch;
        gap: 0.75rem;
    }

    /* TABLETTE */
    @media (min-width: 768px) and (max-width: 1023px) {
        flex-direction: row;
        align-items: center;
        padding: 0 1rem;
    }
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

    /* sur mobile: bouton prend toute la largeur */
    @media (max-width: 768px) {
        width: 100%;
    }
`;

const StyledPopularStays = styled.section`
    width: 100%;
    max-width: 1100px;
    margin-top: 3rem;

    h1 {
        color: ${theme.colors.inputDark};
        font-size: 1.4rem;
        font-family: ${theme.fonts.family};
        font-weight: 600;
        line-height: 28px;
        text-align: left;
        margin-bottom: 1.5rem;
    }
`;

const CardsGrid = styled.div`
    display: grid;
    width: 100%;
    gap: 24px;
    justify-items: center;

    grid-template-columns: 1fr;

    @media (min-width: 600px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

