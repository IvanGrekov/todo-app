import { useState, useCallback, useEffect } from 'react';

import { AxiosError } from 'axios';

import { useHandleNetworkError } from 'hooks/networkErrors.hooks';
import { useAppDispatch } from 'hooks/redux.hooks';
import API from 'models/api';
import {
    updateTodos,
    createTodo,
    deleteTodo,
    patchTodo,
} from 'models/store/features/todos/todosSlice';
import { ITodo, TTodos } from 'models/types/todo';

type TUseApiCall = (userData?: any) => void;

interface IUseApiResult {
    isLoading: boolean;
    isCalled: boolean;
    error: any;
    data: any;
}
type TUseApiResult = [call: TUseApiCall, result: IUseApiResult];

type TUseApi = (config?: {
    method?: 'get' | 'post' | 'patch' | 'put' | 'delete';
    todoId?: ITodo['id'];
    onCompleted?: () => void;
}) => TUseApiResult;

export const useApi: TUseApi = (config) => {
    const { method = 'get', todoId, onCompleted } = config || {};

    const [isLoading, setIsLoading] = useState(false);
    const [isCalled, setIsCalled] = useState(false);
    const [error, setError] = useState<null | AxiosError>(null);
    const [data, setData] = useState(null);

    useHandleNetworkError(error);

    const call: TUseApiCall = useCallback(
        (userData) => {
            setIsLoading(true);
            setIsCalled(true);

            const requestParams = todoId ? `${todoId}` : '';

            API[method](requestParams, userData)
                .then((res) => {
                    setData(res.data);
                    onCompleted?.();
                })
                .catch((error) => {
                    setError(error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        },
        [method, todoId, onCompleted],
    );

    const result = {
        isLoading,
        isCalled,
        error,
        data,
    };

    return [call, result];
};

export const useLoadTodos = (): IUseApiResult => {
    const [getTodos, { isLoading, data, error, isCalled }] = useApi();
    const dispatch = useAppDispatch();

    useEffect(() => {
        getTodos();
    }, [getTodos]);

    useEffect(() => {
        if (data) {
            dispatch(updateTodos(data));
        }
    }, [data, dispatch]);

    return {
        isLoading,
        data,
        error,
        isCalled,
    };
};

type TUseCreateTodo = (
    onCompleted?: () => void,
) => [(newTodo: { todo: Omit<ITodo, 'id'> }) => void, IUseApiResult];

export const useCreateTodo: TUseCreateTodo = (onCompleted) => {
    const [callCreateTodo, queryResult] = useApi({
        method: 'post',
        onCompleted,
    });
    const dispatch = useAppDispatch();

    const { data } = queryResult;

    useEffect(() => {
        if (data) {
            dispatch(createTodo(data));
        }
    }, [data, dispatch]);

    return [callCreateTodo, queryResult];
};

type TUseDeleteTodo = (todoId: ITodo['id']) => [() => void, IUseApiResult];

export const useDeleteTodo: TUseDeleteTodo = (todoId) => {
    const [callDeleteTodo, queryResult] = useApi({
        method: 'delete',
        todoId,
    });
    const dispatch = useAppDispatch();

    const { data } = queryResult;

    useEffect(() => {
        if (data) {
            dispatch(deleteTodo(todoId));
        }
    }, [data, dispatch, todoId]);

    return [callDeleteTodo, queryResult];
};

type TCallUpdateTodos = (todos: TTodos) => void;
type TUseUpdateTodos = () => [TCallUpdateTodos, IUseApiResult];

export const useUpdateTodos: TUseUpdateTodos = () => {
    const [updateTodosMutation, queryResult] = useApi({
        method: 'put',
    });
    const dispatch = useAppDispatch();
    const callUpdateTodos: TCallUpdateTodos = (todos): void => {
        updateTodosMutation({ todos });
    };

    const { data } = queryResult;

    useEffect(() => {
        if (data) {
            dispatch(updateTodos(data));
        }
    }, [data, dispatch]);

    return [callUpdateTodos, queryResult];
};

type TUsePatchTodo = (
    todoId: ITodo['id'],
    onCompleted?: () => void,
) => [(patchingTodo: { todo: ITodo }) => void, IUseApiResult];

export const usePatchTodo: TUsePatchTodo = (todoId, onCompleted) => {
    const [callPatchTodo, queryResult] = useApi({
        method: 'patch',
        todoId,
        onCompleted,
    });
    const dispatch = useAppDispatch();

    const { data } = queryResult;

    useEffect(() => {
        if (data) {
            dispatch(patchTodo(data));
        }
    }, [data, dispatch, todoId]);

    return [callPatchTodo, queryResult];
};
