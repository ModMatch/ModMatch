import React, {useState, useEffect} from 'react';
import Header from './components/Header';
import Home from './components/Home';
require('dotenv').config();

function App() {

  const [user, setUser] = useState("Wumh");
  const [apiRes, setApiRes] = useState("");

  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER_BASE + "/testApi ")
    .then(res=>res.json())
    .then(res => setApiRes(res));
  }, [])

  return (
    <div className="App">
      <Header username={user}/>
      <Home user={user}/>
      <p>{apiRes.text}</p>
    </div>
  );
  
}

export default App;
