import todosModel from '../../services/todos-model';
import { TController } from '../../types';
import { sendIncorrectTodoFormatError } from '../../utils/server.utils';

const updateSingleTodo: TController = (req, res) => {
    if (!req.body.todo) {
        sendIncorrectTodoFormatError(res, 'update');

        return;
    }

    const { todoId } = req.params;
    const resultFromModel = todosModel.updateTodo({ id: todoId, ...req.body.todo });

    res.statusCode = 200;
    res.send(resultFromModel);
};

export default updateSingleTodo;
