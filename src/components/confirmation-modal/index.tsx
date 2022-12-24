import Button from 'components/button';
import ButtonGroup from 'components/button-group';
import Modal from 'components/modal';
import Typography from 'components/typography';

interface IConfirmationModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    descriptionText?: string;
    confirmationText?: string;
    cancelText?: string;
}

export default function ConfirmationModal({
    isOpen,
    onConfirm,
    onCancel,
    descriptionText = "Please, confirm your action. If you confirm - your data can't be restored",
    confirmationText = 'Confirm',
    cancelText = 'Cancel',
}: IConfirmationModalProps): JSX.Element {
    return (
        <Modal isOpen={isOpen} onClose={onCancel} style={{ maxWidth: '20vw', minWidth: 320 }}>
            <Typography element="h3" variant="subtitle1">
                {descriptionText}
            </Typography>
            <ButtonGroup shouldAddTopSpacing={true}>
                <Button text={cancelText} onClick={onCancel} />
                <Button text={confirmationText} variant="contained" onClick={onConfirm} />
            </ButtonGroup>
        </Modal>
    );
}
