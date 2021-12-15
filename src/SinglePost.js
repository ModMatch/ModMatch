import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './components/Header';
import useAuth from './hooks/useAuth';
import Post from './components/Post';
import PostForm from './components/PostForm';
import CommentForm from './components/CommentForm';
import Comment from './components/Comment';
import Api from './Api';

function SinglePost(props) {

  let {isAuth, name, id} = useAuth();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({});
  const [edit, setEdit] = useState(false);

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
        console.log(apiPost);
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

  const onEditButClick = (e) => {
    setEdit(true);
  }

  const onDelButClick = (e) => {
    Api.delete(`/posts/${param.postid}`, {
      headers: {
        Authorization: localStorage.getItem("Authorization")
      }
    }).then(navigate('/home'))
    .then(navigate(0));
  }

  const onCommentSaveButClick = (e) => {
    Api({
      method: 'put',
      url: `/posts/${param.postid}/${e.target.parentNode.dataset.commentid}`,
      headers: {
        Authorization: localStorage.getItem("Authorization")
      },
      data: {description: e.target.elements["description"].value}
    })
  }

  const onCommentDelButClick = (e) => {
    Api.delete(`/posts/${param.postid}/${e.target.parentNode.parentNode.dataset.commentid}`, {
      headers: {
        Authorization: localStorage.getItem("Authorization")
      }
    }).then(navigate(0));
  }

  const onCommentSubmit = (e) => {
    e.preventDefault();
    let commentContent = e.target.elements["description"].value;
    if (commentContent === "") {
      alert("Comment cannot be empty");
    }
    Api({
      method: 'post',
      url: `/posts/${param.postid}`,
      headers: {
        Authorization: localStorage.getItem("Authorization")
      },
      data: {user: id, description: commentContent, name}
    }).then(navigate(0))
  }

 const onSubmit = async (e) => {
    e.preventDefault();
    if (title === "" || desc === "" || tag === "") {
      alert("Title, description, and tag cannot be empty");
    } else {
      setEdit(false);
      navigate(0); 
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

  const authorAdminGroup = (<div>
    <button onClick={onDelButClick}>Delete Post</button>
    <button onClick={onEditButClick}>Edit Post</button>
  </div>);

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <div className="single-post">
      <Header user={name} id={id}/>
      {edit ?
      <PostForm onSubmit={onSubmit} onDescChange={onDescChange} onTitleChange={onTitleChange}
       onTagChange={onTagChange} post={post}/>
      : <div><Post title={title} desc={desc}
      user={post.author.name} date={post.formatted_date} tag={tag} authorurl={post.author.url} posturl={post.url} />
      {post.user == id ? authorAdminGroup : null}
      </div>}
      <CommentForm onSubmit={onCommentSubmit}/>
      {post.comments.map(c=> {
        return(<Comment id={c._id} curruserid={id} desc={c.description} date={c.formatted_date} commenter={c.commenter.name}
        commenterurl={c.commenter.url} commenterid={c.commenter.id} onCommentDelButClick={onCommentDelButClick} onCommentSaveButClick={onCommentSaveButClick}/>)
      })}
    </div>
  );
  
}

export default SinglePost;