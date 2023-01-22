import Icon, { EIconNames } from 'components/icon';
import Typography from 'components/typography';
import { COLORS } from 'constants/colors';

import 'components/empty-state/EmptyState.styles.scss';

interface IEmptyStateProps {
    isError?: boolean;
    text?: string;
}

export default function EmptyState({ isError, text }: IEmptyStateProps): JSX.Element {
    const iconName = isError ? EIconNames.ERROR : EIconNames.EMPTY_DATA;
    const iconColor = isError ? COLORS.red : COLORS.primary;
    const textColor = isError ? COLORS.red : COLORS.black;
    const defaultText = isError
        ? 'Something went wrong, try to load data later'
        : 'There is no any data yet';

    return (
        <section className="empty-state">
            <div className="empty-state__icon">
                <Icon name={iconName} color={iconColor} />
            </div>
            <Typography element="h2" variant="h4" style={{ color: textColor }}>
                {text || defaultText}
            </Typography>
        </section>
    );
}
