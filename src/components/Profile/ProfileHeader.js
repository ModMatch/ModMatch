import React from 'react';
import { Typography } from '@mui/material';

function ProfileHeader(props) {

  return (
    <div>
      <Typography variant="h2" color="primary">
        {props.name}
      </Typography>
      {/* <h1>{props.name}</h1> */}
    </div>
  );
  
}

export default ProfileHeader;
