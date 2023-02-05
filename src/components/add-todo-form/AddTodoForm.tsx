import { useEffect } from 'react';

import { useFormik } from 'formik';

import { FORM_ID, ADD_TODO_FORM_SCHEMA } from 'components/add-todo-form/constants';
import Input from 'components/input';
import { INITIAL_ADD_TODO_FORM_VALUES } from 'constants/todo';
import { TCreateTodoInput } from 'models/types/todo';

import 'components/add-todo-form/AddTodoForm.styles.scss';

interface IAddTodoFormProps {
    onSubmit: (values: TCreateTodoInput) => void;
    setIsFormDirty: (newValue: boolean) => void;
    setIsSubmitDisabled: (newValue: boolean) => void;
    shouldReset: boolean;
}

export default function AddTodoForm({
    onSubmit,
    setIsFormDirty,
    setIsSubmitDisabled,
    shouldReset,
}: IAddTodoFormProps): JSX.Element {
    const formik = useFormik({
        initialValues: INITIAL_ADD_TODO_FORM_VALUES,
        onSubmit,
        validationSchema: ADD_TODO_FORM_SCHEMA,
        enableReinitialize: true,
    });

    const {
        handleSubmit,
        handleChange,
        setFieldValue,
        handleBlur,
        resetForm,
        values,
        dirty,
        touched,
        errors,
    } = formik;

    useEffect(() => {
        setIsFormDirty(dirty);
    }, [setIsFormDirty, dirty]);

    useEffect(() => {
        const isSubmitDisabled = !Object.values(touched).length || !!Object.values(errors).length;

        setIsSubmitDisabled(isSubmitDisabled);
    }, [touched, errors, setIsSubmitDisabled]);

    useEffect(() => {
        shouldReset && resetForm();
    }, [shouldReset, resetForm]);

    const { title, date, isCompleted } = values;

    return (
        <form id={FORM_ID} onSubmit={handleSubmit} className="form">
            <Input
                value={title}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                name="title"
                id="add_todo-title-input"
                placeholder="Enter Title"
                label="Title"
            />
            <Input
                value={date}
                onChange={handleChange}
                onBlur={handleBlur}
                type="date"
                name="date"
                id="add_todo-date-input"
                placeholder="Date"
            />
            <Input
                checked={isCompleted}
                onChange={handleChange}
                setFieldValue={setFieldValue}
                onBlur={handleBlur}
                type="checkbox"
                name="isCompleted"
                id="add_todo-is_completed-input"
                placeholder="Is Completed"
            />
        </form>
    );
}
