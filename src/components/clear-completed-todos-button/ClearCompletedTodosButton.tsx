import Button from 'components/button';
import { useAppSelector } from 'hooks/redux.hooks';
import { TTodos } from 'models/types/todo';
import { selectRemainedTodos } from 'utils/todos.utils';

import 'components/clear-completed-todos-button/ClearCompletedTodosButton.styles.scss';

interface IClearCompletedTodosButtonProps {
    completedTodos: TTodos;
    updateTodos: (updatedTodoList: TTodos) => void;
}

export default function ClearCompletedTodosButton({
    completedTodos,
    updateTodos,
}: IClearCompletedTodosButtonProps): JSX.Element {
    const remainedTodos = useAppSelector((state) => selectRemainedTodos(state, completedTodos));

    const onClearButtonClick = (): void => {
        updateTodos(remainedTodos);
    };

    return (
        <div className="clear-button__wrapper">
            <Button text="Clear Completed" onClick={onClearButtonClick} />
        </div>
    );
}
