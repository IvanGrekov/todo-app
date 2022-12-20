import { ReactNode } from 'react';

import classNames from 'classnames';

import { TTypographyElements, TTypographyVariants } from 'components/typography/types';

import 'components/typography/Typography.styles.scss';

interface ITypographyProps {
    children: ReactNode;
    element?: TTypographyElements;
    variant?: TTypographyVariants;
    textAlign?: 'center' | 'inherit' | 'justify' | 'left' | 'right';
    lineHeight?: number | 'normal';
}

export default function Typography({
    children,
    element = 'p',
    variant = 'body1',
    textAlign = 'inherit',
    lineHeight = 'normal',
}: ITypographyProps): JSX.Element {
    const Element = element;

    return (
        <Element
            className={classNames('typography', `typography--${variant}`)}
            style={{ textAlign, lineHeight }}
        >
            {children}
        </Element>
    );
}
