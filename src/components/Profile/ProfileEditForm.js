import React, {useState} from 'react';
import {Box, TextField, Checkbox, InputLabel, FormControlLabel, Button } from '@mui/material';


function ProfileEditForm(props) {

  const [isPasswordEdit, setIsPasswordEdit] = useState(false);
  
  const onPasswordChange = (e) => {
    setIsPasswordEdit(!isPasswordEdit);
    props.resetPassword();
  }

  return (
    <Box sx={{
      display: 'flex',
      flexwrap: 'wrap',
      justifyContent: 'center',
      bgcolor: 'background.paper',
      m: 1,
      borderRadius: 1
    }}>
    <form className="Form" method="post" onSubmit={props.onSubmit}>
      <FormControlLabel control={<Checkbox 
                                  defaultChecked={props.currValues.surname_first} 
                                  onChange={props.onOrderChange}/>} 
                        label="Surname First?" id="name-order" name="order" onChange={props.onOrderChange}/>
      <Box sx={{
      display: 'flex',
      flexwrap: 'wrap',
      justifyContent: 'space-between',
      mt: 1,
      bgcolor: 'background.paper',
      borderRadius: 1
      }}>
      <TextField label="Given Name" name="given-name" 
                  onChange={props.onGivenNameChange} 
                  defaultValue={props.currValues.given_name} variant="outlined" />
      <TextField label="Surname" name="surname" 
                  onChange={props.onSurnameChange} 
                  defaultValue={props.currValues.surname} variant="outlined" />
      </Box>
      <Box sx={{
      display: 'flex',
      flexwrap: 'wrap',
      justifyContent: 'space-between',
      mt: 1,
      borderRadius: 1
      }}>
      <TextField label="Password" name="old-password"
                  onChange={props.onOldPasswordChange} 
                  type="password" variant="outlined" />
      </Box>
      <FormControlLabel control={<Checkbox 
                                  defaultChecked={false} 
                                  onChange={onPasswordChange}/>} 
                        label="Change Password" id="change-password" name="change" onChange={onPasswordChange}/>
      {isPasswordEdit ? <Box sx={{
      display: 'flex',
      flexwrap: 'wrap',
      justifyContent: 'center',
      mt: 1,
      borderRadius: 1
      }}>
      <TextField label="New Password" name="password"
                  onChange={props.onPasswordChange} 
                  type="password" variant="outlined" />
      <TextField label="Confirm New Password" name="password-confirmation"
                  onChange={props.onPassword2Change} 
                  type="password" variant="outlined" />
      </Box> : null}
      <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 1,
        }}>
        <Button variant="contained" type="submit">Submit</Button>
      </Box>
    </form>
    </Box>
  );
  
}

export default ProfileEditForm;
