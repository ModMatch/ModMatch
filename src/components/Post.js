import React from 'react';
import { Link } from 'react-router-dom';

function Post(props) {
  return (
    <div data-postid={props.id}>
      <table>
        <tr>
          <Link to={props.posturl}> 
          Title: {props.title}
          </Link>
        </tr>
        <tr>
          Desc: {props.desc} 
        </tr>
        <tr>
          <Link to={props.authorurl}>user: {props.user}</Link>
          date: {props.date}
          <Link to={`/tags/${props.tag}`}>tag: {props.tag}</Link>
        </tr>
      </table>
    </div>
  );
  
}

export default Post;
