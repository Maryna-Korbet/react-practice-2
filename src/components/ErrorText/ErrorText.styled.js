import styled from "@emotion/styled";

export const ErrorContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${props => props.theme.fontSizes.large};
    font-weight: 700;
    gap: ${props => props.theme.spacing(1)};
    color: ${props => props.color};
`;
