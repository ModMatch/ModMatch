import React from 'react';
import { Button, Box, TextField, TextareaAutosize } from '@mui/material';

function CommentForm(props) {
  
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      mt: 1,
      width: '1em',
    }}>
    <form className="Form" onSubmit={props.onSubmit}>
      <TextareaAutosize
          name='description'
          placeholder="Comment"
          onChange={props.onEmailChange}
          defaultValue={props.description ? props.description : null }
          minRows={3}
          maxRows={5}
        />
      {/* <input type="text" placeholder="Comment" name='description'
      defaultValue={props.description ? props.description : null } /> */}
      <Button variant="contained" type="submit" 
        style={{maxWidth: '10rem', maxHeight: '3em', minWidth: '5rem', minHeight: '2em', fontSize: '0.7em'}}>
          {props.description ? "Save": "Comment"}</Button>
      {/* <button type="submit">{props.description ? "Save": "Comment"}</button> */}
    </form>
    </Box>
  );
  
}

export default CommentForm;
