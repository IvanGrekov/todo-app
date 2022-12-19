import classNames from 'classnames';

import Typography, { TTypographyVariants } from 'components/typography';

import 'components/button/Button.styles.scss';

interface IButtonProps {
    text: string;
    textVariant?: TTypographyVariants;
    title?: string;
}

export default function Button({ text, textVariant = 'button', title }: IButtonProps): JSX.Element {
    return (
        <button title={title} className={classNames('button')}>
            <Typography element="span" variant={textVariant}>
                {text}
            </Typography>
        </button>
    );
}
