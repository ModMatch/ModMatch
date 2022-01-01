import React, { useState, useEffect } from 'react';
import { createSearchParams, Link } from 'react-router-dom';
import { List, ListItem, ListItemButton, Menu, MenuItem, Button } from '@mui/material';
import Notification from './Notification';
import Api from '../../Api';

function Notifications(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
    <div>
    <Button
        id="show-notifications-button"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color="inherit" 
      >
        Notifications
    </Button>
    <Menu
        id="demo-positioned-menu"
        aria-labelledby="show-notifications-button"
        anchorEl={open}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
      {notifs.slice(0).reverse().map(n => {
        return (
          <MenuItem>
            
            <ListItemButton>
              <Notification posturl={n.url} title={n.title} desc={n.description}/>
            </ListItemButton>
          </MenuItem>
        )
      })}
    </Menu>
    </div>
  );
  
}

export default Notifications;
