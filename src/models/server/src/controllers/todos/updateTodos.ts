import todosModel from '../../services/todos-model';
import { TController } from '../../types';
import { sendIncorrectTodosFormatError, getServerError } from '../../utils/server.utils';

const updateTodos: TController = (req, res) => {
    if (!req.body.todos) {
        sendIncorrectTodosFormatError(res, 'update');

        return;
    }

    if (!Array.isArray(req.body.todos)) {
        // NOTE: Bad request
        res.statusCode = 400;
        res.send(getServerError('Please send an array of todos to update todos data'));

        return;
    }

    const resultFromModel = todosModel.replaceTodos(req.body.todos);

    res.statusCode = 200;
    res.send(resultFromModel);
};

export default updateTodos;
