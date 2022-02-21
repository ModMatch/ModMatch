import React from 'react';
import Api from '../../Api';
import { Card, CardActionArea, CardContent, CardHeader, Typography, Link } from '@mui/material';


function Notification(props) {
  
  const readNotif = async () => {
    await Api({
      method: 'put',
      url: `notifications/${props.id}/read`,
      headers: {
        Authorization: localStorage.getItem("Authorization")
      },
      data: {readStatus: true}
    })
  }


  return (
    <Card sx={{width:'100%', backgroundColor: props.readStatus ? "#FFFFFF" : "#EBF8FF"}} elevation={0}>
      <CardActionArea component={Link} href={props.posturl} onClick={props.readStatus ? null: readNotif}>
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
