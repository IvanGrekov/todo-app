import TodoItem from 'components/todo-item';
import { useAppSelector } from 'hooks/redux.hooks';
import { selectTodos } from 'models/store/features/todos/todosSlice';
import { ITodo } from 'models/types/todo';

import 'components/todo-list/TodoList.styles.scss';

export default function TodoList(): JSX.Element {
    const todos = useAppSelector(selectTodos);

    return (
        <ul className="todo-list">
            {todos.map((todo: ITodo, i: number) => (
                <li key={todo.id}>
                    <TodoItem todo={todo} index={i + 1} />
                </li>
            ))}
        </ul>
    );
}
