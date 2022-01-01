import React, {useState} from 'react';
import {Box, TextField, Checkbox, InputLabel, FormControlLabel, Button } from '@mui/material';


function ProfileEditForm(props) {
  
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
                        label="Surname First?" id="name-order" name="order" onChange={props.onVetChange}/>
      {/* <input id="name-order" type="checkbox" name="order" onChange={props.onOrderChange} defaultChecked={props.currValues.surname_first}/>
      <label htmlFor="name-order">Surname first?</label> */}
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
      <TextField label="Old Password" name="old-password"
                  onChange={props.onOldPasswordChange} 
                  type="password" variant="outlined" />
      </Box>
      <Box sx={{
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
      </Box>
      {/* <input type="text" placeholder="Given Name" name="given-name" onChange={props.onGivenNameChange} defaultValue={props.currValues.given_name}/>
      <input type="text" placeholder="Surname" name="surname" onChange={props.onSurnameChange} defaultValue={props.currValues.surname}/> */}
      {/* <input type="password" name="old-password" onChange={props.onOldPasswordChange}/>
      <input type="password" name="password" onChange={props.onPasswordChange}/>
      <input type="password" name="password-confirmation" onChange={props.onPassword2Change}/> */}
      <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 1,
        }}>
        <Button variant="contained" type="submit">Submit</Button>
      </Box>
      {/* <button type="submit">Submit</button> */}
    </form>
    </Box>
  );
  
}

export default ProfileEditForm;
