import { ErrorContainer } from './ErrorText.styled';

export const ErrorText = ({ type, children }) => {
    let color;
    switch (type) {
        case 'network':
            color = '#aa0000'; 
            break;
        case 'server':
            color = '#ff8C00'; 
            break;
        default:
            color = '#2fa276'; 
            break;
    }

    return (
        <ErrorContainer color={color}>
            {children}
        </ErrorContainer>
    );
}