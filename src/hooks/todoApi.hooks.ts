import { useState, useCallback, useEffect } from 'react';

import { AxiosError } from 'axios';

import { useHandleNetworkError } from 'hooks/networkErrors.hooks';
import { useAppDispatch } from 'hooks/redux.hooks';
import API from 'models/api';
import { updateTodos } from 'models/store/features/todos/todosSlice';
import { ITodo } from 'models/types/todo';

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
