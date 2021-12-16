import React, {useState, useEffect} from 'react';
import useAuth from './hooks/useAuth';
import Group from './components/Group/Group';
import Header from './components/Header';

function GroupPage(props) {

  let {isAuth, name, id} = useAuth();

  if (id === "") {
    return "loading..."
  }
  
  return (
    <div>
      <Header user={name} id={id} />
      <Group curruserid={id} />
    </div>
  );
}

export default GroupPage;