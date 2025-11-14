import React, {useState} from "react";
import styled from "styled-components";

import {theme} from "../../../theme/index.jsx";
import PrimaryButton from "../../reusable-ui/PrimaryButton.jsx";
import TextInput from "../../reusable-ui/TextInput.jsx";

export default function LoginForm({onSubmit, loading, error}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.({username, password});
    };

    return (<FormContainer onSubmit={handleSubmit} noValidate>
        <h1>Se connecter</h1>
        <TextInput
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="filled"
            type="text"
            required
        />
        <TextInput
            label="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="filled"
            type="password"
            required
        />
        {error && <ErrorText>{error}</ErrorText>}
        <PrimaryButton variant="contained" type="submit" disabled={loading}>
            {loading ? "Connexion..." : "Connexion"}
        </PrimaryButton>
        <ForgotPassword href="#">Mot de passe oublié</ForgotPassword>
    </FormContainer>);
}

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 24px;
    background-color: ${theme.colors.pageBody};
    width: 100%;
    max-width: 400px;

    h1 {
        text-align: center;
        font-family: ${theme.fonts.family};
        font-size: 24px;
        font-weight: bold;
        color: ${theme.colors.inputDark};

        @media (max-width: 480px) {
            font-size: 20px;
        }
    }
`;


const ForgotPassword = styled.a`
    font-family: ${theme.fonts.family};
    font-size: 14px;
    color: ${theme.colors.inputDark};
    text-decoration: none;
    text-align: center;

    &:hover {
        text-decoration: underline;
        color: ${theme.colors.inputDark};
    }
`;

const ErrorText = styled.p`
    color: #d32f2f;
    font-size: 14px;
    margin: 0;
`;