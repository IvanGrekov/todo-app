import { TTodos } from '../types';
import { generateSringifiedDate } from '../utils/todosModel.utils';

const TODOS = '/todos';
const TODO_ID = '/:todoId';

export const TODOS_APP_ENDPOINTS = {
    todos: TODOS,
    todoId: TODOS + TODO_ID,
};

export const DEFAULT_TODOS: TTodos = [
    {
        id: '1',
        title: 'HTML',
        isCompleted: false,
        date: generateSringifiedDate('2023-02-28'),
    },
    {
        id: '2',
        title: 'CSS',
        isCompleted: true,
        date: generateSringifiedDate('2023-02-28'),
    },
    {
        id: '3',
        title: 'JS',
        isCompleted: false,
        date: generateSringifiedDate('2023-03-03'),
    },
    {
        id: '4',
        title: 'REACT',
        isCompleted: true,
        date: generateSringifiedDate('2023-09-08'),
    },
    {
        id: '5',
        title: 'NODE',
        isCompleted: false,
        date: generateSringifiedDate('2023-03-01'),
    },
    {
        id: '6',
        title: 'REDUX',
        isCompleted: false,
        date: generateSringifiedDate('2023-03-20'),
    },
];
