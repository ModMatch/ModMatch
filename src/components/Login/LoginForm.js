import React, {useState} from 'react';
import Api from '../../Api'
import loginForm from './../../styles/loginForm.module.css';
import  { Link, Navigate, useNavigate } from 'react-router-dom'
import mainCSS from './../../styles/main.module.css';


function LoginForm(props) {
  let navigate = useNavigate();
  return (
    <form className={loginForm.Form} method="post" onSubmit={props.onLoginSubmit}>
      <input type="text" placeholder="Email" name="email" onChange={props.onEmailChange}/>
      <input type="password" placeholder="Password" name="password" onChange={props.onPasswordChange}/>
      <div className={loginForm.buttons}>
        <button className={loginForm.signup} onClick={() => {navigate('/signup')}} type="button">Sign Up</button>
        <button className={loginForm.button} type="submit">Submit</button>
      </div>
    </form>
  );
}

export default LoginForm;
