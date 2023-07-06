import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate  } from 'react-router-dom'
import { Box, Typography, Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TodoForm from '../components/todo-form/TodoForm'
import { addTodo } from '../store/todo/todoSlice'

export default function AddPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddTodo = (data) => {
    dispatch(addTodo(data)).then(() => {
      navigate('/list');
    });
  }
  return (
    <Box sx={{padding: '50px', backgroundColor: 'white'}}>
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
      <Typography variant='h5'>Add a TODO</Typography>
        <Button onClick={() => navigate('/list')}> <ArrowBackIcon/> Back</Button>
      </Box>
      <TodoForm onSave={handleAddTodo}/>
    </Box>
  )
}
