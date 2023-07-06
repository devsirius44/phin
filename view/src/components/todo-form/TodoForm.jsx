import { useEffect, useState } from 'react'
import { Box, TextField, Chip, Button } from '@mui/material'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { today, validateCheck } from '../../utils'

export default function TodoForm({id, title, content, createdDate, completed, onSave}) {
  const [uTitle, setUTitle] = useState(title);
  const [uContent, setUContent] = useState(content);
  const [uCompleted, setUCompleted] = useState(completed ?? false);
  const [err, setErr] = useState({});

  useEffect(() => { setUTitle(title) }, [title])
  useEffect(() => { setUContent(content) }, [content])
  useEffect(() => { setUCompleted(completed ?? false) }, [completed])

  const handleSave = () => {
    const data = {
      title: uTitle,
      content: uContent,
      createdDate: createdDate ?? today(),
      completed: uCompleted
    }
    const { isValid, error } = validateCheck(data);
    if (!isValid) {
      setErr(error);
      return;
    }
    if (id) data.id = id;
    onSave(data);
  }

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px'}}>
      { 
        id && <TextField 
          name="id"
          label="ID"
          value={id}
          disabled
        />
      }
      <TextField 
        id="title"
        name="title"
        label="Title"
        value={uTitle}
        error={!!err.title}
        helperText={err.title}
        onChange={(e) => setUTitle(e.target.value)}
      />
      <TextField 
        id="content"
        name="content"
        label="Content"
        multiline
        rows={5}
        error={!!err.content}
        helperText={err.content}
        value={uContent}
        onChange={(e) => setUContent(e.target.value)}
      />
      <TextField 
        name="createdDate"
        label="Created Date"
        value={createdDate ?? today()}
        disabled
      />
      { 
        uCompleted ?
        <Chip label="Completed" color="primary" variant="filled" /> :
        <Chip label="Not Completed" color="warning" variant="filled" />
      }
      <Box>
        <Button sx={{float: 'right', marginLeft: '10px'}} variant="contained" onClick={handleSave}>Save</Button>
        <Button sx={{float: 'right'}} variant="contained" color='secondary' onClick={() => setUCompleted(!uCompleted)}>
          {
            uCompleted ? 
            (<Box  sx={{ display: 'flex', gap: '10px'}}><RemoveCircleOutlineOutlinedIcon /> Restore TODO</Box>) : 
            (<Box  sx={{ display: 'flex', gap: '10px'}}><CheckCircleOutlineOutlinedIcon /> Complete TODO</Box>)
          }
        </Button>
      </Box>
    </Box>
  )
}
