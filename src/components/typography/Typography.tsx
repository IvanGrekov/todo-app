import { ReactNode, CSSProperties } from 'react';

import classNames from 'classnames';

import { TTypographyElements, TTypographyVariants } from 'components/typography/types';

import 'components/typography/Typography.styles.scss';

interface ITypographyProps {
    children: ReactNode;
    element?: TTypographyElements;
    variant?: TTypographyVariants;
    color?: string;
    style?: CSSProperties;
}

export default function Typography({
    children,
    element = 'p',
    variant = 'body1',
    color = 'inherit',
    style,
}: ITypographyProps): JSX.Element {
    const Element = element;

    return (
        <Element
            className={classNames('typography', `typography--${variant}`)}
            style={{ color, ...style }}
        >
            {children}
        </Element>
    );
}
