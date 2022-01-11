import React, {useState, useEffect} from 'react';
import Header from './components/Header';
import Post from './components/Post/Post';
import useAuth from './hooks/useAuth';
import Api from './Api';
import { Typography} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

function TagPage() {

  let {isAuth, name, id} = useAuth();
  let param = useParams();

  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    setLoading(true);
    Api.get(`/posts/tags/${param.tagname.toUpperCase()}`, {
      headers: {
        Authorization: localStorage.getItem("Authorization")
      }
    }).then(res => {
      setPosts(res.data.posts);
      setLoading(false);
    })
  },[]);


  if (loading) {
    return <div>loading</div>
  }
  return (
    <div className="Tag">
      <Header user={name} id={id}/>
      <Typography variant="h4" color="primary.dark" align='center'>
        Tag: {param.tagname.toUpperCase()}
      </Typography>
      
      {posts.map(obj=>{
        return (
          <div>
            <Post key={obj._id} id={obj._id} title={obj.title} desc={obj.description} posturl={obj.url}
             user={obj.author.name} date={obj.formatted_date} tag={obj.tag} authorurl={obj.author.url}/>
          </div>)
      })}
    </div>
  );
  
}

export default TagPage;
