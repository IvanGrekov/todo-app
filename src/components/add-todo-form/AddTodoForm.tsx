import { ChangeEventHandler } from 'react';

import { FormikErrors } from 'formik';

import { FORM_ID } from 'components/add-todo-form/constants';
import Input from 'components/input';
import { TCreateTodoInput } from 'models/types/todo';

import 'components/add-todo-form/AddTodoForm.styles.scss';

interface IAddTodoFormProps {
    onSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
    handleChange: ChangeEventHandler<HTMLInputElement>;
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined,
    ) => Promise<void> | Promise<FormikErrors<TCreateTodoInput>>;
    values: TCreateTodoInput;
}

export default function AddTodoForm({
    onSubmit,
    handleChange,
    setFieldValue,
    values,
}: IAddTodoFormProps): JSX.Element {
    const { title, date, isCompleted } = values;

    return (
        <form id={FORM_ID} onSubmit={onSubmit} className="form">
            <Input
                value={title}
                onChange={handleChange}
                type="text"
                name="title"
                id="add_todo-title-input"
                placeholder="Title"
            />
            <Input
                value={date}
                onChange={handleChange}
                type="date"
                name="date"
                id="add_todo-date-input"
                placeholder="Date"
            />
            <Input
                checked={isCompleted}
                onChange={handleChange}
                setFieldValue={setFieldValue}
                type="checkbox"
                name="isCompleted"
                id="add_todo-is_completed-input"
                placeholder="Is Completed"
            />
        </form>
    );
}
