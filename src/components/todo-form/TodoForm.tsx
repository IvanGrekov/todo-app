import { useEffect } from 'react';

import { useFormik } from 'formik';

import Input from 'components/input';
import { TODO_FORM_SCHEMA, TODO_FORM_SCHEMA_WITHOUT_DATA } from 'components/todo-form/constants';
import { getFormattedDefaultValues } from 'components/todo-form/todoForm.utils';
import { ITodo, TTodoFormFields } from 'models/types/todo';

import 'components/todo-form/TodoForm.styles.scss';

export type TOnSubmit = (values: TTodoFormFields) => void;

interface ITodoFormProps {
    formId: string;
    onSubmit: TOnSubmit;
    setIsFormDirty: (newValue: boolean) => void;
    setIsSubmitDisabled: (newValue: boolean) => void;
    shouldReset: boolean;
    defaultValues?: ITodo;
    shouldShowDateField?: boolean;
}

export default function TodoForm({
    formId,
    onSubmit,
    setIsFormDirty,
    setIsSubmitDisabled,
    shouldReset,
    defaultValues,
    shouldShowDateField = true,
}: ITodoFormProps): JSX.Element {
    const initialValues = getFormattedDefaultValues(defaultValues);
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: shouldShowDateField ? TODO_FORM_SCHEMA : TODO_FORM_SCHEMA_WITHOUT_DATA,
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
    const { title: titleError, date: dateError } = errors;

    return (
        <form id={formId} onSubmit={handleSubmit} className="form">
            <Input
                value={title}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                name="title"
                id="add_todo-title-input"
                placeholder="Enter Title"
                label="Title"
                isError={!!titleError}
                helperText={titleError}
            />
            {shouldShowDateField && (
                <Input
                    value={date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="date"
                    name="date"
                    id="add_todo-date-input"
                    placeholder="Date"
                    isError={!!dateError}
                    helperText={dateError}
                />
            )}
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
