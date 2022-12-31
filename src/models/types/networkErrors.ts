import { AxiosError } from 'axios';

export type TNetworkError = { message: string; id: string };

export type TNetworkErrors = Array<TNetworkError>;

export type TSetNewNetworkError = (newError: AxiosError) => void;

export type TSetNetworkErrors = (
    updatedErrors: ((currentNetworkErrors: TNetworkErrors) => TNetworkErrors) | TNetworkErrors,
) => void;

export type TNetworkErrorsContextValue = {
    networkErrors: TNetworkErrors;
    setNewNetworkError: TSetNewNetworkError;
    setNetworkErrors: TSetNetworkErrors;
};
