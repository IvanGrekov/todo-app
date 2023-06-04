import Button from 'components/button';
import { useAppSelector } from 'hooks/redux.hooks';
import { TTodos } from 'models/types/todo';
import { selectRemainedTodos } from 'utils/todos.utils';

interface IClearCompletedTodosButtonProps {
    completedTodos: TTodos;
    updateTodos: (newTodos: { todos: TTodos }) => void;
}

export default function ClearCompletedTodosButton({
    completedTodos,
    updateTodos,
}: IClearCompletedTodosButtonProps): JSX.Element {
    const remainedTodos = useAppSelector((state) => selectRemainedTodos(state, completedTodos));

    const onClearButtonClick = (): void => {
        updateTodos({ todos: remainedTodos });
    };

    return <Button text="Clear Completed" onClick={onClearButtonClick} />;
}
