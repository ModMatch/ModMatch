import React, {useState, useEffect} from 'react';
import { Box, TextField, Checkbox, FormControlLabel, Button } from '@mui/material';

function PostForm(props) {



  useEffect(() => {
    props.setVetQuestionText(props.vetQuestionText.concat(""));
  } ,[]);

  const addQ = () => {
    props.addQ();
    props.setVetQuestionText(props.vetQuestionText.concat(""));
  }

  const onChange = (index, e) => {
    let temp = [...props.vetQuestionText];
    temp[index] = e.target.value;
    props.setVetQuestionText(temp);
  }

  const uneditableOptions = (<div>
    <FormControlLabel control={<Checkbox onChange={props.onVetChange}/>} label="Vetting?" id="vetting" name="vetting" onChange={props.onVetChange}/>
  </div>);

  const vetQuestions = (<Box className='questions' sx={{
    '& > :not(style)': {mb: 1, width: '50ch' },
    }}>
    {props.vetQuestionText.map((el, i) => {
      return (<TextField label="Question to Ask" required={i == 0 ? true : false} variant="outlined" defaultValue={el} onChange={(e) => onChange(i, e)}/>);
    })}
    <Button variant="contained" onClick={addQ}>Add Question</Button>
  </Box>)
  return (

    <Box
    sx={{
      '& > :not(style)': { m: 1, width: '50ch' },
    }}
    noValidate
    autoComplete="off"
    >
      <form className="Form" onSubmit={props.onSubmit}>
      <Box
      sx={{
        '& > :not(style)': { m: 1, width: '50ch' },
      }}
      noValidate
      autoComplete="off"
      >
      <TextField label="Title" required="true" onChange={props.onTitleChange} defaultValue={props.post ? props.post.title : null } variant="outlined"/>
      <TextField label="Description" required="true" onChange={props.onDescChange} defaultValue={props.post ? props.post.description : null } variant="outlined" />
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
                                  required="true"
                                  />
                                : null}
      <div>
        <FormControlLabel label="Hackathon?" 
                          control={<Checkbox onChange={props.onHackChange} 
                                    defaultChecked={props.post? props.post.tag === "HACKATHON" : false }/>} 
                          id="hackathon" name="hackathon"
        />
      </div>
      {props.hack ? null : <TextField required="true" label="Module Code" onChange={props.onTagChange} 
        defaultValue={(props.post && props.post.tag !== "HACKATHON") ? props.post.tag : null }/>}
      <Button variant="contained" type="submit">{props.post ? "Save": "Submit"}</Button>
      </Box>
      </form>
    </Box>
  );
  
}

export default PostForm;
