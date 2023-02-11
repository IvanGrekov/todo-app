import { useGetPeriodFilter } from 'hooks/periodFilter.hooks';
import { EPeriodOptions } from 'models/router';

export const useShouldShowDate = (): boolean => {
    const periodFiler = useGetPeriodFilter();

    const isTodayFilter = periodFiler === EPeriodOptions.TODAY;
    const isTomorrowFilter = periodFiler === EPeriodOptions.TOMORROW;

    return !isTodayFilter && !isTomorrowFilter;
};
