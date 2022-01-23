import React, {useState} from 'react';
import useAuth from './hooks/useAuth';
import Group from './components/Group/Group';
import PendingGroup from './components/Group/PendingGroup';
import Header from './components/Header';
import Loading from './components/Loading';
import {Button} from '@mui/material';

function GroupPage(props) {

  let {isAuth, name, id} = useAuth();
  let [showPending, setShowPending] = useState(false);

  if (id === "") {
    return (<Loading/>);
  }
  
  return (
    <div>
      <Header user={name} id={id} />
      <Button onClick={() => setShowPending(!showPending)}>Toggle</Button>
      {showPending ? <PendingGroup curruserid={id} /> : <Group curruserid={id} />}
    </div>
  );
}

export default GroupPage;