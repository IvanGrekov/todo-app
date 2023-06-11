import { Dispatch, SetStateAction, useMemo } from 'react';

import { TTodoModalHandlersContextValue } from 'models/types/todoModalHandlers';

type TUseTodoModalHandlersContextValue = (
    setIsDetailsTodoModalOpen: Dispatch<SetStateAction<boolean>>,
    setIsPatchTodoModalOpen: Dispatch<SetStateAction<boolean>>,
) => TTodoModalHandlersContextValue;

export const useTodoModalHandlersContextValue: TUseTodoModalHandlersContextValue = (
    setIsDetailsTodoModalOpen,
    setIsPatchTodoModalOpen,
) => {
    return useMemo(
        () => ({
            toggleDetailsTodoModal: (): void => {
                setIsDetailsTodoModalOpen((prev) => !prev);
            },

            togglePatchTodoModal: (): void => {
                setIsPatchTodoModalOpen((prev) => !prev);
            },
        }),
        [setIsDetailsTodoModalOpen, setIsPatchTodoModalOpen],
    );
};
