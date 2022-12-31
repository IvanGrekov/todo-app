import {
    TNetworkErrors,
    TSetNewNetworkError,
    TSetNetworkErrors,
    TNetworkErrorsContextValue,
} from 'models/types/networkErrors';

export const DEFAULT_NETWORK_ERRORS: TNetworkErrors = [];

const DEFAULT_SET_NEW_NETWORK_ERROR: TSetNewNetworkError = (newError) => {
    console.log('newError', newError);
};

const DEFAULT_SET_NETWORK_ERRORS: TSetNetworkErrors = (updatedErrors) => {
    console.log('updatedErrors', updatedErrors);
};

export const DEFAULT_NETWORK_ERRORS_CONTEXT_VALUE: TNetworkErrorsContextValue = {
    networkErrors: DEFAULT_NETWORK_ERRORS,
    setNewNetworkError: DEFAULT_SET_NEW_NETWORK_ERROR,
    setNetworkErrors: DEFAULT_SET_NETWORK_ERRORS,
};

export const MAX_NETWORK_ERRORS = 3;
export const NETWORK_ERROR_DISPLAY_DURATION = 2500;
