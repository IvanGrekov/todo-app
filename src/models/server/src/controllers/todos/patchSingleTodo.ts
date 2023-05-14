import todosModel from '../../services/todos-model';
import { TController } from '../../types';
import { sendIncorrectTodoFormatError } from '../../utils/server.utils';

const patchSingleTodo: TController = (req, res) => {
    if (!req.body.todo) {
        sendIncorrectTodoFormatError(res, 'patch');

        return;
    }

    const { todoId } = req.params;
    const resultFromModel = todosModel.patchTodo({ id: todoId, ...req.body.todo });

    res.statusCode = 200;
    res.send(resultFromModel);
};

export default patchSingleTodo;
