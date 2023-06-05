import { useState } from 'react';

import classNames from 'classnames';

import Skeleton from 'components/skeleton';
import TodoItemActions from 'components/todo-item/TodoItemActions';
import { useShouldShowDate } from 'components/todo-item/todoItem.hooks';
import TodoMainInfo from 'components/todo-main-info';
import { ITodo } from 'models/types/todo';

import 'components/todo-item/TodoItem.styles.scss';

interface ITodoItemProps {
    todo: ITodo;
}

export default function TodoItem({ todo }: ITodoItemProps): JSX.Element {
    const [isLoading, setIsLoading] = useState(false);

    const shouldShowDate = useShouldShowDate();

    return (
        <div
            className={classNames('todo-item', {
                'todo-item--completed': todo.isCompleted,
            })}
        >
            <TodoMainInfo todo={todo} setIsLoading={setIsLoading} shouldShowDate={shouldShowDate} />

            <TodoItemActions todo={todo} setIsLoading={setIsLoading} />

            {isLoading && (
                <div className="todo-item__loading-indicator">
                    <Skeleton height="4px" />
                </div>
            )}
        </div>
    );
}
