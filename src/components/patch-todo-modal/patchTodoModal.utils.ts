import { ITodo, TTodoFormFields } from 'models/types/todo';

type TCheckIfTodoChanged = (todo: ITodo, formValues: TTodoFormFields) => boolean;

export const checkIfTodoChanged: TCheckIfTodoChanged = (todo, formValues) => {
    const { title, description, isCompleted, date } = todo;
    const {
        title: newTitle,
        description: newDescription,
        isCompleted: newIsCompleted,
        date: newDate,
    } = formValues;
    const isTitleUpdated = title !== newTitle;
    const isDescriptionUpdated = description !== newDescription;
    const isStatusUpdated = isCompleted !== newIsCompleted;
    const isDateUpdated = date !== newDate;

    return isTitleUpdated || isDescriptionUpdated || isStatusUpdated || isDateUpdated;
};
