import { INITIAL_ADD_TODO_FORM_VALUES } from 'constants/todo';
import { TTodoFormFields } from 'models/types/todo';
import { getDateForInput } from 'utils/date.utils';

export const getFormattedDefaultValues = (defaultValues?: TTodoFormFields): TTodoFormFields => {
    if (!defaultValues) {
        return INITIAL_ADD_TODO_FORM_VALUES;
    }

    return {
        ...defaultValues,
        date: getDateForInput(new Date(defaultValues.date)),
    };
};
