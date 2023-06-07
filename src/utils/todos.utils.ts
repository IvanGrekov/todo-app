import { EPeriodOptions } from 'models/router';
import type { RootState } from 'models/store';
import { TTodos } from 'models/types/todo';
import {
    checkIfTheSameDay,
    checkIfCurrentWeek,
    checkIfCurrentMonth,
    checkIfDateIsPast,
} from 'utils/date.utils';

export const sortTodos = (todos: TTodos): TTodos => {
    return [...todos].sort((a, b) => +new Date(a.date) - +new Date(b.date));
};

const selectTodaysTodos = (state: RootState): TTodos => {
    return state.todos.todos.filter(({ date }) => checkIfTheSameDay(new Date(date), new Date()));
};

const selectTomorrowsTodos = (state: RootState): TTodos => {
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);

    return state.todos.todos.filter(({ date }) => checkIfTheSameDay(new Date(date), tomorrowDate));
};

const selectCurrentWeekTodos = (state: RootState): TTodos => {
    return state.todos.todos.filter(({ date }) => checkIfCurrentWeek(new Date(date)));
};

const selectCurrentMonthTodos = (state: RootState): TTodos => {
    return state.todos.todos.filter(({ date }) => checkIfCurrentMonth(new Date(date)));
};

const selectPastTodos = (state: RootState): TTodos => {
    return state.todos.todos.filter(({ date }) => checkIfDateIsPast(new Date(date)));
};

const selectUpcomingTodos = (state: RootState): TTodos => {
    return state.todos.todos.filter(({ date }) => !checkIfDateIsPast(new Date(date)));
};

export const selectTodosByPeriodFilter = (
    state: RootState,
    currentPeriodFilter: string,
): TTodos => {
    switch (currentPeriodFilter) {
        case EPeriodOptions.TODAY:
            return selectTodaysTodos(state);

        case EPeriodOptions.TOMORROW:
            return selectTomorrowsTodos(state);

        case EPeriodOptions.THIS_WEEK:
            return selectCurrentWeekTodos(state);

        case EPeriodOptions.THIS_MONTH:
            return selectCurrentMonthTodos(state);

        case EPeriodOptions.PAST:
            return selectPastTodos(state);

        case EPeriodOptions.UPCOMING:
            return selectUpcomingTodos(state);

        default:
            return state.todos.todos;
    }
};

type TSelectUncompletedTodoIdsByPeriod = (state: RootState, deletingTodos: TTodos) => TTodos;

export const selectRemainedTodos: TSelectUncompletedTodoIdsByPeriod = (state, deletingTodos) => {
    return state.todos.todos.filter(({ id }) =>
        deletingTodos.every(({ id: deletingTodoId }) => id !== deletingTodoId),
    );
};

type getFilteredTodosByStatus = (todos: TTodos) => {
    completedTodos: TTodos;
    uncompletedTodos: TTodos;
};

export const getFilteredTodosByStatus: getFilteredTodosByStatus = (todos) => {
    const completedTodos = [];
    const uncompletedTodos = [];

    for (const todo of todos) {
        todo.completed ? completedTodos.push(todo) : uncompletedTodos.push(todo);
    }

    return {
        completedTodos,
        uncompletedTodos,
    };
};

export const prepareTodosForCompleting = (uncompletedTodos: TTodos): TTodos => {
    return uncompletedTodos.map((todo) => ({
        ...todo,
        completed: true,
    }));
};
