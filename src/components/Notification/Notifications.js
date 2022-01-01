import React, { useState, useEffect } from 'react';
import { createSearchParams, Link } from 'react-router-dom';
import { List, ListItem, ListItemButton, Menu, MenuItem } from '@mui/material';
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
    <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={anchorEl}
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
      <MenuItem onClick={handleClose}>Profile</MenuItem>
      {/* {notifs.slice(0).reverse().map(n => {
        return (
          <MenuItem>
            n.url
            <ListItemButton>
              <Notification posturl={n.url} title={n.title} desc={n.description}/>
            </ListItemButton>
          </MenuItem>
        )
      })} */}
    </Menu>
  );
  
}

export default Notifications;
