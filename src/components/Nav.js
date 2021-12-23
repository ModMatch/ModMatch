import React, { useState } from 'react';
import { createSearchParams, Link } from 'react-router-dom';
import navModules from '../styles/Nav.module.css';
import { useNavigate } from 'react-router-dom';
import Api from '../Api';
import { ClickAwayListener, Button, Box } from '@mui/material';
import Notifications from './Notification/Notifications';


function Nav(props) {

  const navigate = useNavigate()

  const[query, setQuery] = useState("")
  const[showNotif, setShowNotif] = useState(false)

  const onQuery = (e) => {
    setQuery(e.target.value);
  }

  const onSubmit = (e) => {
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
    <div className="Nav">
      <Link to="/home">Home</Link>
      <Link to="/" onClick={logout}>Logout</Link>
      <Link to={props.profileUrl}>Profile</Link>
      <Link to={'/groups'}>Groups</Link>
      <ClickAwayListener onClickAway={() => setShowNotif(false)}>
        <Box sx={{ position: 'relative' }}>
          <Button onClick={() => setShowNotif(!showNotif)}>
            Notifications
          </Button>
          {showNotif ? (
            <Box sx={{position: 'absolute', background: 'white'}}>
              <Notifications userid={props.userid}/>
            </Box>
          ) : null}
        </Box>
      </ClickAwayListener>
      <form className="Form" onSubmit={onSubmit}> 
        <input type='text' name='query' onChange={onQuery} placeholder='Module code'/>
        <button type='submit'>Search</button>
      </form>
    </div>
  );
  
}

export default Nav;
