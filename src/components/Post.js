import React from 'react';

function Post(props) {

  return (
    <div id={props.id}>
      <span>
        Title: {props.title} 
        Desc: {props.desc} 
        user: {props.user}
      </span>
      {props.currUser === props.user ? <button onClick={props.onDelButClick}>Delete</button> : null}
    </div>
  );
  
}

export default Post;
