import React from 'react';
import Nav from './Nav'
import '../styles/Header.css'
import navModules from '../styles/Nav.module.css';

function Header(props) {

  return (
    <nav className={navModules.header}>
      <Nav profileUrl={`/users/${props.id}`} userid={props.id}/>
      <div className={navModules.hello}>Hello, {props.user}</div>
    </nav>
  );
  
}

export default Header;
