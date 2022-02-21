import React, { useState, useEffect } from 'react';
import { CircularProgress, Menu, MenuItem, Box, IconButton, Typography, Card, CardHeader, CardContent } from '@mui/material';
import Notification from './Notification';
import Api from '../../Api';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';

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
  const [notifCount, setNotifCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lastId, setlastId] = useState(Date.now());
  const [dataAvailable, setDataAvailable] = useState(true);

  useEffect(() => {
    getNotif();
  }, [])

  // TODO lazy notifications
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
      let count = notifCount;
      userNotifs.data.notifs.notifications.forEach(e => {
        if (!e.readStatus) {
          count++;
        }
      });
      setNotifCount(count);
      setlastId(userNotifs.data.notifs.notifications.at(-1)._id);
    }
    setLoading(false);
  }

  return (
    <div>
    <IconButton
        onClick={handleClick}
      >
        <Badge color="secondary" badgeContent={notifCount}>
          <NotificationsIcon sx={{color: "#fff", '&:hover': {
            color: '#eeeeee',      
            }}} />
        </Badge>
    </IconButton>
    <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: '60vh',
          },
        }}
      >
        {notifs.slice(0).reverse().map(n => {
          return (
            <MenuItem sx={{padding : '0'}}>
                <Notification posturl={n.url} title={n.title} desc={n.description} readStatus={n.readStatus} id={n._id}/>
            </MenuItem>
          )
        })}
        {loading ? <Box  sx={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                    <CircularProgress />
                    </Box> : null}
        {dataAvailable ? null : <Typography color="text.primary" sx={{m: 1, p: 1}} fontSize="1rem">No Notifications!</Typography>}
      </Menu>
      </div>
  );
  
}

export default Notifications;
