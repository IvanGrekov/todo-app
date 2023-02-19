import { IModalBaseProps } from 'components/modal';
import { checkIfTodoChanged } from 'components/patch-todo-modal/patchTodoModal.utils';
import TodoModal from 'components/todo-modal';
import { usePatchTodo } from 'hooks/todoApi.hooks';
import { ITodo, TTodoFormFields } from 'models/types/todo';
import { generateSringifiedDate } from 'utils/date.utils';

interface IPatchTodoModalProps extends IModalBaseProps {
    todo: ITodo;
    isOpen: boolean;
    onClose: () => void;
}

export default function PatchTodoModal({
    todo,
    isOpen,
    onClose,
}: IPatchTodoModalProps): JSX.Element {
    const [patchTodo, { isLoading }] = usePatchTodo(todo.id, onClose);

    const onSubmit = (values: TTodoFormFields): void => {
        const date = generateSringifiedDate(values.date);
        const patchingTodo = {
            ...todo,
            ...values,
            date,
        };
        const todoShouldBePatched = checkIfTodoChanged(todo, patchingTodo);

        if (!todoShouldBePatched) {
            onClose();

            return;
        }

        patchTodo({
            todo: patchingTodo,
        });
    };

    return (
        <TodoModal
            isOpen={isOpen}
            todo={todo}
            isLoading={isLoading}
            onSubmit={onSubmit}
            onClose={onClose}
        />
    );
}
