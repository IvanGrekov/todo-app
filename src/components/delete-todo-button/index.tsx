import Button, { IButtonProps } from 'components/button';
import { useApi } from 'hooks/todoApi.hooks';
import { ITodo } from 'models/types/todo';

type TDeleteButtonProps = Pick<IButtonProps, 'variant' | 'textVariant'> & {
    todoId: ITodo['id'];
    todoTitle: ITodo['title'];
};

export default function DeleteTodoButton({
    todoId,
    todoTitle,
    variant,
    textVariant,
}: TDeleteButtonProps): JSX.Element {
    const [deleteTodo] = useApi({ method: 'delete', todoId });

    return (
        <Button
            text="Delete"
            title={`Delete "${todoTitle}" todo`}
            variant={variant}
            textVariant={textVariant}
            onClick={deleteTodo}
        />
    );
}
