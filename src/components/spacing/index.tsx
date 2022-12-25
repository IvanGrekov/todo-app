import useWindowSize from 'hooks/useWindowSize';
import { EScreenSizeNames } from 'models/types/screenSizes';

interface ISpacingProps {
    sm: number;
    md?: number;
    lg?: number;
    xl?: number;
}

export default function Spacing({
    sm,
    md = sm,
    lg = md || sm,
    xl = lg || md || sm,
}: ISpacingProps): JSX.Element {
    const windowSize = useWindowSize();
    let spacingSize;

    switch (windowSize) {
        case EScreenSizeNames.SM:
            spacingSize = sm;
            break;

        case EScreenSizeNames.MD:
            spacingSize = md;
            break;

        case EScreenSizeNames.LG:
            spacingSize = lg;
            break;

        default:
            spacingSize = xl;
    }

    return <div style={{ height: spacingSize }} />;
}
