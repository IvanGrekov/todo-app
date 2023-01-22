import classNames from 'classnames';

import Icon, { EIconNames } from 'components/icon';
import Typography, { TTypographyVariants } from 'components/typography';

import 'components/button/Button.styles.scss';

export interface IButtonProps {
    text: string;
    onClick?: () => void;
    type?: 'button' | 'submit';
    form?: string;
    variant?: 'outlined' | 'contained';
    isBig?: boolean;
    textVariant?: TTypographyVariants;
    title?: string;
    iconName?: EIconNames;
    iconColor?: string;
    isDisabled?: boolean;
}

export default function Button({
    text,
    onClick,
    type = 'button',
    form,
    variant = 'outlined',
    isBig,
    textVariant = 'button',
    title,
    iconName,
    iconColor,
    isDisabled,
}: IButtonProps): JSX.Element {
    return (
        <button
            type={type}
            form={form}
            title={title}
            disabled={isDisabled}
            onClick={onClick}
            className={classNames('button', `button--${variant}`, {
                ['button--big']: isBig,
                ['button--disabled']: isDisabled,
            })}
        >
            <Typography element="span" variant={textVariant} style={{ lineHeight: 1 }}>
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
