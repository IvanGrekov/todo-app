import { useEffect } from 'react';

import { IconButton } from 'components/button';
import { EIconNames } from 'components/icon';
import { COLORS } from 'constants/colors';
import { usePatchTodo } from 'hooks/todoApi.hooks';
import { ITodo } from 'models/types/todo';

interface ICompleteButtonProps {
    todo: ITodo;
    setIsLoading: (value: boolean) => void;
}

export default function CompleteButton({ todo, setIsLoading }: ICompleteButtonProps): JSX.Element {
    const { id, isCompleted } = todo;

    const [patchTodo, { isLoading }] = usePatchTodo(id);

    useEffect(() => {
        setIsLoading(isLoading);
    }, [setIsLoading, isLoading]);

    const changeTodoStatus = (): void => {
        patchTodo({ todo: { ...todo, isCompleted: !isCompleted } });
    };

    const iconName = isCompleted ? EIconNames.COMPLETE : EIconNames.INCOMPLETE;
    const title = isCompleted ? 'Incomplete' : 'Complete';

    return (
        <IconButton
            title={title}
            iconName={iconName}
            iconColor={COLORS.black}
            onClick={changeTodoStatus}
        />
    );
}
