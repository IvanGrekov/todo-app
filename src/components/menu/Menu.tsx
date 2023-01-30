import { useState } from 'react';

import classNames from 'classnames';
import FocusTrap from 'focus-trap-react';

import { IconButton } from 'components/button';
import { EIconNames } from 'components/icon';

import 'components/menu/Menu.styles.scss';

interface IMenuProps {
    iconColor?: string;
}

export default function Menu({ iconColor }: IMenuProps): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={classNames('menu', { ['menu--open']: isOpen })}>
            <IconButton
                iconName={EIconNames.MORE}
                onClick={(): void => setIsOpen((prevState) => !prevState)}
                title="Open Menu"
                iconColor={iconColor}
            />
            <FocusTrap active={isOpen} />
        </div>
    );
}
