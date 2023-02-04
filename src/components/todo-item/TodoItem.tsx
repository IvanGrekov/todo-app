import { useState } from 'react';

import classNames from 'classnames';

import Skeleton from 'components/skeleton';
import PublishButton from 'components/todo-item/PublishButton';
import TodoItemActions from 'components/todo-item/TodoItemActions';
import Typography from 'components/typography';
import { COLORS } from 'constants/colors';
import { ITodo } from 'models/types/todo';

import 'components/todo-item/TodoItem.styles.scss';

interface ITodoItemProps {
    todo: ITodo;
}

export default function TodoItem({ todo }: ITodoItemProps): JSX.Element {
    const [isLoading, setIsLoading] = useState(false);

    const { title, isCompleted } = todo;
    const titleColor = isCompleted ? COLORS['black-opacity'] : COLORS.black;

    return (
        <div
            className={classNames('todo-item', {
                'todo-item--completed': isCompleted,
            })}
        >
            <div className="todo-item__title-wrapper">
                <PublishButton todo={todo} setIsLoading={setIsLoading} />

                <Typography variant="subtitle1" color={titleColor}>
                    {title}
                </Typography>
            </div>

            <TodoItemActions todo={todo} setIsLoading={setIsLoading} />

            {isLoading && (
                <div className="todo-item__loading-indicator">
                    <Skeleton height="4px" />
                </div>
            )}
        </div>
    );
}
