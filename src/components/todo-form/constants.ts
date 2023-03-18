import * as Yup from 'yup';

import { MAX_TODO_TITLE_LENGTH } from 'constants/todo';
import { getCurrentDateForInput } from 'utils/date.utils';

export const ADD_FORM_ID = 'add-todo-form';
export const PATCH_FORM_ID = 'patch-todo-form';
export const PAST_DATE_ERROR_TEXT = "You can't select the past date";

const TITLE_YUP_VALIDATION = Yup.string()
    .max(MAX_TODO_TITLE_LENGTH)
    .matches(/^\S/, 'Incorrect Title')
    .required('Title is required');
const IS_COMPLETED_YUP_VALIDATION = Yup.boolean();

export const TODO_FORM_SCHEMA = Yup.object().shape({
    title: TITLE_YUP_VALIDATION,
    date: Yup.date()
        .min(getCurrentDateForInput(), PAST_DATE_ERROR_TEXT)
        .required('Date is required'),
    isCompleted: IS_COMPLETED_YUP_VALIDATION,
});

export const TODO_FORM_SCHEMA_WITHOUT_DATA = Yup.object().shape({
    title: TITLE_YUP_VALIDATION,
    isCompleted: IS_COMPLETED_YUP_VALIDATION,
});
