import { createContext } from 'react';

import { DEFAULT_NETWORK_ERRORS_CONTEXT_VALUE } from 'constants/networkErrors';
import { TNetworkErrorsContextValue } from 'models/types/networkErrors';

const NetworkErrorsContext = createContext<TNetworkErrorsContextValue>(
    DEFAULT_NETWORK_ERRORS_CONTEXT_VALUE,
);

export default NetworkErrorsContext;
