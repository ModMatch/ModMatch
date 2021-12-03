import React, {Component} from 'react';
import Form from './Form';
import Post from './Post';
import uniqid from "uniqid";


class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      curr: {
        title: "",
        desc: "",
        user: this.props.user,
        id: uniqid()
      },
      showForm: false,
      posts: [],
    }
  }

  

  onTitleChange = (e) => {
    this.setState({
      curr: {
        title: e.target.value,
        desc: this.state.curr.desc,
        user: this.props.user,
        id: this.state.curr.id
      }
    });
  }

  onDescChange = (e) => {
    this.setState({
      curr: {
        title: this.state.curr.title,
        desc: e.target.value,
        user: this.props.user,
        id: this.state.curr.id
      }
    });
  }

  onSubmit = (e) => {
    //TODO: DB implementation, stored as state first, gone on refresh
    if (this.state.curr.title === "" || this.state.curr.desc === "") {
      alert("Title and description cannot be empty");
    } else {
      this.setState({
        curr: {
          title: "",
          desc: "",
          user: this.props.user,
          id: uniqid()
        },
        posts: this.state.posts.concat(this.state.curr)
      });
      e.target.parentElement.reset();
      this.setState({showForm: false});
    }
  }

  onAddButClick = () => {
    this.setState({showForm: true});
  }

  onDelButClick = (e) => {
    this.setState({
      posts: this.state.posts.filter(x => x.id != e.target.parentElement.id)
    })
  }


  render() {
    const addBut = (<button onClick={this.onAddButClick}>Add Post</button>);
    const form = (<Form onSubmit={this.onSubmit} onDescChange={this.onDescChange} onTitleChange={this.onTitleChange}/>);

    return (
      <div>
        {this.state.showForm ? form : addBut}
        {this.state.posts.map(x => { return ( 
          <Post key={x.id} user={x.user} title={x.title} desc={x.desc} id={x.id} currUser={this.props.user} onDelButClick={this.onDelButClick}/>
        )})}
      </div>
    );
  }
  
}

export default Home;
