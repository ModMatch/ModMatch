import React from 'react';
import {CircularProgress, Box} from '@mui/material';

function Loading(props) {

  return (
    <Box  sx={{ display: 'flex', justifyContent: "center", alignItems: "center", minHeight: "90vh" }}>
      <CircularProgress />
    </Box>
  );
  
}

export default Loading;
