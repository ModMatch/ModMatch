import React from 'react';
import { Button, Box, TextField } from '@mui/material';

function CommentForm(props) {
  
  return (
    <Box sx ={{width:'inherit'}}>
    <form className="Form" onSubmit={props.onSubmit} 
      data-commentid={props.commentId} 
    >
      <TextField
          label="Comment"
          name='description'
          multiline
          rows={2}
          sx ={{width:'stretch'}}
          placeholder="Comment"
          defaultValue={props.description ? props.description : null }
        />
      <Button type="submit" sx={{float: "right"}}>
          {props.description ? "Save": "Comment"}</Button>
    </form>
    </Box>
  );
  
}

export default CommentForm;
