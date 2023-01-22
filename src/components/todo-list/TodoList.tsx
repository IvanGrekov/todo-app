import { lazy, Suspense, useEffect } from 'react';

import DeleteTodoButton from 'components/delete-todo-button';
import Skeleton from 'components/skeleton';
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

    <ul>
        {data.map(({ id, title, isCompleted }: ITodo) => (
            <li key={id}>
                {title} - {isCompleted ? 'Completed' : 'Not Completed'}
                <DeleteTodoButton todoId={id} todoTitle={title} />
            </li>
        ))}
    </ul>;

    return (
        <ul>
            {data.map(({ id, title, isCompleted }: ITodo) => (
                <li key={id}>
                    {title} - {isCompleted ? 'Completed' : 'Not Completed'}
                    <DeleteTodoButton todoId={id} todoTitle={title} />
                </li>
            ))}
        </ul>
    );
}
