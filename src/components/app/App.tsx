import ErrorBoundary from 'components/error-boundary';
import Header from 'components/header';
import NetworkErrors from 'components/network-errors';
import PeriodFilter from 'components/period-filter';
import Spacing from 'components/spacing';
import { useNetworkErrors } from 'hooks/networkErrors.hooks';
import NetworkErrorsContext from 'models/contexts/networkErrors';

import 'components/app/App.styles.scss';

export default function App(): JSX.Element {
    const networkErrorsContextValue = useNetworkErrors();

    return (
        <main className="app">
            <ErrorBoundary>
                <NetworkErrorsContext.Provider value={networkErrorsContextValue}>
                    <NetworkErrors />
                    <Header />
                    <Spacing sm={40} xl={60} />
                    <PeriodFilter />
                    <section />
                </NetworkErrorsContext.Provider>
            </ErrorBoundary>
        </main>
    );
}
