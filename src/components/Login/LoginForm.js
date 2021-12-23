import React, {useState} from 'react';
import Api from '../../Api'
import loginForm from './../../styles/loginForm.module.css';
import  { Link, Navigate, useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import { Button, Box } from '@mui/material';


function LoginForm(props) {
  let navigate = useNavigate();
  return (
    <form className={loginForm.Form} method="post" onSubmit={props.onLoginSubmit}>
      {/* <input type="text" placeholder="Email" name="email" onChange={props.onEmailChange}/> */}
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
    </form>
  );
}

export default LoginForm;
