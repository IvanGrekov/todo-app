import { ITodo, TTodoFormFields } from 'models/types/todo';

type TCheckIfTodoChanged = (todo: ITodo, formValues: TTodoFormFields) => boolean;

export const checkIfTodoChanged: TCheckIfTodoChanged = (todo, formValues) => {
    const { title, isCompleted, date } = todo;
    const { title: newTitle, isCompleted: newIsCompleted, date: newDate } = formValues;
    const isTitleUpdated = title !== newTitle;
    const isStatusUpdated = isCompleted !== newIsCompleted;
    const isDateUpdated = date !== newDate;

    return isTitleUpdated || isStatusUpdated || isDateUpdated;
};
