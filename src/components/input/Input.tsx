import { useRef, useState, useEffect, InputHTMLAttributes } from 'react';

import classNames from 'classnames';
import { FormikErrors } from 'formik';

import Toggler from 'components/toggler';

import 'components/input/Input.styles.scss';

export type TInputProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label?: string;
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
    onBlur,
    type,
    name,
    id,
    placeholder,
    label,
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
                onBlur={onBlur}
                name={name}
                id={id}
                placeholder={placeholder}
                className="input"
            />
        );
    }

    const labelValue = (isLabelLiftedUp ? label : placeholder) || placeholder;

    return (
        <div className="input__wrapper">
            {!!placeholder && !!id && (
                <label
                    htmlFor={id}
                    className={classNames('input__label', {
                        ['input__label--lifted-up']: isLabelLiftedUp || !!value,
                        ['input--empty']: !value,
                    })}
                >
                    {labelValue}
                </label>
            )}
            <input
                ref={inputRef}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                type={type}
                name={name}
                id={id}
                className="input"
            />
        </div>
    );
}
