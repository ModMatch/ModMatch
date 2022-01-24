import React, { useState, useEffect } from 'react';
import { createSearchParams, Link } from 'react-router-dom';
import { CircularProgress, ListItemButton, Menu, MenuItem, Button, Box, IconButton, Typography } from '@mui/material';
import Notification from './Notification';
import Api from '../../Api';
import Loading from '../Loading';

function Notifications(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [notifs, setNotifs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastId, setlastId] = useState(Date.now());
  const [dataAvailable, setDataAvailable] = useState(true);

  useEffect(() => {
    getNotif();
  }, [])

  const getNotif = async () => {
    setLoading(true);
    const userNotifs =  await Api.get(`users/${props.userid}/notifications?lastId=${lastId}`, {
      headers: {
        Authorization: localStorage.getItem("Authorization")
      }
    })
    if (userNotifs.data.notifs.notifications.length === 0) {
      setDataAvailable(false);
    } else {
      setNotifs(notifs.concat(userNotifs.data.notifs.notifications));
      setlastId(userNotifs.data.notifs.notifications.at(-1)._id);
    }
    setLoading(false);
  }

  return (
    <div>
    <IconButton
        id="show-notifications-button"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color="inherit" 
      >
        Notifications
    </IconButton>
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
      {loading ? <Box  sx={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                  <CircularProgress />
                  </Box> : null}
      {dataAvailable ? null : <Typography>No more notifications!</Typography>}
    </Menu>
    </div>
  );
  
}

export default Notifications;
