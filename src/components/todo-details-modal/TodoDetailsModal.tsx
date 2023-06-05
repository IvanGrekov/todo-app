import { useState } from 'react';

import Button from 'components/button';
import ButtonGroup from 'components/button-group';
import Modal, { IModalBaseProps } from 'components/modal';
import TodoMainInfo from 'components/todo-main-info';
import Typography from 'components/typography';
import { ITodo } from 'models/types/todo';
import { getTextColorByStatus } from 'utils/todo.utils';

import 'components/todo-details-modal/TodoDetailsModal.styles.scss';

interface ITodoDetailsModalProps extends IModalBaseProps {
    todo: ITodo;
}

export default function TodoDetailsModal({
    isOpen,
    todo,
    onClose,
}: ITodoDetailsModalProps): JSX.Element {
    const [isLoading, setIsLoading] = useState(false);

    const { isCompleted, description } = todo;
    const textColor = getTextColorByStatus(isCompleted);

    return (
        <Modal isOpen={isOpen} onClose={onClose} isLoading={isLoading}>
            <div className="todo-details">
                <TodoMainInfo todo={todo} setIsLoading={setIsLoading} />

                <div className="todo-details__description-wrapper">
                    <Typography variant="body1" color={textColor}>
                        {description}
                    </Typography>
                </div>

                <ButtonGroup shouldAddTopSpacing={true}>
                    <Button text="Cancel" onClick={onClose} />
                </ButtonGroup>
            </div>
        </Modal>
    );
}
