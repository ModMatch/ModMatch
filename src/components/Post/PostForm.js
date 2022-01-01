import React from 'react';
import { Box, TextField, Checkbox, InputLabel, FormControlLabel, Button } from '@mui/material';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Checkbox from '@mui/material/Checkbox';
// import InputLabel from '@mui/material/InputLabel';


function PostForm(props) {

  const uneditableOptions = (<div>
    {/* <input id="vetting" type="checkbox" name="vet" onChange={props.onVetChange}/> */}
    <FormControlLabel control={<Checkbox onChange={props.onVetChange}/>} label="Vetting?" id="vetting" name="vetting" onChange={props.onVetChange}/>
    {/* <InputLabel htmlFor="vetting">Vetting?</InputLabel> */}
    {/* <label htmlFor="vetting">Vetting?</label> */}
  </div>);

  const vetQuestions = (<div className='questions'>
    {/* <input type="text" name="1"/> */}
    <TextField label="Questions to Ask" variant="outlined" />
    <Button variant="contained" onClick={props.addQ}>Add Question</Button>
    {/* <button type="button" onClick={props.addQ}>Add</button> */}
  </div>)
  console.log(props.hack)
  return (
    // <form className="Form" onSubmit={props.onSubmit}>
    //   <input type="text" placeholder="Title" onChange={props.onTitleChange} defaultValue={props.post ? props.post.title : null }/>
    //   <input type="text" placeholder="Description" onChange={props.onDescChange} defaultValue={props.post ? props.post.description : null }/>
    //   {props.post ? null : uneditableOptions}
    //   {props.vet ? vetQuestions : null}
    //   {!props.vet && !props.post ? <input type="number" onChange={props.onSizeChange} min="1" required="true"/> : null}
    //   <input id="hackathon" type="checkbox" onChange={props.onHackChange} defaultChecked={props.post? props.post.tag === "HACKATHON" : false }/>
    //   <label htmlFor="hackathon">Hackathon?</label>
    //   {props.hack ? null : <input type="text" placeholder="Module code" onChange={props.onTagChange} defaultValue={(props.post && props.post.tag !== "HACKATHON") ? props.post.tag : null }/>}
    //   <button type="submit">{props.post ? "Save": "Submit"}</button>
    // </form>
    // <form className="Form" onSubmit={props.onSubmit}>
    // <input type="text" placeholder="Title" onChange={props.onTitleChange} defaultValue={props.post ? props.post.title : null }/>
    // <input type="text" placeholder="Description" onChange={props.onDescChange} defaultValue={props.post ? props.post.description : null }/>
    // {props.post ? null : uneditableOptions}
    // {props.vet ? vetQuestions : null}
    // {!props.vet && !props.post ? <input type="number" onChange={props.onSizeChange} min="1" required="true"/> : null}
    // <input id="hackathon" type="checkbox" onChange={props.onHackChange} defaultChecked={props.post? props.post.tag === "HACKATHON" : false }/>
    // <label htmlFor="hackathon">Hackathon?</label>
    // {props.hack ? null : <input type="text" placeholder="Module code" onChange={props.onTagChange} defaultValue={(props.post && props.post.tag !== "HACKATHON") ? props.post.tag : null }/>}
    // <button type="submit">{props.post ? "Save": "Submit"}</button>
    // </form>
    <Box
    component="form"
    sx={{
      '& > :not(style)': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
    >
      <form className="Form" onSubmit={props.onSubmit}>
      <TextField label="Title" onChange={props.onTitleChange} variant="outlined" />
      <TextField label="Description" onChange={props.onDescChange} variant="outlined" />
      {props.post ? null : uneditableOptions}
      {props.vet ? vetQuestions : null}
      {!props.vet && !props.post ? <TextField
                                  id="outlined-number"
                                  label="Number of People to Find"
                                  type="number"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  onChange={props.onSizeChange}
                                  // required="true"
                                  />
                                : null}
      <FormControlLabel label="Hackathon?" 
                        control={<Checkbox onChange={props.onHackChange} 
                                  defaultChecked={props.post? props.post.tag === "HACKATHON" : false }/>} 
                        id="hackathon" 
        />
      {/* <InputLabel htmlFor="hackathon">Hackathon?</InputLabel> */}
      {props.hack ? null : <TextField label="Module Code" onChange={props.onTagChange} 
        defaultValue={(props.post && props.post.tag !== "HACKATHON") ? props.post.tag : null }/>}
      <Button variant="contained" type="submit">{props.post ? "Save": "Submit"}</Button>
      {/* <button type="submit">{props.post ? "Save": "Submit"}</button> */}
      </form>
    </Box>
  );
  
}

export default PostForm;
