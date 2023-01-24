import styled from 'styled-components';

interface ILoaderProps {
    size?: number;
}

const StyledLoader = styled.div`
    @keyframes lds-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    display: inline-block;
    position: relative;
    width: ${({ theme }): string => `${theme.size}px`};
    height: ${({ theme }): string => `${theme.size}px`};

    & div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: ${({ theme }): string => `${theme.size / 1.25}px`};
        height: ${({ theme }): string => `${theme.size / 1.25}px`};
        margin: ${({ theme }): string => `${theme.size / 10}px`};
        border: ${({ theme }): string => `${theme.size / 10}px`} solid #cef;
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: #cef transparent transparent transparent;
    }

    & div:nth-child(1) {
        animation-delay: -0.45s;
    }

    & div:nth-child(2) {
        animation-delay: -0.3s;
    }

    & div:nth-child(3) {
        animation-delay: -0.15s;
    }
`;

export default function Loader({ size = 40 }: ILoaderProps): JSX.Element {
    return (
        <StyledLoader theme={{ size }}>
            <div />
            <div />
            <div />
            <div />
        </StyledLoader>
    );
}
