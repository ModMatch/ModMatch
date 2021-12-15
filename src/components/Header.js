import React from 'react';
import Nav from './Nav'
import '../styles/Header.css'

function Header(props) {

  return (
    <nav className="Header">
      <Nav profileUrl={`/users/${props.id}`}/>
      <div>Hello, {props.user}</div>
    </nav>
  );
  
}

export default Header;
