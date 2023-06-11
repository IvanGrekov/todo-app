import { useContext, useState } from 'react';

import Button from 'components/button';
import ButtonGroup from 'components/button-group';
import Modal from 'components/modal';
import TodoMainInfo from 'components/todo-main-info';
import Typography from 'components/typography';
import { useSelectedTodo } from 'hooks/selectedTodo.hooks';
import TodoModalHandlersContext from 'models/contexts/todoModalHandlers';
import { getTextColorByStatus } from 'utils/todo.utils';

import 'components/todo-details-modal/TodoDetailsModal.styles.scss';

interface ITodoDetailsModalProps {
    isOpen: boolean;
}

export default function TodoDetailsModal({ isOpen }: ITodoDetailsModalProps): JSX.Element {
    const context = useContext(TodoModalHandlersContext);
    const { selectedTodo } = useSelectedTodo();
    const [isLoading, setIsLoading] = useState(false);

    if (!context) {
        throw new Error('TodoDetailsModal: context is not provided');
    }

    const { togglePatchTodoModal, toggleDetailsTodoModal } = context;
    const { completed = false, description } = selectedTodo || {};
    const textColor = getTextColorByStatus(completed);

    return (
        <Modal isOpen={isOpen} onClose={toggleDetailsTodoModal} isLoading={isLoading}>
            <div className="todo-details">
                {!!selectedTodo && <TodoMainInfo todo={selectedTodo} setIsLoading={setIsLoading} />}

                <div className="todo-details__description-wrapper">
                    <Typography variant="body1" color={textColor}>
                        {description}
                    </Typography>
                </div>

                <ButtonGroup shouldAddTopSpacing={true}>
                    <Button text="Edit" onClick={togglePatchTodoModal} />
                    <Button text="Cancel" variant="contained" onClick={toggleDetailsTodoModal} />
                </ButtonGroup>
            </div>
        </Modal>
    );
}
