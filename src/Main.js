import React, {useEffect, useState} from 'react';
import  { Link, Navigate, useNavigate } from 'react-router-dom'
import LoginForm from './components/Login/LoginForm';
import useAuth from './hooks/useAuth'
import Api from './Api';
import 'fontsource-roboto';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { spacing } from '@mui/system';

const theme = createTheme({
  typography: {
    subtitle1: {
     fontFamily: '"Segoe UI"',

    }
  }
})

function Main() {

  let isAuth = useAuth().auth;
  let navigate = useNavigate();
  
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[errors, setErrors] = useState([]);

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const onLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await Api.post('/login', {email, password});
      localStorage.setItem('Authorization', `bearer ${result.data.token}`)
      setErrors([]);
      navigate('/home');
      navigate(0);
    } catch(err) {
      if (err.response.status == 401) {
        e.target.reset();
        setErrors([err.response.data.message]);
      }
    }

  }

  if (!isAuth) {
    return (
      <ThemeProvider theme={theme}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '10vh' }}
      >
        <Typography variant="h2" color="primary">
          Welcome to ModMatch
        </Typography>
        {errors.map((e)=>{
          return <div>{e}</div>
        })}
        <div>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Login:
          </Typography>

          <Typography>
            <LoginForm onEmailChange={onEmailChange} onPasswordChange={onPasswordChange} onLoginSubmit={onLoginSubmit}/>
          </Typography>
        </div>
      </Grid>
      </ThemeProvider>
    );
  }

  return <Navigate to="/home" />
}

export default Main;
