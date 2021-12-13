import React from 'react';

function Post(props) {

  return (
    <div data-postid={props.id}>
      <table>
        <tr>
          {props.id ? <a href={`/post/${props.id}`}> 
          Title: {props.title}
          </a>: (<div>Title: {props.title}</div>)}
        </tr>
        <tr>
          Desc: {props.desc} 
        </tr>
        <tr>
          user: {props.user}
          date: {props.date}
          tag: {props.tag}
        </tr>
      </table>
    </div>
  );
  
}

export default Post;
