import React, {useState} from 'react';
import useAuth from './hooks/useAuth';
import Group from './components/Group/Group';
import PendingGroup from './components/Group/PendingGroup';
import Header from './components/Header';
import Loading from './components/Loading';
import {Button, Box} from '@mui/material';

function GroupPage(props) {

  let {isAuth, name, id} = useAuth();
  let [showPending, setShowPending] = useState(false);

  if (id === "") {
    return (<Loading/>);
  }
  
  return (
    <div>
      <Header user={name} id={id} />
        <Box sx={{display: "flex"}}>
          <Button sx={{
          width: "50rem",
          mx: "auto",
          marginBottom: "1rem",
          }} onClick={() => setShowPending(!showPending)}>{showPending ? "Pending Groups" : "Confirmed Groups"}</Button>
        </Box>
      {showPending ? <PendingGroup curruserid={id} /> : <Group curruserid={id} />}
    </div>
  );
}

export default GroupPage;