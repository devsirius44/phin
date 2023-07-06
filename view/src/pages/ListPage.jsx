import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Box, Typography, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import { deleteTodo, getTodos, completeTodo, hideCompletedTodos} from '../store/todo/todoSlice'
import TodoList from '../components/todo-list/TodoList'

export default function ListPage() {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todo.todos);
  const [hideCompleted, setHideCompleted] = useState(false);

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch])

  const handleCompleteTodo = (data) => {
    dispatch(completeTodo(data));
  }

  const handleDeleteTodo = (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure to remove this todo?')) {
      dispatch(deleteTodo(id));
    }
  }

  const handleHideCompleteTodos = () => {
    dispatch(hideCompletedTodos(hideCompleted));
    setHideCompleted(!hideCompleted);
  }

  return (
    <Box sx={{padding: '50px', backgroundColor: 'white'}}>
      <Typography variant='h5'>Todo List</Typography>

      <Box sx={{margin: '10px 0', display: 'flex', justifyContent: 'right', gap: '10px'}}>
        <Button color='secondary' variant="outlined" onClick={handleHideCompleteTodos}>
          {
            !hideCompleted ? 
            <>
              <VisibilityOffIcon /> Hide Completed Todos
            </> :
            <>
              <RemoveRedEyeIcon /> Show Completed Todos
            </>
          }
        </Button>
        <Link to='/add' style={{textDecoration: 'none'}}>
          <Button color='primary' variant="outlined" >
            <AddIcon /> Add a TODO
          </Button>
        </Link>
      </Box>

      <TodoList listData={todos} onDelete={handleDeleteTodo} onComplete={handleCompleteTodo}/>
    </Box>
  )
}
