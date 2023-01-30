import classNames from 'classnames';

import { IBaseButtonProps } from 'components/button/types';
import Icon, { EIconNames } from 'components/icon';
import { COLORS } from 'constants/colors';

import 'components/button/IconButton.styles.scss';

export interface IIconButtonProps extends IBaseButtonProps {
    iconName: EIconNames;
}

export default function IconButton({
    iconName,
    onClick,
    iconColor = COLORS.primaryDark,
    title,
    isDisabled,
}: IIconButtonProps): JSX.Element {
    return (
        <button
            title={title}
            onClick={onClick}
            disabled={isDisabled}
            className={classNames('icon-button', {
                ['icon-button--disabled']: isDisabled,
            })}
        >
            <Icon name={iconName} color={isDisabled ? COLORS.black : iconColor} />
        </button>
    );
}
