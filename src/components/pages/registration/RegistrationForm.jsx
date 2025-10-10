import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../../../theme/index.jsx";
import PrimaryButton from "../../reusable-ui/PrimaryButton.jsx";
import TextInput from "../../reusable-ui/TextInput.jsx";

export default function RegistrationForm(){
    const[familyName, setFamilyName] = useState("");
    const[firstName, setFirstName] = useState("");
    const[nickName, setNickName] = useState("");
    const[address, setAddress] = useState("");
    const[phoneNumber, setPhoneNumber] = useState("");
    const[Email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return(

        <FormContainer onSubmit={handleSubmit}>
            <h1>S'inscrire</h1>
            <TextInput
                label="Nom"
                value={familyName}
                onChange={(e) => setFamilyName(e.target.value)}
                variant="filled"
                type="text"
            />
            <TextInput
                label="Prénom"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                variant="filled"
                type="text"
            />
            <TextInput
                label="Pseudo"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
                variant="filled"
                type="text"
            />
            <TextInput
                label="Adresse"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                variant="filled"
            />
            <TextInput
                label="Numéro de téléphone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                variant="filled"
                type="tel"
            />
            <TextInput
                label="Email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                variant="filled"
                type="email"
            />
            <TextInput
                label="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="filled"
                type="password"
            />
            <PrimaryButton variant="contained" type="submit">
                S'inscrire
            </PrimaryButton>
        </FormContainer>
    );

}

const FormContainer =  styled.form`
    display: flex;
    flex-direction: column;
    gap: 24px;
    background-color: ${theme.colors.backgroundDark};
    width: 90%;
    max-width: 400px;
    margin-bottom: 25px;
    margin-top: 75px;

    h1 {
        text-align: center;
        font-family: ${theme.fonts.family};
        font-size: 24px;
        font-weight: bold;
        color: ${theme.colors.white};
        margin-bottom: -15px;

        @media (max-width: 480px) {
            font-size: 20px;
        }
    }

    `;
