import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './components/Header';
import useAuth from './hooks/useAuth';
import Form from './components/Form';
import Api from './api';

function SinglePost(props) {

  let {isAuth, name, id} = useAuth();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({});

  let param = useParams();

  const navigate = useNavigate();
  useEffect(()=> {
    if (param) {
      setLoading(true);
      Api.get(`/posts/${param.postid}`, {
        headers: {
          Authorization: localStorage.getItem("Authorization")
        }
      }).then((apiPost) => {
        setPost(apiPost.data.post);
        setTitle(apiPost.data.post.title);
        setDesc(apiPost.data.post.description);
        setTag(apiPost.data.post.tag);
        setLoading(false);
      }) 
    }
  },[param]);

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const onDescChange = (e) => {
    setDesc(e.target.value);
  }

  const onTagChange = (e) => {
    setTag(e.target.value);
  }

 const onSubmit = async (e) => {
    e.preventDefault();
    if (title === "" || desc === "" || tag === "") {
      alert("Title, description, and tag cannot be empty");
    } else {
      navigate('/home');
      await Api({
        method: 'put',
        url: `/posts/${param.postid}`,
        headers: {
          Authorization: localStorage.getItem("Authorization")
        },
        data: {title, description: desc, tag: tag.toUpperCase()}
      });  
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="single-post">
      <Header user={name} id={id}/>
      <Form onSubmit={onSubmit} onDescChange={onDescChange} onTitleChange={onTitleChange} onTagChange={onTagChange} post={post}/>
    </div>
  );
  
}

export default SinglePost;
