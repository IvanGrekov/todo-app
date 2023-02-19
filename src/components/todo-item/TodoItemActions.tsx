import { useState, useEffect } from 'react';

import { EIconNames } from 'components/icon';
import Menu, { MenuActionItem } from 'components/menu';
import PatchTodoModal from 'components/patch-todo-modal';
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
    const [isPatchTodoModalOpen, setIsAddTodoModalOpen] = useState(false);
    const [deleteTodo, { isLoading }] = useDeleteTodo(todo.id);

    useEffect(() => {
        setIsLoading(isLoading);
    }, [setIsLoading, isLoading]);

    const onEditActionItemCLick = (): void => {
        setIsAddTodoModalOpen((prev) => !prev);
    };

    return (
        <>
            <Menu iconColor={COLORS.black}>
                <MenuActionItem
                    text="Delete"
                    iconName={EIconNames.REMOVE}
                    iconColor={COLORS.black}
                    onClick={deleteTodo}
                />
                <MenuActionItem
                    text="Edit"
                    iconName={EIconNames.EDIT}
                    iconColor={COLORS.black}
                    onClick={onEditActionItemCLick}
                />
            </Menu>
            <PatchTodoModal
                isOpen={isPatchTodoModalOpen}
                todo={todo}
                onClose={(): void => setIsAddTodoModalOpen(false)}
            />
        </>
    );
}
