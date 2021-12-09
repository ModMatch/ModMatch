import React, {useState} from 'react';
import Api from '../../api'

function SignupForm(props) {

  const[surnameOrder, setOrder] = useState(false);
  const[givenName, setGivenName] = useState("");
  const[surname, setSurname] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[password2, setPassword2] = useState("");

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
    console.log(result.data);
  }


  return (
    <form className="Form" method="post" onSubmit={onSignupSubmit}>
      <input id="name-order" type="checkbox" name="order" onChange={onOrderChange}/>
      <label htmlFor="name-order">Surname first?</label>
      <input type="text" placeholder="Given Name" name="given-name" onChange={onGivenNameChange}/>
      <input type="text" placeholder="Surname" name="surname" onChange={onSurnameChange}/>
      <input type="text" placeholder="Email" name="email" onChange={onEmailChange}/>
      <input type="password" name="password" onChange={onPasswordChange}/>
      <input type="password" name="password-confirmation" onChange={onPassword2Change}/>
      <button type="submit">Submit</button>
    </form>
  );
  
}

export default SignupForm;
