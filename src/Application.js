import React, {useState, useEffect} from 'react';
import useAuth from './hooks/useAuth';
import Header from './components/Header';
import Api from './Api';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from './components/Loading';
import { Button, Typography, Stack, TextField } from '@mui/material';
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
      <Stack spacing={2}
        justifyContent="flex-start"
        alignItems="center">
        <Typography variant='h3'>{post.title}</Typography>
        <Typography variant='h5'>{post.description}</Typography>
      
      <form className="Form" onSubmit={onSubmit}>
        <Stack spacing={2}
          justifyContent="flex-start"
          alignItems="center"
          >
          {post.group.questions.map((q, i) => {
            return (
              <Box sx={{ '& > :not(style)': { m: 1, width: '50ch' } }}>
                <Typography variant='h6'>{q}</Typography>
                <TextField label="Answer" required="true" variant="outlined" onChange={(e) => {onChange(i, e)}}/>
              </Box>  
            )
          })}
          <Button variant="contained" type="submit">Submit</Button>
        </Stack>
      </form>
      </Stack>
    </div>
  );
}

export default Application;