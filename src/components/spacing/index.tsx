import { getSpacingSize } from 'components/spacing/spacing.utils';
import { ISpacingProps } from 'components/spacing/types';
import useWindowSize from 'hooks/windowSize.hooks';

export default function Spacing({
    xs,
    sm = xs,
    md = sm || xs,
    lg = md || sm || xs,
    xl = lg || md || sm || xs,
}: ISpacingProps): JSX.Element {
    const windowSize = useWindowSize();
    const spacingSize = getSpacingSize({
        windowSize,
        xs,
        sm,
        md,
        lg,
        xl,
    });

    return <div style={{ height: spacingSize }} />;
}
