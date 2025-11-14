import React, {useState} from "react";
import styled from "styled-components";
import {theme} from "../../../theme/index.jsx";
import PrimaryButton from "../../reusable-ui/PrimaryButton.jsx";
import TextInput from "../../reusable-ui/TextInput.jsx";

export default function RegistrationForm({onSubmit, loading, error, initialValues}) {
    const [formData, setFormData] = useState({
        lastname: "",
        firstname: "",
        username: "",
        address: "",
        phoneNumber: "",
        email: "",
        password: "",
        ...initialValues || {}
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.(formData);
    };
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    return (

        <FormContainer onSubmit={handleSubmit} noValidate>
            <h1>S'inscrire</h1>
            <TextInput
                label="Nom"
                onChange={handleChange}
                variant="filled"
                type="text"
                name="lastname"
                value={formData.lastname}
                required
            />
            <TextInput
                label="Prénom"
                onChange={handleChange}
                variant="filled"
                type="text"
                name="firstname"
                value={formData.firstname}
                required
            />
            <TextInput
                label="Pseudo"
                onChange={handleChange}
                variant="filled"
                type="text"
                name="username"
                value={formData.username}
                required
            />
            <TextInput
                label="Adresse"
                onChange={handleChange}
                variant="filled"
                type="text"
                name="address"
                value={formData.address}
            />
            <TextInput
                label="Numéro de téléphone"
                onChange={handleChange}
                variant="filled"
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
            />
            <TextInput
                label="Email"
                onChange={handleChange}
                variant="filled"
                type="email"
                name="email"
                value={formData.email}
                required
            />
            <TextInput
                label="Mot de passe"
                onChange={handleChange}
                variant="filled"
                type="password"
                name="password"
                value={formData.password}
                required
            />

            {error && <ErrorText>{error}</ErrorText>}

            <PrimaryButton variant="contained" type="submit" disabled={loading}>
                {loading ? "Inscription..." : "S'inscrire"}
            </PrimaryButton>
        </FormContainer>
    );

}

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 24px;
    background-color: ${theme.colors.pageBody};
    width: 90%;
    max-width: 400px;
    margin-bottom: 25px;
    margin-top: 75px;

    h1 {
        text-align: center;
        font-family: ${theme.fonts.family};
        font-size: 24px;
        font-weight: bold;
        color: ${theme.colors.inputDark};
        margin-bottom: -15px;

        @media (max-width: 480px) {
            font-size: 20px;
        }
    }`;

const ErrorText = styled.p` color: #d32f2f;
    font-size: 14px;
    margin: 0;
`;


