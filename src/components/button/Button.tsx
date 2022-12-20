import classNames from 'classnames';

import Icon, { EIconNames } from 'components/icon';
import Typography, { TTypographyVariants } from 'components/typography';

import 'components/button/Button.styles.scss';

interface IButtonProps {
    text: string;
    onClick: () => void;
    variant?: 'outlined' | 'contained';
    isBig?: boolean;
    textVariant?: TTypographyVariants;
    title?: string;
    iconName?: EIconNames;
    iconColor?: string;
}

export default function Button({
    text,
    onClick,
    variant = 'outlined',
    isBig,
    textVariant = 'button',
    title,
    iconName,
    iconColor,
}: IButtonProps): JSX.Element {
    return (
        <button
            title={title}
            onClick={onClick}
            className={classNames('button', `button--${variant}`, { ['button--big']: isBig })}
        >
            <Typography element="span" variant={textVariant} lineHeight={1}>
                {text}
            </Typography>
            {iconName && (
                <span className="button__icon">
                    <Icon name={iconName} color={iconColor} />
                </span>
            )}
        </button>
    );
}
