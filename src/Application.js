import React, {useState, useEffect} from 'react';
import useAuth from './hooks/useAuth';
import Header from './components/Header';
import Api from './Api';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from './components/Loading';
import { Button, Typography, Grid, TextField } from '@mui/material';
import { Box } from '@mui/system';

function Application(props) {

  let param = useParams();
  let {isAuth, name, id} = useAuth();
  const [post, setPost] = useState(true);
  const [loading, setLoading] = useState(true);
  const [responses, setResponses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    Api.get(`/posts/${param.postid}`, {
      headers: {
        Authorization: localStorage.getItem("Authorization")
      }
    }).then((res) => {
      setPost(res.data.post);
      setResponses(Array.from(Array(res.data.post.group.questions).fill("")));
      setLoading(false);
    });
  }, []);

  const onChange = (index, e) => {
    let temp = [...responses];
    temp[index] = e.target.value;
    setResponses(temp);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    navigate(`/post/${param.postid}`);
    await Api({
      method: 'post',
      url: `/groups/${post.group._id}/request`,
      headers: {
        Authorization: localStorage.getItem("Authorization")
      },
      data: {responses, id, postid: param.postid, name, posterid: post.author.id}
    })
  }

  if (loading) {
    return (<Loading/>);
  }
  
  return (
    <div>
      <Header user={name} id={id} />
      <Grid container
        spacing={2} 
        justifyContent="center"
        alignItems="flex-start">
        <Grid item xs={0} md={3} xl={4}/>
        <Grid item
        xs={12}
        md={6}
        xl={4}
        justifyContent="center"
        >
          <Typography variant='h3' textAlign="center">{post.title}</Typography>
        </Grid>
        <Grid item xs={0} md={3} xl={4}/>
        <Grid item xs={0} md={3} xl={4}/>
        <Grid item
        xs={12}
        md={6}
        xl={4}
        justifyContent="center"
        >
          <Typography variant='h5' textAlign="center">{post.description}</Typography>
        </Grid>
        <Grid item xs={0} md={3} xl={4}/>
        <Grid item xs={0} md={3} xl={4}/>
        <Grid item
          xs={12}
          md={6}
          xl={4}
          justifyContent="center"
          >
          <form className="Form" onSubmit={onSubmit}>
            {post.group.questions.map((q, i) => {
              return (
                <Box sx={{ '& > :not(style)': { m: 1, width: "stretch"} }}>
                  <Typography variant='h6'>{q}</Typography>
                  <TextField 
                    width="inherit"
                    label="Answer" 
                    required="true" 
                    variant="outlined" 
                    multiline
                    onChange={(e) => {onChange(i, e)}}/>
                </Box>  
              )
            })}
            <Button variant="contained" type="submit" sx={{m : 1}}>Submit</Button>
        </form>
      </Grid>
      <Grid item xs={0} md={3} xl={4}/>
      </Grid>
    </div>
  );
}

export default Application;