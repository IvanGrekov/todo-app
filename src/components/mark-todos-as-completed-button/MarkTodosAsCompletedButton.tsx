import { useMemo } from 'react';

import Button from 'components/button';
import { TTodos } from 'models/types/todo';
import { prepareTodosForCompleting } from 'utils/todos.utils';

interface IMarkTodosAsCompletedButtonProps {
    uncompletedTodos: TTodos;
    patchTodos: (changingTodos: { todos: TTodos }) => void;
}

export default function MarkTodosAsCompletedButton({
    uncompletedTodos,
    patchTodos,
}: IMarkTodosAsCompletedButtonProps): JSX.Element {
    const todosToComplete = useMemo(
        () => prepareTodosForCompleting(uncompletedTodos),
        [uncompletedTodos],
    );

    const onClearButtonClick = (): void => {
        patchTodos({ todos: todosToComplete });
    };

    return <Button text="Complete All" onClick={onClearButtonClick} />;
}
