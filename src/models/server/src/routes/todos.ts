import express from 'express';

import { TODOS_APP_ENDPOINTS } from '../constants';
import createSingleTodo from '../controllers/todos/createSingleTodo';
import deleteSingleTodo from '../controllers/todos/deleteSingleTodo';
import getSingleTodo from '../controllers/todos/getSingleTodo';
import getTodos from '../controllers/todos/getTodos';
import patchSingleTodo from '../controllers/todos/patchSingleTodo';
import patchTodos from '../controllers/todos/patchTodos';
import updateSingleTodo from '../controllers/todos/updateSingleTodo';
import updateTodos from '../controllers/todos/updateTodos';

const router = express.Router();

router.get(TODOS_APP_ENDPOINTS.todos, getTodos);
router.get(TODOS_APP_ENDPOINTS.todoId, getSingleTodo);
router.post(TODOS_APP_ENDPOINTS.todos, createSingleTodo);
router.patch(TODOS_APP_ENDPOINTS.todoId, patchSingleTodo);
router.put(TODOS_APP_ENDPOINTS.todoId, updateSingleTodo);
router.delete(TODOS_APP_ENDPOINTS.todoId, deleteSingleTodo);
router.patch(TODOS_APP_ENDPOINTS.todos, patchTodos);
router.put(TODOS_APP_ENDPOINTS.todos, updateTodos);

export default router;
