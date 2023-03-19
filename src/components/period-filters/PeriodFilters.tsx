import { useSearchParams } from 'react-router-dom';

import Button from 'components/button';
import {
    PERIOD_FILTER_ITEMS,
    DEFAULT_PERIOD_FILTER_VALUE,
} from 'components/period-filters/constants';
import { ESearchParams } from 'models/router';

import 'components/period-filters/PeriodFilters.styles.scss';

export default function PeriodFilters(): JSX.Element {
    const [searchParams, setSearchParams] = useSearchParams();

    const onChangePeriod = (value: string): void => {
        setSearchParams({ [ESearchParams.PERIOD]: value });
    };

    const currentPeriodFilterValue =
        searchParams.get(ESearchParams.PERIOD) || DEFAULT_PERIOD_FILTER_VALUE;

    return (
        <ul className="period-filters">
            {PERIOD_FILTER_ITEMS.map(({ title, value }) => {
                const isActive = value === currentPeriodFilterValue;

                return (
                    <li key={value} className="period-filters__item">
                        <Button
                            text={title}
                            variant={isActive ? 'contained' : 'outlined'}
                            onClick={(): void => onChangePeriod(value)}
                        />
                    </li>
                );
            })}
        </ul>
    );
}
