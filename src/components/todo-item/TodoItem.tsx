import { useState, memo } from 'react';

import classNames from 'classnames';

import Skeleton from 'components/skeleton';
import TodoItemActions from 'components/todo-item/TodoItemActions';
import { useShouldShowDate } from 'components/todo-item/todoItem.hooks';
import TodoMainInfo from 'components/todo-main-info';
import { useSelectedTodo } from 'hooks/selectedTodo.hooks';
import { ITodo } from 'models/types/todo';

import 'components/todo-item/TodoItem.styles.scss';

interface ITodoItemProps {
    todo: ITodo;
}

function TodoItem({ todo }: ITodoItemProps): JSX.Element {
    const { setSelectedTodo: setSelectedTodoAction } = useSelectedTodo();
    const [isLoading, setIsLoading] = useState(false);

    const { completed, id } = todo;
    const shouldShowDate = useShouldShowDate();

    const setSelectedTodo = (): void => {
        setSelectedTodoAction(todo);
    };

    return (
        <div
            className={classNames('todo-item', {
                'todo-item--completed': completed,
            })}
        >
            <TodoMainInfo todo={todo} setIsLoading={setIsLoading} shouldShowDate={shouldShowDate} />

            <TodoItemActions
                id={id}
                setIsLoading={setIsLoading}
                setSelectedTodo={setSelectedTodo}
            />

            {isLoading && (
                <div className="todo-item__loading-indicator">
                    <Skeleton height="4px" />
                </div>
            )}
        </div>
    );
}

export default memo(TodoItem);
