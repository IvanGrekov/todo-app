import fs from 'fs';
import path from 'path';

import { ITodo, TTodos, TTodoId } from '../../types';
import {
    getNotFoundTodoErrorMessage,
    getIncorrectTodoTypeErrorMessage,
} from '../../utils/errorMessages.utils';
import { generateId, getTodoIndex } from '../../utils/todosModel.utils';

const todosFilePath = path.resolve(__dirname, '../../../../../../todos.json');

class TodosModel {
    private getTodosData(): Promise<TTodos> {
        return new Promise((resolve, reject) => {
            fs.readFile(todosFilePath, (err: any, data: any) => {
                if (err) {
                    reject(err);
                }

                const todos = JSON.parse(data);
                resolve(todos);
            });
        });
    }

    private writeTodosData(newTodos: TTodos): Promise<any> {
        return new Promise((resolve, reject) => {
            const newTodosJSON = JSON.stringify(newTodos, null, 4);

            fs.writeFile(todosFilePath, newTodosJSON, (err) => {
                if (err) {
                    reject(err);
                }

                resolve('Todos updated');
            });
        });
    }

    public async getTodos(): Promise<TTodos> {
        const todos = await this.getTodosData();

        return todos;
    }

    public async getSingleTodo(id: string): Promise<ITodo> {
        const todos = await this.getTodosData();
        const todo = todos.find((todo) => todo.id === id);

        if (!todo) {
            throw new Error(getNotFoundTodoErrorMessage(id));
        }

        return todo;
    }

    public async createTodo({ title, description, date, isCompleted }: ITodo): Promise<ITodo> {
        if (
            typeof title !== 'string' ||
            typeof description !== 'string' ||
            typeof date !== 'string' ||
            typeof isCompleted !== 'boolean'
        ) {
            throw new Error(getIncorrectTodoTypeErrorMessage());
        }

        const newTodo = {
            id: generateId(),
            title,
            description,
            date,
            isCompleted,
        };
        const todos = [...(await this.getTodosData())];
        todos.push(newTodo);
        await this.writeTodosData(todos);

        return newTodo;
    }

    public async deleteTodo(id: TTodoId): Promise<ITodo> {
        const todos = [...(await this.getTodosData())];
        const deletingTodoIndex = getTodoIndex(todos, id);

        if (deletingTodoIndex === -1) {
            throw new Error(getNotFoundTodoErrorMessage(id));
        }

        const [deletingTodo] = todos.splice(deletingTodoIndex, 1);
        await this.writeTodosData(todos);

        return deletingTodo;
    }

    public async updateTodo(updatingTodo: ITodo): Promise<ITodo> {
        const { id, title, description, isCompleted, date } = updatingTodo;
        const todos = [...(await this.getTodosData())];
        const updatingTodoIndex = getTodoIndex(todos, id);

        if (updatingTodoIndex === -1) {
            throw new Error(getNotFoundTodoErrorMessage(id));
        }

        if (
            typeof title !== 'string' ||
            typeof description !== 'string' ||
            typeof isCompleted !== 'boolean' ||
            typeof date !== 'string'
        ) {
            throw new Error(getIncorrectTodoTypeErrorMessage());
        }

        todos[updatingTodoIndex] = {
            id,
            title,
            description,
            isCompleted,
            date,
        };
        await this.writeTodosData(todos);

        return todos[updatingTodoIndex];
    }

    public async patchTodo({ id, title, description, date, isCompleted }: ITodo): Promise<ITodo> {
        const todos = [...(await this.getTodosData())];
        const patchingTodoIndex = getTodoIndex(todos, id);

        if (patchingTodoIndex === -1) {
            throw new Error(getNotFoundTodoErrorMessage(id));
        }

        if (
            typeof title !== 'string' &&
            typeof description !== 'string' &&
            typeof date !== 'string' &&
            typeof isCompleted !== 'boolean'
        ) {
            throw new Error(getIncorrectTodoTypeErrorMessage());
        }

        const {
            title: currentTitle,
            description: currentDescription,
            date: currentDate,
            isCompleted: currentIsCompleted,
        } = todos[patchingTodoIndex];

        const truthTitle = title || currentTitle;
        const truthDescription = description || currentDescription;
        const truthDate = date || currentDate;
        const truthIsCompleted =
            typeof isCompleted === 'boolean' ? isCompleted : currentIsCompleted;

        todos[patchingTodoIndex] = {
            id,
            title: truthTitle,
            description: truthDescription,
            date: truthDate,
            isCompleted: truthIsCompleted,
        };
        await this.writeTodosData(todos);

        return todos[patchingTodoIndex];
    }

    public async replaceTodos(newTodos: TTodos): Promise<TTodos> {
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

        await this.writeTodosData(truthNewTodos);
        const todos = [...(await this.getTodosData())];

        return todos;
    }
}

export default new TodosModel();
