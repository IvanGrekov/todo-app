import { useEffect } from 'react';

import { EIconNames } from 'components/icon';
import Menu, { MenuActionItem } from 'components/menu';
import { COLORS } from 'constants/colors';
import { useDeleteTodo, usePatchTodo } from 'hooks/todoApi.hooks';
import { ITodo } from 'models/types/todo';

interface ITodoItemActionsProps {
    todo: ITodo;
    setIsLoading: (value: boolean) => void;
}

export default function TodoItemActions({
    todo,
    setIsLoading,
}: ITodoItemActionsProps): JSX.Element {
    const { id, isCompleted } = todo;

    const [deleteTodo, { isLoading: isDeleteLoading }] = useDeleteTodo(id);
    const [patchTodo, { isLoading: isPatchingLoading }] = usePatchTodo(id);

    useEffect(() => {
        setIsLoading(isDeleteLoading || isPatchingLoading);
    }, [setIsLoading, isDeleteLoading, isPatchingLoading]);

    const changeTodoStatus = (): void => {
        patchTodo({ todo: { ...todo, isCompleted: !isCompleted } });
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
