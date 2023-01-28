import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from 'models/store';
import { TTodos } from 'models/types/todo';

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
            state.todos = action.payload;
        },
    },
});

export const { updateTodos } = todosSlice.actions;

export const selectTodos = (state: RootState): TTodos => state.todos.todos;

export default todosSlice.reducer;
