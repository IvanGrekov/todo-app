import todosModel from '../../services/todos-model';
import { TController } from '../../types';
import { sendIncorrectTodoFormatError } from '../../utils/server.utils';

const patchSingleTodo: TController = async (req, res) => {
    if (!req.body.todo) {
        sendIncorrectTodoFormatError(res, 'patch');

        return;
    }

    try {
        const { todoId } = req.params;
        const resultFromModel = await todosModel.patchTodo({ id: todoId, ...req.body.todo });

        // NOTE: Success
        res.statusCode = 200;
        res.send(resultFromModel);
    } catch {
        res.sendStatus(500);
    }
};

export default patchSingleTodo;
