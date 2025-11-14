import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, {useEffect, useRef, useState} from "react";
import styled, {css} from "styled-components";

import {theme} from "../../../theme/index.jsx";

import ProfileBio from "./ProfileBio.jsx";
import ProfileEditDialog from "./ProfileEditDialog.jsx";
import ProfileHeader from "./ProfileHeader.jsx";
import ProfileInfoFields from "./ProfileInfoFields.jsx";

export default function ProfileCard({
                                        isEditing,
                                        profile,
                                        onChange,
                                        onAvatarSelected,
                                        cancelSignal,
                                    }) {
    const fileRef = useRef(null);

    const muiTheme = useTheme();
    const fullScreen = useMediaQuery(muiTheme.breakpoints.down("sm"));

    const [dlg, setDlg] = useState({
        open: false,
        field: "",
        label: "",
        type: "text",
        value: "",
        multiline: false,
    });

    // Auto-close dialog when parent sends cancel signal
    useEffect(() => {
        setDlg((d) =>
            d.open
                ? {...d, open: false}
                : d
        );
    }, [cancelSignal]);


    const openEditor = (field, label, {type = "text", multiline = false} = {}) => {
        if (!isEditing) return;
        setDlg({
            open: true,
            field,
            label,
            type,
            multiline,
            value: profile[field] ?? "",
        });
    };

    const closeEditor = () =>
        setDlg((d) => ({
            ...d,
            open: false,
        }));

    const confirmEditor = () => {
        onChange(dlg.field, dlg.value);
        closeEditor();
    };

    const handleAvatarClick = () => fileRef.current?.click();

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        onAvatarSelected(file);
        e.target.value = "";
    };

    return (
        <Card $editing={isEditing}>
            <ProfileHeader
                profile={profile}
                isEditing={isEditing}
                fileRef={fileRef}
                onAvatarClick={handleAvatarClick}
                onFileChange={handleFileChange}
            />

            <ProfileInfoFields
                profile={profile}
                isEditing={isEditing}
                onEditField={openEditor}
            />

            <Divider/>

            <ProfileBio
                bio={profile.bio}
                title="Description personnelle"
                isEditing={isEditing}
                onEditBio={() =>
                    openEditor("bio", "Description personnelle", {multiline: true})
                }
            />

            <ProfileEditDialog
                dlg={dlg}
                fullScreen={fullScreen}
                onClose={closeEditor}
                onConfirm={confirmEditor}
                onChangeValue={(value) =>
                    setDlg((d) => ({
                        ...d,
                        value,
                    }))
                }
            />
        </Card>
    );
}

/* ============ STYLES ============ */

const Card = styled.section`
    background: ${theme.colors.white};
    border-radius: 14px;
    box-shadow: 0 2px 14px rgba(0, 0, 0, 0.06);
    padding: clamp(1rem, 3.5vw, 2.5rem);
    border: 1px solid rgba(0, 0, 0, 0.04);
    transition: box-shadow 0.25s ease, transform 0.25s ease;
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;

    ${({$editing}) =>
            $editing &&
            css`
                border-color: transparent;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.10),
                0 8px 24px rgba(0, 0, 0, 0.15);
                transform: translateY(-2px);
            `}
`;

const Divider = styled.hr`
    grid-column: 1 / -1;
    border: none;
    border-top: 1px solid rgba(0, 0, 0, .08);
    margin: clamp(1rem, 3vw, 1.5rem) 0;
`;
