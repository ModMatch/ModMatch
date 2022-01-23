import React, {useEffect, useState} from 'react';
import  { Navigate, useNavigate } from 'react-router-dom'
import SignupForm from './components/Signup/SignupForm';
import Api from './Api';
import {Typography, createTheme, ThemeProvider} from '@mui/material';

function Signup() {

  const[errors, setErrors] = useState([]);
  const[surnameOrder, setOrder] = useState(false);
  const[givenName, setGivenName] = useState("");
  const[surname, setSurname] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[password2, setPassword2] = useState("");

  const navigate = useNavigate();

  const onOrderChange = (e) => {
    setOrder(!surnameOrder);
  }

  const onGivenNameChange = (e) => {
    setGivenName(e.target.value);
  }

  const onSurnameChange = (e) => {
    setSurname(e.target.value);
  }

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const onPassword2Change = (e) => {
    setPassword2(e.target.value);
  }

  const onSignupSubmit = async (e) => {
    e.preventDefault();

    if (password != password2) {
      alert("Passwords do not match");
    }

    const result = await Api.post('/signup', {email, password, surnameOrder, surname, givenName});
    if (result.data.success) {
      //const login = await Api.post('/login', {email, password});
      //localStorage.setItem('Authorization', `bearer ${login.data.token}`)
      navigate('/');
      //navigate(0);
    } else {
      setErrors(result.data.errors)
    }
  }
  
  const theme = createTheme({
    palette: {
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
      }
    },
  });

  return (
    <div className="Main">
      <Typography variant="h2" align='center'>
          Sign Up for ModMatch
      </Typography>
      <ThemeProvider theme={theme}>
      <Typography color="secondary.dark" align='center'>
      {errors.map((e)=>{
        return <div>{e.msg}</div>
      })}
      </Typography>
      </ThemeProvider>
      <div>
        <div>
        {/* <Typography variant="h5" color="primary" align='center'>
          Sign Up Here
        </Typography> */}
        {/* <h1>{props.name}</h1> */}
        </div>
        <SignupForm onEmailChange={onEmailChange} onGivenNameChange={onGivenNameChange} onOrderChange={onOrderChange}
        onPasswordChange={onPasswordChange} onPassword2Change={onPassword2Change} onSurnameChange={onSurnameChange}
        onSignupSubmit={onSignupSubmit}/>
      </div>
    </div>
  );
}

export default Signup;
