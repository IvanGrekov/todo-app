import { useState } from 'react';

import AddTodoForm, { FORM_ID } from 'components/add-todo-form';
import Button from 'components/button';
import ButtonGroup from 'components/button-group';
import ConfirmationModal from 'components/confirmation-modal';
import Modal from 'components/modal';
import { useApi } from 'hooks/todoApi.hooks';
import { TCreateTodoInput } from 'models/types/todo';
import { formatDate } from 'utils/date.utils';

interface IAddTodoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddTodoModal({ isOpen, onClose }: IAddTodoModalProps): JSX.Element {
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [isFormDirty, setIsFormDirty] = useState(false);
    const [isCloseConfirmationModalOpen, setIsCloseConfirmationModalOpen] = useState(false);
    const [createTodo, { isLoading }] = useApi({ method: 'post', onCompleted: onClose });

    const onSubmit = (values: TCreateTodoInput): void => {
        const formattedDate = formatDate(values.date);

        createTodo({
            ...values,
            date: formattedDate,
        });
    };

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

    return (
        <>
            <Modal isOpen={isOpen} isLoading={isLoading} onClose={onCloseModal}>
                <AddTodoForm
                    onSubmit={onSubmit}
                    setIsFormDirty={setIsFormDirty}
                    setIsSubmitDisabled={setIsSubmitDisabled}
                    shouldReset={!isOpen}
                />

                <ButtonGroup shouldAddTopSpacing={true}>
                    <Button text="Cancel" onClick={onCloseModal} />
                    <Button
                        type="submit"
                        form={FORM_ID}
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
