import TodoModal from 'components/todo-modal';
import { useCreateTodo } from 'hooks/todoApi.hooks';
import { TTodoFormFields } from 'models/types/todo';
import { generateSringifiedDate } from 'utils/date.utils';

interface IAddTodoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddTodoModal({ isOpen, onClose }: IAddTodoModalProps): JSX.Element {
    const [createTodo, { isLoading }] = useCreateTodo(onClose);

    const onSubmit = (values: TTodoFormFields): void => {
        const date = generateSringifiedDate(values.date);

        createTodo({
            todo: {
                ...values,
                date,
            },
        });
    };

    return (
        <TodoModal isOpen={isOpen} isLoading={isLoading} onSubmit={onSubmit} onClose={onClose} />
    );
}
