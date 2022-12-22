import { useState } from 'react';

import Button from 'components/button';
import { EIconNames } from 'components/icon';
import Modal from 'components/modal';
import { COLORS } from 'constants/colors';

export default function AddTodoButton(): JSX.Element {
    const [isAddTodoModalOpen, setIsAddTodoModalOpen] = useState(false);

    return (
        <>
            <Button
                text="Add todo"
                variant="contained"
                textVariant="subtitle2"
                isBig
                title="Add a new todo"
                iconName={EIconNames.ADD}
                iconColor={COLORS.black}
                onClick={(): void => setIsAddTodoModalOpen(true)}
            />

            <Modal isOpen={isAddTodoModalOpen} onClose={(): void => setIsAddTodoModalOpen(false)}>
                Add Todo Modal
            </Modal>
        </>
    );
}
