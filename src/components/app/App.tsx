import { useState } from 'react';
import { Provider } from 'react-redux';

import ErrorBoundary from 'components/error-boundary';
import Header from 'components/header';
import NetworkErrors from 'components/network-errors';
import PatchTodoModal from 'components/patch-todo-modal';
import PeriodFilters from 'components/period-filters';
import Spacing from 'components/spacing';
import TodoDetailsModal from 'components/todo-details-modal';
import TodoList from 'components/todo-list/TodoList';
import { useNetworkErrors } from 'hooks/networkErrors.hooks';
import { useTodoModalHandlersContextValue } from 'hooks/todoModalHandlers.hooks';
import NetworkErrorsContext from 'models/contexts/networkErrors';
import TodoModalHandlersContext from 'models/contexts/todoModalHandlers';
import store from 'models/store';

import 'components/app/App.styles.scss';

export default function App(): JSX.Element {
    const networkErrorsContextValue = useNetworkErrors();

    const [isDetailsTodoModalOpen, setIsDetailsTodoModalOpen] = useState(false);
    const [isPatchTodoModalOpen, setIsPatchTodoModalOpen] = useState(false);

    const todoModalHandlersContextValue = useTodoModalHandlersContextValue(
        setIsDetailsTodoModalOpen,
        setIsPatchTodoModalOpen,
    );

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
                        <TodoModalHandlersContext.Provider value={todoModalHandlersContextValue}>
                            <TodoList />
                            <TodoDetailsModal isOpen={isDetailsTodoModalOpen} />

                            <PatchTodoModal isOpen={isPatchTodoModalOpen} />
                        </TodoModalHandlersContext.Provider>
                    </Provider>
                </NetworkErrorsContext.Provider>
            </ErrorBoundary>
        </main>
    );
}
