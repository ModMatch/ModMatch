import React, { useState } from 'react';
import { createSearchParams } from 'react-router-dom';
import { Card, CardActionArea, CardActions, CardContent, CardHeader, Typography, Link } from '@mui/material';

function Notification(props) {

  return (
    <Card sx={{
      maxWidth: 400,
      mx: "auto",
      }}>
      <CardActionArea component={Link} href={props.posturl}>
        <CardHeader 
          sx={{paddingBottom: "0"}}
          title= {<Typography variant="h5" color="text.primary" align='justify'>{props.title}</Typography>}
        />
        <CardContent>
            <Typography variant="body1" color="text.primary" align='justify'>
              {props.desc} 
            </Typography>
        </CardContent>
      </CardActionArea> 
    </Card>
  );
  
}

export default Notification;
