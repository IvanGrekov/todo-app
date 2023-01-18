import { useEffect } from 'react';

import DeleteTodoButton from 'components/delete-todo-button';
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
            {data.map(({ id, title, isCompleted }: ITodo) => (
                <li key={id}>
                    {title} - {isCompleted ? 'Completed' : 'Not Completed'}
                    <DeleteTodoButton todoId={id} todoTitle={title} />
                </li>
            ))}
        </ul>
    );
}
