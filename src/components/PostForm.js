import React from 'react';

function PostForm(props) {

  const uneditableOptions = (<div>
    <input id="vetting" type="checkbox" name="vet" onChange={props.onVetChange}/>
    <label htmlFor="vetting">Vetting?</label>
  </div>);

  const vetQuestions = (<div className='questions'>
    <input type="text" name="1"/>
    <button type="button" onClick={props.addQ}>Add</button>
  </div>)
  console.log(props.hack)
  return (
    <form className="Form" onSubmit={props.onSubmit}>
      <input type="text" placeholder="Title" onChange={props.onTitleChange} defaultValue={props.post ? props.post.title : null }/>
      <input type="text" placeholder="Description" onChange={props.onDescChange} defaultValue={props.post ? props.post.description : null }/>
      {props.post ? null : uneditableOptions}
      {props.vet ? vetQuestions : null}
      {!props.vet && !props.post ? <input type="number" onChange={props.onSizeChange} min="1" required="true"/> : null}
      <input id="hackathon" type="checkbox" onChange={props.onHackChange} defaultChecked={props.post? props.post.tag === "HACKATHON" : false }/>
      <label htmlFor="hackathon">Hackathon?</label>
      {props.hack ? null : <input type="text" placeholder="Module code" onChange={props.onTagChange} defaultValue={(props.post && props.post.tag !== "HACKATHON") ? props.post.tag : null }/>}
      <button type="submit">{props.post ? "Save": "Submit"}</button>
    </form>
  );
  
}

export default PostForm;
