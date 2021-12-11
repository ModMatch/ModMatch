import React, {useState, useEffect} from 'react';
import  { useNavigate } from 'react-router-dom'
import Form from './Form';
import Post from './Post';
import Api from '../api';


function Home(props) {
  
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [posts, setPosts] = useState([]);
  const [trigger, setTrigger] = useState(true);

  useEffect(()=> {
    async function getPosts() {
      const allPosts = await Api.get('/posts', {
        headers: {
          Authorization: localStorage.getItem("Authorization")
        }
      })
      setPosts(allPosts.data.posts);
    }

    getPosts();

  },[trigger]);

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const onDescChange = (e) => {
    setDesc(e.target.value);
  }

 const onSubmit = async (e) => {
    e.preventDefault();
    if (title === "" || desc === "") {
      alert("Title and description cannot be empty");
    } else {
      await Api({
        method: 'post',
        url: '/posts/new',
        headers: {
          Authorization: localStorage.getItem("Authorization")
        },
        data: {title, user: props.id, description: desc, name: props.name}
      })
      e.target.reset();
      setShowForm(false);
      setTrigger(!trigger);
    }
  }

  const onAddButClick = () => {
    setShowForm(true);
  }

  const onDelButClick = async (e) => {
    await Api.delete(`/posts/${e.target.parentNode.dataset.postid}`, {
      headers: {
        Authorization: localStorage.getItem("Authorization")
      }
    })
    setTrigger(!trigger);
  }

  const addBut = (<button onClick={onAddButClick}>Add Post</button>);
  const form = (<Form onSubmit={onSubmit} onDescChange={onDescChange} onTitleChange={onTitleChange}/>);
  const delBut = (<button onClick={onDelButClick}>Delete Post</button>)

  return (
    <div>
      {showForm ? form : addBut}
      {posts.map(obj=>{
        return (<div key={obj._id} data-postid={obj._id}>Title: {obj.title} desc: {obj.description} by: {obj.name}
            {obj.user == props.id ? delBut : null}
          </div>)
      })}
    </div>
  ); 
}

export default Home;
