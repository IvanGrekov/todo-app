import { lazy, Suspense, useEffect } from 'react';

import Skeleton from 'components/skeleton';
import TodoItem from 'components/todo-item';
import { useApi } from 'hooks/todoApi.hooks';
import { ITodo } from 'models/types/todo';

const EmptyStateLazy = lazy(() => import('components/empty-state'));

import 'components/todo-list/TodoList.styles.scss';

export default function TodoList(): JSX.Element {
    const [getTodos, { isLoading, data, error }] = useApi();

    useEffect(() => {
        getTodos();
    }, [getTodos]);

    if (isLoading) {
        return <Skeleton />;
    }

    if (error) {
        return (
            <Suspense fallback={<Skeleton />}>
                <EmptyStateLazy isError={true} />
            </Suspense>
        );
    }

    if (!data || !data?.length) {
        return (
            <Suspense fallback={<Skeleton />}>
                <EmptyStateLazy />
            </Suspense>
        );
    }

    return (
        <ul className="todo-list">
            {data.map((todo: ITodo, i: number) => (
                <li key={todo.id}>
                    <TodoItem todo={todo} index={i + 1} />
                </li>
            ))}
        </ul>
    );
}
