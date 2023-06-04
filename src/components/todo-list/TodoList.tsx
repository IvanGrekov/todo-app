import { lazy, Suspense, useMemo } from 'react';

import ClearCompletedTodosButton from 'components/clear-completed-todos-button';
import MarkTodosAsCompletedButton from 'components/mark-todos-as-completed-button';
import Skeleton from 'components/skeleton';
import Spacing from 'components/spacing';
import TodoItem from 'components/todo-item';
import Typography from 'components/typography';
import { COLORS } from 'constants/colors';
import { useGetPeriodFilter } from 'hooks/periodFilter.hooks';
import { useAppSelector } from 'hooks/redux.hooks';
import { useLoadTodos, useUpdateTodos, usePatchTodos } from 'hooks/todoApi.hooks';
import { ITodo } from 'models/types/todo';
import { selectTodosByPeriodFilter, getFilteredTodosByStatus } from 'utils/todos.utils';

import 'components/todo-list/TodoList.styles.scss';

const EmptyStateLazy = lazy(() => import('components/empty-state'));

export default function TodoList(): JSX.Element {
    const { isLoading: isLoadTodosLoading, error: todosLoadingError } = useLoadTodos();
    const [updateTodos, { isLoading: isUpdateLoading, error: todosUpdatingError }] =
        useUpdateTodos();
    const [patchTodos, { isLoading: isPatchLoading, error: todosPatchingError }] = usePatchTodos();

    const periodFilter = useGetPeriodFilter();
    const filteredTodos = useAppSelector((state) => selectTodosByPeriodFilter(state, periodFilter));
    const { completedTodos, uncompletedTodos } = useMemo(
        () => getFilteredTodosByStatus(filteredTodos),
        [filteredTodos],
    );

    if (isLoadTodosLoading) {
        return <Skeleton />;
    }

    const isError = todosLoadingError || todosUpdatingError || todosPatchingError;

    if (isError || !filteredTodos.length) {
        return (
            <Suspense fallback={<Skeleton />}>
                <EmptyStateLazy isError={isError} />
            </Suspense>
        );
    }

    const isLoading = isUpdateLoading || isPatchLoading;
    const uncompletedTodosLength = filteredTodos.length - completedTodos.length;
    const uncompletedItemsWord = uncompletedTodosLength === 1 ? 'item' : 'items';

    return (
        <>
            {isLoading && (
                <>
                    <Skeleton />
                    <Spacing xs={18} md={24} lg={32} />
                </>
            )}

            <div className="todo-list__header">
                <Typography
                    variant="subtitle2"
                    style={{ fontWeight: 'bold', color: COLORS.black }}
                >{`${uncompletedTodosLength} ${uncompletedItemsWord} left`}</Typography>

                <div className="todo-list__header-actions">
                    {!!uncompletedTodos.length && (
                        <MarkTodosAsCompletedButton
                            uncompletedTodos={uncompletedTodos}
                            patchTodos={patchTodos}
                        />
                    )}

                    {!!completedTodos.length && (
                        <ClearCompletedTodosButton
                            completedTodos={completedTodos}
                            updateTodos={updateTodos}
                        />
                    )}
                </div>
            </div>

            <Spacing xs={24} lg={32} />

            <ul className="todo-list">
                {filteredTodos.map((todo: ITodo, i) => (
                    <li key={todo.id} style={{ zIndex: filteredTodos.length - i }}>
                        <TodoItem todo={todo} />
                    </li>
                ))}
            </ul>
        </>
    );
}
