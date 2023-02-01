import { useEffect } from 'react';

import { EIconNames } from 'components/icon';
import Menu, { MenuActionItem } from 'components/menu';
import { COLORS } from 'constants/colors';
import { useApi } from 'hooks/todoApi.hooks';
import { ITodo } from 'models/types/todo';

interface ITodoItemActionsProps {
    id: ITodo['id'];
    isCompleted: ITodo['isCompleted'];
    setIsLoading: (value: boolean) => void;
}

export default function TodoItemActions({
    id,
    isCompleted,
    setIsLoading,
}: ITodoItemActionsProps): JSX.Element {
    const [deleteTodo, { isLoading: isDeleteLoading }] = useApi({
        method: 'delete',
        todoId: id,
    });
    const [patchTodo, { isLoading: isPatchingLoading }] = useApi({
        method: 'patch',
        todoId: id,
    });

    useEffect(() => {
        setIsLoading(isDeleteLoading || isPatchingLoading);
    }, [setIsLoading, isDeleteLoading, isPatchingLoading]);

    const changeTodoStatus = (): void => {
        patchTodo({ todo: { isCompleted: !isCompleted } });
    };

    const toggleText = isCompleted ? 'Complete' : 'Incomplete';
    const toggleIconName = isCompleted ? EIconNames.COMPLETE : EIconNames.INCOMPLETE;

    return (
        <Menu iconColor={COLORS.black}>
            <MenuActionItem
                text="Delete"
                iconName={EIconNames.REMOVE}
                iconColor={COLORS.black}
                onClick={deleteTodo}
            />
            <MenuActionItem
                text={toggleText}
                iconName={toggleIconName}
                iconColor={COLORS.black}
                onClick={changeTodoStatus}
            />
        </Menu>
    );
}
