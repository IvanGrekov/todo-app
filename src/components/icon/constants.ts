import AddIcon from 'components/icon/AddIcon';
import EmptyDataIcon from 'components/icon/EmptyDataIcon';
import ErrorIcon from 'components/icon/ErrorIcon';
import MoreIcon from 'components/icon/MoreIcon';
import RemoveIcon from 'components/icon/RemoveIcon';
import { EIconNames } from 'components/icon/types';

export const ICON_CONFIG = {
    [EIconNames.ADD]: AddIcon,
    [EIconNames.ERROR]: ErrorIcon,
    [EIconNames.EMPTY_DATA]: EmptyDataIcon,
    [EIconNames.MORE]: MoreIcon,
    [EIconNames.REMOVE]: RemoveIcon,
};
