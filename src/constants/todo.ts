import { TCreateTodoInput } from 'models/types/todo';
import { formatDate } from 'utils/date.utils';

export const MAX_TODO_TITLE_LENGTH = 255;

export const INITIAL_ADD_TODO_FORM_VALUES: TCreateTodoInput = {
    title: '',
    date: formatDate(),
    isCompleted: false,
};
