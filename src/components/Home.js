import React, {useState, useEffect} from 'react';
import  { useNavigate } from 'react-router-dom'
import PostForm from './Post/PostForm';
import Post from './Post/Post';
import Api from '../Api';
import { Box, Button, Stack, TextField } from '@mui/material';
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
  const [showForm, setShowForm] = useState(false);
  const [posts, setPosts] = useState([]);
  const [trigger, setTrigger] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    setLoading(true);
    async function getPosts() {
      const allPosts = await Api.get('/posts', {
        headers: {
          Authorization: localStorage.getItem("Authorization")
        }
      })
      setPosts(allPosts.data.posts);

    }

    getPosts();
    setLoading(false);

  },[trigger]);


  const onAddQuestion = (e) => {
    let q = document.createElement("input");
    // <TextField label='Vetting Question Number ${questionNum+1}' variant="outlined" />
    q.name = questionNum + 1;
    e.target.parentNode.insertBefore(q, e.target);
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
      let q = e.target.querySelector('.questions');
      let qarr = [];
      for (var i = 0; i < questionNum; i++) {
        if (q.childNodes[i].value !== "") {
          qarr.push(q.childNodes[i].value);   
        }  
      }
      await Api({
        method: 'post',
        url: '/posts/new',
        headers: {
          Authorization: localStorage.getItem("Authorization")
        },
        data: {title, user: props.id, description: desc, tag: tag.toUpperCase(), name: props.name, vet, questions: qarr}
      })
    }
    e.target.reset();
    setVet(false);
    setHack(false);
    setShowForm(false);
    setTitle("");
    setDesc("");
    setTag("");
    setTrigger(!trigger);
  }

  const onAddButClick = () => {
    setShowForm(true);
  }

  const addBut = (<Button onClick={onAddButClick}> Add Post</Button>);
  const form = (<PostForm onSubmit={onSubmit} onDescChange={onDescChange} onTitleChange={onTitleChange} 
    onTagChange={onTagChange} onVetChange={onVetChange} onSizeChange={onSizeChange} vet={vet} addQ={onAddQuestion}
    hack={hack} onHackChange={onHackChange}/>);

  if(loading) {
  return (<Loading/>);
}
  return (
    <Stack spacing={2}
      justifyContent="flex-start"
      alignItems="center">
      <Box display="flex" justifyContent="center" alignItems="center">
        {showForm ? form : addBut}
      </Box>
      {posts.map(obj=>{
        return (
          <Post key={obj._id} id={obj._id} title={obj.title} desc={obj.description} posturl={obj.url}
          user={obj.author.name} date={obj.formatted_date} tag={obj.tag} authorurl={obj.author.url}/>)
      })}
    </Stack>
  ); 
}

export default Home;
