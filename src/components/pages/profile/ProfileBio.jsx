import React from "react";
import styled from "styled-components";
import { theme } from "../../../theme/index.jsx";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";

const BP = {
    mobile: 640,
};

export default function ProfileBio({ bio, isEditing, onEditBio }) {
    return (
        <BioContainer>
            <SectionTitle>Description personnelle:</SectionTitle>

            <BioRow>
                <BioText>{bio}</BioText>

                {isEditing && (
                    <EditWrapper>
                        <Tooltip title="Modifier la description">
                            <IconButton size="small" onClick={onEditBio}>
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </EditWrapper>
                )}
            </BioRow>
        </BioContainer>
    );
}

/* ============ STYLES ============ */

const BioContainer = styled.div`
    width: 100%;
    margin-top: 1rem;
`;

const SectionTitle = styled.p`
    margin: 0 0 .5rem 0;
    color: ${theme.colors.inputDark};
    opacity: 0.7;
    font-size: clamp(0.9rem, 2vw, 0.95rem);
`;

const BioRow = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    width: 100%;

    @media (max-width: ${BP.mobile}px) {
        flex-direction: column;
        align-items: stretch;
    }
`;

const BioText = styled.p`
    margin: 0;
    line-height: 1.8;
    color: ${theme.colors.inputDark};
    font-size: clamp(0.95rem, 2vw, 1rem);
    word-break: break-word;
    flex: 1;
`;

const EditWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;
