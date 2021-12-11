import React, {useState, useEffect} from 'react';
import Header from './components/Header';
import Home from './components/Home';
import useAuth from './hooks/useAuth';

function App() {

  let {isAuth, name, id} = useAuth();

  return (
    <div className="App">
      <Header user={name} id={id}/>
      <Home id={id} name={name}/>
    </div>
  );
  
}

export default App;
