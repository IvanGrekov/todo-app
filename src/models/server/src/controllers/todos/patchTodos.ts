import todosModel from '../../services/todos-model';
import { TController } from '../../types';
import {
    sendIncorrectTodosFormatError,
    getServerError,
    sendIncorrectTypeError,
} from '../../utils/server.utils';

const patchTodos: TController = (req, res) => {
    if (!req.body.todos) {
        sendIncorrectTodosFormatError(res, 'patch');

        return;
    }

    if (Array.isArray(req.body.todos) && !req.body.todos.length) {
        // NOTE: Bad request
        res.statusCode = 400;
        res.send(getServerError('Please send a not empty array of todos to modify several todos'));

        return;
    }

    for (const todo of req.body.todos) {
        const { id } = todo;

        if (!id) {
            sendIncorrectTypeError(res);

            return;
        }

        todosModel.patchTodo({ id, ...todo });
    }

    res.statusCode = 200;
    res.send(todosModel.getTodos());
};

export default patchTodos;
