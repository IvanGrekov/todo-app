import { Formik, Form, Field } from 'formik';
import moment from 'moment';
import * as Yup from 'yup';

import { FORM_ID } from 'components/add-todo-form/constants';
import { DATE_FORMAT } from 'constants/date';
import { MAX_TODO_TITLE_LENGTH, INITIAL_ADD_TODO_FORM_VALUES } from 'constants/todo';
import { TCreateTodoInput } from 'models/types/todo';

import 'components/add-todo-form/AddTodoForm.styles.scss';

interface IAddTodoFormProps {
    onSubmit: (values: TCreateTodoInput) => void;
    setIsFormDirty: (value: boolean) => void;
}

export default function AddTodoForm({ onSubmit, setIsFormDirty }: IAddTodoFormProps): JSX.Element {
    return (
        <Formik
            initialValues={INITIAL_ADD_TODO_FORM_VALUES}
            validationSchema={AddTodoFormSchema}
            onSubmit={onSubmit}
        >
            {({ errors, touched, dirty, handleChange }): JSX.Element => {
                console.log('errors', errors);
                console.log('touched', touched);
                console.log('handleChange', handleChange);

                // TODO: Replace from here;
                setIsFormDirty(dirty);

                return (
                    <Form id={FORM_ID}>
                        <Field placeholder="Title" name="title" />
                        <Field placeholder="Assignee" name="userId" />
                        <Field type="date" placeholder="Date" name="date" />
                        <Field type="checkbox" name="completed" />
                    </Form>
                );
            }}
        </Formik>
    );
}

const AddTodoFormSchema = Yup.object().shape({
    title: Yup.string()
        .max(MAX_TODO_TITLE_LENGTH)
        .matches(/^\S/, 'Incorrect Title')
        .required('Title is required'),
    userId: Yup.string(),
    date: Yup.date()
        .min(moment(new Date()).format(DATE_FORMAT), "You can't select the past date")
        .required('Date is required'),
    completed: Yup.boolean(),
});
