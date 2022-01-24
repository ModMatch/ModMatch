import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardActionArea, CardActions, CardContent, CardHeader, Typography, Link } from '@mui/material';

function Post(props) {

  return (
    <Card variant="outlined" sx={{
      maxWidth: "50rem",
      mx: "auto",
      width: "stretch"
    }}>
      <CardActionArea component={Link} href={props.posturl}>
        <CardHeader 
          title= {<Typography variant="h5" color="text.primary" align='justify'>{props.title}</Typography>}
          subheader={<div>
            <Link href={props.authorurl} underline="hover">{props.user}</Link>
            {' | '}
            {props.date}
            {' | '}
            <Link href={`/tags/${props.tag}`} underline="hover">{props.tag}</Link>
            </div>}
          sx={{paddingBottom: "0"}}
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

export default Post;
