import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

//--------------------------------------------------------------------------
const initialState = {
  todos: [],
  selectedTodo: {},
  waiting: false,
  error: {}
}

//--------------------------------------------------------------------------
// Get All the todos
export const getTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get('/api/v1/todo');
  return response.data
})

//--------------------------------------------------------------------------
/**
 * Get a todo
 * @param {} todoId
 */
export const getATodo = createAsyncThunk('todos/getATodo', async (id) => {
  const response = await axios.get(`/api/v1/todo/${id}`);
  return response.data
})

//--------------------------------------------------------------------------
/**
 * Add a todo
 * @param {} data
 */
export const addTodo = createAsyncThunk('todos/addTodo', async (data) => {
  const response = await axios.post('/api/v1/todo', data);
  return response.data
})

//--------------------------------------------------------------------------
/**
 * Update a todo
 * @param {} updateData
 * @param {} id - param
 */
export const updateTodo = createAsyncThunk('todos/updateTodo', async (data) => {
  const response = await axios.put(`/api/v1/todo/${data.id}`, data);
  return response.data
})

//--------------------------------------------------------------------------
/**
 * Delete a todo
 * @param {} todoId
 */
export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  const response = await axios.delete(`/api/v1/todo/${id}`);
  return response.data
})

//--------------------------------------------------------------------------
/**
 * Update a todo
 * @param {} updateData
 * @param {} id - param
 */
export const completeTodo = createAsyncThunk('todos/completeTodo', async (data) => {
  const response = await axios.post(`/api/v1/todo/complete/${data.id}`, { completed: data.completed });
  return response.data
})

//--------------------------------------------------------------------------
/**
 * Update a todo
 * @param {} updateData
 * @param {} id - param
 */
export const hideCompletedTodos = createAsyncThunk('todos/hideCompletedTodos', async (data) => {
  console.log(data);
  const response = await axios.post('/api/v1/todo/hideCompletedTodos', { completed: data });
  return response.data
})


//--------------------------------------------------------------------------

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getTodos.pending, (state, action) => {
        state.waiting = true;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.waiting = false;
        state.todos = action.payload;
      })
      .addCase(getATodo.pending, (state, action) => {
        state.selectedTodo = {};
        state.waiting = true;
      })
      .addCase(getATodo.fulfilled, (state, action) => {
        const {data, error} = action.payload;
        state.waiting = false;
        if (error) {
          state.error = error;
        } else {
          state.selectedTodo = data;
        }
      })
      .addCase(addTodo.pending, (state, action) => {
        state.waiting = true;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        const {data, error} = action.payload;
        state.waiting = false;
        if (error) {
          state.error = error;
        } else {
          state.todos.push(data);
        }
      })
      .addCase(updateTodo.pending, (state, action) => {
        state.waiting = true;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const {data, error} = action.payload;
        state.waiting = false;
        if (error) {
          state.error = error;
        } else {
          state.todos = state.todos.map(todo => todo.id === data.id ? data : todo);
        }
      })
      .addCase(deleteTodo.pending, (state, action) => {
        state.waiting = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        const {data, error} = action.payload;
        state.waiting = false;
        if (error) {
          state.error = error;
        } else {
          state.todos = state.todos.filter(todo => todo.id !== data);
        }
      })
      .addCase(completeTodo.pending, (state, action) => {
        state.waiting = true;
      })
      .addCase(completeTodo.fulfilled, (state, action) => {
        const {data, error} = action.payload;
        state.waiting = false;
        if (error) {
          state.error = error;
        } else {          
          state.todos = state.todos.map(todo => todo.id === data.id ? {
            ...todo,
            completed: data.completed
          } : todo)
        }
      })
      .addCase(hideCompletedTodos.pending, (state, action) => {
        state.waiting = true;
      })
      .addCase(hideCompletedTodos.fulfilled, (state, action) => {
        const {data, error} = action.payload;
        state.waiting = false;
        if (error) {
          state.error = error;
        } else {          
          state.todos = data;
        }
      })
  }
})

export default todoSlice.reducer