import todosModel from '../../services/todos-model';
import { TController } from '../../types';

const getSingleTodo: TController = (req, res) => {
    const { todoId } = req.params;
    const resultFromModel = todosModel.getSignleTodo(todoId);

    res.send(resultFromModel);
};

export default getSingleTodo;
