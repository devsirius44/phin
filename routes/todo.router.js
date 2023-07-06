import express from 'express';
import {
  getTodos,
  getTodoWithID,
  createTodo,
  updateTodo,
  deleteTodo,
  completeTodo,
  hideCompletedTodos
} from '../controllers/todo.controller.js';
const router = express.Router();

//--------------------------------------------------------------------------
/**
 * Get All Todos 
 * @param {*} method : get 
 */
router.get('/', getTodos);

//--------------------------------------------------------------------------
/**
 * Get One Todo with Todo ID
 * @param {*} method : get 
 */
router.get('/:todoId', getTodoWithID);

//--------------------------------------------------------------------------
/**
 * Create Todos
 * @param {*} method : post 
 */
router.post('/', createTodo);

//--------------------------------------------------------------------------
/**
 * Update Todo
 * @param {*} method : put 
 */
router.put('/:todoId', updateTodo);

//--------------------------------------------------------------------------
/**
 * Delete one Todo with Todo ID
 * @param {*} method : delete 
 */
router.delete('/:todoId', deleteTodo);

//--------------------------------------------------------------------------
/**
 * Complete one Todo with Todo ID
 * @param {*} method : post 
 */
router.post('/complete/:todoId', completeTodo);

//--------------------------------------------------------------------------
/**
 * Hide completed Todos
 * @param {*} method : post 
 */
router.post('/hideCompletedTodos', hideCompletedTodos);

//--------------------------------------------------------------------------

export {
  router
};