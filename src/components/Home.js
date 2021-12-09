import React, {useState} from 'react';
import Form from './Form';
import Post from './Post';


function Home(props) {

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [id, setId] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [posts, setPosts] = useState([]);

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const onDescChange = (e) => {
    setDesc(e.target.value);
  }

  const onSubmit = (e) => {
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
  }

  const onAddButClick = () => {
    setShowForm(true);
  }

  const onDelButClick = (e) => {
    setPosts(posts.filter(x => x.id !== e.target.parentElement.id));
  }

  const addBut = (<button onClick={onAddButClick}>Add Post</button>);
  const form = (<Form onSubmit={onSubmit} onDescChange={onDescChange} onTitleChange={onTitleChange}/>);

  return (
    <div>
      {showForm ? form : addBut}
      {posts.map(x => { return ( 
        <Post key={x.id} user={x.user} title={x.title} desc={x.desc} id={x.id} currUser={props.user} onDelButClick={onDelButClick}/>
      )})}
    </div>
  );
  
}

export default Home;
