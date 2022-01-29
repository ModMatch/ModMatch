import React from 'react';
import { Card, CardActionArea, CardActions, CardContent, CardHeader, Typography, Link } from '@mui/material';

function EnlargedPost(props) {

  return (
    <Card variant="outlined" sx={{
      width: "inherit"
    }}>
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
    </Card>
  );
  
}

export default EnlargedPost;
