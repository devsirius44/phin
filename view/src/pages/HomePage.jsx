import React from 'react'
import ListAltIcon from '@mui/icons-material/ListAlt'
import { Box, Typography } from '@mui/material'
import letters from '../config/letters.json'

export default function HomePage() {
  return (
    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
      <Box sx={{display: 'flex', padding: '50px', gap: '50px', color: '#ccc', maxWidth: '800px'}}>
        <ListAltIcon sx={{fontSize: '150px'}} />
        <Box>
          <Typography variant="h3">{ letters.title }</Typography>
          <Typography variant="h5">{ letters.welcomeMessage }</Typography>
          <Typography variant="p">{ letters.introduction }</Typography>
        </Box>
      </Box>
    </Box>
  )
}
