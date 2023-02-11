import { lazy, Suspense } from 'react';

import Skeleton from 'components/skeleton';
import TodoItem from 'components/todo-item';
import { useGetPeriodFilter } from 'hooks/periodFilter.hooks';
import { useAppSelector } from 'hooks/redux.hooks';
import { selectTodosByPeriodFilter } from 'models/store/features/todos/todosSlice';
import { ITodo } from 'models/types/todo';

import 'components/todo-list/TodoList.styles.scss';

const EmptyStateLazy = lazy(() => import('components/empty-state'));

export default function TodoList(): JSX.Element {
    const periodFilter = useGetPeriodFilter();
    const todos = useAppSelector((state) => selectTodosByPeriodFilter(state, periodFilter));

    if (!todos.length) {
        return (
            <Suspense fallback={<Skeleton />}>
                <EmptyStateLazy />
            </Suspense>
        );
    }

    return (
        <ul className="todo-list">
            {todos.map((todo: ITodo) => (
                <li key={todo.id}>
                    <TodoItem todo={todo} />
                </li>
            ))}
        </ul>
    );
}
