import { useState, useCallback, useEffect } from 'react';

import { AxiosError } from 'axios';

import { useHandleNetworkError } from 'hooks/networkErrors.hooks';
import { useAppDispatch } from 'hooks/redux.hooks';
import API from 'models/api';
import type { AppDispatch } from 'models/store';
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
type TUseApiHookResult = [call: TUseApiCall, queryResult: IUseApiResult];
interface IUseApiInput {
    method?: 'get' | 'post' | 'patch' | 'put' | 'delete';
    todoId?: ITodo['id'];
    onCompleted?: () => void;
}

type TUseApi = (input?: IUseApiInput) => TUseApiHookResult;

const useApi: TUseApi = (input) => {
    const { method = 'get', todoId, onCompleted } = input || {};

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

    const queryResult = {
        isLoading,
        isCalled,
        error,
        data,
    };

    return [call, queryResult];
};

interface IUseApiActionResult {
    call: TUseApiCall;
    dispatch: AppDispatch;
    queryResult: IUseApiResult;
}
type TUseApiAction = (config?: IUseApiInput) => IUseApiActionResult;

const useApiAction: TUseApiAction = (config) => {
    const [call, queryResult] = useApi(config);
    const dispatch = useAppDispatch();

    return {
        call,
        dispatch,
        queryResult,
    };
};

export const useLoadTodos = (): IUseApiResult => {
    const { call: getTodos, dispatch, queryResult } = useApiAction();

    useEffect(() => {
        getTodos();
    }, [getTodos]);

    const { data } = queryResult;

    useEffect(() => {
        if (data) {
            dispatch(updateTodos(data));
        }
    }, [data, dispatch]);

    return queryResult;
};

type TUseCreateTodo = (
    onCompleted?: () => void,
) => [(newTodo: { todo: Omit<ITodo, 'id'> }) => void, IUseApiResult];

export const useCreateTodo: TUseCreateTodo = (onCompleted) => {
    const {
        call: createTodoMutation,
        dispatch,
        queryResult,
    } = useApiAction({
        method: 'post',
        onCompleted,
    });

    const { data } = queryResult;

    useEffect(() => {
        if (data) {
            dispatch(createTodo(data));
        }
    }, [data, dispatch]);

    return [createTodoMutation, queryResult];
};

type TUseDeleteTodo = (todoId: ITodo['id']) => [() => void, IUseApiResult];

export const useDeleteTodo: TUseDeleteTodo = (todoId) => {
    const {
        call: deleteTodoMutation,
        dispatch,
        queryResult,
    } = useApiAction({
        method: 'post',
        todoId,
    });

    const { data } = queryResult;

    useEffect(() => {
        if (data) {
            dispatch(deleteTodo(todoId));
        }
    }, [data, dispatch, todoId]);

    return [deleteTodoMutation, queryResult];
};

type TCallUpdateTodos = (newTodos: { todos: TTodos }) => void;
type TUseUpdateTodos = () => [TCallUpdateTodos, IUseApiResult];

export const useUpdateTodos: TUseUpdateTodos = () => {
    const {
        call: updateTodosMutation,
        dispatch,
        queryResult,
    } = useApiAction({
        method: 'put',
    });

    const { data } = queryResult;

    useEffect(() => {
        if (data) {
            dispatch(updateTodos(data));
        }
    }, [data, dispatch]);

    return [updateTodosMutation, queryResult];
};

type TUsePatchTodo = (
    todoId: ITodo['id'],
    onCompleted?: () => void,
) => [(patchingTodo: { todo: ITodo }) => void, IUseApiResult];

export const usePatchTodo: TUsePatchTodo = (todoId, onCompleted) => {
    const {
        call: patchTodoMutation,
        dispatch,
        queryResult,
    } = useApiAction({
        method: 'patch',
        todoId,
        onCompleted,
    });

    const { data } = queryResult;

    useEffect(() => {
        if (data) {
            dispatch(patchTodo(data));
        }
    }, [data, dispatch]);

    return [patchTodoMutation, queryResult];
};
