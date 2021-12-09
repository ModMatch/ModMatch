import React from 'react';

function LoginForm(props) {

  return (
    <form className="Form" action="/action_page.php" method="post">
      <input type="text" placeholder="Email" name="email"></input>
      <input type="password" name="password"></input>
      <input type="password" name="password-confirmation"></input>
      <button type="submit" onClick={props.onSubmit}>Submit</button>
    </form>
  );
  
}

export default LoginForm;
