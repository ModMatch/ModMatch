import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Api from '../../Api'

function SignupForm(props) {
  
  return (
    <form className="Form" method="post" onSubmit={props.onSignupSubmit}>
      <input id="name-order" type="checkbox" name="order" onChange={props.onOrderChange}/>
      <label htmlFor="name-order">Surname first?</label>
      <input type="text" placeholder="Given Name" name="given-name" onChange={props.onGivenNameChange}/>
      <input type="text" placeholder="Surname" name="surname" onChange={props.onSurnameChange}/>
      <input type="text" placeholder="Email" name="email" onChange={props.onEmailChange}/>
      <input type="password" name="password" onChange={props.onPasswordChange}/>
      <input type="password" name="password-confirmation" onChange={props.onPassword2Change}/>
      <button type="submit">Submit</button>
    </form>
  );
  
}

export default SignupForm;
