import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './components/Header';
import useAuth from './hooks/useAuth';
import EnlargedPost from './components/Post/EnlargedPost';
import PostForm from './components/Post/PostForm';
import CommentForm from './components/Comment/CommentForm';
import Comment from './components/Comment/Comment';
import Api from './Api';
import { Button, Box, LinearProgress, Typography, Grid } from '@mui/material';
import Loading from './components/Loading';



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
  const [isExist, setIsExist] = useState(true);

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
      }).catch(err => {
        if (err.response.status == 404) {
          setIsExist(false);
        };
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
      url: `/posts/${param.postid}/${e.target.dataset.commentid}`,
      headers: {
        Authorization: localStorage.getItem("Authorization")
      },
      data: {description: e.target.elements["description"].value}
    }).then(navigate(0));
  }

  const onCommentDelButClick = (e) => {
    Api.delete(`/posts/${param.postid}/${e.target.dataset.commentid}`, {
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
    } else {
      Api({
        method: 'post',
        url: `/posts/${param.postid}`,
        headers: {
          Authorization: localStorage.getItem("Authorization")
        },
        data: {user: id, description: commentContent, name, postuser: post.user}
      }).then(navigate(0))
    }
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
    let isJoin = false;
    if (!post.group.users.includes(id)) {
      post.group.users.push(id);
      isJoin = true;
    } else {
      post.group.users = post.group.users.filter(e => e !== id);
    }  
    const res = await Api({
      method: 'put',
      url: `/groups/${post.group._id}`,
      headers: {
        Authorization: localStorage.getItem("Authorization")
      },
      data: {users: post.group.users, userid: id, postid: param.postid, isJoin}
    });
    if (res.data.isFull) {
      navigate('/groups');
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
        data: {userid: id, vet: true, postid: param.postid}
      });
    } else {
      navigate(`/post/${param.postid}/apply`)
    }
  }

  const SubmitBut = () => {
    if (!isVet) {
      return <Button variant="contained" onClick={onJoinButClick}>{post.group.users.includes(id) ? "Unjoin" : "Join"}</Button>
    } else {
      return <Button variant="contained" onClick={onApplyButClick}>{isIn ? "Unapply" : "Apply"}</Button>
    }
  }

  const onViewButClick = () => {
    navigate(`/post/${param.postid}/view`);
  }

  const authorAdminGroup = (<Box sx={{display: 'flex', alignItems: 'center', mt: "2em", justifyContent: "center"}}>
    <Button 
      variant="contained" 
      onClick={onDelButClick} 
      id="deleteButton">
        Delete Post
    </Button>
    <Button 
      variant="contained" 
      onClick={onEditButClick}
      id="editButton">
        Edit Post
    </Button>
    {isVet ? <Button variant="contained" onClick={onViewButClick}>View Application</Button> : null}
  </Box>);

  if (!isExist) {
    return <div>error post does not exist</div>
  } else if (loading) {
    return <Loading/>
  } 
  
  return (
    <div className="single-post">
      <Header user={name} id={id}/>
      <Grid container
        spacing={2} 
        justifyContent="center"
        alignItems="flex-start"
      >           
        <Grid item xs={0} md={2} xl={3}/>
        {edit ?
          <Grid item xs={12} md={8} xl={6}>
            <PostForm onSubmit={onSubmit} onDescChange={onDescChange} onTitleChange={onTitleChange}
            onTagChange={onTagChange} post={post} hack={hack} onHackChange={onHackChange}/>
          </Grid>
        : <Grid item xs={12} md={8} xl={6}>
            <EnlargedPost title={title} desc={desc} user={post.author.name} date={post.formatted_date}
            tag={tag} authorurl={post.author.url} posturl={post.url} />
            {post.user == id ? authorAdminGroup : null}
          </Grid>
        }
        <Grid item xs={0} md={2} xl={3}/>
        <Grid item xs={0} md={2} xl={3}/>
        <Grid container item xs={12} md={8} xl={6} justifyContent="center">
          { post.user !== id ? SubmitBut() : null}
        </Grid>
        <Grid item xs={0} md={2} xl={3}/>
        <Grid item xs={0} md={2} xl={3}/>
        {post.onModel === 'Group'? 
        <Grid item xs={12} md={8} xl={6}>
          <Box sx={{alignItems: 'center', justifyContent: "center", width: '100%', mt: 1}}>
            <LinearProgress variant="determinate" value={(parseInt(post.group.users.length) - 1)*100/(parseInt(post.group.size) - 1)} />
          </Box>
          <Box sx={{alignItems: 'center', justifyContent: "center", mt: 1}}>
            <Typography align="center">
            {`${parseInt(post.group.users.length) - 1}/${parseInt(post.group.size) - 1}`}
            </Typography>
          </Box>
        </Grid>
        : <Grid item xs={12} md={8} xl={6}/>}
        <Grid item xs={0} md={2} xl={3}/>
        <Grid item xs={0} md={3} xl={4}/>
        <Grid item container xs={12} md={6} xl={4} justifyContent="center">
          <CommentForm onSubmit={onCommentSubmit}/>
        </Grid>
        <Grid item xs={0} md={3} xl={4}/>
        <Grid item container spacing={0}>
        {post.comments.map(c=> {
          return(<Grid item container>
                  <Grid item xs={0} md={3} xl={4}/>
                  <Grid item xs={12} md={6} xl={4}>
                    <Comment id={c._id} curruserid={id} desc={c.description} date={c.formatted_date} commenter={c.commenter.name} commenterurl={c.commenter.url} commenterid={c.commenter.id} onCommentDelButClick={onCommentDelButClick} onCommentSaveButClick={onCommentSaveButClick}/>
                  </Grid>
                  <Grid item xs={0} md={3} xl={4}/>
                </Grid>)
        })}
        </Grid>
      </Grid>
    </div>
  );
  
}

export default SinglePost;