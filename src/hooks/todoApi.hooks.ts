import { useState } from 'react';

import API from 'models/api';

type TUseApiCall = (data: any) => void;
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
    const [isCalled, setIsCalled] = useState(true);
    const [error, setError] = useState(null);
    const [data] = useState(null);

    const call: TUseApiCall = (data) => {
        setIsLoading(true);
        setIsCalled(true);

        API[method](todoId ? `:${todoId}` : '', data)
            .then((data) => {
                console.log('data', data);
                // setData(data);
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const result = {
        isLoading,
        isCalled,
        error,
        data,
    };

    return [call, result];
};
