import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Api from '../../Api'
import {Box, TextField, Checkbox, InputLabel, FormControlLabel, Button } from '@mui/material';

function SignupForm(props) {
  
  return (
    <Box sx={{
      display: 'flex',
      flexwrap: 'wrap',
      justifyContent: 'center',
      bgcolor: 'background.paper',
      m: 1,
      borderRadius: 1
    }}>
    <form className="Form" method="post" onSubmit={props.onSignupSubmit}>
      <FormControlLabel control={<Checkbox onChange={props.onOrderChange}/>} 
                        label="Surname First?" id="name-order" name="order" onChange={props.onOrderChange}/>
      {/* <input id="name-order" type="checkbox" name="order" onChange={props.onOrderChange}/> */}
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
                  variant="outlined" />
      <TextField label="Surname" name="surname" 
                  onChange={props.onSurnameChange} 
                  variant="outlined" />
      </Box>
      {/* <input type="text" placeholder="Given Name" name="given-name" onChange={props.onGivenNameChange}/>
      <input type="text" placeholder="Surname" name="surname" onChange={props.onSurnameChange}/> */}
      <Box sx={{
      display: 'flex',
      flexwrap: 'wrap',
      justifyContent: 'center',
      mt: 1,
      borderRadius: 1,
      }}>
      <TextField label="Email" name="email"
                  onChange={props.onOldPasswordChange} 
                  onChange={props.onEmailChange} variant="outlined" style ={{width: '100%'}}/>
      </Box>
      {/* <input type="text" placeholder="Email" name="email" onChange={props.onEmailChange}/> */}
      <Box sx={{
      display: 'flex',
      flexwrap: 'wrap',
      justifyContent: 'center',
      mt: 1,
      borderRadius: 1
      }}>
      <TextField label="Password" name="password"
                  onChange={props.onPasswordChange} 
                  type="password" variant="outlined" />
      <TextField label="Confirm Password" name="password-confirmation"
                  onChange={props.onPassword2Change} 
                  type="password" variant="outlined" />
      </Box>
      {/* <input type="password" name="password" onChange={props.onPasswordChange}/>
      <input type="password" name="password-confirmation" onChange={props.onPassword2Change}/> */}
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

export default SignupForm;
