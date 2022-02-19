import React, {useState, useEffect} from 'react';
import useAuth from './hooks/useAuth';
import Header from './components/Header';
import Api from './Api';
import Loading from './components/Loading';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Typography, Grid } from '@mui/material';

function ResponsePage(props) {

  let param = useParams();
  let {isAuth, name, id} = useAuth();
  const [post, setPost] = useState(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    Api.get(`/posts/${param.postid}/viewapp`, {
      headers: {
        Authorization: localStorage.getItem("Authorization")
      }
    }).then((res) => {
      setPost(res.data.post);
      setLoading(false);
    });
  }, [])

  const onSubmit = async (e) => {
    navigate('/groups')
    await Api({
      method: 'put',
      url: `groups/${param.postid}/close`,
      headers: {
        Authorization: localStorage.getItem("Authorization")
      }
    })
  }

  const onApprove = async (e) => {
    navigate(0);
    await Api({
      method: 'put',
      url: `groups/${param.postid}/requests/${e.target.dataset.resid}`,
      headers: {
        Authorization: localStorage.getItem("Authorization")
      },
      data: {approval: "true"}
    })

  }

  const onReject = async (e) => {
    navigate(0);
    await Api({
      method: 'put',
      url: `groups/${param.postid}/requests/${e.target.dataset.resid}`,
      headers: {
        Authorization: localStorage.getItem("Authorization")
      },
      data: {approval: "false"}
    })
  }

  const onUndo = async (e) => {
    navigate(0);
    await Api({
      method: 'put',
      url: `groups/${param.postid}/requests/${e.target.dataset.resid}`,
      headers: {
        Authorization: localStorage.getItem("Authorization")
      },
      data: {approval: "pending"}
    })
  }

  if (loading) {
    return (<Loading/>);
  }
  
  return (
    <div className="responsePage">
      <Header user={name} id={id} />
      <Grid container
        spacing={1} 
        justifyContent="center"
        alignItems="flex-start">
      <Grid item xs={0} md={3} xl={4}/>
      <Grid item
        xs={12}
        md={6}
        xl={4}
        justifyContent="center"
        >
        <Typography align='center' variant='h3'>{post.title}</Typography>
      </Grid>
      <Grid item xs={0} md={3} xl={4}/>
      <Grid item xs={0} md={3} xl={4}/>
      <Grid item
        xs={12}
        md={6}
        xl={4}
        justifyContent="center"
        >
      <Typography align='center' variant='h5'>{post.description}</Typography>
      </Grid>
      <Grid item xs={0} md={3} xl={4}/>
      {post.group.requests.map((re) => {
        return (
          <Grid item container spacing={1}>
          <Grid item xs={0} md={3} xl={4}/>
            {re.responses.map((r, i) => {
              return(<Grid item container>
                <Grid item xs={0} md={3} xl={4}/>
                <Grid item
                xs={12}
                md={6}
                xl={4}
                justifyContent="center"
                >
                  <Typography>{post.group.questions[i]}</Typography>
                </Grid>
                <Grid item xs={0} md={3} xl={4}/>
                <Grid item xs={0} md={3} xl={4}/>
                <Grid item
                xs={12}
                md={6}
                xl={4}
                justifyContent="center"
                >
                  <Typography variant='body2'>{r}</Typography>
                </Grid>
                <Grid item xs={0} md={3} xl={4}/>
                </Grid>)
            })}
            {re.approval !== "pending" ?
              <Grid container justifyContent="center">
                <Typography variant='button' color="secondary.dark" alignSelf="center">
                  {re.approval == "true" ? "approved" : "rejected"}
                </Typography>
                <Button onClick={onUndo} data-resid={re._id}>Undo</Button>
              </Grid> : 
              <Grid container data-resid={re._id} justifyContent="center">
                <Button onClick={onApprove} data-resid={re._id}>Accept</Button><Button data-resid={re._id} onClick={onReject}>Reject</Button>
              </Grid>}
          <Grid item xs={0} md={3} xl={4}/>
          </Grid>
        )
      })}
      <Button onClick={onSubmit}>Close application</Button>
      </Grid>
    </div>
  );
}

export default ResponsePage;