import todosModel from '../../services/todos-model';
import { TController } from '../../types';
import { sendIncorrectTodoFormatError } from '../../utils/server.utils';

const createSingleTodo: TController = async (req, res) => {
    if (!req.body.todo) {
        sendIncorrectTodoFormatError(res, 'create');

        return;
    }

    try {
        const resultFromModel = await todosModel.createTodo(req.body.todo);

        // NOTE: Created
        res.statusCode = 201;
        res.send(resultFromModel);
    } catch {
        res.sendStatus(500);
    }
};

export default createSingleTodo;
