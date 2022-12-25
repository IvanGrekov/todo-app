import moment from 'moment';

import { DATE_FORMAT } from 'constants/date';
import { TCreateTodoInput } from 'models/types/todo';

export const MAX_TODO_TITLE_LENGTH = 255;

export const INITIAL_ADD_TODO_FORM_VALUES: TCreateTodoInput = {
    title: '',
    date: moment(new Date()).format(DATE_FORMAT),
    completed: false,
};
