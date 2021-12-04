import React from 'react';
import Nav from './Nav'
import '../styles/Header.css'

function Header(props) {

  return (
    <div className="Header">
      <Nav/>
      <div>Hello, {props.username}</div>
    </div>
  );
  
}

export default Header;
