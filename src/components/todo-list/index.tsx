import { lazy, Suspense } from 'react';

import Skeleton from 'components/skeleton';
import TodoList from 'components/todo-list/TodoList';
import { useLoadTodos } from 'hooks/todoApi.hooks';

const EmptyStateLazy = lazy(() => import('components/empty-state'));

export default function Todos(): JSX.Element {
    const { isLoading, error } = useLoadTodos();

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

    return <TodoList />;
}
