import { Grid } from '@mui/material';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
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
    <Grid container
      spacing={2}
      justifyContent="flex-start"
      alignItems="center">
      {posts.map(obj => { return (
          <Grid item container>
          <Grid item xs={0} md={2} xl={3}/>
          <Grid item xs={12} md={8} xl={6}>
            <Post key={obj._id} id={obj._id} title={obj.title} desc={obj.description} posturl={obj.url}
            user={obj.author.name} date={obj.formatted_date} tag={obj.tag} authorurl={obj.author.url}/>
          </Grid>
          <Grid item xs={0} md={2} xl={3}/>
          </Grid>
        )})}
    </Grid>
  );
}

export default PendingGroup;