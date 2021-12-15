import React, { useEffect, useState } from 'react';
import Post from '../Post';
import ProfileEditForm from './ProfileEditForm';
import ProfileHeader from './ProfileHeader';
import Api from '../../Api';
import { useNavigate } from 'react-router-dom';

function Profile(props) {

  const [isEdit, setIsEdit] = useState(false);
  const[errors, setErrors] = useState([]);
  const[surnameOrder, setOrder] = useState(props.user.surname_first);
  const[givenName, setGivenName] = useState(props.user.given_name);
  const[surname, setSurname] = useState(props.user.surname);
  const[oldPassword, setOldPassword] = useState("");
  const[password, setPassword] = useState("");
  const[password2, setPassword2] = useState("");

  const navigate = useNavigate();

  const editProfile = (e)=> {
    setIsEdit(true);
  }

  const onOrderChange = (e) => {
    setOrder(!surnameOrder);
  }

  const onGivenNameChange = (e) => {
    setGivenName(e.target.value);
  }

  const onSurnameChange = (e) => {
    setSurname(e.target.value);
  }

  const onOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const onPassword2Change = (e) => {
    setPassword2(e.target.value);
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password != password2) {
      alert("Passwords do not match");
    }

    await Api.post('/login', {email:props.user.email, password: oldPassword});
    const result = await Api({
      method: 'put',
      url: props.user.url,
      headers: {
        Authorization: localStorage.getItem("Authorization")
      },
      data: {password, surnameOrder, surname, givenName}
    })
    if (result.data.success) {
      navigate(0);
    } else {
      setErrors(result.data.errors);
    }
  }
  return (
    <div>
      <div>
        {isEdit ? <ProfileEditForm onOldPasswordChange={onOldPasswordChange} onGivenNameChange={onGivenNameChange} onOrderChange={onOrderChange}
        onPasswordChange={onPasswordChange} onPassword2Change={onPassword2Change} onSurnameChange={onSurnameChange}
        onSubmit={onSubmit} currValues={props.user}/> : <ProfileHeader name={props.user.name}/>}
      </div>
      <div>
        {errors.map((e)=>{
          return <div>{e.msg}</div>
        })}
        {(props.user._id === props.currid && !isEdit) ? <button onClick={editProfile}>edit</button>: null}
      </div>
      Posts
      <div>
        {props.posts.map(obj=>{
          return (
            <div>
              <Post key={obj._id} id={obj._id} title={obj.title} desc={obj.description} posturl={obj.url}
              user={obj.author.name} date={obj.formatted_date} tag={obj.tag} authorurl={obj.author.url}/>
            </div>)
        })}
      </div>
    </div>
  );
  
}

export default Profile;
