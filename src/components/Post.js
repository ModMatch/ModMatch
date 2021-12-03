import React, {Component} from 'react';

class Post extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id={this.props.id}>
        <span>
          Title: {this.props.title} 
          Desc: {this.props.desc} 
          user: {this.props.user}
        </span>
        {this.props.currUser === this.props.user ? <button onClick={this.props.onDelButClick}>Delete</button> : <span/>}
      </div>
    );
  }
  
}

export default Post;
