import React, { useState, useEffect } from 'react';
import { createSearchParams, Link } from 'react-router-dom';
import { List, ListItem, ListItemButton } from '@mui/material';
import Notification from './Notification';
import Api from '../../Api';

function Notifications(props) {

  const [notifs, setNotifs] = useState([]);

  useEffect(() => {
    Api.get(`users/${props.userid}/notifications`, {
      headers: {
        Authorization: localStorage.getItem("Authorization")
      }
    })
    .then(res => setNotifs(res.data.notifs.notifications))
  }, [])

  return (
    <List>
      {notifs.slice(0).reverse().map(n => {
        return (
          <ListItem disablePadding>
            <ListItemButton>
              <Notification posturl={n.url} title={n.title} desc={n.description}/>
            </ListItemButton>
          </ListItem>
        )
      })}
    </List>
  );
  
}

export default Notifications;
