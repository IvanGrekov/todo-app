import { getSpacingSize } from 'components/spacing/spacing.utils';
import useWindowSize from 'hooks/windowSize.hooks';

export interface ISpacingProps {
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
    const spacingSize = getSpacingSize({
        windowSize,
        sm,
        md,
        lg,
        xl,
    });

    return <div style={{ height: spacingSize }} />;
}
