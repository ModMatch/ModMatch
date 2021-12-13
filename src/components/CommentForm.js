import React from 'react';

function CommentForm(props) {
  
  return (
    <form className="Form" onSubmit={props.onSubmit}>
      <input type="text" placeholder="Comment" name='description'
      defaultValue={props.description ? props.description : null } />
      <button type="submit">{props.description ? "Save": "Comment"}</button>
    </form>
  );
  
}

export default CommentForm;
