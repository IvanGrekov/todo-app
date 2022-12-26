import { FORM_ID } from 'components/add-todo-form/constants';
import { TCreateTodoInput } from 'models/types/todo';

import 'components/add-todo-form/AddTodoForm.styles.scss';

interface IAddTodoFormProps {
    onSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
    handleChange: any;
    values: TCreateTodoInput;
}

export default function AddTodoForm({
    onSubmit,
    handleChange,
    values,
}: IAddTodoFormProps): JSX.Element {
    const { title, userId, date, isCompleted } = values;

    return (
        <form id={FORM_ID} onSubmit={onSubmit}>
            <input
                value={title}
                onChange={handleChange}
                type="text"
                name="title"
                id="add_todo-title-input"
                placeholder="Title"
            />
            <input
                value={userId}
                onChange={handleChange}
                type="text"
                name="userId"
                id="add_todo-use_id-input"
                placeholder="Assignee"
            />
            <input
                value={date}
                onChange={handleChange}
                type="date"
                name="date"
                id="add_todo-date-input"
            />
            <input
                checked={isCompleted}
                onChange={handleChange}
                type="checkbox"
                name="isCompleted"
                id="add_todo-is_completed-input"
            />
        </form>
    );
}
