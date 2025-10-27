import styled from "styled-components";

import { FaHome } from "react-icons/fa";
import {theme} from "../../theme/index.jsx";

export default function Logo({ className, onClick }) {
    return (
        <LogoStyled className={className} onClick={onClick}>
            <FaHome className="home-logo"  color={theme.colors.inputDark}/>
            <h1>StayWithLocals</h1>
        </LogoStyled>
    );
}

const LogoStyled = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;

    &:hover {
        transform: scale(1.05);
    }

    h1 {
        display: inline;
        text-align: center;
        color: ${theme.colors.inputDark};
        font-size: ${theme.fonts.sizes.P2};
        line-height: ${theme.fonts.sizes.P3};
        font-family: ${theme.fonts.family};
        font-weight: bold;
        margin: 0;
    }

    .home-logo {
        font-size: ${theme.fonts.sizes.P2};
        color: ${theme.colors.inputDark};
        transition: color 0.3s ease-in-out;
    }
`;
