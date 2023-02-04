import { useEffect } from 'react';

import { EIconNames } from 'components/icon';
import Menu, { MenuActionItem } from 'components/menu';
import { COLORS } from 'constants/colors';
import { useDeleteTodo } from 'hooks/todoApi.hooks';
import { ITodo } from 'models/types/todo';

interface ITodoItemActionsProps {
    todo: ITodo;
    setIsLoading: (value: boolean) => void;
}

export default function TodoItemActions({
    todo,
    setIsLoading,
}: ITodoItemActionsProps): JSX.Element {
    const [deleteTodo, { isLoading }] = useDeleteTodo(todo.id);

    useEffect(() => {
        setIsLoading(isLoading);
    }, [setIsLoading, isLoading]);

    return (
        <Menu iconColor={COLORS.black}>
            <MenuActionItem
                text="Delete"
                iconName={EIconNames.REMOVE}
                iconColor={COLORS.black}
                onClick={deleteTodo}
            />
        </Menu>
    );
}
