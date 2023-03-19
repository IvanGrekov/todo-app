import { useSearchParams } from 'react-router-dom';

import { DEFAULT_PERIOD_FILTER_VALUE } from 'components/period-filters/constants';
import { ESearchParams } from 'models/router';

export const useGetPeriodFilter = (): string => {
    const [searchParams] = useSearchParams();

    return searchParams.get(ESearchParams.PERIOD) || DEFAULT_PERIOD_FILTER_VALUE;
};
