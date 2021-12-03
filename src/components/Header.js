import React, {Component} from 'react';
import Nav from './Nav'
import '../styles/Header.css'

class Header extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Header">
        <Nav/>
        <div>Hello, {this.props.username}</div>
      </div>
    );
  }
  
}

export default Header;
