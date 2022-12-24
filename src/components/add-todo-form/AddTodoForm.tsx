import { FORM_ID } from 'components/add-todo-form/constants';

import 'components/add-todo-form/AddTodoForm.styles.scss';

interface IAddTodoFormProps {
    onSubmit: (...args: any) => void;
    setIsFormDirty: (value: boolean) => void;
}

export default function AddTodoForm({ onSubmit, setIsFormDirty }: IAddTodoFormProps): JSX.Element {
    FORM_ID;
    onSubmit;
    setIsFormDirty;

    return <div>AddTodoForm</div>;
}
