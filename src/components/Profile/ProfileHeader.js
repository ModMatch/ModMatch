import React from 'react';
import { Typography } from '@mui/material';

function ProfileHeader(props) {

  return (
    <div>
      <Typography variant="h2" color="primary" id='profileName' align="center">
        {props.name}
      </Typography>
    </div>
  );
  
}

export default ProfileHeader;
