import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { TTodos, ITodo } from 'models/types/todo';
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
        createTodo: (state, action: PayloadAction<ITodo>) => {
            state.todos = sortTodos([...state.todos, action.payload]);
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

export const { updateTodos, createTodo, deleteTodo, patchTodo } = todosSlice.actions;

export default todosSlice.reducer;
