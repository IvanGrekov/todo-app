import * as Yup from 'yup';

import { MAX_TODO_TITLE_LENGTH } from 'constants/todo';
import { getCurrentDateForInput } from 'utils/date.utils';

export const FORM_ID = 'add-todo-form';

export const ADD_TODO_FORM_SCHEMA = Yup.object().shape({
    title: Yup.string()
        .max(MAX_TODO_TITLE_LENGTH)
        .matches(/^\S/, 'Incorrect Title')
        .required('Title is required'),
    date: Yup.date()
        .min(getCurrentDateForInput(), "You can't select the past date")
        .required('Date is required'),
    isCompleted: Yup.boolean(),
});
