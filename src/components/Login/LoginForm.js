import React from 'react';
import  { useNavigate } from 'react-router-dom'
import { Button, Box, TextField } from '@mui/material';


function LoginForm(props) {
  let navigate = useNavigate();
  return (
    <form method="post" onSubmit={props.onLoginSubmit}>
      <Box sx={{width: "50%", display: 'flex', flexDirection: "column", height: "auto", gap: "8px"}}>
      <TextField
          id="emailInputField"
          label="Email"
          onChange={props.onEmailChange}
        />
      <TextField
          id="passwordInputField"
          label="Password"
          type="password"
          onChange={props.onPasswordChange}
        />
      <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 1,
          bgcolor: 'background.paper',
        }}>
        <Button onClick={() => {navigate('/signup')}}>Sign Up</Button>
        <Button 
          variant="contained" 
          type="submit"
          id="loginButton"
          >
          Submit
        </Button>
      </Box>
      </Box>
    </form>
  );
}

export default LoginForm;
