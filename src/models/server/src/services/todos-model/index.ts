import { Model } from 'sequelize';

import { ITodo, TTodos, TTodoId } from '../../types';
import { getIncorrectTodoTypeErrorMessage } from '../../utils/errorMessages.utils';
import TodoModel from '../todos-db';

class TodosModel {
    private async updateTodoQuery({
        id,
        title,
        description,
        date,
        completed,
    }: ITodo): Promise<void> {
        await TodoModel.update(
            { title, description, completed, date },
            {
                where: {
                    id,
                },
            },
        );
    }

    private async insertTodoQuery({
        id,
        title,
        description,
        date,
        completed,
    }: ITodo): Promise<void> {
        await TodoModel.create({ id, title, description, date, completed });
    }

    public async getTodos(): Promise<Model<ITodo>[]> {
        try {
            const todos = await TodoModel.findAll();

            return todos;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    public async getSingleTodo(id: TTodoId): Promise<Model<ITodo>> {
        try {
            const todo = await TodoModel.findOne({
                where: {
                    id,
                },
            });

            if (!todo) {
                throw new Error(`Todo with id ${id} not found`);
            }

            return todo;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    public async createTodo({ id, title, description, date, completed }: ITodo): Promise<void> {
        if (
            typeof title !== 'string' ||
            typeof description !== 'string' ||
            typeof date !== 'string' ||
            typeof completed !== 'boolean'
        ) {
            throw new Error(getIncorrectTodoTypeErrorMessage());
        }

        try {
            await this.insertTodoQuery({ id, title, description, date, completed });
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    public async deleteTodo(id: TTodoId): Promise<void> {
        try {
            await TodoModel.destroy({
                where: {
                    id,
                },
            });
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    public async updateTodo(updatingTodo: ITodo): Promise<void> {
        const { title, description, date, completed } = updatingTodo;

        if (
            typeof title !== 'string' ||
            typeof description !== 'string' ||
            typeof completed !== 'boolean' ||
            typeof date !== 'string'
        ) {
            throw new Error(getIncorrectTodoTypeErrorMessage());
        }

        try {
            await this.updateTodoQuery(updatingTodo);
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    public async patchTodo(patchingTodo: ITodo): Promise<void> {
        const { title, description, date, completed } = patchingTodo;

        if (
            typeof title !== 'string' &&
            typeof description !== 'string' &&
            typeof date !== 'string' &&
            typeof completed !== 'boolean'
        ) {
            throw new Error(getIncorrectTodoTypeErrorMessage());
        }

        try {
            await this.updateTodoQuery(patchingTodo);
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    public async replaceTodos(newTodos: TTodos): Promise<void> {
        try {
            await TodoModel.destroy({
                where: {},
            });

            for (const newTodo of newTodos) {
                const { id, title, description, date, completed } = newTodo;

                if (
                    !['string', 'number'].includes(typeof id) ||
                    typeof title !== 'string' ||
                    typeof description !== 'string' ||
                    typeof date !== 'string' ||
                    typeof completed !== 'boolean'
                ) {
                    throw new Error(getIncorrectTodoTypeErrorMessage(id));
                }

                await this.insertTodoQuery({ id, title, description, date, completed });
            }
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }
}

export default new TodosModel();
