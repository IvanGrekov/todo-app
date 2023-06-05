import moment from 'moment';

import { DATE_FORMAT, DATE_FORMAT_FOR_ERROR_LOGGER } from 'constants/date';

export const formatDate = (date: string | Date): string => moment(date).format(DATE_FORMAT);

export const getCurrentFormattedDate = (): string => moment(new Date()).format(DATE_FORMAT);

export const getCurrentDateForInput = (): string => moment(new Date()).format('YYYY-MM-DD');

export const getDateForInput = (date: Date): string => moment(date).format('YYYY-MM-DD');

export const getDateForErrorLogger = (): string =>
    moment(new Date()).format(DATE_FORMAT_FOR_ERROR_LOGGER);

export const getYear = (date: Date): number => date.getFullYear();

export const checkIfTheSameDay = (date1: Date, date2: Date): boolean => {
    const isTheSameYear = date1.getFullYear() === date2.getFullYear();
    const isTheSameMonth = date1.getMonth() === date2.getMonth();
    const isTheSameMonthDay = date1.getDate() === date2.getDate();

    return isTheSameYear && isTheSameMonth && isTheSameMonthDay;
};

export const checkIfCurrentWeek = (date: Date): boolean => {
    return moment(date).isoWeek() === moment().isoWeek();
};

export const checkIfCurrentMonth = (date: Date): boolean => {
    return date.getMonth() === new Date().getMonth();
};

export const checkIfDateIsPast = (date: Date): boolean => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const todayMidNigth = new Date(`${year}-${month}-${day}`);

    return date < todayMidNigth;
};

export const generateStringifiedDate = (date: string): string => {
    return new Date(date).toISOString();
};
