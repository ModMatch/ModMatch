import React, {Component} from 'react';
import '../styles/Nav.css'

class Nav extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Nav">
        <a href="#">Home</a>
      </div>
    );
  }
  
}

export default Nav;
