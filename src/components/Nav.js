import React from 'react';
import '../styles/Nav.css'

function Nav(props) {

  const logout = () => {
    localStorage.removeItem("Authorization");
  }

  return (
    <div className="Nav">
      <a href="/home">Home</a>
      <a href="/" onClick={logout}>Logout</a>
    </div>
  );
  
}

export default Nav;
