import { useState } from 'react';

import classNames from 'classnames';

import Skeleton from 'components/skeleton';
import PublishButton from 'components/todo-item/PublishButton';
import TodoItemActions from 'components/todo-item/TodoItemActions';
import { getShouldShowDate, getUserReadableDate } from 'components/todo-item/todoItem.utils';
import Typography from 'components/typography';
import { COLORS } from 'constants/colors';
import { ITodo } from 'models/types/todo';

import 'components/todo-item/TodoItem.styles.scss';

interface ITodoItemProps {
    todo: ITodo;
}

export default function TodoItem({ todo }: ITodoItemProps): JSX.Element {
    const [isLoading, setIsLoading] = useState(false);

    const { title, isCompleted, date } = todo;
    const titleColor = isCompleted ? COLORS['black-opacity'] : COLORS.black;
    const dateObjectFormat = new Date(date);
    const shouldShowDate = getShouldShowDate(dateObjectFormat);

    return (
        <div
            className={classNames('todo-item', {
                'todo-item--completed': isCompleted,
            })}
        >
            <div className="todo-item__main-info-wrapper">
                <PublishButton todo={todo} setIsLoading={setIsLoading} />

                <div className="todo-item__title-wrapper">
                    <Typography variant="subtitle1" color={titleColor}>
                        {title}
                    </Typography>

                    {shouldShowDate && (
                        <Typography variant="body2" color={COLORS['black-opacity']}>
                            {getUserReadableDate(dateObjectFormat)}
                        </Typography>
                    )}
                </div>
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
