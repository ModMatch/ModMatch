import React from 'react';
import { Link } from 'react-router-dom';
import navModules from '../styles/Nav.module.css';
import { useNavigate } from 'react-router-dom';


function Nav(props) {

  const navigate = useNavigate()
  
  const logout = () => {
    localStorage.removeItem("Authorization");
    navigate(0);
  }

  return (
    <div className={navModules.Nav}>
      <div className={navModules.left}>
        <Link to="/home" className={navModules.home}>Home</Link>
        <Link to="/" onClick={logout} className={navModules.logout}>Logout</Link>
      </div>
      <div className={navModules.right}>
        <Link to={props.profileUrl} className={navModules.profile}>Profile</Link>
        <Link to={'/groups'} className={navModules.groups}>Groups</Link>
      </div>
    </div>
  );
  
}

export default Nav;
