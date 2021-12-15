import React, {useState} from 'react';

function ProfileEditForm(props) {
  
  return (
    <form className="Form" method="post" onSubmit={props.onSubmit}>
      <input id="name-order" type="checkbox" name="order" onChange={props.onOrderChange} defaultChecked={props.currValues.surname_first}/>
      <label htmlFor="name-order">Surname first?</label>
      <input type="text" placeholder="Given Name" name="given-name" onChange={props.onGivenNameChange} defaultValue={props.currValues.given_name}/>
      <input type="text" placeholder="Surname" name="surname" onChange={props.onSurnameChange} defaultValue={props.currValues.surname}/>
      <input type="password" name="old-password" onChange={props.onOldPasswordChange}/>
      <input type="password" name="password" onChange={props.onPasswordChange}/>
      <input type="password" name="password-confirmation" onChange={props.onPassword2Change}/>
      <button type="submit">Submit</button>
    </form>
  );
  
}

export default ProfileEditForm;
