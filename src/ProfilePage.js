import React, {useState, useEffect} from 'react';
import Header from './components/Header';
import Profile from './components/Profile/Profile';
import useAuth from './hooks/useAuth';
import Api from './Api';
import { useNavigate, useParams } from 'react-router-dom';

function ProfilePage() {

  let {isAuth, name, id} = useAuth();
  let param = useParams();

  const [user, setUser] = useState();
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    setLoading(true);
    Api.get(`/users/${param.userid}`, {
      headers: {
        Authorization: localStorage.getItem("Authorization")
      }
    }).then(res => {
      setUser(res.data.user);
      setPosts(res.data.posts);
      setLoading(false);
    })
  },[]);


  if (loading) {
    return <div>loading</div>
  }
  return (
    <div className="Profile">
      <Header user={name} id={id}/>
      <Profile user={user} posts={posts} currid={id}/>
    </div>
  );
  
}

export default ProfilePage;
