import { IPeriodFilter } from 'components/period-filter/types';
import { EPeriodOptions } from 'models/router';

export const PERIOD_FILTER_ITEMS: Array<IPeriodFilter> = [
    {
        title: 'Today',
        value: EPeriodOptions.TODAY,
    },
    {
        title: 'Tomorrow',
        value: EPeriodOptions.TOMORROW,
    },
    {
        title: 'This Week',
        value: EPeriodOptions.THIS_WEEK,
    },
    {
        title: 'This Month',
        value: EPeriodOptions.THIS_MONTH,
    },
    {
        title: 'Upcoming',
        value: EPeriodOptions.UPCOMING,
    },
    {
        title: 'Past',
        value: EPeriodOptions.PAST,
    },
];

export const DEFAULT_PERIOD_FILTER_VALUE = EPeriodOptions.TODAY;
