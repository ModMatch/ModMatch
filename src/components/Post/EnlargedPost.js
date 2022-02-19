import React from 'react';
import { Card, CardContent, CardHeader, Typography, Link } from '@mui/material';

function EnlargedPost(props) {

  return (
    <Card variant="outlined" sx={{
      width: "inherit"
    }}>
      <CardHeader 
        title= {
          <Typography variant="h5" 
            color="text.primary" 
            align='justify'
            id='titleText'>
              {props.title}
          </Typography>}
        subheader={<div>
          <Link href={props.authorurl} underline="hover" name="posterName">{props.user}</Link>
          {' | '}
          {props.date}
          {' | '}
          <Link href={`/tags/${props.tag}`} underline="hover" name="tagName">{props.tag}</Link>
          </div>}
        sx={{paddingBottom: "0"}}
      />
      <CardContent>
          <Typography
            variant="body1" 
            color="text.primary" 
            align='justify'
            id='descriptionText'>
            {props.desc} 
          </Typography>
      </CardContent>
    </Card>
  );
  
}

export default EnlargedPost;
