import React, {useState, useEffect, createElement} from 'react';
import  { useNavigate } from 'react-router-dom'
import PostForm from './Post/PostForm';
import Post from './Post/Post';
import Api from '../Api';
import { Box, Button, Grid, CircularProgress, Typography } from '@mui/material';
import Loading from './Loading';


function Home(props) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tag, setTag] = useState("");
  const [vet, setVet] = useState(false);
  const [hack, setHack] = useState(false);
  const [size, setSize] = useState(0);
  const [questionNum, setQuestionNum] = useState(1);
  const [vetQuestionText, setVetQuestionText] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [dataAvailable, setDataAvailable] = useState(true);
  const [lastDate, setlastDate] = useState(Date.now());

  useEffect(()=> {
    setPageLoading(true);
    getPosts();
    setPageLoading(false);
  },[]);

  const getPosts = async () => {
    setLoading(true);
    const allPosts = await Api.get(`/posts?lastDate=${lastDate}`, {
      headers: {
        Authorization: localStorage.getItem("Authorization")
      }
    })
    if (allPosts.data.posts.length === 0) {
      setDataAvailable(false);
    } else {
      setPosts(posts.concat(allPosts.data.posts));
      setlastDate(allPosts.data.posts.at(-1).date);
    }
    setLoading(false);
  }

  window.onscroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 1>= document.documentElement.offsetHeight) {
      if(dataAvailable) {
        getPosts();
      }
    }
  }


  const onAddQuestion = (e) => {
    setQuestionNum(questionNum + 1);
  }

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const onDescChange = (e) => {
    setDesc(e.target.value);
  }

  const onTagChange = (e) => {
    setTag(e.target.value);
  }

  const onVetChange = (e) => {
    setVet(!vet);
    setQuestionNum(1);
  }

  
  const onHackChange = (e) => {
    if (hack) {
      setTag("");
    } else {
      setTag("Hackathon");
    }
    setHack(!hack);
  }

  const onSizeChange = (e) => {
    setSize(e.target.value);
  }

 const onSubmit = async (e) => {
    e.preventDefault();
    if (title === "" || desc === "" || (tag === "" && !hack)) {
      alert("Title, description, and tag cannot be empty");
    } else if (!vet) {
      await Api({
        method: 'post',
        url: '/posts/new',
        headers: {
          Authorization: localStorage.getItem("Authorization")
        },
        data: {title, user: props.id, description: desc, tag: tag.toUpperCase(), name: props.name, vet, size}
      })
    } else {
      let filtered = vetQuestionText.filter(e => e != '');
      await Api({
        method: 'post',
        url: '/posts/new',
        headers: {
          Authorization: localStorage.getItem("Authorization")
        },
        data: {title, user: props.id, description: desc, tag: tag.toUpperCase(), name: props.name, vet, questions: filtered}
      })
    }
    e.target.reset();
    navigate(0);
  }

  const onAddButClick = () => {
    setShowForm(true);
  }

  const addBut = (<Button onClick={onAddButClick} sx={{width:"stretch"}}> Add Post</Button>);
  const form = (<PostForm onSubmit={onSubmit} onDescChange={onDescChange} onTitleChange={onTitleChange} 
    onTagChange={onTagChange} onVetChange={onVetChange} onSizeChange={onSizeChange} vet={vet} addQ={onAddQuestion} questionNum={questionNum}
    hack={hack} onHackChange={onHackChange} vetQuestionText={vetQuestionText} setVetQuestionText={setVetQuestionText}/>);

  if (pageLoading) {
    return <Loading />
  }

  return (
    <Grid container
      spacing={2} 
      justifyContent="center"
      alignItems="flex-start"
    > 
      <Grid item xs={0} md={3} xl={4}/>
      <Grid item
        xs={12}
        md={6}
        xl={4}
        justifyContent="center"
      >
        {showForm ? form : addBut}
      </Grid>
      <Grid item xs={0} md={3} xl={4}/>
      {posts.map(obj=>{
        return (
          <Grid item container>
            <Grid item xs={0} md={3} xl={4}/>
            <Grid item xs={12} md={6} xl={4}>
              <Post key={obj._id} id={obj._id} title={obj.title} desc={obj.description} posturl={obj.url}
              user={obj.author.name} date={obj.formatted_date} tag={obj.tag} authorurl={obj.author.url}/>
            </Grid>
            <Grid item xs={0} md={3} xl={4}/>
          </Grid>
          )
      })}
      {loading ? <Grid item  sx={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                  <CircularProgress />
                  </Grid> : null}
      {dataAvailable ? null : <Typography>Thats the end!</Typography>}
    </Grid>
  ); 
}

export default Home;
