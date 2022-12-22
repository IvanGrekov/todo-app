import { ReactNode, useEffect } from 'react';

import classNames from 'classnames';

import 'components/modal/Modal.styles.scss';

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

    return (
        <div className={classNames('modal', { ['modal--open']: isOpen })}>
            <div className="modal__backdrop" onClick={onClose}>
                <div
                    className="modal__content"
                    onClick={(event): void => {
                        event.stopPropagation();
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}
