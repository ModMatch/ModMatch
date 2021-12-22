import React, {useState, useEffect} from 'react';
import Header from './components/Header';
import Post from './components/Post';
import useAuth from './hooks/useAuth';
import Api from './Api';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
const url = require('url');

function SearchPage() {

  let {isAuth, name, id} = useAuth();
  let param = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    setLoading(true);
    Api.get(`/posts/search?${url.parse(window.location.href).query}`, {
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
    <div className="Search">
      <Header user={name} id={id}/>
      Search for {searchParams.get('q')}
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

export default SearchPage;
