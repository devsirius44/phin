import React from 'react'
import { NavLink } from 'react-router-dom'
import { AppBar, Typography, Button, Toolbar, Box} from '@mui/material'
import letters from '../../config/letters.json'

const Header = () => {
    return (
      <AppBar component="nav" position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            { letters.title.toUpperCase() }
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <NavLink to="/" style={{ textDecoration: 'none' }}><Button sx={{ color: '#fff' }}>Home</Button></NavLink>
            <NavLink to="/list" style={{ textDecoration: 'none' }}><Button sx={{ color: '#fff' }}>List</Button></NavLink>
            <NavLink to="/add" style={{ textDecoration: 'none' }}><Button sx={{ color: '#fff' }}>Add</Button></NavLink>
          </Box>
        </Toolbar>
      </AppBar>
    )
}

export default Header;