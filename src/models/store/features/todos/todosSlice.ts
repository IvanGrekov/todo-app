import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { EPeriodOptions } from 'models/router';
import type { RootState } from 'models/store';
import { TTodos, ITodo } from 'models/types/todo';
import {
    checkIfTheSameDay,
    checkIfCurrentWeek,
    checkIfCurrentMonth,
    checkIfDateIsPast,
} from 'utils/date.utils';
import { sortTodos } from 'utils/todos.utils';

export interface ITodosState {
    todos: TTodos;
}

const initialState: ITodosState = {
    todos: [],
};

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        updateTodos: (state, action: PayloadAction<TTodos>) => {
            state.todos = sortTodos(action.payload);
        },
        deleteTodo: (state, action: PayloadAction<ITodo['id']>) => {
            state.todos = state.todos.filter(({ id }) => id !== action.payload);
        },
        patchTodo: (state, action: PayloadAction<ITodo>) => {
            state.todos = state.todos.map((todo) =>
                todo.id === action.payload.id ? action.payload : todo,
            );
        },
    },
});

export const { updateTodos, deleteTodo, patchTodo } = todosSlice.actions;

export const selectTodos = (state: RootState): TTodos => state.todos.todos;

export const selectTodaysTodos = (state: RootState): TTodos => {
    return state.todos.todos.filter(({ date }) => checkIfTheSameDay(new Date(date), new Date()));
};

export const selectTomorrowsTodos = (state: RootState): TTodos => {
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);

    return state.todos.todos.filter(({ date }) => checkIfTheSameDay(new Date(date), tomorrowDate));
};

export const selectCurrentWeekTodos = (state: RootState): TTodos => {
    return state.todos.todos.filter(({ date }) => checkIfCurrentWeek(new Date(date)));
};

export const selectCurrentMonthTodos = (state: RootState): TTodos => {
    return state.todos.todos.filter(({ date }) => checkIfCurrentMonth(new Date(date)));
};

export const selectPastTodos = (state: RootState): TTodos => {
    return state.todos.todos.filter(({ date }) => checkIfDateIsPast(new Date(date)));
};

export const selectUpcomingTodos = (state: RootState): TTodos => {
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

export default todosSlice.reducer;
