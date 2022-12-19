import { ReactNode } from 'react';

import classNames from 'classnames';

import { TTypographyElements, TTypographyVariants } from 'components/typography/types';

import 'components/typography/Typography.styles.scss';

interface ITypographyProps {
    children: ReactNode;
    element?: TTypographyElements;
    variant?: TTypographyVariants;
}

export default function Typography({
    element = 'p',
    variant = 'body1',
    children,
}: ITypographyProps): JSX.Element {
    const Element = element;

    return (
        <Element className={classNames('typography', `typography--${variant}`)}>{children}</Element>
    );
}
