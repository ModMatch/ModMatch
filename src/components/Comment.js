import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';

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
    <div data-commentid={props.id}>
      <table>
        <tr>
          <Link to={props.commenterurl}>
          User: {props.commenter}
          </Link>
        </tr>
        <tr>
          {props.desc} 
        </tr>
        <tr>
          date: {props.date}
        </tr>
      </table>
      {props.commenterid == props.curruserid ? (<div>
      <button onClick={props.onCommentDelButClick}>Delete</button>
      <button onClick={onCommentEditButClick}>Edit</button>
      </div>) : null}
 
    </div>
  );
  
}

export default Comment;
