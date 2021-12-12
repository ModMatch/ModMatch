import React from 'react';

function Form(props) {
  
  return (
    <form className="Form" onSubmit={props.onSubmit}>
      <input type="text" placeholder="Title" onChange={props.onTitleChange} defaultValue={props.post ? props.post.title : null }></input>
      <input type="text" placeholder="Description" onChange={props.onDescChange} defaultValue={props.post ? props.post.description : null }></input>
      <input type="text" placeholder="Module code" onChange={props.onTagChange} defaultValue={props.post ? props.post.tag : null }></input>
      <button type="submit">{props.post ? "Save": "Submit"}</button>
    </form>
  );
  
}

export default Form;
