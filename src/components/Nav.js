import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Nav.css';
import { useNavigate } from 'react-router-dom';

function Nav(props) {

  const navigate = useNavigate()
  
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
    </div>
  );
  
}

export default Nav;
