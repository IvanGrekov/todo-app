import { useRef, useState, useEffect, InputHTMLAttributes } from 'react';

import classNames from 'classnames';

import 'components/input/Input.styles.scss';

export default function Input({
    value,
    onChange,
    type,
    name,
    id,
    placeholder,
}: InputHTMLAttributes<HTMLInputElement>): JSX.Element {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isLabelLiftedUp, setIsLabelLiftedUp] = useState(false);

    useEffect(() => {
        const inputEl = inputRef.current;

        const focusHandler = (): void => {
            setIsLabelLiftedUp((prev) => !prev);
        };

        inputEl?.addEventListener('focus', focusHandler);
        inputEl?.addEventListener('blur', focusHandler);

        return () => {
            inputEl?.removeEventListener('focus', focusHandler);
            inputEl?.removeEventListener('blur', focusHandler);
        };
    }, []);

    return (
        <div className="input__wrapper">
            {!!placeholder && !!id && (
                <label
                    htmlFor={id}
                    className={classNames('input__label', {
                        ['input__label--lifted-up']: isLabelLiftedUp || !!value,
                    })}
                >
                    {placeholder}
                </label>
            )}
            <input
                ref={inputRef}
                value={value}
                onChange={onChange}
                type={type}
                name={name}
                id={id}
                className={classNames('input')}
            />
        </div>
    );
}
