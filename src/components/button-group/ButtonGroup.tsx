import { ReactNode } from 'react';

import Spacing from 'components/spacing';

import 'components/button-group/ButtonGroup.styles.scss';

interface IButtonGroupProps {
    children: ReactNode;
    shouldAddTopSpacing?: boolean;
}

export default function ButtonGroup({
    children,
    shouldAddTopSpacing,
}: IButtonGroupProps): JSX.Element {
    return (
        <>
            {shouldAddTopSpacing && <Spacing sm={52} />}

            <div className="button-group">{children}</div>
        </>
    );
}
