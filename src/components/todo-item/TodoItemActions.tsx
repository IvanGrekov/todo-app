import { useContext, useEffect, memo } from 'react';

import { EIconNames } from 'components/icon';
import Menu, { MenuActionItem } from 'components/menu';
import { COLORS } from 'constants/colors';
import { useDeleteTodo } from 'hooks/todoApi.hooks';
import TodoModalHandlersContext from 'models/contexts/todoModalHandlers';
import { ITodo } from 'models/types/todo';

const color = COLORS.black;

interface ITodoItemActionsProps {
    id: ITodo['id'];
    setIsLoading: (value: boolean) => void;
    setSelectedTodo: VoidFunction;
}

function TodoItemActions({
    id,
    setIsLoading,
    setSelectedTodo,
}: ITodoItemActionsProps): JSX.Element {
    const context = useContext(TodoModalHandlersContext);
    const [deleteTodo, { isLoading }] = useDeleteTodo(id);

    useEffect(() => {
        setIsLoading(isLoading);
    }, [setIsLoading, isLoading]);

    if (!context) {
        throw new Error('TodoModalHandlersContext is not provided');
    }

    const { toggleDetailsTodoModal, togglePatchTodoModal } = context;

    const onDetailsActionClick = (): void => {
        setSelectedTodo();
        toggleDetailsTodoModal();
    };

    const onEditActionClick = (): void => {
        setSelectedTodo();
        togglePatchTodoModal();
    };

    return (
        <>
            <Menu iconColor={color}>
                <MenuActionItem
                    text="Details"
                    iconName={EIconNames.MORE}
                    iconColor={color}
                    onClick={onDetailsActionClick}
                />
                <MenuActionItem
                    text="Edit"
                    iconName={EIconNames.EDIT}
                    iconColor={color}
                    onClick={onEditActionClick}
                />
                <MenuActionItem
                    text="Delete"
                    iconName={EIconNames.REMOVE}
                    iconColor={color}
                    onClick={deleteTodo}
                />
            </Menu>
        </>
    );
}

export default memo(TodoItemActions);
