import moment from 'moment';

import { DATE_USER_READABLE_FORMAT } from 'constants/date';
import { checkIfTheSameDay } from 'utils/date.utils';

export const getShouldShowDate = (date: Date): boolean => {
    const todayDate = new Date();
    const isTodayDate = checkIfTheSameDay(date, todayDate);

    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const isTomorrowDate = checkIfTheSameDay(date, tomorrowDate);

    return !isTodayDate && !isTomorrowDate;
};

export const getUserReadableDate = (date: Date): string =>
    moment(date).format(DATE_USER_READABLE_FORMAT);
