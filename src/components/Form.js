import React from 'react';

function Form(props) {

  return (
    <form className="Form" onSubmit={props.onSubmit}>
      <input type="text" placeholder="Title" onChange={props.onTitleChange}></input>
      <input type="text" placeholder="Description" onChange={props.onDescChange}></input>
      <button type="submit">Submit</button>
    </form>
  );
  
}

export default Form;
