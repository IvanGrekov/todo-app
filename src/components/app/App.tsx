import { Provider } from 'react-redux';

import ErrorBoundary from 'components/error-boundary';
import Header from 'components/header';
import NetworkErrors from 'components/network-errors';
import PeriodFilters from 'components/period-filters';
import Spacing from 'components/spacing';
import TodoList from 'components/todo-list/TodoList';
import { useNetworkErrors } from 'hooks/networkErrors.hooks';
import NetworkErrorsContext from 'models/contexts/networkErrors';
import store from 'models/store';

import 'components/app/App.styles.scss';

export default function App(): JSX.Element {
    const networkErrorsContextValue = useNetworkErrors();

    return (
        <main className="app">
            <ErrorBoundary>
                <NetworkErrorsContext.Provider value={networkErrorsContextValue}>
                    <Provider store={store}>
                        <NetworkErrors />
                        <Header />
                        <Spacing xs={40} md={50} xl={60} />
                        <PeriodFilters />
                        <Spacing xs={24} md={26} lg={38} />
                        <TodoList />
                    </Provider>
                </NetworkErrorsContext.Provider>
            </ErrorBoundary>
        </main>
    );
}
