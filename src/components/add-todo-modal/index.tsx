import { useState } from 'react';

import AddTodoForm, { FORM_ID } from 'components/add-todo-form';
import Button from 'components/button';
import ButtonGroup from 'components/button-group';
import ConfirmationModal from 'components/confirmation-modal';
import Modal from 'components/modal';

interface IAddTodoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddTodoModal({ isOpen, onClose }: IAddTodoModalProps): JSX.Element {
    const [isFormDirty, setIsFormDirty] = useState(false);
    const [isCloseConfirmationModalOpen, setIsCloseConfirmationModalOpen] = useState(true);

    const onCloseModal = (): void => {
        if (isFormDirty) {
            setIsCloseConfirmationModalOpen(true);
        } else {
            onClose();
        }
    };

    const confirmClosing = (): void => {
        setIsFormDirty(false);
        setIsCloseConfirmationModalOpen(false);
        onClose();
    };

    const cancelClosing = (): void => {
        setIsCloseConfirmationModalOpen(false);
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onCloseModal}>
                <AddTodoForm
                    onSubmit={(...args): void => {
                        console.log(args);
                    }}
                    setIsFormDirty={setIsFormDirty}
                />

                <ButtonGroup shouldAddTopSpacing={true}>
                    <Button text="Cancel" onClick={onCloseModal} />
                    <Button type="submit" form={FORM_ID} text="Submit" variant="contained" />
                </ButtonGroup>
            </Modal>

            <ConfirmationModal
                isOpen={isCloseConfirmationModalOpen}
                onConfirm={confirmClosing}
                onCancel={cancelClosing}
            />
        </>
    );
}
