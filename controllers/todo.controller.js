import {
  getTodosModel,
  getTodoWithIDModel,
  createTodoModel,
  updateTodoModel,
  deleteTodoModel,
  completeTodoModel,
  hideCompletedTodosModel
} from '../models/todo.model.js'

//--------------------------------------------------------------------------
/**
 * Get TODOs
 * @param {*} req 
 * @param {*} res 
 */
export const getTodos = async (req, res) => {
  const data = await getTodosModel();
  res.status(200).json(data);
}

//--------------------------------------------------------------------------
/**
 * Get TODO with ID
 * @param {*} todoId
 */
export const getTodoWithID = async (req, res) => {
  const { todoId }= req.params;
  const data = await getTodoWithIDModel(todoId);
  res.status(200).json(data);
}


//--------------------------------------------------------------------------
/**
 * Create a TODO
 * @param {*} newData
 */
export const createTodo = async (req, res) => {
  const { title, content, createdDate, completed } = req.body;
  const newData = {
    title,
    content,
    createdDate,
    completed,
  }
  console.log(newData);
  const result = await createTodoModel(newData);
  if (result.error) res.status(400).json({error: result.error});
  else res.status(200).json(result);
}


//--------------------------------------------------------------------------
/**
 * Update a TODO
 * @param {*} todoId 
 * @param {*} updateData 
 */
export const updateTodo = async (req, res) => {
  const { todoId } = req.params;
  const updateData = req.body;
  const result = await updateTodoModel(todoId, updateData);
  if (result.error) res.status(400).json({error: result.error});
  else res.status(200).json(result);
}

//--------------------------------------------------------------------------
/**
 * Delete a TODO
 * @param {*} todoId 
 */
export const deleteTodo = async (req, res) => {
  const { todoId } = req.params;
  const result = await deleteTodoModel(todoId);
  if (result.error) res.status(400).json({error: result.error});
  else res.status(200).json(result);
}

//--------------------------------------------------------------------------
/**
 * Complete a TODO
 * @param {*} todoId 
 * @param {*} completed
 */
export const completeTodo = async (req, res) => {
  const { todoId } = req.params;
  const { completed } = req.body;
  const result = await completeTodoModel(todoId, completed);
  if (result.error) res.status(400).json({error: result.error});
  else res.status(200).json(result);
}

//--------------------------------------------------------------------------
// Hide completed todos
export const hideCompletedTodos = async (req, res) => {
  const { completed } = req.body;
  const result = await hideCompletedTodosModel(completed);
  if (result.error) res.status(400).json({error: result.error});
  else res.status(200).json(result);
}

//--------------------------------------------------------------------------
