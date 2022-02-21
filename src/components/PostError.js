import React from 'react';
import {Typography, Box, Button} from '@mui/material';
import  { useNavigate } from 'react-router-dom'

function PostError() {

  let navigate = useNavigate();

  return (
    <Box  sx={{ display: 'flex', justifyContent: "center", alignItems: "center", minHeight: "90vh", flexDirection: 'column'}}>
      <Typography variant='h4' sx={{m: 2}} color="primary">Oops this page does not exist</Typography>
      <Typography variant='body2'>It might have been deleted</Typography>
      <Button sx={{m: 1}} onClick={() => {navigate('/home')}}>Back Home</Button>
    </Box>
  );
  
}

export default PostError;
