import todosModel from '../../services/todos-model';
import { TController } from '../../types';

const deleteSingleTodo: TController = async (req, res) => {
    try {
        const { todoId } = req.params;
        const resultFromModel = await todosModel.deleteTodo(todoId);

        // NOTE: Success
        res.statusCode = 200;
        res.send(resultFromModel);
    } catch {
        res.sendStatus(500);
    }
};

export default deleteSingleTodo;
