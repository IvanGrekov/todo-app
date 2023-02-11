import { TTodos } from 'models/types/todo';

export const sortTodos = (todos: TTodos): TTodos => {
    return todos.sort((a, b) => +new Date(a.date) - +new Date(b.date));
};
