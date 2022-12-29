import { ReactNode, CSSProperties, useEffect } from 'react';
import { createPortal } from 'react-dom';

import classNames from 'classnames';
import FocusTrap from 'focus-trap-react';

import 'components/modal/Modal.styles.scss';

const modalRoot = document.getElementById('modal-root') as HTMLElement;

interface IModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    style?: CSSProperties;
}

export default function Modal({ isOpen, children, onClose, style }: IModalProps): JSX.Element {
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
        <FocusTrap active={isOpen}>
            <div onClick={onClose} className={classNames('modal', { ['modal--open']: isOpen })}>
                <div
                    className="modal__content"
                    onClick={(event): void => {
                        event.stopPropagation();
                    }}
                    style={style}
                >
                    {children}
                </div>
            </div>
        </FocusTrap>
    );

    return createPortal(modal, modalRoot);
}
