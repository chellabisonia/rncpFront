import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import React, { useState } from "react";
import styled from "styled-components";

import { theme } from "../../../theme/index.jsx";
import PrimaryButton from "../../reusable-ui/PrimaryButton.jsx";

const BP = { mobile: 640 };

const AVATARS = ["avatar-1", "avatar-2", "avatar-3", "avatar-4"];

function avatarSrcFromName(pictureName) {
    if (!pictureName || pictureName.trim() === "") {
        return "/avatars/avatar-default.jpg";
    }
    return `/avatars/${pictureName}.jpg`;
}

export default function ProfileHeader({ profile, isEditing, onAvatarSelected }) {
    const [chooserOpen, setChooserOpen] = useState(false);

    const avatarSrc = avatarSrcFromName(profile.pictureName);

    const toggleChooser = () => setChooserOpen((v) => !v);

    const pick = (name) => {
        onAvatarSelected(name);
        setChooserOpen(false);
    };

    return (
        <HeaderRow>
            <Avatar src={avatarSrc} alt={`${profile.lastname} ${profile.firstname}`} />

            <NameWrap>
                <Name>{`${profile.lastname} ${profile.firstname}`}</Name>

                {isEditing && (
                    <>
                        <PrimaryButton variant="contained" type="button" onClick={toggleChooser}>
                            <IconSlot>
                                <PhotoCameraIcon fontSize="small" />
                            </IconSlot>
                            Modifier
                        </PrimaryButton>

                        {chooserOpen && (
                            <Chooser>
                                <ChooserTitle>Choisis un avatar :</ChooserTitle>
                                <Grid>
                                    {AVATARS.map((name) => {
                                        const src = avatarSrcFromName(name);
                                        const selected = profile.pictureName === name;
                                        return (
                                            <Choice
                                                key={name}
                                                type="button"
                                                $selected={selected}
                                                onClick={() => pick(name)}
                                            >
                                                <ChoiceImg src={src} alt={name} />
                                            </Choice>
                                        );
                                    })}
                                </Grid>

                                <CloseRow>
                                    <CloseBtn type="button" onClick={() => setChooserOpen(false)}>
                                        Fermer
                                    </CloseBtn>
                                </CloseRow>
                            </Chooser>
                        )}
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
  gap: clamp(0.75rem, 2vw, 1rem);
  margin-bottom: clamp(0.75rem, 2vw, 1.2rem);

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
  gap: 0.5rem;
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

const IconSlot = styled.span`
    display: inline-flex;
    margin-right: 0.5rem;

    & > svg {
        display: block;
    }
`;

const Chooser = styled.div`
    margin-top: 0.75rem;
    padding: 0.75rem;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 12px;
    background: ${theme.colors.white};
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
`;

const ChooserTitle = styled.div`
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: ${theme.colors.inputDark};
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 44px);
    gap: 0.5rem;
`;

const Choice = styled.button`
    border: 2px solid ${({ $selected }) => ($selected ? theme.colors.primary : "transparent")};
    background: transparent;
    padding: 2px;
    border-radius: 999px;
    cursor: pointer;

    &:hover {
        border-color: ${theme.colors.primary};
    }
`;

const ChoiceImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 999px;
    object-fit: cover;
    display: block;
`;

const CloseRow = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 0.75rem;
`;

const CloseBtn = styled.button`
    border: none;
    background: transparent;
    cursor: pointer;
    color: ${theme.colors.inputDark};
    opacity: 0.8;

    &:hover {
        opacity: 1;
    }
`;

