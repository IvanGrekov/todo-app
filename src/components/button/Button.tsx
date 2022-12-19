import classNames from 'classnames';

import Typography, { TTypographyVariants } from 'components/typography';

import 'components/button/Button.styles.scss';

interface IButtonProps {
    text: string;
    onClick: () => void;
    isActive?: boolean;
    textVariant?: TTypographyVariants;
    title?: string;
}

export default function Button({
    text,
    onClick,
    isActive,
    textVariant = 'button',
    title,
}: IButtonProps): JSX.Element {
    return (
        <button
            title={title}
            onClick={onClick}
            className={classNames('button', { [`button--active`]: isActive })}
        >
            <Typography element="span" variant={textVariant}>
                {text}
            </Typography>
        </button>
    );
}
