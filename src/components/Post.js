import React from 'react';

function Post(props) {

  return (
    <div data-postid={props.id}>
      <span>
        Title: {props.title} 
        Desc: {props.desc} 
        user: {props.user}
        date: {props.date}
        tag: {props.tag}
      </span>
    </div>
  );
  
}

export default Post;
