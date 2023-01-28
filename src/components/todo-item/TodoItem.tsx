import DeleteTodoButton from 'components/delete-todo-button';
import Input from 'components/input';
// import Skeleton from 'components/skeleton';
import Typography from 'components/typography';
import { ITodo } from 'models/types/todo';

import 'components/todo-item/TodoItem.styles.scss';

interface ITodoItemProps {
    todo: ITodo;
    index: number;
}

export default function TodoItem({ todo, index }: ITodoItemProps): JSX.Element {
    const { id, title, isCompleted } = todo;

    return (
        <div className="todo-item">
            <Typography variant="h4">{index}</Typography>

            <Typography variant="subtitle1">{title}</Typography>

            <Input name="todo-status-toggler" type="checkbox" checked={isCompleted} />

            <DeleteTodoButton todoId={id} todoTitle={title} variant="contained" />

            {/* <div className="todo-item__loading-indicator">
                <Skeleton height="4px" />
            </div> */}
        </div>
    );
}