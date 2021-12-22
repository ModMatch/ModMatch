import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardActionArea, CardActions, CardContent, CardHeader, Typography, Button } from '@mui/material';

function SingleGroup(props) {

  const navigate = useNavigate();

  return (
    <Card variant="outlined" sx={{
      maxWidth: 700,
      mx: "auto",
      marginBottom: '1.2em'
    }}>
      <CardHeader 
        sx={{paddingBottom: "0"}}
        title= {<Typography variant="h5" color="text.primary" align='justify'>{props.title}</Typography>}
      />
      <CardContent>
          <Typography variant="body1" color="text.primary" align='justify'>
            {props.desc} 
          </Typography>
          <Typography variant="body1" color="text.primary" align='justify'>
          {props.users.map(u => { return (
            <ul>{u.email}</ul>
          )
          })}
        <Button data-groupid={props.id} onClick={props.onLeaveButClick}>Leave</Button>
          </Typography>
      </CardContent> 
    </Card>
  );
  
}

export default SingleGroup;
