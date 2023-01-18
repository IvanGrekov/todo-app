import Button from 'components/button';
import { useApi } from 'hooks/todoApi.hooks';
import { ITodo } from 'models/types/todo';

interface IDeleteButtonProps {
    todoId: ITodo['id'];
    todoTitle: ITodo['title'];
}

export default function DeleteTodoButton({ todoId, todoTitle }: IDeleteButtonProps): JSX.Element {
    const [deleteTodo] = useApi({ method: 'delete', todoId });

    return <Button text="Delete" title={`Delete "${todoTitle}" todo`} onClick={deleteTodo} />;
}
