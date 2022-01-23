import React, {useState, useEffect} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Api from '../../Api';
import Loading from '../Loading';
import Post from '../Post/Post';

function PendingGroup(props) {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(()=>{
    setLoading(true);
    async function getGroups() {
      const allGroups = await Api.get(`users/${props.curruserid}/pendingGroups`, {
        headers: {
          Authorization: localStorage.getItem("Authorization")
        }
      })
      setPosts(allGroups.data.groups.applied);
    }

    getGroups();
    setLoading(false);
  }, [])

  if (loading) {
    return (<Loading/>);
  }

  return (
    <div>
      {posts.map(obj => { return (
          <Post key={obj._id} id={obj._id} title={obj.title} desc={obj.description} posturl={obj.url}
          user={obj.author.name} date={obj.formatted_date} tag={obj.tag} authorurl={obj.author.url}/>
        )})}
    </div>
  );
}

export default PendingGroup;