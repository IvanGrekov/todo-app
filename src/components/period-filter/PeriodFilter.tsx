import { useSearchParams } from 'react-router-dom';

import Button from 'components/button';
import {
    PERIOD_FILTER_ITEMS,
    DEFAULT_PERIOD_FILTER_VALUE,
} from 'components/period-filter/constants';
import { ESearchParams } from 'models/router';

import 'components/period-filter/PeriodFilter.styles.scss';

export default function PeriodFilter(): JSX.Element {
    const [searchParams, setSearchParams] = useSearchParams();

    const onChangePeriod = (value: string): void => {
        setSearchParams({ [ESearchParams.PERIOD]: value });
    };

    const currentPeriodFilterValue =
        searchParams.get(ESearchParams.PERIOD) || DEFAULT_PERIOD_FILTER_VALUE;

    return (
        <ul className="period-filter">
            {PERIOD_FILTER_ITEMS.map(({ title, value }) => {
                const isActive = value === currentPeriodFilterValue;

                return (
                    <li key={value}>
                        <Button
                            text={title}
                            isActive={isActive}
                            onClick={(): void => onChangePeriod(value)}
                        />
                    </li>
                );
            })}
        </ul>
    );
}
