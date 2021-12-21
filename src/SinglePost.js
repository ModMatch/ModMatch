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
  const [hack, setHack] = useState(false);
  const [post, setPost] = useState({});
  const [edit, setEdit] = useState(false);
  const [isIn, setIsIn] = useState(false);
  const [isVet, setIsVet] = useState(false);

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
        let postdata = apiPost.data.post;
        setPost(postdata);
        setTitle(postdata.title);
        setDesc(postdata.description);
        setTag(postdata.tag);
        if (postdata.tag === "HACKATHON") {
          setHack(true);
        }
        if (postdata.group.requests) {
          setIsVet(true);
          for (let i = 0; i < postdata.group.requests.length; i++) {
            if (postdata.group.requests[i].user === id) {
              setIsIn(true);
              break;
            }
          }
        }
        setLoading(false);
      }) 
    }
  },[param, id]);

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const onDescChange = (e) => {
    setDesc(e.target.value);
  }

  const onTagChange = (e) => {
    setTag(e.target.value);
  }

  const onHackChange = (e) => {
    if (hack) {
      setTag("");
    } else {
      setTag("Hackathon")
    }
    setHack(!hack);
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
      setIsVet(false);
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
  const onJoinButClick = async (e) => {
    if (!post.group.users.includes(id)) {
      post.group.users.push(id);
    } else {
      post.group.users = post.group.users.filter(e => e !== id);
    }  
    const res = await Api({
      method: 'put',
      url: `/groups/${post.group._id}`,
      headers: {
        Authorization: localStorage.getItem("Authorization")
      },
      data: {users : post.group.users}
    });
    if (res.data.isFull) {
      navigate('/groups');
      //TODO call notification API and notify users in res.data.users
    }
    navigate(0);
  }

  const onApplyButClick = async (e) => {

    if (isIn) {
      navigate(0);
      await Api({
        method: 'put',
        url: `/groups/${post.group._id}`,
        headers: {
          Authorization: localStorage.getItem("Authorization")
        },  
        data: {userid : id}
      });
    } else {
      navigate(`/post/${param.postid}/apply`)
    }
  }

  const SubmitBut = () => {
    if (!isVet) {
      return <button onClick={onJoinButClick}>{post.group.users.includes(id) ? "Unjoin" : "Join"}</button>
    } else {
      return <button onClick={onApplyButClick}>{isIn ? "Unapply" : "Apply"}</button>
    }
  }

  const onViewButClick = () => {
    navigate(`/post/${param.postid}/view`);
  }

  const authorAdminGroup = (<div>
    <button onClick={onDelButClick}>Delete Post</button>
    <button onClick={onEditButClick}>Edit Post</button>
    {isVet ? <button onClick={onViewButClick}>View Application</button> : null}
  </div>);

  if (loading) {
    return <div>Loading...</div>
  }
  
  return (
    <div className="single-post">
      <Header user={name} id={id}/>
      
      {edit ?
        <PostForm onSubmit={onSubmit} onDescChange={onDescChange} onTitleChange={onTitleChange}
        onTagChange={onTagChange} post={post} hack={hack} onHackChange={onHackChange}/>
      : <div>
          <Post title={title} desc={desc} user={post.author.name} date={post.formatted_date}
          tag={tag} authorurl={post.author.url} posturl={post.url} />
          {post.user == id ? authorAdminGroup : null}
        </div>}

      { post.user !== id ? SubmitBut() : null}
      {post.onModel === 'Group'? <span>{`${parseInt(post.group.users.length) - 1}/${parseInt(post.group.size) - 1}`}</span>
      : null}
      <CommentForm onSubmit={onCommentSubmit}/>
      {post.comments.map(c=> {
        return(<Comment id={c._id} curruserid={id} desc={c.description} date={c.formatted_date} commenter={c.commenter.name}
        commenterurl={c.commenter.url} commenterid={c.commenter.id} onCommentDelButClick={onCommentDelButClick} onCommentSaveButClick={onCommentSaveButClick}/>)
      })}
    </div>
  );
  
}

export default SinglePost;