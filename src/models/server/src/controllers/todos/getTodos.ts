import todosModel from '../../services/todos-model';
import { TController } from '../../types';

const getTodos: TController = (_, res) => {
    res.send(todosModel.getTodos());
};

export default getTodos;
