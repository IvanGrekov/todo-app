import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { TTodos, ITodo } from 'models/types/todo';
import { sortTodos } from 'utils/todos.utils';

export type TSelectedTodo = ITodo | null;

export interface ITodosState {
    todos: TTodos;
    selectedTodo: TSelectedTodo;
}

const initialState: ITodosState = {
    todos: [],
    selectedTodo: null,
};

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setSelectedTodo: (state, action: PayloadAction<TSelectedTodo>) => {
            state.selectedTodo = action.payload;
        },

        updateTodos: (state, action: PayloadAction<TTodos>) => {
            state.todos = sortTodos(action.payload);
        },

        patchTodos: (state, action: PayloadAction<TTodos>) => {
            state.todos = sortTodos(action.payload);
        },

        createTodo: (state, action: PayloadAction<ITodo>) => {
            const currentTodos = [...state.todos];
            currentTodos.push(action.payload);
            state.todos = sortTodos(currentTodos);
        },

        deleteTodo: (state, action: PayloadAction<ITodo['id']>) => {
            state.todos = state.todos.filter(({ id }) => id !== action.payload);
        },

        patchTodo: (state, action: PayloadAction<ITodo>) => {
            const currentTodos = state.todos.map((todo) =>
                todo.id === action.payload.id ? action.payload : todo,
            );
            state.todos = sortTodos(currentTodos);
        },
    },
});

export const { setSelectedTodo, updateTodos, patchTodos, createTodo, deleteTodo, patchTodo } =
    todosSlice.actions;

export default todosSlice.reducer;
