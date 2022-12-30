import { useRef, useState, useEffect, InputHTMLAttributes } from 'react';

import classNames from 'classnames';
import { FormikErrors } from 'formik';

import Toggler from 'components/toggler';

import 'components/input/Input.styles.scss';

export type TInputProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    setFieldValue?: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined,
    ) => Promise<void> | Promise<FormikErrors<any>>;
};

export default function Input({
    value,
    onChange,
    setFieldValue,
    type,
    name,
    id,
    placeholder,
    checked,
}: TInputProps): JSX.Element {
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

    if (type === 'checkbox') {
        return (
            <Toggler
                ref={inputRef}
                checked={checked}
                onChange={onChange}
                setFieldValue={setFieldValue}
                name={name}
                id={id}
                placeholder={placeholder}
                className="input"
            />
        );
    }

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
                className="input"
            />
        </div>
    );
}
