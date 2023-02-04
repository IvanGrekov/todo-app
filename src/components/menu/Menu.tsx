import { ReactElement, useState } from 'react';

import classNames from 'classnames';
import FocusTrap from 'focus-trap-react';

import { IconButton } from 'components/button';
import { EIconNames } from 'components/icon';
import { TMenuActionItemProps } from 'components/menu/MenuActionItem';

import 'components/menu/Menu.styles.scss';

type TMenuItemChild = ReactElement<TMenuActionItemProps>;

interface IMenuProps {
    iconColor?: string;
    children: TMenuItemChild | TMenuItemChild[];
}

export default function Menu({ iconColor, children }: IMenuProps): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);

    const clickHandler = (): void => {
        setIsOpen(false);
    };

    return (
        <FocusTrap
            active={isOpen}
            focusTrapOptions={{
                clickOutsideDeactivates: true,
                onDeactivate: clickHandler,
            }}
        >
            <div className="menu" onClick={clickHandler}>
                <IconButton
                    iconName={EIconNames.MORE}
                    onClick={(e): void => {
                        e.stopPropagation();
                        setIsOpen((prevState) => !prevState);
                    }}
                    title="Open Menu"
                    iconColor={iconColor}
                />

                <div className={classNames('menu__actions', { ['menu__actions--open']: isOpen })}>
                    {children}
                </div>
            </div>
        </FocusTrap>
    );
}
