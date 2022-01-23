import React, {useState} from 'react';
import Api from '../../Api'
import  { Link, Navigate, useNavigate } from 'react-router-dom'
import { Button, Box, TextField } from '@mui/material';


function LoginForm(props) {
  let navigate = useNavigate();
  return (
    <form method="post" onSubmit={props.onLoginSubmit}>
      {/* <input type="text" placeholder="Email" name="email" onChange={props.onEmailChange}/> */}
      <Box sx={{width: "50%", display: 'flex', flexDirection: "column", height: "auto", gap: "8px"}}>
      <TextField
          id="outlined-required"
          label="Email"
          onChange={props.onEmailChange}
        />
      <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={props.onPasswordChange}
        />
      <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 1,
          bgcolor: 'background.paper',
        }}>
        <Button onClick={() => {navigate('/signup')}}>Sign Up</Button>
        <Button variant="contained" type="submit">Submit</Button>
      </Box>
      </Box>
    </form>
  );
}

export default LoginForm;
