import { lazy, Suspense } from 'react';

import ClearCompletedTodosButton from 'components/clear-completed-todos-button';
import Skeleton from 'components/skeleton';
import Spacing from 'components/spacing';
import TodoItem from 'components/todo-item';
import { useGetPeriodFilter } from 'hooks/periodFilter.hooks';
import { useAppSelector } from 'hooks/redux.hooks';
import { useLoadTodos, useUpdateTodos } from 'hooks/todoApi.hooks';
import { ITodo } from 'models/types/todo';
import { selectTodosByPeriodFilter, getCompletedTodos } from 'utils/todos.utils';

import 'components/todo-list/TodoList.styles.scss';

const EmptyStateLazy = lazy(() => import('components/empty-state'));

export default function TodoList(): JSX.Element {
    const { isLoading: isLoadTodosLoading, error: todosLoadingError } = useLoadTodos();
    const [updateTodos, { isLoading: isUpdateLoading, error: todosUpdatingError }] =
        useUpdateTodos();

    const periodFilter = useGetPeriodFilter();
    const filteredTodos = useAppSelector((state) => selectTodosByPeriodFilter(state, periodFilter));

    if (isLoadTodosLoading) {
        return <Skeleton />;
    }

    const isError = todosLoadingError || todosUpdatingError;

    if (isError || !filteredTodos.length) {
        return (
            <Suspense fallback={<Skeleton />}>
                <EmptyStateLazy isError={isError} />
            </Suspense>
        );
    }

    const completedTodos = getCompletedTodos(filteredTodos);

    return (
        <>
            {isUpdateLoading && (
                <>
                    <Skeleton />
                    <Spacing sm={32} />
                </>
            )}

            {!!completedTodos.length && (
                <>
                    <ClearCompletedTodosButton
                        completedTodos={completedTodos}
                        updateTodos={updateTodos}
                    />
                    <Spacing sm={32} />
                </>
            )}

            <ul className="todo-list">
                {filteredTodos.map((todo: ITodo) => (
                    <li key={todo.id}>
                        <TodoItem todo={todo} />
                    </li>
                ))}
            </ul>
        </>
    );
}
