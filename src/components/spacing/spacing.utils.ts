import { EScreenSizeNames } from 'models/types/screenSizes';

type TGetSpacingSize = (input: {
    windowSize: EScreenSizeNames;
    sm: number;
    md: number;
    lg: number;
    xl: number;
}) => number;

export const getSpacingSize: TGetSpacingSize = ({ windowSize, sm, md, lg, xl }) => {
    switch (windowSize) {
        case EScreenSizeNames.SM:
            return sm;

        case EScreenSizeNames.MD:
            return md;

        case EScreenSizeNames.LG:
            return lg;

        default:
            return xl;
    }
};
