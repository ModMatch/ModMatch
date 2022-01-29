import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardActionArea, CardActions, CardContent, CardHeader, Typography, Link } from '@mui/material';

function Post(props) {

  return (
    <Card variant="outlined" sx={{width: 'inherit'}} display="block">
      <CardActionArea component={Link} href={props.posturl} sx={{maxWidth: 'inherit'}}>
        <CardHeader 
          title= {<Typography variant="h5" color="text.primary" noWrap>{props.title}</Typography>}
          subheader={
            <div>
              <Link href={props.authorurl} underline="hover">{props.user}</Link>
              {' | '}
              {props.date}
              {' | '}
              <Link href={`/tags/${props.tag}`} underline="hover">{props.tag}</Link>
            </div>}
          sx={{paddingBottom: "0", display: "block", overflow: "hidden"}}
        />
        <CardContent width='inherit'>
            <Typography variant="body1" 
              color="text.primary" 
              sx={{display: "-webkit-box",
                    "-webkit-line-clamp": "5",
                    "-webkit-box-orient": "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",}}>
              {props.desc} 
            </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
  
}

export default Post;
