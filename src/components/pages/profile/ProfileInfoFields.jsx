import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import React from "react";
import styled from "styled-components";

import {theme} from "../../../theme/index.jsx";


const BP = {
    tablet: 820,
    mobile: 640,
};

export default function ProfileInfoFields({profile, isEditing, onEditField}) {
    return (
        <Info>
            <EditableFieldLine
                label="Nom d'utilisateur:"
                value={profile.username}
                field="username"
                tooltip="Modifier le nom d'utilisateur"
                isEditing={isEditing}
                onEditField={onEditField}
            />

            <EditableFieldLine
                label="Adresse:"
                value={profile.address}
                field="address"
                tooltip="Modifier l'adresse"
                isEditing={isEditing}
                onEditField={onEditField}
            />

            <EditableFieldLine
                label="Téléphone:"
                value={profile.phoneNumber}
                field="phone"
                tooltip="Modifier le téléphone"
                isEditing={isEditing}
                onEditField={onEditField}
            />

            <EditableFieldLine
                label="Email:"
                value={profile.email}
                field="email"
                tooltip="Modifier l'email"
                isEditing={isEditing}
                onEditField={onEditField}
                fieldOptions={{type: "email"}}
            />
        </Info>
    );
}

function EditableFieldLine({
                               label,
                               value,
                               field,
                               tooltip,
                               isEditing,
                               onEditField,
                               fieldOptions = {},
                           }) {
    return (
        <FieldLine>
            <Label>{label}&nbsp;</Label>
            <Value>{value}</Value>

            {isEditing && (
                <RightIcon>
                    <Tooltip title={tooltip}>
                        <IconButton
                            size="small"
                            onClick={() =>
                                onEditField(field, label.replace(/:$/, ""), fieldOptions)
                            }
                        >
                            <EditIcon fontSize="small"/>
                        </IconButton>
                    </Tooltip>
                </RightIcon>
            )}
        </FieldLine>
    );
}

/* ============ STYLES ============ */

const Info = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: .65rem;

    @media (min-width: ${BP.tablet}px) {
        grid-template-columns: 1fr 1fr;
        column-gap: 2rem;
        row-gap: .75rem;
    }
`;

const FieldLine = styled.p`
    margin: 0;
    font-size: clamp(.95rem, 2vw, 1rem);
    line-height: 1.6;
    color: ${theme.colors.inputDark};
    display: flex;
    align-items: center;
    gap: .35rem;
    position: relative;
    padding-right: 32px;

    @media (max-width: ${BP.mobile}px) {
        padding-right: 0;
    }
`;

const Label = styled.span`
    opacity: .7;
    white-space: nowrap;
`;

const Value = styled.span``;

const RightIcon = styled.span`
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);

    @media (max-width: ${BP.mobile}px) {
        position: static;
        transform: none;
        margin-left: auto;
    }
`;

