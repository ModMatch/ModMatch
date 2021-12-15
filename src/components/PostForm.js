import React from 'react';

function PostForm(props) {

  const uneditableOptions = (<div>
    <input id="vetting" type="checkbox" name="vet" onChange={props.onVetChange}/>
    <label htmlFor="vetting">Vetting?</label>
    <input type="number" onChange={props.onSizeChange} min="1" required="true"/>
  </div>);
  
  return (
    <form className="Form" onSubmit={props.onSubmit}>
      <input type="text" placeholder="Title" onChange={props.onTitleChange} defaultValue={props.post ? props.post.title : null }/>
      <input type="text" placeholder="Description" onChange={props.onDescChange} defaultValue={props.post ? props.post.description : null }/>
      {props.post ? null : uneditableOptions}
      <input type="text" placeholder="Module code" onChange={props.onTagChange} defaultValue={props.post ? props.post.tag : null }/>
      <button type="submit">{props.post ? "Save": "Submit"}</button>
    </form>
  );
  
}

export default PostForm;
