import React, { useState, useEffect } from 'react';
import { CircularProgress, Menu, MenuItem, Box, IconButton, Typography } from '@mui/material';
import Notification from './Notification';
import Api from '../../Api';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { white } from '@mui/material/colors';

function Notifications(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    console.log(event.currentTarget)
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
        onClick={handleClick}
      >
        <Badge color="secondary" badgeContent={99}>
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
                <Notification posturl={n.url} title={n.title} desc={n.description}/>
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
