import todosModel from '../../services/todos-model';
import { TController } from '../../types';
import { sendIncorrectTodoFormatError } from '../../utils/server.utils';

const updateSingleTodo: TController = async (req, res) => {
    if (!req.body.todo) {
        sendIncorrectTodoFormatError(res, 'update');

        return;
    }

    try {
        const { todoId } = req.params;
        await todosModel.updateTodo({ id: todoId, ...req.body.todo });
        const resultFromModel = await todosModel.getSingleTodo(todoId);

        // NOTE: Success
        res.statusCode = 200;
        res.send(resultFromModel);
    } catch {
        res.sendStatus(500);
    }
};

export default updateSingleTodo;
