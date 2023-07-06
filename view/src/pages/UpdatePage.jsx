import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Button, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TodoForm from '../components/todo-form/TodoForm'
import { updateTodo, getATodo } from '../store/todo/todoSlice'

export default function UpdatePage() {
  const { todoId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector(state => state.todo.selectedTodo);

  useEffect(() => {
    dispatch(getATodo(todoId));
  }, [dispatch, todoId]);
  
  const handleUpdateTodo = (data) => {
    dispatch(updateTodo(data))
      .then(() => navigate('/list'));
  }

  return (
    <Box sx={{padding: '50px', backgroundColor: 'white'}}>
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Typography variant='h5'>Update the TODO</Typography>
        <Button onClick={() => navigate('/list')}> <ArrowBackIcon/> Back</Button>
      </Box>
      <TodoForm {...data} onSave={handleUpdateTodo}/>
    </Box>
  )
}
