import React, {useState, useEffect} from 'react';
import Header from './components/Header';
import Home from './components/Home';
import useAuth from './hooks/useAuth';
import Api from './api';

function App() {

  const[user, setUser] = useState("");

  useEffect(()=> {
    async function getAuth() {
      try {
        const auth = await Api.get('/auth', {
          headers: {
            Authorization: localStorage.getItem("Authorization")
          }
        })  
        console.log(auth.data)
         setUser(auth.data.user.given_name);
      } catch(err) {
      }
    };

    getAuth();

  },[]);

  return (
    <div className="App">
      <Header user={user}/>
      <Home />
    </div>
  );
  
}

export default App;
