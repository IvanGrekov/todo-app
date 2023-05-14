import { DEFAULT_TODOS } from '../../constants';
import { ITodo, TTodos, TTodoId } from '../../types';
import {
    getNotFoundTodoErrorMessage,
    getIncorrectTodoTypeErrorMessage,
} from '../../utils/errorMessages.utils';
import { generateId, getTodoIndex } from '../../utils/todosModel.utils';

class TodosModel {
    constructor(private todos: TTodos = DEFAULT_TODOS) {}

    public getTodos(): TTodos {
        return this.todos;
    }

    public getSignleTodo(id: string): ITodo {
        const todo = this.todos.find((todo) => todo.id === id);

        if (!todo) {
            throw new Error(getNotFoundTodoErrorMessage(id));
        }

        return todo;
    }

    public createTodo({ title, date, isCompleted }: ITodo): ITodo {
        if (
            typeof title !== 'string' ||
            typeof date !== 'string' ||
            typeof isCompleted !== 'boolean'
        ) {
            throw new Error(getIncorrectTodoTypeErrorMessage());
        }

        const newTodo = {
            id: generateId(),
            title,
            date,
            isCompleted,
        };

        this.todos.push(newTodo);

        return newTodo;
    }

    public deleteTodo(id: TTodoId): ITodo {
        const deletingTodoIndex = getTodoIndex(this.todos, id);

        if (deletingTodoIndex === -1) {
            throw new Error(getNotFoundTodoErrorMessage(id));
        }

        const [deletingTodo] = this.todos.splice(deletingTodoIndex, 1);

        return deletingTodo;
    }

    public updateTodo(updatingTodo: ITodo): ITodo {
        const { id, title, isCompleted, date } = updatingTodo;
        const updatingTodoIndex = getTodoIndex(this.todos, id);

        if (updatingTodoIndex === -1) {
            throw new Error(getNotFoundTodoErrorMessage(id));
        }

        if (
            typeof title !== 'string' ||
            typeof isCompleted !== 'boolean' ||
            typeof date !== 'string'
        ) {
            throw new Error(getIncorrectTodoTypeErrorMessage());
        }

        this.todos[updatingTodoIndex] = {
            id,
            title,
            isCompleted,
            date,
        };

        return this.todos[updatingTodoIndex];
    }

    public patchTodo({ id, title, date, isCompleted }: ITodo): ITodo {
        const patchingTodoIndex = getTodoIndex(this.todos, id);

        if (patchingTodoIndex === -1) {
            throw new Error(getNotFoundTodoErrorMessage(id));
        }

        if (
            typeof title !== 'string' &&
            typeof date !== 'string' &&
            typeof isCompleted !== 'boolean'
        ) {
            throw new Error(getIncorrectTodoTypeErrorMessage());
        }

        const {
            title: currentTitle,
            date: currentDate,
            isCompleted: currentIsCompleted,
        } = this.todos[patchingTodoIndex];

        const truthTitle = title || currentTitle;
        const truthDate = date || currentDate;
        const truthIsCompleted =
            typeof isCompleted === 'boolean' ? isCompleted : currentIsCompleted;

        this.todos[patchingTodoIndex] = {
            id,
            title: truthTitle,
            date: truthDate,
            isCompleted: truthIsCompleted,
        };

        return this.todos[patchingTodoIndex];
    }

    public replaceTodos(newTodos: TTodos): TTodos {
        const truthNewTodos: TTodos = [];

        for (const newTodo of newTodos) {
            const { id, title, date, isCompleted } = newTodo;

            if (
                !['string', 'number'].includes(typeof id) ||
                typeof title !== 'string' ||
                typeof date !== 'string' ||
                typeof isCompleted !== 'boolean'
            ) {
                throw new Error(getIncorrectTodoTypeErrorMessage(id));
            }

            truthNewTodos.push(newTodo);
        }

        this.todos = truthNewTodos;

        return this.todos;
    }
}

export default new TodosModel();
