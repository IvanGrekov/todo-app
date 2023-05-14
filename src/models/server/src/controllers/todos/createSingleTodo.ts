import todosModel from '../../services/todos-model';
import { TController } from '../../types';
import { sendIncorrectTodoFormatError } from '../../utils/server.utils';

const createSingleTodo: TController = (req, res) => {
    if (!req.body.todo) {
        sendIncorrectTodoFormatError(res, 'create');

        return;
    }

    const resultFromModel = todosModel.createTodo(req.body.todo);

    // NOTE: Created
    res.statusCode = 201;
    res.send(resultFromModel);
};

export default createSingleTodo;
