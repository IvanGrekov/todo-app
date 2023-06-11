import { createContext } from 'react';

import { TTodoModalHandlersContextValue } from 'models/types/todoModalHandlers';

const TodoModalHandlersContext = createContext<TTodoModalHandlersContextValue>(null);

export default TodoModalHandlersContext;
