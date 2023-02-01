import { useState } from 'react';

import Skeleton from 'components/skeleton';
import TodoItemActions from 'components/todo-item/TodoItemActions';
import Typography from 'components/typography';
import { ITodo } from 'models/types/todo';

import 'components/todo-item/TodoItem.styles.scss';

interface ITodoItemProps {
    todo: ITodo;
    index: number;
}

export default function TodoItem({ todo, index }: ITodoItemProps): JSX.Element {
    const [isLoading, setIsLoading] = useState(false);

    const { id, title, isCompleted } = todo;

    return (
        <div className="todo-item">
            <Typography variant="h4">{index}</Typography>

            <Typography variant="subtitle1">{title}</Typography>

            <TodoItemActions id={id} isCompleted={isCompleted} setIsLoading={setIsLoading} />

            {isLoading && (
                <div className="todo-item__loading-indicator">
                    <Skeleton height="4px" />
                </div>
            )}
        </div>
    );
}
