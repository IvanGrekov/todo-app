import { lazy } from 'react';

const AddIcon = lazy(() => import('components/icon/AddIcon'));
const CompleteIcon = lazy(() => import('components/icon/CompleteIcon'));
const EditIcon = lazy(() => import('components/icon/EditIcon'));
const EmptyDataIcon = lazy(() => import('components/icon/EmptyDataIcon'));
const ErrorIcon = lazy(() => import('components/icon/ErrorIcon'));
const IncompleteIcon = lazy(() => import('components/icon/IncompleteIcon'));
const MoreIcon = lazy(() => import('components/icon/MoreIcon'));
const RemoveIcon = lazy(() => import('components/icon/RemoveIcon'));
import { EIconNames } from 'components/icon/types';

export const ICON_CONFIG = {
    [EIconNames.ADD]: AddIcon,
    [EIconNames.ERROR]: ErrorIcon,
    [EIconNames.EMPTY_DATA]: EmptyDataIcon,
    [EIconNames.MORE]: MoreIcon,
    [EIconNames.REMOVE]: RemoveIcon,
    [EIconNames.COMPLETE]: CompleteIcon,
    [EIconNames.INCOMPLETE]: IncompleteIcon,
    [EIconNames.EDIT]: EditIcon,
};
