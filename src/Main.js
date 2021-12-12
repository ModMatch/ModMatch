import React, {useEffect, useState} from 'react';
import  { Navigate, useNavigate } from 'react-router-dom'
import SignupForm from './components/Signup/SignupForm';
import LoginForm from './components/Login/LoginForm';
import useAuth from './hooks/useAuth'
import Api from './api';

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
      <div className="Main">
        Welcome to ModMatch
        {errors.map((e)=>{
          return <div>{e}</div>
        })}
        <div>
          login here
          <LoginForm onEmailChange={onEmailChange} onPasswordChange={onPasswordChange} onLoginSubmit={onLoginSubmit}/>
        </div>
        <div>
          signup here
          <SignupForm setErrors={setErrors}/>
        </div>
      </div>
    );
  }

  return <Navigate to="/home" />
}

export default Main;
