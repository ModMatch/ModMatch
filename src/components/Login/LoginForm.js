import React, {useState} from 'react';
import Api from '../../api'

function LoginForm(props) {

  return (
    <form className="Form" method="post" onSubmit={props.onLoginSubmit}>
      <input type="text" placeholder="Email" name="email" onChange={props.onEmailChange}/>
      <input type="password" name="password" onChange={props.onPasswordChange}/>
      <button type="submit">Submit</button>
    </form>
  );
}

export default LoginForm;
