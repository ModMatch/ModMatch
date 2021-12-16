import React, {useState, useEffect} from 'react';
import Api from '../../Api';

function Group(props) {

  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
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

  if (loading) {
    return ("loading..");
  }

  return (
    <div>
      {groups.map(e => { return (
        <div>
          Title {e.title} <br/>
          Desc {e.description} <br/>
          Members <br/>
          {e.users.map(u => { return (
            <ul>{u.email}</ul>
          )
          })}
        </div>
      )})}
    </div>
  );
}

export default Group;