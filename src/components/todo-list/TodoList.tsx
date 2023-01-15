import { useEffect } from 'react';

import { useApi } from 'hooks/todoApi.hooks';
import { ITodo } from 'models/types/todo';

import 'components/todo-list/TodoList.styles.scss';

export default function TodoList(): JSX.Element {
    const [getTodos, { isLoading, data, error }] = useApi();

    useEffect(() => {
        getTodos();
    }, [getTodos]);

    if (isLoading) {
        return <>Loading...</>;
    }

    if (error) {
        console.warn(error);

        return <>Error - {error.message}</>;
    }

    if (!data) {
        return <>Not todos yet</>;
    }

    return (
        <ul>
            {data.map((todo: ITodo) => (
                <li key={todo.id}>
                    {todo.title} - {todo.isCompleted ? 'Completed' : 'Not Completed'}
                </li>
            ))}
        </ul>
    );
}
