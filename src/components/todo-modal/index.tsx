import { useState } from 'react';

import Button from 'components/button';
import ButtonGroup from 'components/button-group';
import ConfirmationModal from 'components/confirmation-modal';
import Modal, { IModalBaseProps } from 'components/modal';
import TodoForm, { ADD_FORM_ID, PATCH_FORM_ID, TOnSubmit } from 'components/todo-form';
import { ITodo } from 'models/types/todo';

interface ITodoModalProps extends IModalBaseProps {
    isLoading: boolean;
    onSubmit: TOnSubmit;
    todo?: ITodo;
}

export default function TodoModal({
    isOpen,
    isLoading,
    onSubmit,
    onClose,
    todo,
}: ITodoModalProps): JSX.Element {
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [isFormDirty, setIsFormDirty] = useState(false);
    const [isCloseConfirmationModalOpen, setIsCloseConfirmationModalOpen] = useState(false);

    const onCloseModal = (): void => {
        if (isFormDirty) {
            setIsCloseConfirmationModalOpen(true);
        } else {
            onClose();
        }
    };

    const confirmClosing = (): void => {
        setIsCloseConfirmationModalOpen(false);
        onClose();
    };

    const cancelClosing = (): void => {
        setIsCloseConfirmationModalOpen(false);
    };

    const formId = todo ? PATCH_FORM_ID : ADD_FORM_ID;

    return (
        <>
            <Modal isOpen={isOpen} isLoading={isLoading} onClose={onCloseModal}>
                <TodoForm
                    formId={formId}
                    onSubmit={onSubmit}
                    setIsFormDirty={setIsFormDirty}
                    setIsSubmitDisabled={setIsSubmitDisabled}
                    shouldReset={!isOpen}
                    defaultValues={todo}
                />

                <ButtonGroup shouldAddTopSpacing={true}>
                    <Button text="Cancel" onClick={onCloseModal} />
                    <Button
                        type="submit"
                        form={formId}
                        text="Submit"
                        variant="contained"
                        isDisabled={isSubmitDisabled}
                        isLoading={isLoading}
                    />
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
