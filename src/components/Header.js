import React from 'react';
import Nav from './Nav'
import '../styles/Header.css'
import navModules from '../styles/Nav.module.css';
import { Typography, Box } from '@mui/material';

function Header(props) {

  return (
    <nav className={navModules.header}>
      <Nav profileUrl={`/users/${props.id}`} userid={props.id}/>
      <Box sx={{margin: "5em 0em 0em 2em"}}> 
        <Typography variant="h5">
          Hello, {props.user}
        </Typography>
      </Box>
    </nav>
  );
  
}

export default Header;
