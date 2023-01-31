import { useState } from 'react';

import AddTodoModal from 'components/add-todo-modal';
import Button from 'components/button';
import { EIconNames } from 'components/icon';
import { COLORS } from 'constants/colors';

export default function AddTodoButton(): JSX.Element {
    const [isAddTodoModalOpen, setIsAddTodoModalOpen] = useState(false);

    return (
        <>
            <Button
                text="Add todo"
                variant="contained"
                textVariant="subtitle2"
                size="big"
                title="Add a new todo"
                iconName={EIconNames.ADD}
                iconColor={COLORS.black}
                onClick={(): void => setIsAddTodoModalOpen(true)}
            />

            <AddTodoModal
                isOpen={isAddTodoModalOpen}
                onClose={(): void => setIsAddTodoModalOpen(false)}
            />
        </>
    );
}
