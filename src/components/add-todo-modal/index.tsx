import { useState, useEffect } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import AddTodoForm, { FORM_ID } from 'components/add-todo-form';
import Button from 'components/button';
import ButtonGroup from 'components/button-group';
import ConfirmationModal from 'components/confirmation-modal';
import Modal from 'components/modal';
import { MAX_TODO_TITLE_LENGTH, INITIAL_ADD_TODO_FORM_VALUES } from 'constants/todo';
import { TCreateTodoInput } from 'models/types/todo';
import { formatDate } from 'utils/date.utils';

interface IAddTodoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddTodoModal({ isOpen, onClose }: IAddTodoModalProps): JSX.Element {
    const [isFormDirty, setIsFormDirty] = useState(false);
    const [isCloseConfirmationModalOpen, setIsCloseConfirmationModalOpen] = useState(false);

    const onSubmit = (values: TCreateTodoInput): void => {
        console.log(values);
    };

    const formik = useFormik({
        initialValues: INITIAL_ADD_TODO_FORM_VALUES,
        onSubmit,
        validationSchema: AddTodoFormSchema,
        enableReinitialize: true,
    });

    const { handleSubmit, handleChange, setFieldValue, values, dirty, resetForm } = formik;

    useEffect(() => {
        setIsFormDirty(dirty);
    }, [setIsFormDirty, dirty]);

    const baseOnClose = (): void => {
        resetForm();
        onClose();
    };

    const onCloseModal = (): void => {
        if (isFormDirty) {
            setIsCloseConfirmationModalOpen(true);
        } else {
            baseOnClose();
        }
    };

    const confirmClosing = (): void => {
        setIsCloseConfirmationModalOpen(false);
        baseOnClose();
    };

    const cancelClosing = (): void => {
        setIsCloseConfirmationModalOpen(false);
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onCloseModal}>
                <AddTodoForm
                    onSubmit={handleSubmit}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                    values={values}
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

const AddTodoFormSchema = Yup.object().shape({
    title: Yup.string()
        .max(MAX_TODO_TITLE_LENGTH)
        .matches(/^\S/, 'Incorrect Title')
        .required('Title is required'),
    date: Yup.date()
        .min(formatDate(), "You can't select the past date")
        .required('Date is required'),
    isCompleted: Yup.boolean(),
});
