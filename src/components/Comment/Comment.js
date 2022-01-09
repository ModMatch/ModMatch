import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import { Button, Box, Link, Typography } from '@mui/material';

function Comment(props) {

  const[edit, setEdit] = useState(false);

  const onCommentEditButClick = (e) => {
    setEdit(true);
  }

  if (edit) {
    return (<div data-commentid={props.id}>
      <CommentForm onSubmit={props.onCommentSaveButClick} description={props.desc}/>
    </div>);
  }
  return (
    <Typography>
    <Box sx={{display: 'grid', alignItems: 'center', justifyContent: "center"}}>
    <div data-commentid={props.id}>
      <Box sx={{
          display: 'grid',
          justifyContent: 'space-between',
          mt: 1,
          bgcolor: 'background.paper',
          width : '20em',
          minheight : '5em',
          borderRadius: 5,
          border: 1,
          m: 1, p: 1,
        }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 1,
            width : '20em'
          }}>
          <Link href={props.commenterurl} underline="hover">
           User: {props.commenter}
          </Link>
          </Box>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 1, pt:1, 
            width : '20em',
            borderTop: 1,
          }}>
          {props.desc} 
          </Box>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 1, pt:1, 
            width : '20em',
            borderTop: 1,
          }}>
          date: {props.date}
          </Box>
      </Box>
      {props.commenterid == props.curruserid ? (<Box sx={{m:1, p:1}}>
      <Button variant="contained" onClick={props.onCommentDelButClick}
        style={{maxWidth: '10rem', maxHeight: '3em', minWidth: '5rem', minHeight: '2em', fontSize: '0.7em'}}>
          Delete</Button>
      {/* <button onClick={props.onCommentDelButClick}>Delete</button> */}
      <Button variant="contained" onClick={onCommentEditButClick}
        style={{maxWidth: '10rem', maxHeight: '3em', minWidth: '5rem', minHeight: '2em', fontSize: '0.7em'}}>
          Edit</Button>
      {/* <button onClick={onCommentEditButClick}>Edit</button> */}
      </Box>) : null}
 
    </div>
    </Box>
    </Typography>
  );
  
}

export default Comment;
