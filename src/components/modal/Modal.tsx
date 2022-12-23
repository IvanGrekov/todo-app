import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

import classNames from 'classnames';

import 'components/modal/Modal.styles.scss';

const modalRoot = document.getElementById('modal-root') as HTMLElement;

interface IModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export default function Modal({ isOpen, children, onClose }: IModalProps): JSX.Element {
    useEffect(() => {
        const onEscapeKeyDown = (event: KeyboardEvent): void => {
            if (event.code === 'Escape') {
                onClose();
            }
        };

        document.body.addEventListener('keydown', onEscapeKeyDown);

        return () => {
            document.body.addEventListener('keydown', onEscapeKeyDown);
        };
    }, [onClose]);

    const modal = (
        <div onClick={onClose} className={classNames('modal', { ['modal--open']: isOpen })}>
            <div
                className="modal__content"
                onClick={(event): void => {
                    event.stopPropagation();
                }}
            >
                {children}
            </div>
        </div>
    );

    return createPortal(modal, modalRoot);
}
