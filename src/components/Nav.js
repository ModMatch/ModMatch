import React, { useState } from 'react';
import { createSearchParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Api from '../Api';
import { ClickAwayListener, Button, Box, IconButton, InputBase } from '@mui/material';
import Notifications from './Notification/Notifications';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Search = styled('form')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function Nav(props) {
  
  const navigate = useNavigate()

  const[query, setQuery] = useState("")
  const[showNotif, setShowNotif] = useState(false)

  const onQuery = (e) => {
    setQuery(e.target.value);
  }

  const onSubmit = (e) => {
    console.log("clicked")
    e.preventDefault();
    navigate({
      pathname: `/search`,
      search: `?${createSearchParams({q: query})}`});
    navigate(0);
  }
  
  const logout = () => {
    localStorage.removeItem("Authorization");
    navigate(0);
  }

  return (
    <Box sx={{ flexGrow: 1, width: "auto"}}>
    <AppBar position="fixed">
      <Toolbar sx={{
          display: 'flex',
          justifyContent: 'space-between'}}>
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: "center"
          }}>
        <IconButton 
          component={Link} 
          to="/home" 
          variant="contained" 
          color="inherit"
        >
          Home
        </IconButton>
        <IconButton 
          component={Link} 
          to="/groups" 
          variant="contained" 
          color="inherit"
          sx={{ flexGrow: 1 }}
        >
          Groups
        </IconButton>
        <ClickAwayListener onClickAway={() => setShowNotif(false)}>
        <Box>
          <Notifications userid={props.userid}/>
        </Box>
        </ClickAwayListener>
        </Box>
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}>
        <Box>
          <Search onSubmit={onSubmit}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={onQuery}
              />
              <Button variant="contained" type="submit">Submit</Button>
          </Search>
        </Box>
        <IconButton 
          component={Link} 
          to={props.profileUrl}
          variant="contained" 
          color="inherit"
          sx={{ flexGrow: 1 }}
        >
          Profile
        </IconButton>
        <IconButton 
          component={Link} 
          to="/" 
          onClick={logout}
          variant="contained" 
          color="inherit"
          sx={{ flexGrow: 1 }}
        >
          Logout
        </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  </Box>
  );
  
}

export default Nav;
