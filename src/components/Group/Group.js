import React, {useState, useEffect} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Api from '../../Api';

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
    return ("loading..");
  }

  return (
    <div>
      {groups.map(e => { return (
        <div key={e._id}>
          Title {e.title} <br/>
          Desc {e.description} <br/>
          Members <br/>
          {e.users.map(u => { return (
            <ul>{u.email}</ul>
          )
          })}
        <button data-groupid={e._id} onClick={onLeaveButClick}>Leave</button>
        </div>
      )})}
    </div>
  );
}

export default Group;