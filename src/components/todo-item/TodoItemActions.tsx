import { useState, useEffect } from 'react';

import { EIconNames } from 'components/icon';
import Menu, { MenuActionItem } from 'components/menu';
import PatchTodoModal from 'components/patch-todo-modal';
import TodoDetailsModal from 'components/todo-details-modal';
import { COLORS } from 'constants/colors';
import { useDeleteTodo } from 'hooks/todoApi.hooks';
import { ITodo } from 'models/types/todo';

const color = COLORS.black;

interface ITodoItemActionsProps {
    todo: ITodo;
    setIsLoading: (value: boolean) => void;
}

export default function TodoItemActions({
    todo,
    setIsLoading,
}: ITodoItemActionsProps): JSX.Element {
    const [isDetailsModalOpen, setIsDetailsModalModalOpen] = useState(false);
    const [isPatchTodoModalOpen, setIsPatchTodoModalOpen] = useState(false);

    const [deleteTodo, { isLoading }] = useDeleteTodo(todo.id);

    useEffect(() => {
        setIsLoading(isLoading);
    }, [setIsLoading, isLoading]);

    const onDetailsActionItemCLick = (): void => {
        setIsDetailsModalModalOpen(true);
    };

    const onCloseDetailsModal = (): void => {
        setIsDetailsModalModalOpen(false);
    };

    const onEditActionItemCLick = (): void => {
        setIsPatchTodoModalOpen((prev) => !prev);
    };

    const onClosePatchModal = (): void => {
        setIsPatchTodoModalOpen(false);
    };

    return (
        <>
            <Menu iconColor={color}>
                <MenuActionItem
                    text="Details"
                    iconName={EIconNames.MORE}
                    iconColor={color}
                    onClick={onDetailsActionItemCLick}
                />
                <MenuActionItem
                    text="Edit"
                    iconName={EIconNames.EDIT}
                    iconColor={color}
                    onClick={onEditActionItemCLick}
                />
                <MenuActionItem
                    text="Delete"
                    iconName={EIconNames.REMOVE}
                    iconColor={color}
                    onClick={deleteTodo}
                />
            </Menu>

            <TodoDetailsModal
                todo={todo}
                isOpen={isDetailsModalOpen}
                onClose={onCloseDetailsModal}
            />

            <PatchTodoModal isOpen={isPatchTodoModalOpen} todo={todo} onClose={onClosePatchModal} />
        </>
    );
}
