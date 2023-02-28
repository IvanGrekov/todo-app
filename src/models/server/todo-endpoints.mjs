import express from 'express';

import { TODOS_APP_ENDPOINTS } from './constants.mjs';
import todosModel from './todos-model.mjs';
import { getServerError } from './utils.mjs';

export default (app) => {
    // NOTE: get all todos
    app.get(TODOS_APP_ENDPOINTS.todos, (_, res) => {
        res.send(todosModel.getTodos());
    });

    // NOTE: get signle todo
    app.get(TODOS_APP_ENDPOINTS.todoId, (req, res) => {
        const { todoId } = req.params;
        const resultFromModel = todosModel.getSignleTodo(todoId);

        if (!resultFromModel) {
            // NOTE: Not found
            res.statusCode = 404;
            res.send(getServerError(`There is no todo with id:${todoId}`));
        } else {
            res.send(resultFromModel);
        }
    });

    // NOTE: create todo
    app.post(TODOS_APP_ENDPOINTS.todos, express.json(), (req, res) => {
        const resultFromModel = todosModel.createTodo(req.body.todo);

        if (!resultFromModel) {
            // NOTE: Bad request
            res.statusCode = 422;
            res.send(getServerError('Incorrect types of provided fields'));
        } else {
            // NOTE: Created
            res.statusCode = 201;
            res.send(resultFromModel);
        }
    });

    // NOTE: delete todo
    app.delete(TODOS_APP_ENDPOINTS.todoId, (req, res) => {
        const { todoId } = req.params;
        const resultFromModel = todosModel.deleteTodo(todoId);

        if (!resultFromModel) {
            // NOTE: Not found
            res.statusCode = 404;
            res.send(getServerError(`There is no todo with id:${todoId}`));
        } else {
            res.statusCode = 200;
            res.send(resultFromModel);
        }
    });

    // NOTE: update todo
    app.put(TODOS_APP_ENDPOINTS.todoId, express.json(), (req, res) => {
        const { todoId } = req.params;

        if (!req.body.todo) {
            // NOTE: Bad request
            res.statusCode = 400;
            res.send(
                getServerError('Please send todo data in format `{ todo: {...} }` to put todo'),
            );

            return;
        }

        const puttingTodo = todosModel.getSignleTodo(todoId);

        if (!puttingTodo) {
            // NOTE: Not found
            res.statusCode = 404;
            res.send(getServerError(`There is no todo with id:${todoId}`));

            return;
        }

        const resultFromModel = todosModel.putTodo({ id: todoId, ...req.body.todo });

        if (!resultFromModel) {
            // NOTE: Bad Request
            res.statusCode = 422;
            res.send(getServerError('Incorrect types of provided fields'));
        } else {
            res.statusCode = 200;
            res.send(resultFromModel);
        }
    });

    // NOTE: modify todo
    app.patch(TODOS_APP_ENDPOINTS.todoId, express.json(), (req, res) => {
        const { todoId } = req.params;

        if (!req.body.todo) {
            // NOTE: Bad request
            res.statusCode = 400;
            res.send(
                getServerError('Please send todo data in format `{ todo: {...} }` to patch todo'),
            );

            return;
        }

        const patchingTodo = todosModel.getSignleTodo(todoId);

        if (!patchingTodo) {
            // NOTE: Not found
            res.statusCode = 404;
            res.send(getServerError(`There is no todo with id:${todoId}`));

            return;
        }

        const resultFromModel = todosModel.patchTodo({ id: todoId, ...req.body.todo });

        if (!resultFromModel) {
            // NOTE: Bad Request
            res.statusCode = 422;
            res.send(getServerError('Incorrect types of provided fields'));
        } else {
            res.statusCode = 200;
            res.send(resultFromModel);
        }
    });

    // NOTE: modify todos
    app.patch(TODOS_APP_ENDPOINTS.todos, express.json(), (req, res) => {
        if (!req.body.todos) {
            // NOTE: Bad request
            res.statusCode = 400;
            res.send(
                getServerError(
                    'Please send todos in format `{ todos: ITodo[] }` to modify several todos, or add todoId param to your url to modify single todo',
                ),
            );

            return;
        }

        if (Array.isArray(req.body.todos) && !req.body.todos.length) {
            // NOTE: Bad request
            res.statusCode = 400;
            res.send(
                getServerError('Please send a not empty array of todos to modify several todos'),
            );

            return;
        }

        for (const todo of req.body.todos) {
            if (!todo?.id) {
                continue;
            }

            const { id } = todo;
            todosModel.patchTodo({ id, ...todo });
        }

        res.statusCode = 200;
        res.send(todosModel.getTodos());
    });

    // NOTE: update todos data
    app.put(TODOS_APP_ENDPOINTS.todos, express.json(), (req, res) => {
        if (!req.body.todos) {
            // NOTE: Bad request
            res.statusCode = 400;
            res.send(
                getServerError(
                    'Please send todos in format `{ todos: ITodo[] }` to update todos data, or add todoId param to your url to update a single todo',
                ),
            );

            return;
        }

        if (Array.isArray(req.body.todos) && !req.body.todos.length) {
            // NOTE: Bad request
            res.statusCode = 400;
            res.send(getServerError('Please send a not empty array of todos to update todos data'));

            return;
        }

        const resultFromModel = todosModel.replaceTodos(req.body.todos);

        if (!resultFromModel) {
            // NOTE: Bad request
            res.statusCode = 400;
            res.send(
                getServerError(
                    'Please provide the array with todos corresponded to todo interface',
                ),
            );
        } else {
            res.statusCode = 200;
            res.send(resultFromModel);
        }
    });
};
