import { checkIfTheSameDay } from 'utils/date.utils';

export const getShouldShowDate = (date: Date): boolean => {
    const todayDate = new Date();
    const isTodayDate = checkIfTheSameDay(date, todayDate);

    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const isTomorrowDate = checkIfTheSameDay(date, tomorrowDate);

    return !isTodayDate && !isTomorrowDate;
};
