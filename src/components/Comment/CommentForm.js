import React from 'react';
import { Button, Box, TextField, TextareaAutosize } from '@mui/material';

function CommentForm(props) {
  
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      mt: 2,
      width: 'auto',
      alignContent : "center",
      alignItems: "center",
    }}>
      <Box sx={{ width: '20rem',}}>
    <form className="Form" onSubmit={props.onSubmit}>
      <TextareaAutosize
          name='description'
          placeholder="Comment"
          onChange={props.onEmailChange}
          defaultValue={props.description ? props.description : null }
          minRows={3}
          maxRows={5}
          style={{ width: "20rem" }}
        />
      {/* <input type="text" placeholder="Comment" name='description'
      defaultValue={props.description ? props.description : null } /> */}
      <Button variant="contained" type="submit" 
        style={{maxWidth: '10rem', maxHeight: '3em', minWidth: '5rem', minHeight: '2em', fontSize: '0.7em'}}>
          {props.description ? "Save": "Comment"}</Button>
      {/* <button type="submit">{props.description ? "Save": "Comment"}</button> */} 
    </form>
      </Box>
    </Box>
  );
  
}

export default CommentForm;
