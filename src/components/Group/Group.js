import React, {useState, useEffect} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Api from '../../Api';
import SingleGroup from './SingleGroup';
import {Grid} from '@mui/material';
import Loading from '../Loading';

function Group(props) {

  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(()=>{
    setLoading(true);
    async function getGroups() {
      const allGroups = await Api.get(`users/${props.curruserid}/groups`, {
        headers: {
          Authorization: localStorage.getItem("Authorization")
        }
      })
      setGroups(allGroups.data.groups);
    }

    getGroups();
    setLoading(false);
  }, [])

  const onLeaveButClick = async (e) => {
    const id = e.target.dataset.groupid;
    navigate(0);
    await Api({
      method: 'put',
      url: `/confirmedgroups/${id}`,
      headers: {
        Authorization: localStorage.getItem("Authorization")
      },
      data: {userid : props.curruserid}
    })
  }

  if (loading) {
    return (<Loading/>);
  }

  return (
    <Grid container
      spacing={2}
      justifyContent="flex-start"
      alignItems="center"
    >
      {groups.slice(0).reverse().map(e => { return (
        <Grid item container>
          <Grid item xs={0} md={2} xl={3}/>
          <Grid item xs={12} md={8} xl={6}>
            <SingleGroup key={e._id} title={e.title} desc={e.description} users={e.users} id={e._id}
            onLeaveButClick={onLeaveButClick}/>
          </Grid>
          <Grid item xs={0} md={2} xl={3}/>
        </Grid>
      )})}
    </Grid>
  );
}

export default Group;