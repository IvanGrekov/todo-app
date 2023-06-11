import { useMemo } from 'react';

import { useAppDispatch, useAppSelector } from 'hooks/redux.hooks';
import { TSelectedTodo, setSelectedTodo } from 'models/store/features/todos/todosSlice';

type TUseSelectedTodo = () => {
    selectedTodo: TSelectedTodo;
    setSelectedTodo: (todo: TSelectedTodo) => void;
};

export const useSelectedTodo: TUseSelectedTodo = () => {
    const dispatch = useAppDispatch();
    const selectedTodo = useAppSelector((state) => state.todos.selectedTodo);

    return useMemo(
        () => ({
            selectedTodo,
            setSelectedTodo: (todo) => dispatch(setSelectedTodo(todo)),
        }),
        [selectedTodo, dispatch],
    );
};
