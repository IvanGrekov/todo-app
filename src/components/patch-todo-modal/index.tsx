import { useContext } from 'react';

import { checkIfTodoChanged } from 'components/patch-todo-modal/patchTodoModal.utils';
import TodoModal from 'components/todo-modal';
import { useSelectedTodo } from 'hooks/selectedTodo.hooks';
import { usePatchTodo } from 'hooks/todoApi.hooks';
import TodoModalHandlersContext from 'models/contexts/todoModalHandlers';
import { TTodoFormFields } from 'models/types/todo';
import { generateStringifiedDate } from 'utils/date.utils';

interface IPatchTodoModalProps {
    isOpen: boolean;
}

export default function PatchTodoModal({ isOpen }: IPatchTodoModalProps): JSX.Element {
    const context = useContext(TodoModalHandlersContext);
    const { selectedTodo } = useSelectedTodo();
    const [patchTodo, { isLoading }] = usePatchTodo(
        selectedTodo?.id,
        context?.togglePatchTodoModal,
    );

    if (!context) {
        throw new Error('TodoDetailsModal: context is not provided');
    }

    const { togglePatchTodoModal } = context;

    const onSubmit = (values: TTodoFormFields): void => {
        if (!selectedTodo) {
            togglePatchTodoModal();

            return;
        }

        const date = generateStringifiedDate(values.date);
        const patchingTodo = {
            ...selectedTodo,
            ...values,
            date,
        };
        const todoShouldBePatched = checkIfTodoChanged(selectedTodo, patchingTodo);

        if (!todoShouldBePatched) {
            togglePatchTodoModal();

            return;
        }

        patchTodo({
            todo: patchingTodo,
        });
    };

    return (
        <TodoModal
            isOpen={isOpen}
            todo={selectedTodo || undefined}
            isLoading={isLoading}
            onSubmit={onSubmit}
            onClose={togglePatchTodoModal}
        />
    );
}
