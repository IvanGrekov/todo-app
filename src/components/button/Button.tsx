import { CSSProperties } from 'react';

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
    textColor?: string;
    textVariant?: TTypographyVariants;
    iconName?: EIconNames;
    isLoading?: boolean;
    style?: CSSProperties;
}

export default function Button({
    text,
    onClick,
    type = 'button',
    form,
    variant = 'outlined',
    size = 'regular',
    textVariant = size === 'small' ? 'body2' : 'button',
    textColor,
    title,
    iconName,
    iconColor,
    isDisabled,
    isLoading,
    style,
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
            style={style}
        >
            {isLoading ? (
                <span className="button__loader">
                    <Loader />
                </span>
            ) : (
                <>
                    {text && (
                        <Typography
                            element="span"
                            variant={textVariant}
                            color={textColor}
                            style={{ lineHeight: 1, textTransform: 'uppercase', fontWeight: 600 }}
                        >
                            {text}
                        </Typography>
                    )}

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
