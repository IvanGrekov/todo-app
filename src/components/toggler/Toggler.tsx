import { forwardRef } from 'react';

import classNames from 'classnames';

import { TInputProps } from 'components/input';
import Typography from 'components/typography';

import 'components/toggler/Toggler.styles.scss';

const TogglerWrapper = forwardRef<HTMLInputElement, TInputProps>(function Toggler(
    { checked, onChange, setFieldValue, onBlur, name, id, placeholder },
    ref,
): JSX.Element {
    return (
        <div className="toggler__wrapper">
            <input
                ref={ref}
                checked={checked}
                onChange={onChange}
                onBlur={onBlur}
                type="checkbox"
                name={name}
                id={id}
                className="toggler__input"
            />

            <div
                className="toggler"
                onClick={(): void => {
                    setFieldValue?.(name, !checked);
                }}
            >
                <div
                    className={classNames('toggler__circle', {
                        ['toggler__circle--checked']: checked,
                    })}
                />
            </div>

            {!!placeholder && !!id && (
                <label htmlFor={id} className="toggler__label">
                    <Typography element="span" variant="body1">
                        {placeholder}
                    </Typography>
                </label>
            )}
        </div>
    );
});

export default TogglerWrapper;
