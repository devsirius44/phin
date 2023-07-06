import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Chip, IconButton  } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';

export default function TodoList({listData, onDelete, onComplete}) {
  const columns = [
    { field: 'no', headerName: 'No', width: 50, sortable: false },
    { field: 'title', headerName: 'Title', width: 150, sortable: false },
    { field: 'content', headerName: 'Content', width: 300, sortable: false },
    {
      field: 'createdDate',
      headerName: 'Created Date',
      type: 'date',
      width: 150,
    },
    {
      field: 'completed',
      headerName: 'Status',
      description: 'This column shows the status of each todo.',
      sortable: false,
      renderCell: (params) => {
        const status = params.row.completed;
        return <Box>
          {
            status ?
            <Chip label="Completed" color="primary" variant="outlined" /> :
            <Chip label="Not Completed" color="warning" variant="outlined" />
          }
        </Box>
      },
      width: 150
    },
    {
      field: 'action',
      headerName: 'Actions',
      description: 'Create, Update, Delete',
      sortable: false,
      width: 150,
      renderCell: (params) => {
        const status = params.row.completed;
        return <Box>
          <Link to={`/update/${params.row.id}`}><IconButton color="primary"> <EditIcon /> </IconButton></Link>
          {
            status ? 
            <IconButton color='warning' onClick={() => onComplete({id: params.row.id, completed: !status})}> <RemoveCircleOutlineOutlinedIcon /> </IconButton> :
            <IconButton color='success' onClick={() => onComplete({id: params.row.id, completed: !status})}> <CheckCircleOutlineIcon /> </IconButton>
          }
          <IconButton color='error' onClick={() => onDelete(params.row.id)}> <DeleteOutlineIcon /> </IconButton>
        </Box>
      }
    }
  ];

  const rows = listData.map((row, index) => ({
    no: index + 1,
    ...row
  }));
  return (
    <Box  style={{ height: 500, width: '100%', margin: '10px 0' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        disableColumnMenu 
      />
    </Box>
  )
}
