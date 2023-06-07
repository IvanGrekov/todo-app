import { ITodo, TTodos, TTodoId } from '../../types';
import { getIncorrectTodoTypeErrorMessage } from '../../utils/errorMessages.utils';
import client from '../todos-db';

class TodosModel {
    private async updateTodoQuery({
        id,
        title,
        description,
        date,
        completed,
    }: ITodo): Promise<void> {
        await client.query(
            `
                UPDATE todos
                SET title=$2, description=$3, completed=$4, date=$5
                WHERE id=$1
            `,
            [id, title, description, completed, date],
        );
    }

    public async getTodos(): Promise<TTodos> {
        try {
            const query = await client.query(`
                SELECT *
                FROM todos
                ORDER BY created_at
            `);

            return query.rows;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    public async getSingleTodo(id: TTodoId): Promise<ITodo> {
        try {
            const query = await client.query(
                `
                    SELECT *
                    FROM todos
                    WHERE id=$1
                `,
                [id],
            );

            return query.rows[0];
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
            await client.query(
                `
                    INSERT INTO todos(id, title, description, date, completed)
                    VALUES($1, $2, $3, $4, $5)
                `,
                [id, title, description, date, completed],
            );
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    public async deleteTodo(id: TTodoId): Promise<void> {
        try {
            await client.query(
                `
                    DELETE FROM todos
                    WHERE id=$1
                `,
                [id],
            );
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
            await client.query('DELETE FROM todos');

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

                await client.query(
                    `
                        INSERT INTO todos(id, title, description, date, completed)
                        VALUES($1, $2, $3, $4, $5)
                    `,
                    [id, title, description, date, completed],
                );
            }
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }
}

export default new TodosModel();
