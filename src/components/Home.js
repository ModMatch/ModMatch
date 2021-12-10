import React, {useState} from 'react';
import  { Redirect } from 'react-router-dom'
import Form from './Form';
import Post from './Post';
import Api from '../api';


function Home(props) {

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [showForm, setShowForm] = useState(false);

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const onDescChange = (e) => {
    setDesc(e.target.value);
  }

 /*const onSubmit = (e) => {
    //TODO: DB implementation, stored as state first, gone on refresh
    if (title === "" || desc === "") {
      alert("Title and description cannot be empty");
    } else {
      setTitle("");
      setDesc("");
      setId(1);
      const user = props.user;
      setPosts(posts.concat({title, desc, id, user}));
      setShowForm(false);
      e.target.parentElement.reset();
    }
  }*/

  const onAddButClick = () => {
    setShowForm(true);
  }

  const onDelButClick = (e) => {
    //setPosts(posts.filter(x => x.id !== e.target.parentElement.id));
  }

  //const addBut = (<button onClick={onAddButClick}>Add Post</button>);
  //const form = (<Form onSubmit={onSubmit} onDescChange={onDescChange} onTitleChange={onTitleChange}/>);

  /*return (
    <div>
      {showForm ? form : addBut}
      {posts.map(x => { return ( 
        <Post key={x.id} user={x.user} title={x.title} desc={x.desc} id={x.id} currUser={props.user} onDelButClick={onDelButClick}/>
      )})}
    </div>
  );*/

  return (<div>loggedin</div>);
  
}

export default Home;
