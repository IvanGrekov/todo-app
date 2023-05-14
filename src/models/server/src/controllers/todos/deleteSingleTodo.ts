import todosModel from '../../services/todos-model';
import { TController } from '../../types';

const deleteSingleTodo: TController = (req, res) => {
    const { todoId } = req.params;
    const resultFromModel = todosModel.deleteTodo(todoId);

    res.statusCode = 200;
    res.send(resultFromModel);
};

export default deleteSingleTodo;
