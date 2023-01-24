import { ReactNode, CSSProperties, useEffect } from 'react';
import { createPortal } from 'react-dom';

import classNames from 'classnames';
import FocusTrap from 'focus-trap-react';

import Skeleton from 'components/skeleton';

import 'components/modal/Modal.styles.scss';

const modalRoot = document.getElementById('modal-root') as HTMLElement;

interface IModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    style?: CSSProperties;
    isLoading?: boolean;
}

export default function Modal({
    isOpen,
    children,
    onClose,
    style,
    isLoading,
}: IModalProps): JSX.Element {
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

                    {isLoading && (
                        <div className="modal__loader">
                            <Skeleton height={4} />
                        </div>
                    )}
                </div>
            </div>
        </FocusTrap>
    );

    return createPortal(modal, modalRoot);
}
