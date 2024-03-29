import { Suspense } from 'react';

import { ICON_CONFIG } from 'components/icon/constants';
import { IBaseIconProps, EIconNames } from 'components/icon/types';

type TIconProps = IBaseIconProps & {
    name: EIconNames;
};

export default function Icon({ name, color }: TIconProps): JSX.Element {
    const IconElement = ICON_CONFIG[name];

    return (
        <Suspense fallback="load">
            <IconElement color={color} />
        </Suspense>
    );
}
