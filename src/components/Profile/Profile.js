import React, { useState } from 'react';
import Post from '../Post/Post';
import ProfileEditForm from './ProfileEditForm';
import ProfileHeader from './ProfileHeader';
import Api from '../../Api';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Grid } from '@mui/material';

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

  const resetPassword = (e) => {
    setPassword("");
    setPassword2("");
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    if (oldPassword == "") {
      alert("Please enter your password");
    }

    if (password != password2) {
      alert("Passwords do not match");
    }

    try {
      await Api.post('/login', {email:props.user.email, password: oldPassword});
      const result = await Api({
        method: 'put',
        url: props.user.url,
        headers: {
          Authorization: localStorage.getItem("Authorization")
        },
        data: {password: (password || oldPassword), surnameOrder, surname, givenName}
      })
      if (result.data.success) {
        navigate(0);
      } else {
        setErrors(result.data.errors);
      }
    } catch(err) {
      console.log(err.response.status)
      if (err.response.status == 401) {
        setErrors([{msg : "Password is incorrect"}]);
      }
    }
  }
  return (
    <Grid container
      spacing={2}
      justifyContent="flex-start"
      alignItems="center">
      <Grid item xs={0} md={2} xl={3}/>
      <Grid item xs={12} md={8} xl={6} >
        <Typography color="secondary.dark" id="editProfileErrors" align="center">
          {errors.map((e)=>{
            return <div>{e.msg}</div>
          })}
        </Typography >
        {isEdit ? <ProfileEditForm onOldPasswordChange={onOldPasswordChange} onGivenNameChange={onGivenNameChange} onOrderChange={onOrderChange}
        onPasswordChange={onPasswordChange} onPassword2Change={onPassword2Change} onSurnameChange={onSurnameChange}
        onSubmit={onSubmit} resetPassword={resetPassword} currValues={props.user}/> : <ProfileHeader name={props.user.name}/>}
      </Grid>
      <Grid item xs={0} md={2} xl={3}/>
      <Grid item xs={0} md={2} xl={3}/>
      <Grid item xs={12} md={8} xl={6} sx={{textAlign: "center"}}>
        {(props.user._id === props.currid && !isEdit) ? 
        <Button 
          variant="contained" 
          onClick={editProfile}
          id='editProfileButton'
          align="center"
          >Edit
        </Button>
        : null}
      </Grid>
      <Grid item xs={0} md={2} xl={3}/>
      <Grid item xs={0} md={2} xl={3}/>
      <Grid item xs={12} md={8} xl={6}>
      <Typography variant="h4" color="primary" align='center'>
        Posts
      </Typography>
      </Grid>
      <Grid item xs={0} md={2} xl={3}/>
        {props.posts.map(obj=>{
          return (
            <Grid item container>
              <Grid item xs={0} md={2} xl={3}/>
              <Grid item xs={12} md={8} xl={6}>
                <Post key={obj._id} id={obj._id} title={obj.title} desc={obj.description} posturl={obj.url}
                user={obj.author.name} date={obj.formatted_date} tag={obj.tag} authorurl={obj.author.url}/>
              </Grid>
              <Grid item xs={0} md={2} xl={3}/>
            </Grid>)
        })}
    </Grid>
  );
  
}

export default Profile;
