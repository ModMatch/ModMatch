import React from 'react';
import { Card, CardActionArea, CardContent, CardHeader, Typography, Link } from '@mui/material';


function Notification(props) {
  
  return (
    <Card sx={{width:'100%'}} elevation={0} >
      <CardActionArea component={Link} href={props.posturl}>
        <CardHeader 
          sx={{
            display: "flex",
            overflow: "hidden",
            "& .MuiCardHeader-content": {
              overflow: "hidden"
            },
            paddingBottom: "0"
          }}
          title= {<Typography color="text.primary" noWrap fontSize="1rem">{props.title}</Typography>}
        />
        <CardContent>
            <Typography color="text.primary" align='justify' fontSize="0.8rem">
              {props.desc} 
            </Typography>
        </CardContent>
      </CardActionArea> 
    </Card>
  );
  
}

export default Notification;
