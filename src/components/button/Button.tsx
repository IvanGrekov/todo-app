import classNames from 'classnames';

import { IBaseButtonProps } from 'components/button/types';
import Icon, { EIconNames } from 'components/icon';
import Loader from 'components/loader';
import Typography, { TTypographyVariants } from 'components/typography';

import 'components/button/Button.styles.scss';

export interface IButtonProps extends IBaseButtonProps {
    text: string;
    type?: 'button' | 'submit';
    form?: string;
    variant?: 'outlined' | 'contained' | 'ghost';
    size?: 'small' | 'big' | 'regular';
    textVariant?: TTypographyVariants;
    iconName?: EIconNames;
    isLoading?: boolean;
}

export default function Button({
    text,
    onClick,
    type = 'button',
    form,
    variant = 'outlined',
    size = 'regular',
    textVariant = size === 'small' ? 'body2' : 'button',
    title,
    iconName,
    iconColor,
    isDisabled,
    isLoading,
}: IButtonProps): JSX.Element {
    const isButtonDisabled = isDisabled || isLoading;

    return (
        <button
            type={type}
            form={form}
            title={title}
            disabled={isButtonDisabled}
            onClick={onClick}
            className={classNames('button', `button--${variant}`, `button--${size}`, {
                ['button--disabled']: isDisabled,
                ['button--loading']: isLoading,
            })}
        >
            {isLoading ? (
                <span className="button__loader">
                    <Loader />
                </span>
            ) : (
                <>
                    <Typography
                        element="span"
                        variant={textVariant}
                        style={{ lineHeight: 1, textTransform: 'uppercase', fontWeight: 600 }}
                    >
                        {text}
                    </Typography>
                    {iconName && (
                        <span className="button__icon">
                            <Icon name={iconName} color={iconColor} />
                        </span>
                    )}
                </>
            )}
        </button>
    );
}
