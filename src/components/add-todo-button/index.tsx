import { useState } from 'react';

import AddTodoModal from 'components/add-todo-modal';
import Button from 'components/button';
import { EIconNames } from 'components/icon';
import { COLORS } from 'constants/colors';
import useWindowSize from 'hooks/windowSize.hooks';
import { EScreenSizeNames } from 'models/types/screenSizes';

export default function AddTodoButton(): JSX.Element {
    const [isAddTodoModalOpen, setIsAddTodoModalOpen] = useState(false);
    const windowSize = useWindowSize();

    const buttonText = windowSize === EScreenSizeNames.XS ? '' : 'Add todo';

    return (
        <>
            <Button
                text={buttonText}
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
