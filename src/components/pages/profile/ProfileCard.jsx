import React from "react";
import styled from "styled-components";
import {theme} from "../../../theme/index.jsx";

export default function ProfileCard() {
    // Mock de données -> à remplacer plus tard
    const user = {
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
    };

    return (
        <Card>
            <HeaderRow>
                <Avatar src={user.avatarUrl} alt={`${user.lastname} ${user.firstname}`}/>
                <Name>{`${user.lastname} ${user.firstname}`}</Name>
            </HeaderRow>

            <Info>
                <Line>
                    <Label>Nom d'utilisateur:&nbsp;</Label>
                    <Value>{user.username}</Value>
                </Line>
                <Line>
                    <Label>Adresse:&nbsp;</Label>
                    <Value>{user.address}</Value>
                </Line>
                <Line>
                    <Label>Téléphone:&nbsp;</Label>
                    <Value>{user.phone}</Value>
                </Line>
                <Line>
                    <Label>Email:&nbsp;</Label>
                    <Value>{user.email}</Value>
                </Line>
            </Info>

            <Divider/>

            <SectionTitle>Description personnelle:</SectionTitle>
            <Bio>{user.bio}</Bio>
        </Card>
    );
}
/* ====== STYLES ====== */

const Card = styled.section`
    background: ${theme.colors.white};
    border-radius: 14px;
    box-shadow: 0 2px 14px rgba(0, 0, 0, 0.06);
    padding: clamp(1rem, 3.5vw, 2.5rem);
    border: 1px solid rgba(0, 0, 0, 0.06);
    transition: box-shadow 0.2s ease, transform 0.2s ease;
    min-width: 0;

    &:hover {
        box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
    }

    /* TABLETTE : un peu plus de padding pour le confort tactile */
    @media (min-width: 641px) and (max-width: 1024px) {
        padding: clamp(1.25rem, 3vw, 2.25rem);
    }
`;

const HeaderRow = styled.div`
    display: flex;
    align-items: center;
    gap: clamp(0.75rem, 2vw, 1rem);
    margin-bottom: clamp(0.75rem, 2vw, 1.2rem);

    /* MOBILE : avatar au-dessus du nom */
    @media (max-width: 600px) {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    /* TABLETTE : on garde l’horizontale, mais avec un peu plus d’air */
    @media (min-width: 641px) and (max-width: 1024px) {
        gap: 1.25rem;
    }
`;

const Avatar = styled.img`
    width: clamp(56px, 8vw, 72px);
    height: clamp(56px, 8vw, 72px);
    border-radius: 50%;
    object-fit: cover;
    flex: 0 0 auto;
`;

const Name = styled.h2`
    margin: 0;
    font-size: clamp(1.1rem, 2.5vw, 1.25rem);
    font-weight: 700;
    color: ${theme.colors.inputDark};
    font-family: ${theme.fonts.family};
    word-break: break-word;
`;

const Info = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5rem;

    /* TABLETTE/DESKTOP : deux colonnes si la largeur le permet */
    @media (min-width: 820px) {
        grid-template-columns: 1fr 1fr;
        column-gap: 2rem;
        row-gap: 0.65rem;
    }
`;

const Line = styled.p`
    margin: 0;
    font-size: clamp(0.95rem, 2vw, 1rem);
    line-height: 1.6;
    color: ${theme.colors.inputDark};
    word-break: break-word;
`;

const Label = styled.span`
    color: ${theme.colors.inputDark};
    opacity: 0.7;
`;

const Value = styled.span``;

const Divider = styled.hr`
    grid-column: 1 / -1; /* si 2 colonnes, le divider prend toute la largeur */
    border: none;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    margin: clamp(1rem, 3vw, 1.5rem) 0;
`;

const SectionTitle = styled.p`
    margin: 0 0 0.5rem 0;
    color: ${theme.colors.inputDark};
    opacity: 0.7;
    font-size: clamp(0.9rem, 2vw, 0.95rem);
`;

const Bio = styled.p`
    margin: 0;
    line-height: 1.8;
    color: ${theme.colors.inputDark};
    font-size: clamp(0.95rem, 2vw, 1rem);
    word-break: break-word;
`;
