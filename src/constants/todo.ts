import { TTodoFormFields } from 'models/types/todo';
import { getCurrentDateForInput } from 'utils/date.utils';

export const MAX_TODO_TITLE_LENGTH = 255;
export const MAX_TODO_DESCRIPTION_LENGTH = 1000;

export const INITIAL_ADD_TODO_FORM_VALUES: TTodoFormFields = {
    title: '',
    description: '',
    date: getCurrentDateForInput(),
    isCompleted: false,
};
