import { useCallback, useState, useEffect, useContext, useMemo } from 'react';

import { AxiosError } from 'axios';

import { DEFAULT_NETWORK_ERRORS, MAX_NETWORK_ERRORS } from 'constants/networkErrors';
import NetworkErrorsContext from 'models/contexts/networkErrors';
import { TNetworkErrorsContextValue, TSetNewNetworkError } from 'models/types/networkErrors';
import { getDateForErrorLogger } from 'utils/date.utils';

export type TUseNetworkErrors = () => TNetworkErrorsContextValue;

export const useNetworkErrors: TUseNetworkErrors = () => {
    const [networkErrors, setNetworkErrors] = useState(DEFAULT_NETWORK_ERRORS);

    const setNewNetworkError = useCallback<TSetNewNetworkError>(({ message }) => {
        setNetworkErrors((prevNetworkErrors) => {
            const slicedPrevNetworkErrors =
                prevNetworkErrors.length === MAX_NETWORK_ERRORS
                    ? [...prevNetworkErrors.slice(1, MAX_NETWORK_ERRORS)]
                    : prevNetworkErrors;

            return [
                ...slicedPrevNetworkErrors,
                { id: `${Math.random()}`, message: `${getDateForErrorLogger()} - ${message}` },
            ];
        });
    }, []);

    return useMemo(
        () => ({ networkErrors, setNewNetworkError, setNetworkErrors }),
        [networkErrors, setNewNetworkError],
    );
};

type TUseHandleNetworkError = (error: AxiosError | null) => void;

export const useHandleNetworkError: TUseHandleNetworkError = (error) => {
    const { setNewNetworkError } = useContext(NetworkErrorsContext);

    useEffect(() => {
        if (error) {
            setNewNetworkError(error);
        }
    }, [error, setNewNetworkError]);
};
