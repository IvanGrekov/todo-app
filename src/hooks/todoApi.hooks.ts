import { useState, useCallback } from 'react';

import { AxiosError } from 'axios';

import API from 'models/api';

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
    todoId?: string;
}) => TUseApiResult;

export const useApi: TUseApi = (config) => {
    const { method = 'get', todoId } = config || {};

    const [isLoading, setIsLoading] = useState(true);
    const [isCalled, setIsCalled] = useState(false);
    const [error, setError] = useState<null | AxiosError>(null);
    const [data, setData] = useState(null);

    const call: TUseApiCall = useCallback(
        (userData) => {
            setIsLoading(true);
            setIsCalled(true);

            API[method](todoId ? `:${todoId}` : '', userData)
                .then((res) => {
                    setData(res.data);
                })
                .catch((error) => {
                    setError(error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        },
        [method, todoId],
    );

    const result = {
        isLoading,
        isCalled,
        error,
        data,
    };

    return [call, result];
};
