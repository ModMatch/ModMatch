import React from 'react';
import Nav from './Nav'
import navModules from '../styles/Nav.module.css';
import { Typography, Box } from '@mui/material';

function Header(props) {

  return (
    <nav className={navModules.header}>
      <Nav profileUrl={`/users/${props.id}`} userid={props.id} username={props.user}/>
      <Box sx={{margin: "5em 0em 0em 2em"}}> 
      </Box>
    </nav>
  );
  
}

export default Header;
