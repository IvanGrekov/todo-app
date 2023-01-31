import DeleteTodoButton from 'components/delete-todo-button';
import { EIconNames } from 'components/icon';
import Menu, { MenuActionItem } from 'components/menu';
// import Skeleton from 'components/skeleton';
import Typography from 'components/typography';
import { COLORS } from 'constants/colors';
import { ITodo } from 'models/types/todo';

import 'components/todo-item/TodoItem.styles.scss';

interface ITodoItemProps {
    todo: ITodo;
    index: number;
}

export default function TodoItem({ todo, index }: ITodoItemProps): JSX.Element {
    const { id, title, isCompleted } = todo;
    const toggleText = isCompleted ? 'Complete' : 'Incomplete';
    const toggleIconName = isCompleted ? EIconNames.COMPLETE : EIconNames.INCOMPLETE;

    return (
        <div className="todo-item">
            <Typography variant="h4">{index}</Typography>

            <Typography variant="subtitle1">{title}</Typography>

            <DeleteTodoButton todoId={id} todoTitle={title} variant="contained" />

            <Menu iconColor={COLORS.black}>
                <MenuActionItem
                    text="Delete"
                    iconName={EIconNames.REMOVE}
                    iconColor={COLORS.black}
                />
                <MenuActionItem
                    text={toggleText}
                    iconName={toggleIconName}
                    iconColor={COLORS.black}
                />
            </Menu>

            {/* <div className="todo-item__loading-indicator">
                <Skeleton height="4px" />
            </div> */}
        </div>
    );
}
