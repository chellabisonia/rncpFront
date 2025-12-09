import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import React from "react";
import styled from "styled-components";

import {theme} from "../../../theme/index.jsx";
import PrimaryButton from "../../reusable-ui/PrimaryButton.jsx";


const BP = {
    mobile: 640,
};

export default function ProfileHeader({
                                          profile,
                                          isEditing,
                                          fileRef,
                                          onAvatarClick,
                                          onFileChange,
                                      }) {
    return (
        <HeaderRow>
            <Avatar
                src={profile.avatarUrl}
                alt={`${profile.lastname} ${profile.firstname}`}
            />

            <NameWrap>
                <Name>{`${profile.lastname} ${profile.firstname}`}</Name>

                {isEditing && (
                    <>
                        <HiddenFile
                            ref={fileRef}
                            type="file"
                            accept="image/*"
                            onChange={onFileChange}
                        />
                        <PrimaryButton
                            variant="contained"
                            type="button"
                            onClick={onAvatarClick}
                        >
                            <IconSlot>
                                <PhotoCameraIcon fontSize="small"/>
                            </IconSlot>
                            Modifier
                        </PrimaryButton>
                    </>
                )}
            </NameWrap>
        </HeaderRow>
    );
}

/* ============ STYLES ============ */

const HeaderRow = styled.div`
    display: flex;
    align-items: center;
    gap: clamp(.75rem, 2vw, 1rem);
    margin-bottom: clamp(.75rem, 2vw, 1.2rem);

    @media (max-width: ${BP.mobile}px) {
        flex-direction: column;
        text-align: center;
    }
`;

const Avatar = styled.img`
    width: clamp(64px, 12vw, 88px);
    height: clamp(64px, 12vw, 88px);
    border-radius: 50%;
    object-fit: cover;
`;

const NameWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: .5rem;
    align-items: flex-start;

    @media (max-width: ${BP.mobile}px) {
        align-items: center;

        & > button {
            width: 100%;
            max-width: 320px;
        }
    }
`;

const Name = styled.h2`
    margin: 0;
    font-size: clamp(1.1rem, 2.5vw, 1.25rem);
    font-weight: 700;
    color: ${theme.colors.inputDark};
`;

const HiddenFile = styled.input`
    display: none;
`;

const IconSlot = styled.span`
    display: inline-flex;
    margin-right: .5rem;

    & > svg {
        display: block;
    }
`;

